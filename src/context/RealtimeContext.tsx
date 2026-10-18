import React, { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';

export type RealtimeEventType =
  | 'community_post'
  | 'comment_reply'
  | 'post_like'
  | 'chat_message'
  | 'marketplace_listing'
  | 'notification'
  | 'listing_status';

export interface RealtimeEvent<T = any> {
  id: string;
  type: RealtimeEventType;
  payload: T;
  timestamp: string;
}

interface RealtimeContextValue {
  status: 'connected' | 'connecting' | 'disconnected';
  lastEventTimestamp: string | null;
  broadcast: (type: RealtimeEventType, payload: any) => Promise<void>;
  subscribe: (type: RealtimeEventType | '*', callback: (event: RealtimeEvent) => void) => () => void;
}

const RealtimeContext = createContext<RealtimeContextValue>({
  status: 'disconnected',
  lastEventTimestamp: null,
  broadcast: async () => {},
  subscribe: () => () => {},
});

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [status, setStatus] = useState<'connected' | 'connecting' | 'disconnected'>('connecting');
  const [lastEventTimestamp, setLastEventTimestamp] = useState<string | null>(null);

  const listenersRef = useRef<Map<string, Set<(event: RealtimeEvent) => void>>>(new Map());
  const processedEventIdsRef = useRef<Set<string>>(new Set());
  const eventSourceRef = useRef<EventSource | null>(null);
  const reconnectTimeoutRef = useRef<any>(null);

  // Dispatch incoming event to registered listeners
  const dispatchEvent = useCallback((event: RealtimeEvent) => {
    if (processedEventIdsRef.current.has(event.id)) {
      return; // Deduplicate
    }
    processedEventIdsRef.current.add(event.id);
    if (processedEventIdsRef.current.size > 1000) {
      // Clear oldest IDs to maintain bounded memory
      const it = processedEventIdsRef.current.values();
      for (let i = 0; i < 200; i++) {
        const val = it.next().value;
        if (val) processedEventIdsRef.current.delete(val);
      }
    }

    setLastEventTimestamp(event.timestamp);

    // Call exact type listeners
    const typeListeners = listenersRef.current.get(event.type);
    if (typeListeners) {
      typeListeners.forEach((cb) => {
        try {
          cb(event);
        } catch (err) {
          console.error('Realtime listener error:', err);
        }
      });
    }

    // Call wildcard listeners
    const wildcardListeners = listenersRef.current.get('*');
    if (wildcardListeners) {
      wildcardListeners.forEach((cb) => {
        try {
          cb(event);
        } catch (err) {
          console.error('Realtime wildcard listener error:', err);
        }
      });
    }
  }, []);

  // Connect to SSE stream
  const connectSSE = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    setStatus('connecting');

    try {
      const es = new EventSource('/api/realtime/stream');
      eventSourceRef.current = es;

      es.onopen = () => {
        setStatus('connected');
      };

      es.onmessage = (msgEvent) => {
        try {
          const parsed = JSON.parse(msgEvent.data);
          if (parsed && parsed.id && parsed.type) {
            dispatchEvent(parsed);
          }
        } catch {
          // Ignore non-json or ping frames
        }
      };

      es.onerror = () => {
        setStatus('disconnected');
        es.close();
        eventSourceRef.current = null;

        // Auto-reconnect with backoff
        if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = setTimeout(() => {
          connectSSE();
        }, 5000);
      };
    } catch {
      setStatus('disconnected');
    }
  }, [dispatchEvent]);

  useEffect(() => {
    connectSSE();
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectSSE]);

  const broadcast = useCallback(async (type: RealtimeEventType, payload: any) => {
    try {
      const res = await fetch('/api/realtime/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, payload }),
      });
      if (!res.ok) throw new Error('Broadcast failed');
    } catch (err) {
      console.warn('Real-time broadcast warning (local fallback maintained):', err);
    }
  }, []);

  const subscribe = useCallback((type: RealtimeEventType | '*', callback: (event: RealtimeEvent) => void) => {
    if (!listenersRef.current.has(type)) {
      listenersRef.current.set(type, new Set());
    }
    listenersRef.current.get(type)!.add(callback);

    return () => {
      const set = listenersRef.current.get(type);
      if (set) {
        set.delete(callback);
        if (set.size === 0) {
          listenersRef.current.delete(type);
        }
      }
    };
  }, []);

  return (
    <RealtimeContext.Provider value={{ status, lastEventTimestamp, broadcast, subscribe }}>
      {children}
    </RealtimeContext.Provider>
  );
};

export const useRealtime = () => useContext(RealtimeContext);

export function useRealtimeSubscription<T = any>(
  type: RealtimeEventType | '*',
  callback: (event: RealtimeEvent<T>) => void
) {
  const { subscribe } = useRealtime();
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    const unsubscribe = subscribe(type, (ev) => cbRef.current(ev));
    return unsubscribe;
  }, [type, subscribe]);
}
