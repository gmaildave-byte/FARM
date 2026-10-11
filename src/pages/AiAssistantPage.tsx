import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Bot,
  User,
  ShieldAlert,
  Loader2,
  Globe,
  HelpCircle,
  MapPin,
  Sprout
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  isFallback?: boolean;
  source?: string;
  timestamp: string;
}

interface AiAssistantPageProps {
  selectedCounty: string;
}

export const AiAssistantPage: React.FC<AiAssistantPageProps> = ({ selectedCounty }) => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: language === 'sw'
        ? `Habari! Mimi ni msaidizi wako wa akili bandia (AI Agronomist) wa AgriKnowledge Hub. Nimeelimishwa kwa miongozo ya utafiti ya KALRO, KEPHIS na Wizara ya Kilimo ya Kenya. 

Unaweza kuniuliza kuhusu:
- Utambuzi wa magonjwa ya mazao na wadudu
- Ratiba sahihi ya mbolea na mbegu zilizoidhinishwa
- Mbinu bora za ufugaji wa ng'ombe wa maziwa au kuku
- Mbinu za kukabiliana na ukame au hali ya hewa katika kaunti yako ya **${selectedCounty}**.`
        : `Welcome! I am the AgriKnowledge AI Agronomist & Farming Advisor. My knowledge base is grounded in official production manuals from KALRO, KEPHIS, and the Kenya Ministry of Agriculture.

Feel free to ask me about:
- Crop disease diagnostics & pest management
- Seed variety selection & fertilizer schedules (DAP/CAN)
- Zero-grazing dairy rations & poultry vaccination protocols
- Agro-ecological planting windows for **${selectedCounty} County**.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    'How do I grow tomatoes in Kenya?',
    'Why are my maize leaves turning yellow at knee-high?',
    'What is the standard vaccination schedule for improved Kienyeji chicken?',
    'How much silage and dairy meal does a cow yielding 20L need daily?',
    'How do I manage Bacterial Wilt in Irish potatoes?'
  ];

  const handleSend = async (queryToSend?: string) => {
    const q = (queryToSend || inputQuery).trim();
    if (!q || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          language: language === 'sw' ? 'sw' : 'en',
          county: selectedCounty,
          chatHistory: messages.slice(-4).map(m => ({ role: m.sender, content: m.text }))
        })
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();

      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: data.answer || 'No response generated.',
        isFallback: Boolean(data.isFallback),
        source: data.source || 'AgriKnowledge Hub Agronomy Engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.error('Error querying AI assistant:', err);
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'assistant',
        text: `### Expert Advisory — AgriKnowledge Hub\n\nThank you for your question. For ${selectedCounty} County, ensure you test your soil pH, plant certified KEPHIS seed (e.g. H614 or Kilele F1), apply balanced fertilizer (DAP at planting and CAN at knee-high), and inspect fields weekly for pests like Fall Armyworm.\n\n*Consult your local sub-county agricultural extension officer for on-farm verification.*`,
        isFallback: true,
        source: 'AgriKnowledge Hub Knowledge Engine (Offline Mode)',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-900 rounded-full text-xs font-semibold text-emerald-300 border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
            Server-Side Agronomic Advisory Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Farming Assistant
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            Get instant, grounded agricultural answers tailored to Kenyan farming conditions. Powered by server-side Gemini 3.8 Flash integrated with official KALRO crop and livestock production manuals.
          </p>
        </div>
      </div>

      {/* Suggested Prompt Pills */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-500 flex items-center gap-1">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
          <span>Frequently Asked Agricultural Questions:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((sq, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sq)}
              className="text-xs bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 px-3 py-1.5 rounded-xl border border-stone-200 transition text-left"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-4 sm:p-6 flex-1 space-y-4 overflow-y-auto max-h-[600px]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot className="w-4 h-4 text-emerald-300" />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-800 text-white shadow-xs rounded-tr-none'
                    : 'bg-stone-50 border border-stone-200 text-stone-800 shadow-xs rounded-tl-none'
                }`}
              >
                {/* Content formatting */}
                <div className="whitespace-pre-line space-y-1">
                  {msg.text}
                </div>

                {/* Footer Source info */}
                {msg.sender === 'assistant' && (
                  <div className="mt-3 pt-2 border-t border-stone-200/80 flex flex-wrap justify-between items-center text-[10px] text-stone-500 gap-1">
                    <span>Source: {msg.source || 'AgriKnowledge AI Engine'}</span>
                    <span>{msg.timestamp}</span>
                  </div>
                )}
                {msg.sender === 'user' && (
                  <div className="text-right text-[10px] text-emerald-200 mt-1">{msg.timestamp}</div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-stone-200 text-stone-700 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-stone-500 text-xs py-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center">
                <Bot className="w-4 h-4 text-emerald-300" />
              </div>
              <div className="bg-stone-50 border border-stone-200 p-3 rounded-2xl flex items-center gap-2">
                <Loader2 className="w-4 h-4 text-emerald-700 animate-spin" />
                <span>Consulting agricultural research databases & synthesizing response...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-stone-50 border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder={language === 'sw' ? 'Andika swali lako la kilimo hapa...' : 'Ask your agricultural question (English or Kiswahili)...'}
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              className="flex-1 px-4 py-3 bg-white border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-xs"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="px-5 py-3 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 text-white rounded-2xl font-bold transition shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          {/* Legal Notice */}
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-stone-500">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>AI responses are informational and grounded in published agronomy manuals. For critical veterinary or plant emergencies, consult your local Sub-County Agricultural Officer.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
