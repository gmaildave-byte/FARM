import React, { useState } from 'react';
import {
  MessageSquare,
  Search,
  Send,
  Camera,
  MapPin,
  CheckCheck,
  CheckCircle2,
  Phone,
  User,
  ArrowLeft,
  Sparkles,
  Paperclip,
  Mic,
  MoreVertical
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Page } from '../types';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isSelf: boolean;
  image?: string;
}

interface Conversation {
  id: string;
  contactName: string;
  contactUsername: string;
  contactRole: string;
  contactAvatar: string;
  county: string;
  verified: boolean;
  online: boolean;
  lastSeen: string;
  messages: Message[];
}

export const initialConversations: Conversation[] = [
  {
    id: 'conv-1',
    contactName: 'Adams Kipkoech Kering',
    contactUsername: 'adams_kering',
    contactRole: 'Founder & Agronomist',
    contactAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    county: 'Uasin Gishu',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    messages: [
      {
        id: 'm1',
        senderId: 'adams',
        senderName: 'Adams Kipkoech Kering',
        text: 'Habari! Welcome to AgriHub. If you need any assistance with crop calculators, drip irrigation sizing, or farm records, feel free to ask!',
        time: '10:30 AM',
        isSelf: false,
      },
      {
        id: 'm2',
        senderId: 'user',
        senderName: 'You',
        text: 'Thank you Adams! I wanted to calibrate my knapsack sprayer for 1 acre of maize in Eldoret.',
        time: '10:32 AM',
        isSelf: true,
      },
      {
        id: 'm3',
        senderId: 'adams',
        senderName: 'Adams Kipkoech Kering',
        text: 'Excellent. Use our 26 Farming Tools suite -> Knapsack Sprayer Tool. Walk a 100m strip at constant speed and measure the water used in liters to get your exact spray volume per acre.',
        time: '10:34 AM',
        isSelf: false,
      },
    ],
  },
  {
    id: 'conv-2',
    contactName: 'Erick Korir',
    contactUsername: 'erick_seedhub',
    contactRole: 'Certified Seed Distributor',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    county: 'Trans Nzoia',
    verified: true,
    online: false,
    lastSeen: 'Active 20m ago',
    messages: [
      {
        id: 'm4',
        senderId: 'erick',
        senderName: 'Erick Korir',
        text: 'The certified H614 and SC Duma 43 hybrid maize seeds with valid KEPHIS scratch codes are available at our Kitale store.',
        time: 'Yesterday',
        isSelf: false,
      },
    ],
  },
  {
    id: 'conv-3',
    contactName: 'Dr. Mary Wambui',
    contactUsername: 'dr_mary_vet',
    contactRole: 'Veterinary Livestock Specialist',
    contactAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    county: 'Kiambu',
    verified: true,
    online: true,
    lastSeen: 'Active now',
    messages: [
      {
        id: 'm5',
        senderId: 'dr_mary',
        senderName: 'Dr. Mary Wambui',
        text: 'Please send clear photos of the dairy cow eye discharge and tell me the rectal temperature reading.',
        time: '08:15 AM',
        isSelf: false,
      },
    ],
  },
  {
    id: 'conv-4',
    contactName: 'Nakuru Fresh Produce Co-op',
    contactUsername: 'nakuru_coop',
    contactRole: 'Agricultural Cooperative Buyer',
    contactAvatar: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=200&q=80',
    county: 'Nakuru',
    verified: true,
    online: false,
    lastSeen: 'Active 2h ago',
    messages: [
      {
        id: 'm6',
        senderId: 'nakuru',
        senderName: 'Nakuru Co-op',
        text: 'We are buying Gloria F1 cabbages and Dutch Robijn potatoes for Nairobi wholesale market dispatch this Friday.',
        time: '2 days ago',
        isSelf: false,
      },
    ],
  },
];

interface MessagesPageProps {
  setCurrentPage?: (page: Page) => void;
}

