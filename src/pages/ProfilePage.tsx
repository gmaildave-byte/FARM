import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, MapPin, Award, Sprout, Phone, Mail, ShieldCheck, Settings, LogOut, Heart, MessageSquare } from 'lucide-react';

export const ProfilePage: React.FC<{ isMobileFrame?: boolean }> = ({ isMobileFrame = false }) => {
  const { user, role, setRole } = useAuth();

  return (
    <div className={`space-y-6 ${isMobileFrame ? 'pb-24 pt-2 px-1' : 'pb-16'}`}>
      <div className="flex items-center justify-between">
        <h1 className="text-[32px] sm:text-[36px] font-bold text-[#183D29] tracking-tight">
          Profile
        </h1>
        <span className="text-xs font-semibold px-2.5 py-1 bg-[#183D29]/10 text-[#183D29] rounded-full uppercase tracking-wider">
          {role}
        </span>
      </div>

      {/* User Card */}
      <div className="bg-white rounded-3xl border border-stone-200/80 p-5 space-y-4 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[#183D29] text-[#FAF7F0] flex items-center justify-center font-bold text-xl border-2 border-emerald-600/30">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <span>{user?.name?.slice(0, 2).toUpperCase() || 'SM'}</span>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <h2 className="font-bold text-stone-900 text-lg leading-tight">{user?.name || 'Sarah M.'}</h2>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-stone-500 font-medium">@{user?.username || 'sarah_m_grower'}</p>
            <div className="flex items-center gap-1 text-xs text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{user?.county || 'Nakuru'} · {user?.country || 'Kenya'}</span>
            </div>
          </div>
        </div>

        {user?.bio && (
          <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-2xl border border-stone-100">
            "{user.bio}"
          </p>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-stone-100">
          <div>
            <div className="font-bold text-stone-900 text-base">{user?.followersCount || 148}</div>
            <div className="text-[11px] text-stone-500">Followers</div>
          </div>
          <div>
            <div className="font-bold text-stone-900 text-base">{user?.followingCount || 92}</div>
            <div className="text-[11px] text-stone-500">Following</div>
          </div>
          <div>
            <div className="font-bold text-stone-900 text-base">14</div>
            <div className="text-[11px] text-stone-500">Harvests</div>
          </div>
        </div>

        {/* Farming tags */}
        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Interests & Crops</div>
          <div className="flex flex-wrap gap-1.5">
            {['Tomatoes', 'Runner Beans', 'Organic Mulch', 'Drip Irrigation', 'Kitchen Garden'].map(tag => (
              <span key={tag} className="text-xs bg-emerald-50 text-emerald-900 px-2.5 py-1 rounded-full font-medium">
                🌱 {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Role Switcher for Testing */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-4 space-y-3">
        <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wider">Role Preview</h3>
        <div className="grid grid-cols-2 gap-2">
          {(['farmer', 'buyer', 'expert', 'guest'] as const).map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition ${
                role === r
                  ? 'bg-[#183D29] text-white border-[#183D29]'
                  : 'bg-stone-50 text-stone-700 hover:bg-stone-100 border-stone-200'
              }`}
            >
              {r} Mode
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
