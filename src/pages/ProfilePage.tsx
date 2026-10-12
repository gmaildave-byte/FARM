import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  MapPin,
  Award,
  Sprout,
  Phone,
  Mail,
  ShieldCheck,
  Settings,
  LogOut,
  Heart,
  MessageSquare,
  Edit3,
  Bookmark,
  ShoppingBag,
  CheckCircle2,
  Lock,
  Download,
  AlertTriangle,
  UserCheck,
  UserPlus,
  Share2
} from 'lucide-react';
import { initialMarketplaceListings } from '../data/marketplaceListings';
import { forumPostsData } from '../data/forum';
import { kenyanCounties } from '../components/Navbar';
import { VerificationModal } from '../components/VerificationModal';
import { SubscriptionModal } from '../components/SubscriptionModal';
import { Sparkles, Zap } from 'lucide-react';

interface ProfilePageProps {
  isMobileFrame?: boolean;
  viewUsername?: string;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  isMobileFrame = false,
  viewUsername,
}) => {
  const { user, role, setRole, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState<'harvests' | 'listings' | 'edit' | 'settings'>('harvests');
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(user?.followersCount || 342);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [subscriptionModalOpen, setSubscriptionModalOpen] = useState(false);

  // Edit Form State
  const [editName, setEditName] = useState(user?.name || 'Adams Kipkoech Kering');
  const [editUsername, setEditUsername] = useState(user?.username || 'adams_kering');
  const [editFarmName, setEditFarmName] = useState(user?.farmName || 'Kering AgriTech Demonstration Farm');
  const [editCounty, setEditCounty] = useState(user?.county || 'Uasin Gishu');
  const [editPhone, setEditPhone] = useState(user?.phone || '+254 712 345 678');
  const [editBio, setEditBio] = useState(
    user?.bio || 'Agricultural engineer and farmer focused on precision crop production, drip irrigation, and agribusiness technology in Kenya.'
  );
  const [editInterests, setEditInterests] = useState(
    user?.farmingInterests?.join(', ') || 'Maize, Horticulture, Drip Irrigation, Dairy'
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleFollow = () => {
    setIsFollowing((prev) => {
      const next = !prev;
      setFollowersCount((count) => count + (next ? 1 : -1));
      showToast(next ? `Now following @${user?.username}` : `Unfollowed @${user?.username}`);
      return next;
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName.trim(),
      username: editUsername.trim().toLowerCase().replace(/\s+/g, '_'),
      farmName: editFarmName.trim(),
      county: editCounty,
      phone: editPhone.trim(),
      bio: editBio.trim(),
      farmingInterests: editInterests.split(',').map((s) => s.trim()).filter(Boolean),
    });
    showToast('Profile updated successfully!');
    setActiveTab('harvests');
  };

  const handleExportData = () => {
    const exportObject = {
      profile: user,
      role,
      exportTimestamp: new Date().toISOString(),
      platform: 'AgriKnowledge Hub',
      complianceNotice: 'Exported under Kenya Data Protection Act 2019 data portability rights.',
    };
    const blob = new Blob([JSON.stringify(exportObject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agriknowledge_profile_${user?.username || 'user'}.json`;
    a.click();
    showToast('Personal data archive downloaded.');
  };

  // User's own marketplace listings
  const userListings = initialMarketplaceListings.filter(
    (l) => l.sellerUsername === user?.username || l.sellerName === user?.name || l.sellerId === user?.id
  );

  // User's harvest posts
  const userPosts = forumPostsData.filter(
    (p) => p.authorName === user?.name || p.authorUsername === user?.username
  );

  return (
    <div className={`space-y-6 ${isMobileFrame ? 'pb-24 pt-2 px-1' : 'max-w-4xl mx-auto pb-20 pt-4 px-4'}`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#183D29] text-[#FAF7F0] text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-emerald-700 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-xs">
        {/* Cover banner */}
        <div className="h-28 sm:h-36 bg-gradient-to-r from-[#183D29] via-[#1b4332] to-[#2d6a4f] relative px-6">
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                showToast('Public profile link copied!');
              }}
              className="bg-black/20 hover:bg-black/30 text-white p-2 rounded-full backdrop-blur-xs text-xs"
              title="Share Profile Link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Details Container */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 sm:-mt-14 mb-4">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-[#183D29] text-[#FAF7F0] flex items-center justify-center font-bold text-2xl border-4 border-white shadow-md shrink-0">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                <span>{user?.name?.slice(0, 2).toUpperCase() || 'AK'}</span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('edit')}
                className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>

              <button
                onClick={handleToggleFollow}
                className={`px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1.5 transition ${
                  isFollowing
                    ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                    : 'bg-[#183D29] text-[#FAF7F0] hover:bg-[#122e1f]'
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5 text-emerald-800" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* User Bio and Identifiers */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
                {user?.name || 'Adams Kipkoech Kering'}
              </h1>
              {user?.verifiedBadge && (
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-900 text-xs font-bold px-2.5 py-0.5 rounded-full" title="Verified Agribusiness Account">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Verified
                </span>
              )}
              <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 bg-stone-100 text-stone-600 rounded-md">
                {role}
              </span>
            </div>

            <p className="text-xs text-stone-500 font-mono">@{user?.username || 'adams_kering'}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-600 pt-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-stone-400" />
                <span>{user?.county || 'Uasin Gishu'} · {user?.country || 'Kenya'}</span>
              </div>
              {user?.farmName && (
                <div className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-700" />
                  <span className="font-semibold text-stone-800">{user.farmName}</span>
                </div>
              )}
              {user?.phone && (
                <div className="flex items-center gap-1 text-stone-500">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  <span>{user.phone}</span>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed pt-2 max-w-2xl">
              {user?.bio || 'Agricultural enthusiast and grower in Kenya.'}
            </p>

            {/* Followers / Following Counter */}
            <div className="flex items-center gap-6 pt-3 text-xs border-t border-stone-100">
              <div>
                <strong className="text-stone-900 font-bold text-sm mr-1">{followersCount}</strong>
                <span className="text-stone-500">Followers</span>
              </div>
              <div>
                <strong className="text-stone-900 font-bold text-sm mr-1">{user?.followingCount || 92}</strong>
                <span className="text-stone-500">Following</span>
              </div>
              <div>
                <strong className="text-stone-900 font-bold text-sm mr-1">
                  {userPosts.length + userListings.length}
                </strong>
                <span className="text-stone-500">Contributions</span>
              </div>
            </div>

            {/* Farming Interests Chips */}
            {user?.farmingInterests && user.farmingInterests.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-1.5">
                {user.farmingInterests.map((interest) => (
                  <span
                    key={interest}
                    className="text-[11px] bg-stone-100 text-stone-700 px-2.5 py-0.5 rounded-full font-medium"
                  >
                    🌱 {interest}
                  </span>
                ))}
              </div>
            )}

            {/* Verification & Seller Subscription Status Bar */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Verification Tier Card */}
              <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">
                      {user?.verifiedBadge ? 'Level 3: Verified Account' : 'Level 2: Registered Farmer'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {user?.verifiedBadge ? 'Identity & credentials verified' : 'Standard participation active'}
                    </div>
                  </div>
                </div>
                {!user?.verifiedBadge ? (
                  <button
                    onClick={() => setVerificationModalOpen(true)}
                    className="px-3 py-1.5 bg-[#183D29] text-white rounded-xl font-bold text-[11px] hover:bg-[#122e1f] transition shrink-0"
                  >
                    Get Verified
                  </button>
                ) : (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Verified
                  </span>
                )}
              </div>

              {/* Seller Subscription Plan Card */}
              <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shrink-0">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <div className="font-bold text-stone-900">
                      {user?.subscriptionPlan === 'business'
                        ? 'Business Seller Plan'
                        : user?.subscriptionPlan === 'professional'
                        ? 'Professional Suite'
                        : 'Free Farmer Tier'}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {user?.subscriptionPlan === 'business'
                        ? '25 listings + Priority verified badge'
                        : '3 active marketplace listings'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSubscriptionModalOpen(true)}
                  className="px-3 py-1.5 bg-stone-900 text-white rounded-xl font-bold text-[11px] hover:bg-stone-800 transition shrink-0"
                >
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="flex border-t border-stone-200/70 bg-stone-50/70 px-4 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('harvests')}
            className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'harvests'
                ? 'border-[#183D29] text-[#183D29] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Harvests & Field Posts ({userPosts.length})
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'listings'
                ? 'border-[#183D29] text-[#183D29] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Marketplace Listings ({userListings.length})
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'edit'
                ? 'border-[#183D29] text-[#183D29] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Edit Profile
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 px-4 border-b-2 transition whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-[#183D29] text-[#183D29] font-bold'
                : 'border-transparent text-stone-500 hover:text-stone-900'
            }`}
          >
            Account & Privacy
          </button>
        </div>
      </div>

      {/* Tab 1: Harvests */}
      {activeTab === 'harvests' && (
        <div className="space-y-4">
          {userPosts.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-2">
              <Sprout className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">No field posts published yet.</p>
            </div>
          ) : (
            userPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-2xl border border-stone-200 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="font-semibold text-stone-800">{post.title}</span>
                  <span>{post.timestamp}</span>
                </div>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                )}
                <p className="text-xs text-stone-700 leading-relaxed">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-stone-500 border-t border-stone-100 pt-2">
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-rose-500" /> {post.likes} likes
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-stone-400" /> {post.replies.length} replies
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Listings */}
      {activeTab === 'listings' && (
        <div className="space-y-4">
          {userListings.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-stone-200 text-center space-y-2">
              <ShoppingBag className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-xs text-stone-500">No marketplace listings posted by this account yet.</p>
            </div>
          ) : (
            userListings.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-start gap-4">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full sm:w-32 h-28 object-cover rounded-xl shrink-0"
                />
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#183D29] uppercase">{item.category}</span>
                    <span className="text-xs font-bold text-stone-900">KES {item.priceKES.toLocaleString()}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">{item.title}</h4>
                  <p className="text-xs text-stone-600 line-clamp-2">{item.description}</p>
                  <div className="text-[11px] text-stone-400 pt-1">
                    Posted on {item.createdAt} · {item.savesCount} bookmarks
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Edit Profile */}
      {activeTab === 'edit' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-4 shadow-xs">
          <h3 className="font-bold text-stone-900 text-base">Edit Account & Farm Profile</h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Display Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Username (URL handle)</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Farm / Agribusiness Name</label>
                <input
                  type="text"
                  value={editFarmName}
                  onChange={(e) => setEditFarmName(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">County Location</label>
                <select
                  value={editCounty}
                  onChange={(e) => setEditCounty(e.target.value)}
                  className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
                >
                  {kenyanCounties.filter((c) => !c.includes('National')).map((c) => (
                    <option key={c} value={c}>
                      {c} County
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Bio / Farming Summary</label>
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={3}
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Farming Interests & Specialties (comma-separated)
              </label>
              <input
                type="text"
                value={editInterests}
                onChange={(e) => setEditInterests(e.target.value)}
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-2 focus:ring-[#183D29]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('harvests')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f] transition"
              >
                Save Profile Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 4: Account & Privacy */}
      {activeTab === 'settings' && (
        <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-6 shadow-xs">
          <div>
            <h3 className="font-bold text-stone-900 text-base">Account Security & Privacy Settings</h3>
            <p className="text-xs text-stone-500">
              Manage your agricultural data, role permissions, and privacy in compliance with Kenya DPA 2019.
            </p>
          </div>

          {/* Role Switcher */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-3">
            <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">Active Role Simulation</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(['farmer', 'buyer', 'expert', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    showToast(`Switched active role to ${r}.`);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition ${
                    role === r
                      ? 'bg-[#183D29] text-white border-[#183D29]'
                      : 'bg-white text-stone-700 hover:bg-stone-100 border-stone-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Data Export Rights */}
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-900/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-stone-900 text-xs">
                <Lock className="w-4 h-4 text-emerald-700" />
                <span>Data Portability & Records Export (Kenya DPA 2019)</span>
              </div>
              <p className="text-xs text-stone-600">
                Download a complete, machine-readable copy of your personal profile, registered farm parcels, and activity records.
              </p>
            </div>
            <button
              onClick={handleExportData}
              className="px-4 py-2 bg-[#183D29] text-white text-xs font-semibold rounded-xl hover:bg-[#122e1f] transition flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Archive</span>
            </button>
          </div>
        </div>
      )}

      {/* Verification Modal */}
      {verificationModalOpen && (
        <VerificationModal
          isOpen={verificationModalOpen}
          onClose={() => setVerificationModalOpen(false)}
          currentUser={{
            id: user?.id || 'user-current',
            name: user?.name || 'Adams Kipkoech Kering',
            email: user?.email || 'adams@agriknowledge.co.ke',
            county: user?.county || 'Uasin Gishu',
          }}
          onApplicationSubmitted={(app) => {
            updateProfile({ verifiedBadge: true });
            showToast('Verification application submitted! We will review within 24-48 hours.');
            setVerificationModalOpen(false);
          }}
        />
      )}

      {/* Subscription Modal */}
      {subscriptionModalOpen && (
        <SubscriptionModal
          isOpen={subscriptionModalOpen}
          onClose={() => setSubscriptionModalOpen(false)}
          currentPlan="free"
          onPlanUpgraded={(plan) => {
            updateProfile({ subscriptionPlan: plan, verifiedBadge: true });
            showToast(`Upgraded to ${plan.toUpperCase()} plan!`);
            setSubscriptionModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