export const MessagesPage: React.FC<MessagesPageProps> = ({ setCurrentPage }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string>('conv-1');
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileChatView, setIsMobileChatView] = useState(false);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'user-current',
      senderName: user?.name || 'Adams Kipkoech Kering',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSelf: true,
    };

    setConversations((list) =>
      list.map((c) => (c.id === activeConvId ? { ...c, messages: [...c.messages, newMsg] } : c))
    );
    setInputText('');

    // Simulated helpful agricultural autoreply if messaging Adams
    if (activeConvId === 'conv-1') {
      setTimeout(() => {
        const autoReply: Message = {
          id: `reply-${Date.now()}`,
          senderId: 'adams',
          senderName: 'Adams Kipkoech Kering',
          text: 'Got your update! I am checking the agronomic parameters now. You can also benchmark wholesale prices on the Price Benchmarks page.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isSelf: false,
        };
        setConversations((list) =>
          list.map((c) => (c.id === activeConvId ? { ...c, messages: [...c.messages, autoReply] } : c))
        );
      }, 1200);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputText(promptText);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contactRole.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      {/* Container Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm overflow-hidden h-[75vh] min-h-[580px] flex flex-col md:flex-row">
        {/* Left Side: Conversations List */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-stone-200 flex flex-col bg-stone-50/50 ${
            isMobileChatView ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Header */}
          <div className="p-4 border-b border-stone-200 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#183D29] text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-bold text-stone-900 text-sm font-serif">Farmer Chat</h2>
                  <p className="text-[10px] text-stone-500">Real agricultural connections</p>
                </div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search farmers, suppliers, experts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-stone-100 rounded-xl text-xs border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#183D29]"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filteredConversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isSelected = conv.id === activeConvId;

              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConvId(conv.id);
                    setIsMobileChatView(true);
                  }}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition select-none ${
                    isSelected ? 'bg-emerald-50/80 border-l-4 border-[#183D29]' : 'hover:bg-stone-100/70 bg-white'
                  }`}
                >
                  {/* Avatar with Online Dot */}
                  <div className="relative shrink-0">
                    <div className="w-11 h-11 rounded-full overflow-hidden bg-stone-200 border border-stone-200">
                      <img src={conv.contactAvatar} alt={conv.contactName} className="w-full h-full object-cover" />
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 leading-tight mb-0.5">
                      <div className="flex items-center gap-1 font-bold text-xs text-stone-900 truncate">
                        <span>{conv.contactName}</span>
                        {conv.verified && (
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 fill-emerald-600 shrink-0" />
                        )}
                      </div>
                      <span className="text-[10px] text-stone-400 whitespace-nowrap">{lastMsg?.time}</span>
                    </div>
                    <div className="text-[11px] text-emerald-800 font-medium truncate mb-1">
                      {conv.contactRole} • {conv.county}
                    </div>
                    <p className="text-xs text-stone-500 truncate">{lastMsg?.text || 'No messages yet'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window */}
        <div
          className={`flex-1 flex flex-col bg-[#FAF7F0] ${
            !isMobileChatView ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Active Contact Header */}
          <div className="p-3.5 sm:px-6 border-b border-stone-200 bg-white flex items-center justify-between shrink-0 shadow-2xs">
            <div className="flex items-center gap-3">
              {/* Mobile Back Button */}
              <button
                onClick={() => setIsMobileChatView(false)}
                className="md:hidden p-1.5 -ml-1 text-stone-600 hover:text-stone-900 rounded-lg"
                aria-label="Back to contacts list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative shrink-0">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-200 border border-stone-200">
                  <img
                    src={activeConv.contactAvatar}
                    alt={activeConv.contactName}
                    className="w-full h-full object-cover"
                  />
                </div>
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-1 font-bold text-xs sm:text-sm text-stone-900 leading-tight">
                  <span>{activeConv.contactName}</span>
                  {activeConv.verified && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  )}
                </div>
                <div className="text-[11px] text-stone-500">
                  {activeConv.contactRole} • {activeConv.county} County • {activeConv.lastSeen}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  window.open(`https://api.whatsapp.com/send?text=Hello%20from%20AgriHub`, '_blank');
                }}
                className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                title="Connect via WhatsApp"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Quick Agricultural Inquiry Chips */}
          <div className="px-4 py-2 bg-emerald-50/50 border-b border-emerald-900/10 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[11px] font-bold text-emerald-900 shrink-0">Quick Topics:</span>
            {[
              '🌱 How to control Fall Armyworm in maize?',
              '💰 What is your wholesale price per bag?',
              '🧮 Can you help calculate fertilizer bags?',
              '🚚 Do you deliver inputs to my county?',
            ].map((chip) => (
              <button
                key={chip}
                onClick={() => handleQuickPrompt(chip)}
                className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-900 rounded-full border border-emerald-200 text-[11px] whitespace-nowrap transition"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 overscroll-contain">
            {activeConv.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2.5 shadow-2xs text-xs sm:text-[13px] leading-relaxed ${
                    msg.isSelf
                      ? 'bg-[#183D29] text-white rounded-br-xs'
                      : 'bg-white text-stone-900 rounded-bl-xs border border-stone-200/80'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                <div className="flex items-center gap-1 mt-1 px-1 text-[10px] text-stone-400">
                  <span>{msg.time}</span>
                  {msg.isSelf && <CheckCheck className="w-3 h-3 text-emerald-600" />}
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Strip */}
          <div className="p-3 sm:p-4 bg-white border-t border-stone-200 shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setInputText((prev) => (prev ? `${prev} [Attached Field Photo]` : 'Inspecting this crop field leaf sample:'));
                }}
                className="p-2 text-stone-500 hover:text-[#183D29] hover:bg-stone-100 rounded-xl transition shrink-0"
                title="Attach Field Photo"
              >
                <Camera className="w-5 h-5" />
              </button>

              <input
                type="text"
                placeholder={`Message ${activeConv.contactName.split(' ')[0]}...`}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-stone-100 rounded-2xl text-xs sm:text-sm border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#183D29]"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-2xl text-white transition shrink-0 ${
                  inputText.trim() ? 'bg-[#183D29] hover:bg-[#122e1f]' : 'bg-stone-300 cursor-not-allowed'
                }`}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
