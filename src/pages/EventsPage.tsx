import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Plus, CheckCircle, Share2, Tag } from 'lucide-react';
import { eventsData, AgriEvent } from '../data/events';

export const EventsPage: React.FC<{ isMobileFrame?: boolean }> = ({ isMobileFrame = false }) => {
  const [events, setEvents] = useState<AgriEvent[]>(eventsData);
  const [rsvpMap, setRsvpMap] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Seed Swap', 'Exhibition', 'Workshop'];

  const toggleRsvp = (id: string) => {
    setRsvpMap(prev => {
      const willRsvp = !prev[id];
      setEvents(evts =>
        evts.map(e =>
          e.id === id ? { ...e, attendeesCount: e.attendeesCount + (willRsvp ? 1 : -1) } : e
        )
      );
      return { ...prev, [id]: willRsvp };
    });
  };

  const filtered = events.filter(e =>
    selectedCategory === 'all' || e.category === selectedCategory
  );

  return (
    <div className={`space-y-6 ${isMobileFrame ? 'pb-24 pt-2 px-1' : 'pb-16'}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[32px] sm:text-[36px] font-bold text-[#183D29] tracking-tight">
            Events
          </h1>
          <p className="text-stone-600 text-sm mt-0.5">
            Agricultural shows, seed swaps, and farmer field days
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-[#183D29] text-[#FAF7F0]'
                : 'bg-stone-200/60 text-stone-700 hover:bg-stone-300/60'
            }`}
          >
            {cat === 'all' ? 'All Events' : cat}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="space-y-4">
        {filtered.map(evt => {
          const isAttending = rsvpMap[evt.id];
          return (
            <div
              key={evt.id}
              className="bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              {evt.image && (
                <div className="h-40 w-full overflow-hidden relative">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-[#183D29]/90 text-[#FAF7F0] text-[11px] font-bold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                    {evt.category}
                  </span>
                </div>
              )}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-[#183D29] text-base sm:text-lg leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-2.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#183D29]" />
                    <span className="font-medium text-stone-800">{evt.date}</span>
                    <span className="text-stone-400">·</span>
                    <Clock className="w-3.5 h-3.5 text-stone-400" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-500" />
                    <span>{evt.location} ({evt.county})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-stone-500" />
                    <span>{evt.attendeesCount} growers attending</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => toggleRsvp(evt.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition ${
                      isAttending
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-[#183D29] text-white hover:bg-[#122e1f]'
                    }`}
                  >
                    {isAttending ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                        Attending
                      </>
                    ) : (
                      'RSVP / Join'
                    )}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Event link copied to clipboard!');
                    }}
                    className="p-2 border border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600"
                    title="Share Event"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
