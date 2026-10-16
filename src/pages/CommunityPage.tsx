import React, { useState, useRef } from 'react';
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
  Play,
  ChevronDown,
  ChevronUp,
  Check,
  Loader2
} from 'lucide-react';
import { forumPostsData } from '../data/forum';
import { ForumPost, ReportItem, Page } from '../types';
import { useAuth } from '../context/AuthContext';
import { kenyanCounties } from '../components/Navbar';
import { ShareSheetModal } from '../components/ShareSheetModal';
import { ReportModal } from '../components/ReportModal';
import { AgriStoriesBar } from '../components/AgriStoriesBar';
import { AgriReelsFeed } from '../components/AgriReelsFeed';

interface CommunityPageProps {
  isMobileFrame?: boolean;
  onNavigateToProfile?: (username: string) => void;
  initialMode?: 'feed' | 'reels';
  onNavigateToPage?: (page: Page, toolId?: number) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({
  isMobileFrame = false,
  onNavigateToProfile,
  initialMode = 'feed',
  onNavigateToPage,
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
  const [communityMode, setCommunityMode] = useState<'feed' | 'reels'>(initialMode);

  React.useEffect(() => {
    if (initialMode) {
      setCommunityMode(initialMode);
    }
  }, [initialMode]);

  // Feed tabs: latest, following, relevant, saved
  const [activeFeedTab, setActiveFeedTab] = useState<'latest' | 'following' | 'relevant' | 'saved'>('latest');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  
  // Specific reply targeting: keeps track of target comment, root thread parent, and author
  const [replyingToTarget, setReplyingToTarget] = useState<{
    postId: string;
    commentId: string;
    rootParentId: string;
    authorName: string;
  } | null>(null);

  // Preserve drafts per reply target or general comment
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});
  const [newCommentText, setNewCommentText] = useState('');
  const [expandedThreads, setExpandedThreads] = useState<Record<string, boolean>>({});
  const [visibleCommentsCount, setVisibleCommentsCount] = useState<Record<string, number>>({});
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  // Comment Editing
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentText, setEditingCommentText] = useState('');

  // Comment Reporting
  const [reportingCommentModal, setReportingCommentModal] = useState<{
    id: string;
    author: string;
    text: string;
  } | null>(null);

  // Refs for auto-scroll and focus
  const replyComposerRef = useRef<HTMLDivElement | null>(null);
  const replyInputRef = useRef<HTMLInputElement | null>(null);

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

  // Trigger reply on a specific comment with auto-scroll and focus
  const handleInitiateReply = (
    postId: string,
    commentId: string,
    authorName: string,
    rootParentId?: string
  ) => {
    const parentId = rootParentId || commentId;
    setReplyingToTarget({
      postId,
      commentId,
      rootParentId: parentId,
      authorName,
    });

    // Auto expand parent thread so conversation context is completely visible
    setExpandedThreads((prev) => ({ ...prev, [parentId]: true }));

    // Scroll inline composer into view reliably
    setTimeout(() => {
      if (replyComposerRef.current) {
        replyComposerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
        replyInputRef.current?.focus();
      }
    }, 60);
  };

  const handleCancelReply = () => {
    setReplyingToTarget(null);
  };

  // Submit a comment or threaded reply
  const handleSubmitCommentOrReply = (
    postId: string,
    parentCommentId?: string,
    replyToAuthor?: string,
    explicitText?: string
  ) => {
    const draftText =
      explicitText !== undefined
        ? explicitText
        : parentCommentId
        ? replyDrafts[parentCommentId] || ''
        : newCommentText;

    const trimmed = draftText.trim();
    if (!trimmed || isSubmittingComment) return;

    setIsSubmittingComment(true);

    const newReply = {
      id: `rep-${Date.now()}`,
      parentCommentId,
      replyToAuthor,
      author: user?.name || 'Adams Kipkoech Kering',
      authorId: user?.id || 'user-current',
      authorUsername: user?.username || 'adams_kering',
      authorRole:
        user?.role === 'farmer'
          ? 'Grower & Contributor'
          : user?.role === 'expert'
          ? 'Agronomist & Specialist'
          : 'Agricultural Member',
      authorAvatar: user?.avatar,
      text: trimmed,
      timestamp: 'Just now',
      likes: 0,
      isLiked: false,
    };

    setPosts((currentList) =>
      currentList.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            commentsCount: (p.commentsCount || p.replies.length) + 1,
            replies: [...p.replies, newReply],
          };
        }
        return p;
      })
    );

    if (parentCommentId) {
      setExpandedThreads((prev) => ({ ...prev, [parentCommentId]: true }));
      setReplyDrafts((prev) => {
        const next = { ...prev };
        delete next[parentCommentId];
        return next;
      });
    } else {
      setNewCommentText('');
    }

    setReplyingToTarget(null);
    setIsSubmittingComment(false);
    showToast('Reply published to discussion thread! 🌱');
  };

  // Toggle Like on an individual comment / reply
  const handleToggleCommentLike = (postId: string, commentId: string) => {
    setPosts((list) =>
      list.map((post) => {
        if (post.id === postId) {
          const updatedReplies = post.replies.map((reply) => {
            if (reply.id === commentId) {
              const currentlyLiked = !reply.isLiked;
              const currentLikes = reply.likes || 0;
              return {
                ...reply,
                isLiked: currentlyLiked,
                likes: currentlyLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1),
              };
            }
            return reply;
          });
          return { ...post, replies: updatedReplies };
        }
        return post;
      })
    );
  };

  // Start Editing a Comment
  const handleStartEditComment = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingCommentText(currentText);
  };

  // Save Edited Comment
  const handleSaveEditComment = (postId: string, commentId: string) => {
    if (!editingCommentText.trim()) return;
    setPosts((list) =>
      list.map((post) => {
        if (post.id === postId) {
          const updatedReplies = post.replies.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                text: editingCommentText.trim(),
                isEdited: true,
                editedAt: 'Just now',
              };
            }
            return reply;
          });
          return { ...post, replies: updatedReplies };
        }
        return post;
      })
    );
    setEditingCommentId(null);
    setEditingCommentText('');
    showToast('Comment updated.');
  };

  const handleCancelEditComment = () => {
    setEditingCommentId(null);
    setEditingCommentText('');
  };

  // Delete Comment / Reply
  const handleDeleteComment = (postId: string, commentId: string) => {
    if (!confirm('Are you sure you want to delete this reply?')) return;
    setPosts((list) =>
      list.map((post) => {
        if (post.id === postId) {
          // Filter out the deleted comment and its child replies if top-level
          const updatedReplies = post.replies.filter(
            (r) => r.id !== commentId && r.parentCommentId !== commentId
          );
          const countDiff = post.replies.length - updatedReplies.length;
          return {
            ...post,
            commentsCount: Math.max(0, (post.commentsCount || post.replies.length) - countDiff),
            replies: updatedReplies,
          };
        }
        return post;
      })
    );
    showToast('Comment deleted.');
  };

  // Expand / Collapse Thread
  const handleToggleThreadExpand = (commentId: string) => {
    setExpandedThreads((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // Load more comments for post (pagination)
  const handleLoadMoreComments = (postId: string, totalCount: number) => {
    setVisibleCommentsCount((prev) => ({
      ...prev,
      [postId]: (prev[postId] || 4) + 6,
    }));
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
            Community
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Global agricultural social platform: verified field updates, agronomic advice, discussions, and clips
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Discussions vs Clips View Switcher */}
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
              <span>Clips</span>
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
          <AgriReelsFeed
            setCurrentPage={(page) => onNavigateToPage?.(page)}
            onNavigateToTool={(toolPage, toolId) => onNavigateToPage?.(toolPage, toolId)}
          />
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
                  <div className="mt-3 bg-stone-100/80 rounded-2xl p-3 sm:p-4 space-y-3.5 border border-stone-200/80 animate-in fade-in duration-200">
                    {/* Header bar of comments drawer */}
                    <div className="flex items-center justify-between text-xs text-stone-600 pb-1 border-b border-stone-200/60 font-medium">
                      <span>Discussion ({displayCommentsCount} {displayCommentsCount === 1 ? 'response' : 'responses'})</span>
                      <span className="text-[11px] text-stone-500">Threaded agronomic Q&A</span>
                    </div>

                    <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1 overscroll-contain">
                      {post.replies.length === 0 ? (
                        <div className="text-center py-6 px-4 bg-white/60 rounded-xl border border-stone-200/60 space-y-1">
                          <MessageCircle className="w-6 h-6 text-stone-300 mx-auto" />
                          <p className="text-xs text-stone-600 font-semibold">No responses yet</p>
                          <p className="text-[11px] text-stone-400">
                            Be the first to share your field experience or ask an agronomy question!
                          </p>
                        </div>
                      ) : (
                        (() => {
                          const topLevelReplies = post.replies.filter((r) => !r.parentCommentId);
                          const limit = visibleCommentsCount[post.id] || 4;
                          const displayedReplies = topLevelReplies.slice(0, limit);
                          const hasMore = topLevelReplies.length > limit;

                          return (
                            <>
                              {displayedReplies.map((reply) => {
                                const childReplies = post.replies.filter((r) => r.parentCommentId === reply.id);
                                const isMyComment =
                                  reply.author === user?.name ||
                                  reply.authorUsername === user?.username ||
                                  user?.role === 'admin';
                                const isEditing = editingCommentId === reply.id;
                                const isReplyingDirectly =
                                  replyingToTarget &&
                                  replyingToTarget.postId === post.id &&
                                  replyingToTarget.commentId === reply.id;
                                const isThreadExpanded = expandedThreads[reply.id] !== false;

                                return (
                                  <div
                                    key={reply.id}
                                    className="text-xs bg-white p-3.5 rounded-2xl border border-stone-200/80 space-y-2 shadow-2xs hover:border-emerald-700/30 transition-colors"
                                  >
                                    {/* Author & Header */}
                                    <div className="flex items-start justify-between text-stone-500">
                                      <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-[10px] shrink-0 overflow-hidden">
                                          {reply.authorAvatar ? (
                                            <img
                                              src={reply.authorAvatar}
                                              alt={reply.author}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <span>{reply.author.slice(0, 2).toUpperCase()}</span>
                                          )}
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-1.5 flex-wrap">
                                            <span className="font-bold text-stone-900 text-xs">
                                              {reply.author}
                                            </span>
                                            <span className="text-[10px] text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-md font-semibold border border-emerald-200/60">
                                              {reply.authorRole || 'Farmer'}
                                            </span>
                                            {reply.isEdited && (
                                              <span className="text-[10px] text-stone-400 italic">
                                                (edited)
                                              </span>
                                            )}
                                          </div>
                                          <div className="text-[10px] text-stone-400">{reply.timestamp}</div>
                                        </div>
                                      </div>

                                      {/* Comment Actions (Like, Edit, Delete, Report) */}
                                      <div className="flex items-center gap-1 text-stone-400">
                                        {/* Like Comment */}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleCommentLike(post.id, reply.id)}
                                          className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[11px] font-medium transition ${
                                            reply.isLiked
                                              ? 'text-rose-600 bg-rose-50'
                                              : 'text-stone-500 hover:text-rose-600 hover:bg-stone-50'
                                          }`}
                                          title="Like comment"
                                        >
                                          <Heart
                                            className={`w-3.5 h-3.5 ${
                                              reply.isLiked ? 'fill-rose-500 text-rose-500' : ''
                                            }`}
                                          />
                                          <span>{reply.likes || 0}</span>
                                        </button>

                                        {isMyComment && (
                                          <>
                                            <button
                                              type="button"
                                              onClick={() => handleStartEditComment(reply.id, reply.text)}
                                              className="p-1 hover:text-stone-800 rounded transition"
                                              title="Edit comment"
                                            >
                                              <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                              type="button"
                                              onClick={() => handleDeleteComment(post.id, reply.id)}
                                              className="p-1 hover:text-red-600 rounded transition"
                                              title="Delete comment"
                                            >
                                              <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                          </>
                                        )}

                                        <button
                                          type="button"
                                          onClick={() =>
                                            setReportingCommentModal({
                                              id: reply.id,
                                              author: reply.author,
                                              text: reply.text,
                                            })
                                          }
                                          className="p-1 hover:text-red-500 rounded transition"
                                          title="Report comment"
                                        >
                                          <Flag className="w-3.5 h-3.5" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Comment Text or Inline Edit Textarea */}
                                    {isEditing ? (
                                      <div className="space-y-2 pt-1">
                                        <textarea
                                          value={editingCommentText}
                                          onChange={(e) => setEditingCommentText(e.target.value)}
                                          rows={2}
                                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#183D29]"
                                        />
                                        <div className="flex items-center justify-end gap-2">
                                          <button
                                            type="button"
                                            onClick={handleCancelEditComment}
                                            className="px-2.5 py-1 text-[11px] font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                                          >
                                            Cancel
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => handleSaveEditComment(post.id, reply.id)}
                                            className="px-3 py-1 text-[11px] font-bold text-white bg-[#183D29] hover:bg-[#122e1f] rounded-lg transition"
                                          >
                                            Save
                                          </button>
                                        </div>
                                      </div>
                                    ) : (
                                      <p className="text-stone-800 text-[13px] leading-relaxed pl-1 whitespace-pre-wrap">
                                        {reply.text}
                                      </p>
                                    )}

                                    {/* Action Bar (Reply + Thread Collapse Toggle) */}
                                    <div className="flex items-center justify-between pt-1 border-t border-stone-100">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleInitiateReply(post.id, reply.id, reply.author, reply.id)
                                        }
                                        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg transition ${
                                          isReplyingDirectly
                                            ? 'text-emerald-900 bg-emerald-100'
                                            : 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-50'
                                        }`}
                                      >
                                        <CornerDownRight className="w-3.5 h-3.5 text-emerald-700" />
                                        <span>Reply</span>
                                      </button>

                                      {childReplies.length > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => handleToggleThreadExpand(reply.id)}
                                          className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 hover:text-stone-800"
                                        >
                                          <span>
                                            {isThreadExpanded
                                              ? 'Hide replies'
                                              : `View ${childReplies.length} ${
                                                  childReplies.length === 1 ? 'reply' : 'replies'
                                                }`}
                                          </span>
                                          {isThreadExpanded ? (
                                            <ChevronUp className="w-3.5 h-3.5" />
                                          ) : (
                                            <ChevronDown className="w-3.5 h-3.5" />
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {/* INLINE COMPOSER Directly Beneath Parent Comment */}
                                    {isReplyingDirectly && (
                                      <div
                                        ref={replyComposerRef}
                                        className="mt-2.5 p-3 bg-emerald-50/90 rounded-2xl border border-emerald-300 space-y-2 animate-in fade-in zoom-in-98 shadow-xs scroll-mb-28"
                                      >
                                        <div className="flex items-center justify-between text-xs text-emerald-950 font-medium">
                                          <div className="flex items-center gap-1.5">
                                            <CornerDownRight className="w-3.5 h-3.5 text-emerald-700" />
                                            <span>
                                              Replying to <strong>@{replyingToTarget.authorName}</strong>
                                            </span>
                                          </div>
                                          <button
                                            type="button"
                                            onClick={handleCancelReply}
                                            className="p-1 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-emerald-100 transition"
                                            title="Cancel reply"
                                          >
                                            <X className="w-3.5 h-3.5" />
                                          </button>
                                        </div>

                                        <div className="flex items-center gap-2">
                                          <input
                                            ref={replyInputRef}
                                            type="text"
                                            autoFocus
                                            value={replyDrafts[reply.id] || ''}
                                            onChange={(e) =>
                                              setReplyDrafts((prev) => ({
                                                ...prev,
                                                [reply.id]: e.target.value,
                                              }))
                                            }
                                            onKeyDown={(e) => {
                                              if (e.key === 'Enter') {
                                                handleSubmitCommentOrReply(
                                                  post.id,
                                                  reply.id,
                                                  replyingToTarget.authorName
                                                );
                                              } else if (e.key === 'Escape') {
                                                handleCancelReply();
                                              }
                                            }}
                                            placeholder={`Write reply to @${replyingToTarget.authorName}...`}
                                            className="flex-1 px-3 py-2 bg-white rounded-xl text-xs border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-[#183D29]"
                                          />
                                          <button
                                            type="button"
                                            disabled={
                                              !(replyDrafts[reply.id] || '').trim() || isSubmittingComment
                                            }
                                            onClick={() =>
                                              handleSubmitCommentOrReply(
                                                post.id,
                                                reply.id,
                                                replyingToTarget.authorName
                                              )
                                            }
                                            className="px-3.5 py-2 bg-[#183D29] text-white rounded-xl hover:bg-[#122e1f] transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold flex items-center gap-1 cursor-pointer"
                                          >
                                            {isSubmittingComment ? (
                                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            ) : (
                                              <Send className="w-3.5 h-3.5" />
                                            )}
                                            <span>Reply</span>
                                          </button>
                                        </div>
                                      </div>
                                    )}

                                    {/* Nested Threaded Child Replies */}
                                    {childReplies.length > 0 && isThreadExpanded && (
                                      <div className="border-l-2 border-emerald-600/30 pl-3 ml-2 mt-2 space-y-2.5 pt-1">
                                        {childReplies.map((child) => {
                                          const isMyChild =
                                            child.author === user?.name ||
                                            child.authorUsername === user?.username ||
                                            user?.role === 'admin';
                                          const isEditingChild = editingCommentId === child.id;
                                          const isReplyingChild =
                                            replyingToTarget &&
                                            replyingToTarget.postId === post.id &&
                                            replyingToTarget.commentId === child.id;

                                          return (
                                            <div
                                              key={child.id}
                                              className="text-xs bg-stone-50/90 p-2.5 sm:p-3 rounded-xl border border-stone-200/70 space-y-1.5 shadow-2xs hover:bg-stone-50 transition"
                                            >
                                              {/* Child Header */}
                                              <div className="flex items-start justify-between text-stone-500">
                                                <div className="flex items-center gap-1.5 flex-wrap">
                                                  <div className="w-5 h-5 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold text-[9px] shrink-0 overflow-hidden">
                                                    {child.authorAvatar ? (
                                                      <img
                                                        src={child.authorAvatar}
                                                        alt={child.author}
                                                        className="w-full h-full object-cover"
                                                      />
                                                    ) : (
                                                      <span>{child.author.slice(0, 2).toUpperCase()}</span>
                                                    )}
                                                  </div>
                                                  <span className="font-bold text-stone-900">
                                                    {child.author}
                                                  </span>
                                                  <span className="text-[10px] text-stone-400">
                                                    replied to
                                                  </span>
                                                  <span className="text-emerald-800 text-[11px] font-semibold bg-emerald-50 px-1 rounded">
                                                    @{child.replyToAuthor || reply.author}
                                                  </span>
                                                  {child.isEdited && (
                                                    <span className="text-[10px] text-stone-400 italic">
                                                      (edited)
                                                    </span>
                                                  )}
                                                </div>

                                                {/* Child Actions */}
                                                <div className="flex items-center gap-1 text-stone-400">
                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      handleToggleCommentLike(post.id, child.id)
                                                    }
                                                    className={`flex items-center gap-0.5 px-1 py-0.5 rounded text-[10px] font-medium transition ${
                                                      child.isLiked
                                                        ? 'text-rose-600 bg-rose-50'
                                                        : 'text-stone-500 hover:text-rose-600'
                                                    }`}
                                                    title="Like reply"
                                                  >
                                                    <Heart
                                                      className={`w-3 h-3 ${
                                                        child.isLiked ? 'fill-rose-500 text-rose-500' : ''
                                                      }`}
                                                    />
                                                    <span>{child.likes || 0}</span>
                                                  </button>

                                                  {isMyChild && (
                                                    <>
                                                      <button
                                                        type="button"
                                                        onClick={() =>
                                                          handleStartEditComment(child.id, child.text)
                                                        }
                                                        className="p-0.5 hover:text-stone-800 rounded transition"
                                                        title="Edit reply"
                                                      >
                                                        <Edit2 className="w-3 h-3" />
                                                      </button>
                                                      <button
                                                        type="button"
                                                        onClick={() =>
                                                          handleDeleteComment(post.id, child.id)
                                                        }
                                                        className="p-0.5 hover:text-red-600 rounded transition"
                                                        title="Delete reply"
                                                      >
                                                        <Trash2 className="w-3 h-3" />
                                                      </button>
                                                    </>
                                                  )}

                                                  <button
                                                    type="button"
                                                    onClick={() =>
                                                      setReportingCommentModal({
                                                        id: child.id,
                                                        author: child.author,
                                                        text: child.text,
                                                      })
                                                    }
                                                    className="p-0.5 hover:text-red-500 rounded transition"
                                                    title="Report reply"
                                                  >
                                                    <Flag className="w-3 h-3" />
                                                  </button>
                                                </div>
                                              </div>

                                              {/* Child Text or Inline Edit */}
                                              {isEditingChild ? (
                                                <div className="space-y-1.5 pt-1">
                                                  <textarea
                                                    value={editingCommentText}
                                                    onChange={(e) =>
                                                      setEditingCommentText(e.target.value)
                                                    }
                                                    rows={2}
                                                    className="w-full p-2 bg-white border border-stone-200 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-[#183D29]"
                                                  />
                                                  <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                      type="button"
                                                      onClick={handleCancelEditComment}
                                                      className="px-2 py-0.5 text-[10px] text-stone-600 hover:bg-stone-200/60 rounded"
                                                    >
                                                      Cancel
                                                    </button>
                                                    <button
                                                      type="button"
                                                      onClick={() =>
                                                        handleSaveEditComment(post.id, child.id)
                                                      }
                                                      className="px-2.5 py-0.5 text-[10px] font-bold text-white bg-[#183D29] hover:bg-[#122e1f] rounded"
                                                    >
                                                      Save
                                                    </button>
                                                  </div>
                                                </div>
                                              ) : (
                                                <p className="text-stone-700 text-[12.5px] leading-relaxed whitespace-pre-wrap">
                                                  {child.text}
                                                </p>
                                              )}

                                              {/* Child Reply Trigger Button */}
                                              <div className="flex items-center justify-between pt-0.5">
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleInitiateReply(
                                                      post.id,
                                                      child.id,
                                                      child.author,
                                                      reply.id
                                                    )
                                                  }
                                                  className="flex items-center gap-1 text-[10.5px] text-emerald-800 font-bold hover:underline"
                                                >
                                                  <CornerDownRight className="w-3 h-3" />
                                                  <span>Reply</span>
                                                </button>
                                                <span className="text-[10px] text-stone-400">
                                                  {child.timestamp}
                                                </span>
                                              </div>

                                              {/* INLINE COMPOSER Directly Beneath This Child Reply */}
                                              {isReplyingChild && (
                                                <div
                                                  ref={replyComposerRef}
                                                  className="mt-2 p-2.5 bg-emerald-50 rounded-xl border border-emerald-300 space-y-1.5 animate-in fade-in zoom-in-98 scroll-mb-28"
                                                >
                                                  <div className="flex items-center justify-between text-[11px] text-emerald-950 font-medium">
                                                    <span>
                                                      Replying to <strong>@{child.author}</strong>
                                                    </span>
                                                    <button
                                                      type="button"
                                                      onClick={handleCancelReply}
                                                      className="text-stone-400 hover:text-stone-700 p-0.5"
                                                    >
                                                      <X className="w-3 h-3" />
                                                    </button>
                                                  </div>

                                                  <div className="flex items-center gap-1.5">
                                                    <input
                                                      ref={replyInputRef}
                                                      type="text"
                                                      autoFocus
                                                      value={replyDrafts[reply.id] || ''}
                                                      onChange={(e) =>
                                                        setReplyDrafts((prev) => ({
                                                          ...prev,
                                                          [reply.id]: e.target.value,
                                                        }))
                                                      }
                                                      onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                          handleSubmitCommentOrReply(
                                                            post.id,
                                                            reply.id,
                                                            child.author
                                                          );
                                                        } else if (e.key === 'Escape') {
                                                          handleCancelReply();
                                                        }
                                                      }}
                                                      placeholder={`Reply to @${child.author}...`}
                                                      className="flex-1 px-2.5 py-1.5 bg-white rounded-lg text-xs border border-emerald-200 focus:outline-none focus:ring-1 focus:ring-[#183D29]"
                                                    />
                                                    <button
                                                      type="button"
                                                      disabled={
                                                        !(replyDrafts[reply.id] || '').trim() ||
                                                        isSubmittingComment
                                                      }
                                                      onClick={() =>
                                                        handleSubmitCommentOrReply(
                                                          post.id,
                                                          reply.id,
                                                          child.author
                                                        )
                                                      }
                                                      className="px-2.5 py-1.5 bg-[#183D29] text-white rounded-lg hover:bg-[#122e1f] transition active:scale-95 text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                                                    >
                                                      <Send className="w-3 h-3" />
                                                      <span>Reply</span>
                                                    </button>
                                                  </div>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}

                              {/* Load More Comments Pagination Button */}
                              {hasMore && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleLoadMoreComments(post.id, topLevelReplies.length)
                                  }
                                  className="w-full py-2 text-center text-xs font-bold text-emerald-800 hover:text-emerald-950 bg-white/70 hover:bg-white rounded-xl border border-stone-200/80 transition shadow-2xs"
                                >
                                  Load older comments ({topLevelReplies.length - limit} more)
                                </button>
                              )}
                            </>
                          );
                        })()
                      )}
                    </div>

                    {/* Top-Level Add Comment Input */}
                    <div className="pt-2 border-t border-stone-200/80">
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Write an agronomic answer or comment..."
                          value={newCommentText}
                          onChange={(e) => setNewCommentText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSubmitCommentOrReply(post.id);
                            }
                          }}
                          className="flex-1 px-3 py-2 bg-white rounded-xl text-xs border border-stone-200 focus:outline-none focus:ring-2 focus:ring-[#183D29] shadow-2xs"
                        />
                        <button
                          type="button"
                          disabled={!newCommentText.trim() || isSubmittingComment}
                          onClick={() => handleSubmitCommentOrReply(post.id)}
                          className="px-3.5 py-2 bg-[#183D29] text-white rounded-xl hover:bg-[#122e1f] transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
                          title="Post Comment"
                        >
                          {isSubmittingComment ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Send className="w-3.5 h-3.5" />
                          )}
                          <span className="hidden sm:inline text-xs font-bold">Comment</span>
                        </button>
                      </div>
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

      {/* Report Post Modal */}
      {reportingPost && (
        <ReportModal
          isOpen={Boolean(reportingPost)}
          onClose={() => setReportingPost(null)}
          targetType="post"
          targetId={reportingPost.id}
          targetTitle={reportingPost.content.slice(0, 60)}
        />
      )}

      {/* Report Comment Modal */}
      {reportingCommentModal && (
        <ReportModal
          isOpen={Boolean(reportingCommentModal)}
          onClose={() => setReportingCommentModal(null)}
          targetType="comment"
          targetId={reportingCommentModal.id}
          targetTitle={`Comment by ${reportingCommentModal.author}: "${reportingCommentModal.text.slice(0, 50)}..."`}
        />
      )}
    </div>
  );
};

