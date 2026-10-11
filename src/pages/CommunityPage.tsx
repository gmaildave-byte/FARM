import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Plus,
  Send,
  Share2,
  Bookmark,
  Flag,
  X,
  Camera,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { forumPostsData } from '../data/forum';
import { ForumPost } from '../types';
import { useAuth } from '../context/AuthContext';

interface CommunityPageProps {
  isMobileFrame?: boolean;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ isMobileFrame = false }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>(forumPostsData);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // New post modal state
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [postCaption, setPostCaption] = useState('');
  const [postImage, setPostImage] = useState(
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80'
  );
  const [postLocation, setPostLocation] = useState('Nakuru Highlands');

  const handleToggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const currentlyLiked = !prev[postId];
      setPosts(currentList =>
        currentList.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              likes: currentlyLiked ? p.likes + 1 : Math.max(0, p.likes - 1)
            };
          }
          return p;
        })
      );
      return { ...prev, [postId]: currentlyLiked };
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;

    setPosts(currentList =>
      currentList.map(p => {
        if (p.id === postId) {
          const newReply = {
            id: `rep-${Date.now()}`,
            author: user?.name || 'Sarah M.',
            authorRole: 'Grower',
            text: newCommentText.trim(),
            timestamp: 'Just now'
          };
          return {
            ...p,
            commentsCount: (p.commentsCount || p.replies.length) + 1,
            replies: [...p.replies, newReply]
          };
        }
        return p;
      })
    );
    setNewCommentText('');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postCaption.trim()) return;

    const initials = user?.name
      ? user.name
          .split(' ')
          .map(n => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'SM';

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorName: user?.name || 'Sarah M.',
      authorInitials: initials,
      authorRole: 'Community Grower',
      location: postLocation,
      county: user?.county || 'Nakuru',
      category: 'Crops',
      title: postCaption,
      content: postCaption,
      image: postImage || undefined,
      timestamp: 'Just now',
      likes: 1,
      commentsCount: 0,
      tags: ['Harvest', 'Garden', 'Farming'],
      replies: []
    };

    setPosts([newPost, ...posts]);
    setIsNewPostOpen(false);
    setPostCaption('');
    setShareToast('Harvest shared with the community! 🌱');
    setTimeout(() => setShareToast(null), 3000);
  };

  return (
    <div className={`w-full max-w-xl mx-auto ${isMobileFrame ? 'pb-24 pt-1 px-3 sm:px-4' : 'pb-20 pt-4 px-4'}`}>
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#183D29] text-[#FAF7F0] text-xs font-semibold px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Header matching screenshot */}
      <div className="flex items-center justify-between pt-1 pb-4">
        <h1 className="text-[32px] sm:text-[34px] font-bold text-[#183D29] tracking-tight font-serif select-none">
          Community
        </h1>

        <button
          onClick={() => setIsNewPostOpen(true)}
          className="flex items-center gap-1 text-xs font-semibold text-[#183D29] bg-[#183D29]/10 hover:bg-[#183D29]/15 px-3 py-1.5 rounded-full transition"
          title="Share your harvest"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Share</span>
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {posts.map((post) => {
          const isLiked = likedPosts[post.id];
          const hasImage = Boolean(post.image);
          const commentsOpen = activeCommentPostId === post.id;
          const displayCommentsCount = post.commentsCount ?? post.replies.length;

          return (
            <article
              key={post.id}
              className="bg-transparent space-y-3 pt-1 border-b border-stone-200/50 pb-6 last:border-b-0"
            >
              {/* Author & Meta Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar Circle matching the screenshot's SM / TH badges */}
                  <div className="w-10 h-10 rounded-full bg-[#183D29] text-[#FAF7F0] font-semibold text-sm flex items-center justify-center shrink-0 tracking-wide select-none shadow-xs">
                    {post.authorInitials || post.authorName.slice(0, 2).toUpperCase()}
                  </div>

                  <div className="flex items-center text-[14.5px] sm:text-[15px] leading-tight text-stone-600 flex-wrap">
                    <span className="font-bold text-stone-900 tracking-tight mr-1.5">
                      {post.authorName}
                    </span>
                    <span className="text-stone-400 mr-1.5 select-none">·</span>
                    <span className="text-stone-500 mr-1.5">
                      {post.location || `${post.county} County`}
                    </span>
                    <span className="text-stone-400 mr-1.5 select-none">·</span>
                    <span className="text-stone-400 text-sm">
                      {post.timestamp}
                    </span>
                  </div>
                </div>

                {/* More vertical options */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setActiveMenuPostId(activeMenuPostId === post.id ? null : post.id)
                    }
                    className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition"
                    aria-label="More options"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeMenuPostId === post.id && (
                    <div className="absolute right-0 top-8 z-30 w-44 bg-white rounded-2xl shadow-xl border border-stone-200/80 py-1.5 text-xs font-medium text-stone-700 animate-in fade-in zoom-in-95">
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(window.location.href);
                          setActiveMenuPostId(null);
                          setShareToast('Link copied to clipboard!');
                          setTimeout(() => setShareToast(null), 2500);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-stone-50 flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4 text-stone-500" />
                        <span>Share Harvest</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuPostId(null);
                          setShareToast('Saved to your farm bookmarks!');
                          setTimeout(() => setShareToast(null), 2500);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-stone-50 flex items-center gap-2"
                      >
                        <Bookmark className="w-4 h-4 text-stone-500" />
                        <span>Save Post</span>
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuPostId(null);
                          alert('Post reported for moderator review.');
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-stone-100"
                      >
                        <Flag className="w-4 h-4 text-red-500" />
                        <span>Report</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Post Caption / Content */}
              <p className="text-[15.5px] sm:text-[16.5px] text-stone-900 leading-snug tracking-tight font-normal">
                {post.content || post.title}
              </p>

              {/* Post Photo (e.g. basket of fresh red ripe tomatoes) */}
              {hasImage && (
                <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xs bg-stone-100 mt-2">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-auto max-h-[460px] object-cover block select-none transition duration-300 hover:scale-[1.01]"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Interaction Bar matching the screenshot */}
              <div className="flex items-center gap-5 pt-1 text-stone-700">
                {/* Heart / Like Button */}
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className="flex items-center gap-1.5 group transition active:scale-95"
                  aria-label="Like post"
                >
                  <Heart
                    className={`w-6 h-6 transition-all duration-200 stroke-[1.7] ${
                      isLiked
                        ? 'fill-rose-500 text-rose-500 scale-110'
                        : 'text-stone-700 group-hover:text-rose-600'
                    }`}
                  />
                  <span
                    className={`text-[15px] font-medium tracking-tight ${
                      isLiked ? 'text-rose-600 font-semibold' : 'text-stone-800'
                    }`}
                  >
                    {post.likes}
                  </span>
                </button>

                {/* Comment / Reply Button */}
                <button
                  onClick={() =>
                    setActiveCommentPostId(commentsOpen ? null : post.id)
                  }
                  className="flex items-center gap-1.5 group transition active:scale-95 text-stone-700 hover:text-stone-950"
                  aria-label="View comments"
                >
                  <MessageCircle className="w-6 h-6 stroke-[1.7] text-stone-700 group-hover:text-stone-900" />
                  <span className="text-[15px] font-medium text-stone-800">
                    {displayCommentsCount}
                  </span>
                </button>
              </div>

              {/* Expandable Comments Drawer */}
              {commentsOpen && (
                <div className="mt-3 bg-stone-100/70 rounded-2xl p-3.5 space-y-3 border border-stone-200/60 animate-in fade-in duration-200">
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {post.replies.length === 0 ? (
                      <p className="text-xs text-stone-500 italic py-1">
                        No comments yet. Be the first to reply!
                      </p>
                    ) : (
                      post.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className="text-xs bg-white p-2.5 rounded-xl border border-stone-200/50 space-y-1 shadow-2xs"
                        >
                          <div className="flex items-center justify-between text-stone-500">
                            <span className="font-bold text-stone-800">
                              {reply.author}
                            </span>
                            <span className="text-[10px] text-stone-400">
                              {reply.timestamp}
                            </span>
                          </div>
                          <p className="text-stone-700 text-[13px] leading-relaxed">
                            {reply.text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add comment input */}
                  <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 px-3 py-2 bg-white rounded-xl text-xs border border-stone-200 focus:outline-none focus:ring-1 focus:ring-[#183D29]"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 bg-[#183D29] text-white rounded-xl hover:bg-[#122e1f] transition active:scale-95"
                      title="Send comment"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* New Post Modal */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] w-full max-w-md rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#183D29]" />
                <h2 className="font-bold text-stone-900 text-base">Share with Community</h2>
              </div>
              <button
                onClick={() => setIsNewPostOpen(false)}
                className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  What did you harvest or grow today?
                </label>
                <textarea
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="e.g. First tomato harvest of the season! 🍅"
                  rows={3}
                  required
                  className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Location / Allotment / County
                </label>
                <input
                  type="text"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  placeholder="e.g. Bristol Leighwoods or Nakuru"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Photo (Select sample or paste URL)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    {
                      label: 'Fresh Tomatoes 🍅',
                      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80'
                    },
                    {
                      label: 'Bean Seedlings 🌱',
                      url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80'
                    },
                    {
                      label: 'Golden Maize 🌽',
                      url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80'
                    }
                  ].map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      onClick={() => setPostImage(preset.url)}
                      className={`text-[11px] p-2 rounded-xl border text-center font-medium transition ${
                        postImage === preset.url
                          ? 'border-[#183D29] bg-[#183D29]/10 text-[#183D29] font-bold'
                          : 'border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewPostOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-200/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#183D29] text-[#FAF7F0] rounded-xl text-xs font-bold hover:bg-[#122e1f] transition shadow-xs"
                >
                  Post to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
