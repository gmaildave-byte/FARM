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
  Sparkles,
  ShieldCheck,
  UserPlus,
  UserCheck,
  Filter,
  Info,
  Trash2,
  Edit2,
  CornerDownRight,
  Play
} from 'lucide-react';
import { forumPostsData } from '../data/forum';
import { ForumPost, ReportItem } from '../types';
import { useAuth } from '../context/AuthContext';
import { kenyanCounties } from '../components/Navbar';
import { ShareSheetModal } from '../components/ShareSheetModal';
import { ReportModal } from '../components/ReportModal';
import { AgriStoriesBar } from '../components/AgriStoriesBar';
import { AgriReelsFeed } from '../components/AgriReelsFeed';

interface CommunityPageProps {
  isMobileFrame?: boolean;
  onNavigateToProfile?: (username: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({
  isMobileFrame = false,
  onNavigateToProfile,
}) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>(forumPostsData);
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Record<string, boolean>>({});
  const [followedAuthors, setFollowedAuthors] = useState<Record<string, boolean>>({
    'Sarah M.': true,
    'Erick K.': false,
    'Ann M.': true,
  });

  // Mode: discussions vs reels
  const [communityMode, setCommunityMode] = useState<'feed' | 'reels'>('feed');

  // Feed tabs: latest, following, relevant, saved
  const [activeFeedTab, setActiveFeedTab] = useState<'latest' | 'following' | 'relevant' | 'saved'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [replyingToTarget, setReplyingToTarget] = useState<{
    postId: string;
    commentId: string;
    authorName: string;
  } | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [activeMenuPostId, setActiveMenuPostId] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  // New post modal state
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [postCaption, setPostCaption] = useState('');
  const [postCategory, setPostCategory] = useState<ForumPost['category']>('Crops');
  const [postCounty, setPostCounty] = useState('Nakuru');
  const [postImage, setPostImage] = useState(
    'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80'
  );
  const [postLocation, setPostLocation] = useState('Nakuru Highlands');
  const [activeSharePost, setActiveSharePost] = useState<ForumPost | null>(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);

  const handleCustomImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUploadedImagePreview(result);
        setPostImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Report Modal
  const [reportingPost, setReportingPost] = useState<ForumPost | null>(null);
  const [reportReason, setReportReason] = useState<ReportItem['reason']>('unrelated');
  const [reportNote, setReportNote] = useState('');

  // Editing Modal
  const [editingPost, setEditingPost] = useState<ForumPost | null>(null);
  const [editContent, setEditContent] = useState('');

  const showToast = (msg: string) => {
    setShareToast(msg);
    setTimeout(() => setShareToast(null), 3000);
  };

  const handleToggleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const currentlyLiked = !prev[postId];
      setPosts((currentList) =>
        currentList.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              likes: currentlyLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
            };
          }
          return p;
        })
      );
      return { ...prev, [postId]: currentlyLiked };
    });
  };

  const handleToggleBookmark = (postId: string) => {
    setBookmarkedPosts((prev) => {
      const isBookmarked = !prev[postId];
      showToast(isBookmarked ? 'Post saved to your bookmarks' : 'Post removed from bookmarks');
      return { ...prev, [postId]: isBookmarked };
    });
    setActiveMenuPostId(null);
  };

  const handleToggleFollow = (authorName: string) => {
    setFollowedAuthors((prev) => {
      const isFollowed = !prev[authorName];
      showToast(isFollowed ? `Now following ${authorName}` : `Unfollowed ${authorName}`);
      return { ...prev, [authorName]: isFollowed };
    });
  };

  const handleAddComment = (postId: string) => {
    if (!newCommentText.trim()) return;

    setPosts((currentList) =>
      currentList.map((p) => {
        if (p.id === postId) {
          const isThreadedReply = replyingToTarget && replyingToTarget.postId === postId;
          const newReply = {
            id: `rep-${Date.now()}`,
            parentCommentId: isThreadedReply ? replyingToTarget.commentId : undefined,
            replyToAuthor: isThreadedReply ? replyingToTarget.authorName : undefined,
            author: user?.name || 'Adams Kipkoech Kering',
            authorUsername: user?.username || 'adams_kering',
            authorRole: 'Grower & Contributor',
            text: newCommentText.trim(),
            timestamp: 'Just now',
          };
          return {
            ...p,
            commentsCount: (p.commentsCount || p.replies.length) + 1,
            replies: [...p.replies, newReply],
          };
        }
        return p;
      })
    );
    setNewCommentText('');
    setReplyingToTarget(null);
    showToast('Reply added to discussion thread!');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postCaption.trim()) return;

    const initials = user?.name
      ? user.name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'AD';

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      authorId: user?.id || 'user-current',
      authorName: user?.name || 'Adams Kipkoech Kering',
      authorUsername: user?.username || 'adams_kering',
      authorInitials: initials,
      authorRole: 'Community Farmer & Tech Lead',
      location: postLocation,
      county: postCounty,
      category: postCategory,
      title: postCaption,
      content: postCaption,
      image: postImage || undefined,
      timestamp: 'Just now',
      likes: 1,
      commentsCount: 0,
      tags: ['Agriculture', postCategory, postCounty],
      replies: [],
    };

    setPosts([newPost, ...posts]);
    setIsNewPostOpen(false);
    setPostCaption('');
    showToast('Your agricultural update has been shared! 🌱');
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
      setActiveMenuPostId(null);
      showToast('Post removed successfully.');
    }
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost || !editContent.trim()) return;

    setPosts((prev) =>
      prev.map((p) => (p.id === editingPost.id ? { ...p, content: editContent.trim(), title: editContent.trim() } : p))
    );
    setEditingPost(null);
    showToast('Post updated successfully.');
  };

  const handleReportPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingPost) return;

    const report: ReportItem = {
      id: `rep-${Date.now()}`,
      targetType: 'post',
      targetId: reportingPost.id,
      targetTitle: reportingPost.content.slice(0, 60),
      reportedBy: user?.name || 'Anonymous User',
      reason: reportReason,
      details: reportNote.trim(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    const existing = JSON.parse(localStorage.getItem('agri_moderation_reports') || '[]');
    localStorage.setItem('agri_moderation_reports', JSON.stringify([report, ...existing]));

    setReportingPost(null);
    setReportNote('');
    showToast('Thank you. Post submitted to moderation review queue.');
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCat = selectedCategory === 'all' || post.category.toLowerCase().includes(selectedCategory.toLowerCase());

    if (activeFeedTab === 'following') {
      return matchesCat && Boolean(followedAuthors[post.authorName]);
    }
    if (activeFeedTab === 'saved') {
      return matchesCat && Boolean(bookmarkedPosts[post.id]);
    }
    if (activeFeedTab === 'relevant') {
      return matchesCat && post.likes >= 20;
    }
    return matchesCat;
  });

  return (
    <div className={`w-full ${isMobileFrame ? 'max-w-xl mx-auto pb-24 pt-1 px-3 sm:px-4' : 'max-w-4xl mx-auto pb-20 pt-4 px-4 sm:px-6'}`}>
      {/* Toast Notification */}
      {shareToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#183D29] text-[#FAF7F0] text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 border border-emerald-700 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{shareToast}</span>
        </div>
      )}

      {/* Header matching brand identity */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 pb-3 border-b border-stone-200/80">
        <div>
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[#183D29] tracking-tight font-serif select-none leading-none">
            Agricultural Community & Media
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Verified field updates, farming stories, short reels, and agronomic Q&A across Kenya
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Discussions vs Reels View Switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200/60 text-xs">
            <button
              onClick={() => setCommunityMode('feed')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                communityMode === 'feed'
                  ? 'bg-white text-[#183D29] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-700" />
              <span>Discussions</span>
            </button>
            <button
              onClick={() => setCommunityMode('reels')}
              className={`px-3 py-1.5 rounded-lg font-bold transition flex items-center gap-1.5 ${
                communityMode === 'reels'
                  ? 'bg-[#183D29] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>AgriReels</span>
            </button>
          </div>

          <button
            onClick={() => setIsNewPostOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-white bg-[#183D29] hover:bg-[#122e1f] px-3.5 py-2 rounded-xl transition shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">Share Post</span>
          </button>
        </div>
      </div>

      {/* 24hr Field Stories Bar (Instagram Style) */}
      <div className="my-3">
        <AgriStoriesBar />
      </div>

      {/* If AgriReels mode is selected, show AgriReelsFeed */}
      {communityMode === 'reels' ? (
        <div className="pt-2">
          <AgriReelsFeed />
        </div>
      ) : (
        <>

      {/* Feed Filters Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-stone-200/60 text-xs">
        {/* Main Feed Tabs */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveFeedTab('latest')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeFeedTab === 'latest' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Latest Feed
          </button>
          <button
            onClick={() => setActiveFeedTab('following')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeFeedTab === 'following' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Following
          </button>
          <button
            onClick={() => setActiveFeedTab('relevant')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeFeedTab === 'relevant' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Top Relevant
          </button>
          <button
            onClick={() => setActiveFeedTab('saved')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeFeedTab === 'saved' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Saved ({Object.values(bookmarkedPosts).filter(Boolean).length})
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {['all', 'Crops', 'Dairy & Livestock', 'Soil & Fertilizers'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#183D29] text-white font-semibold'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' ? 'All Topics' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Community Guidelines Banner */}
      <div className="my-3 p-3 bg-emerald-50/70 border border-emerald-900/15 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>
            <strong>Agriculture-Only Community:</strong> Share real harvests, pest alerts, and agronomy advice. Non-agricultural commercial spam is strictly moderated.
          </span>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-6 pt-2">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-stone-200 p-10 text-center space-y-2">
            <MessageCircle className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-sm">No discussions in this feed</h3>
            <p className="text-xs text-stone-500">
              {activeFeedTab === 'following'
                ? 'You are not following any authors who posted in this category yet. Follow authors to see their updates here.'
                : 'No posts matching the selected filter. Share your own update!'}
            </p>
            <button
              onClick={() => {
                setActiveFeedTab('latest');
                setSelectedCategory('all');
              }}
              className="mt-2 px-4 py-2 bg-[#183D29] text-white rounded-xl text-xs font-semibold"
            >
              View All Latest Posts
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isLiked = likedPosts[post.id];
            const isBookmarked = bookmarkedPosts[post.id];
            const isFollowed = followedAuthors[post.authorName];
            const isAuthor = user?.name === post.authorName;
            const hasImage = Boolean(post.image);
            const commentsOpen = activeCommentPostId === post.id;
            const displayCommentsCount = post.commentsCount ?? post.replies.length;

            return (
              <article
                key={post.id}
                className="bg-transparent space-y-3 pt-1 border-b border-stone-200/50 pb-6 last:border-b-0"
              >
                {/* Author & Meta Row matching screenshot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Initials Avatar Circle */}
                    <div className="w-10 h-10 rounded-full bg-[#183D29] text-[#FAF7F0] font-semibold text-sm flex items-center justify-center shrink-0 tracking-wide select-none shadow-xs">
                      {post.authorInitials || post.authorName.slice(0, 2).toUpperCase()}
                    </div>

                    <div className="flex items-center text-[14.5px] sm:text-[15px] leading-tight text-stone-600 flex-wrap">
                      <button
                        onClick={() => onNavigateToProfile?.(post.authorUsername || 'sarah_m')}
                        className="font-bold text-stone-900 tracking-tight mr-1.5 hover:underline text-left"
                      >
                        {post.authorName}
                      </button>
                      <span className="text-stone-400 mr-1.5 select-none">·</span>
                      <span className="text-stone-500 mr-1.5">
                        {post.location || `${post.county} County`}
                      </span>
                      <span className="text-stone-400 mr-1.5 select-none">·</span>
                      <span className="text-stone-400 text-sm">{post.timestamp}</span>
                    </div>
                  </div>

                  {/* Actions / Follow / More */}
                  <div className="flex items-center gap-1">
                    {!isAuthor && (
                      <button
                        onClick={() => handleToggleFollow(post.authorName)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full transition flex items-center gap-1 ${
                          isFollowed
                            ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                            : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        }`}
                        title={isFollowed ? 'Unfollow' : 'Follow author'}
                      >
                        {isFollowed ? (
                          <>
                            <UserCheck className="w-3 h-3 text-emerald-700" />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3 h-3 text-emerald-700" />
                            <span>Follow</span>
                          </>
                        )}
                      </button>
                    )}

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
                        <div className="absolute right-0 top-8 z-30 w-48 bg-white rounded-2xl shadow-xl border border-stone-200/80 py-1.5 text-xs font-medium text-stone-700 animate-in fade-in zoom-in-95">
                          <button
                            onClick={() => {
                              navigator.clipboard?.writeText(window.location.href);
                              setActiveMenuPostId(null);
                              showToast('Link copied to clipboard!');
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-stone-50 flex items-center gap-2"
                          >
                            <Share2 className="w-4 h-4 text-stone-500" />
                            <span>Share Post Link</span>
                          </button>

                          <button
                            onClick={() => handleToggleBookmark(post.id)}
                            className="w-full px-3 py-2 text-left hover:bg-stone-50 flex items-center gap-2"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-emerald-800 text-emerald-800' : 'text-stone-500'}`} />
                            <span>{isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}</span>
                          </button>

                          {isAuthor && (
                            <>
                              <button
                                onClick={() => {
                                  setEditingPost(post);
                                  setEditContent(post.content);
                                  setActiveMenuPostId(null);
                                }}
                                className="w-full px-3 py-2 text-left hover:bg-stone-50 flex items-center gap-2 border-t border-stone-100"
                              >
                                <Edit2 className="w-4 h-4 text-stone-500" />
                                <span>Edit Post</span>
                              </button>
                              <button
                                onClick={() => handleDeletePost(post.id)}
                                className="w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4 text-red-500" />
                                <span>Delete Post</span>
                              </button>
                            </>
                          )}

                          <button
                            onClick={() => {
                              setReportingPost(post);
                              setActiveMenuPostId(null);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-2 border-t border-stone-100"
                          >
                            <Flag className="w-4 h-4 text-red-500" />
                            <span>Report to Moderators</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Post Caption / Content */}
                <p className="text-[15.5px] sm:text-[16.5px] text-stone-900 leading-snug tracking-tight font-normal whitespace-pre-line">
                  {post.content || post.title}
                </p>

                {/* Post Photo */}
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

                {/* Interaction Bar matching screenshot */}
                <div className="flex items-center gap-6 pt-1 text-stone-700">
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

                  {/* Share Button */}
                  <button
                    onClick={() => setActiveSharePost(post)}
                    className="flex items-center gap-1.5 group transition active:scale-95 text-stone-700 hover:text-stone-950"
                    aria-label="Share post"
                  >
                    <Share2 className="w-5 h-5 stroke-[1.8] text-stone-700 group-hover:text-[#183D29]" />
                    <span className="text-[13.5px] font-medium text-stone-700">
                      Share
                    </span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleToggleBookmark(post.id)}
                    className="flex items-center gap-1.5 text-stone-700 hover:text-[#183D29] transition ml-auto"
                    title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${isBookmarked ? 'fill-emerald-800 text-[#183D29]' : 'text-stone-400'}`}
                    />
                  </button>
                </div>

                {/* Expandable Comments Drawer with Threaded Replies */}
                {commentsOpen && (
                  <div className="mt-3 bg-stone-100/70 rounded-2xl p-3.5 space-y-3 border border-stone-200/60 animate-in fade-in duration-200">
                    <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                      {post.replies.length === 0 ? (
                        <p className="text-xs text-stone-500 italic py-1">
                          No replies yet. Be the first to share your experience or ask an agronomy question!
                        </p>
                      ) : (
                        post.replies
                          .filter((r) => !r.parentCommentId)
                          .map((reply) => {
                            const childReplies = post.replies.filter((r) => r.parentCommentId === reply.id);

                            return (
                              <div
                                key={reply.id}
                                className="text-xs bg-white p-3 rounded-xl border border-stone-200/60 space-y-1.5 shadow-2xs"
                              >
                                <div className="flex items-center justify-between text-stone-500">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-stone-900">{reply.author}</span>
                                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded font-medium">
                                      {reply.authorRole || 'Farmer'}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-stone-400">{reply.timestamp}</span>
                                </div>
                                <p className="text-stone-700 text-[13px] leading-relaxed">{reply.text}</p>

                                <div className="flex items-center gap-3 pt-0.5">
                                  <button
                                    onClick={() =>
                                      setReplyingToTarget({
                                        postId: post.id,
                                        commentId: reply.id,
                                        authorName: reply.author,
                                      })
                                    }
                                    className="flex items-center gap-1 text-[11px] text-emerald-800 font-semibold hover:underline"
                                  >
                                    <CornerDownRight className="w-3 h-3 text-emerald-700" />
                                    <span>Reply</span>
                                  </button>
                                </div>

                                {/* Threaded Replies Indented Under Parent Comment */}
                                {childReplies.length > 0 && (
                                  <div className="border-l-2 border-emerald-600/40 pl-3 ml-2 mt-2 space-y-2">
                                    {childReplies.map((child) => (
                                      <div
                                        key={child.id}
                                        className="text-xs bg-stone-50 p-2.5 rounded-lg border border-stone-200/70 space-y-1"
                                      >
                                        <div className="flex items-center justify-between text-stone-500">
                                          <div className="flex items-center gap-1.5 font-bold text-stone-900">
                                            <span>{child.author}</span>
                                            <span className="text-[10px] text-stone-400 font-normal">replied to</span>
                                            <span className="text-emerald-700 text-[11px]">
                                              @{child.replyToAuthor || reply.author}
                                            </span>
                                          </div>
                                          <span className="text-[10px] text-stone-400">{child.timestamp}</span>
                                        </div>
                                        <p className="text-stone-700 text-[12.5px] leading-relaxed">{child.text}</p>
                                        <button
                                          onClick={() =>
                                            setReplyingToTarget({
                                              postId: post.id,
                                              commentId: reply.id,
                                              authorName: child.author,
                                            })
                                          }
                                          className="flex items-center gap-1 text-[10px] text-emerald-800 font-semibold hover:underline"
                                        >
                                          <CornerDownRight className="w-2.5 h-2.5" />
                                          <span>Reply</span>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })
                      )}
                    </div>

                    {/* Active Replying To Target Notification */}
                    {replyingToTarget && replyingToTarget.postId === post.id && (
                      <div className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 rounded-xl text-xs text-emerald-950 border border-emerald-200 animate-in fade-in">
                        <div className="flex items-center gap-1.5">
                          <CornerDownRight className="w-3.5 h-3.5 text-emerald-700" />
                          <span>
                            Replying to <strong>@{replyingToTarget.authorName}</strong>
                          </span>
                        </div>
                        <button
                          onClick={() => setReplyingToTarget(null)}
                          className="text-stone-400 hover:text-stone-700 p-0.5"
                          title="Cancel reply"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {/* Add comment input */}
                    <div className="flex items-center gap-2 pt-1 border-t border-stone-200/60">
                      <input
                        type="text"
                        placeholder={
                          replyingToTarget && replyingToTarget.postId === post.id
                            ? `Write reply to @${replyingToTarget.authorName}...`
                            : 'Write an agronomic answer or comment...'
                        }
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
          })
        )}
      </div>
      </>
      )}

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-bold text-stone-900 text-base">Edit Post</h3>
              <button onClick={() => setEditingPost(null)} className="p-1 rounded-full text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEdit} className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={4}
                required
                className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:ring-2 focus:ring-[#183D29]"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPost(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#183D29] text-white rounded-xl text-xs font-bold hover:bg-[#122e1f]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportingPost && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-600" />
                <h3 className="font-bold text-stone-900 text-base">Report Post to Moderators</h3>
              </div>
              <button onClick={() => setReportingPost(null)} className="p-1 rounded-full text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReportPost} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Reason</label>
                <select
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value as ReportItem['reason'])}
                  className="w-full py-2 px-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                >
                  <option value="unrelated">Non-agricultural or off-topic content</option>
                  <option value="spam">Commercial spam or automated posting</option>
                  <option value="misleading_claim">Misleading or dangerous chemical/agronomy claim</option>
                  <option value="scam">Fraudulent seed or livestock listing</option>
                  <option value="harassment">Harassment or abusive language</option>
                  <option value="prohibited_goods">Banned or unregistered agrochemical</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Explanation</label>
                <textarea
                  value={reportNote}
                  onChange={(e) => setReportNote(e.target.value)}
                  placeholder="Provide context for our agricultural moderation team..."
                  rows={3}
                  required
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReportingPost(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700"
                >
                  Submit to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Post Modal */}
      {isNewPostOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F0] w-full max-w-md rounded-3xl p-5 shadow-2xl border border-stone-200 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#183D29]" />
                <h2 className="font-bold text-stone-900 text-base">Share Agricultural Update</h2>
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
                  What did you harvest, plant, or observe in the field today?
                </label>
                <textarea
                  value={postCaption}
                  onChange={(e) => setPostCaption(e.target.value)}
                  placeholder="e.g. First tomato harvest of the season! Yielded 14 crates of Anna F1 under drip irrigation 🍅"
                  rows={3}
                  required
                  className="w-full p-3 bg-white border border-stone-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as ForumPost['category'])}
                    className="w-full py-2 px-3 bg-white border border-stone-200 rounded-xl text-xs"
                  >
                    <option value="Crops">Crops & Horticulture</option>
                    <option value="Dairy & Livestock">Dairy & Livestock</option>
                    <option value="Soil & Fertilizers">Soil & Fertilizers</option>
                    <option value="Markets & Prices">Markets & Prices</option>
                    <option value="General Farming">General Farming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">County</label>
                  <select
                    value={postCounty}
                    onChange={(e) => setPostCounty(e.target.value)}
                    className="w-full py-2 px-3 bg-white border border-stone-200 rounded-xl text-xs"
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
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Location / Sub-County
                </label>
                <input
                  type="text"
                  value={postLocation}
                  onChange={(e) => setPostLocation(e.target.value)}
                  placeholder="e.g. Rongai, Nakuru or Eldoret Central"
                  className="w-full px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#183D29]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Upload Farm Photo or Choose Sample
                </label>
                
                {/* File Upload Selector */}
                <div className="mb-2">
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-2xl bg-white cursor-pointer transition text-xs font-semibold text-stone-700">
                    <Camera className="w-4 h-4 text-emerald-800" />
                    <span>Upload photo from your device / camera</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCustomImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Uploaded Preview or Presets */}
                {uploadedImagePreview ? (
                  <div className="relative rounded-2xl overflow-hidden h-36 bg-stone-100 border border-stone-200">
                    <img
                      src={uploadedImagePreview}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedImagePreview(null);
                        setPostImage('');
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-stone-900/70 text-white text-xs"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        label: 'Fresh Tomatoes 🍅',
                        url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=1000&q=80',
                      },
                      {
                        label: 'Runner Beans 🌱',
                        url: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80',
                      },
                      {
                        label: 'Golden Maize 🌽',
                        url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=1000&q=80',
                      },
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
                )}
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
                  className="px-5 py-2.5 bg-[#183D29] text-[#FAF7F0] rounded-xl text-xs font-bold hover:bg-[#122e1f] transition shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Field Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Sheet Modal */}
      {activeSharePost && (
        <ShareSheetModal
          isOpen={Boolean(activeSharePost)}
          onClose={() => setActiveSharePost(null)}
          post={{
            id: activeSharePost.id,
            title: activeSharePost.title,
            authorName: activeSharePost.authorName,
            content: activeSharePost.content,
            county: activeSharePost.county,
          }}
        />
      )}

      {/* Report Modal */}
      {reportingPost && (
        <ReportModal
          isOpen={Boolean(reportingPost)}
          onClose={() => setReportingPost(null)}
          targetType="post"
          targetId={reportingPost.id}
          targetTitle={reportingPost.content.slice(0, 60)}
        />
      )}
    </div>
  );
};

