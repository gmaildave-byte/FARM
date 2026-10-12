import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Mail,
  Globe,
  ExternalLink
} from 'lucide-react';

interface ShareSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: string;
    title?: string;
    authorName: string;
    content: string;
    county?: string;
  };
}

export const ShareSheetModal: React.FC<ShareSheetModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  const [copied, setCopied] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Build canonical post URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://agriknowledge.co.ke';
  const canonicalUrl = `${origin}/#post-${post.id}`;
  const shareTitle = post.title || `Farming update by ${post.authorName} on AgriKnowledge Hub`;
  const shareMessage = `See this farming update on AgriKnowledge Hub: ${canonicalUrl}`;

  const showFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3000);
  };

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(canonicalUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = canonicalUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      showFeedback('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      showFeedback('Could not copy automatically. You can copy the link manually below.');
    }
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(shareMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    showFeedback('Opened WhatsApp to share post.');
  };

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: `See this farming update from ${post.authorName} on AgriKnowledge Hub`,
          url: canonicalUrl,
        });
        showFeedback('Shared successfully via device options.');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          handleCopyLink();
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(shareTitle)}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareEmail = () => {
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
      `Hello,\n\nI thought you might find this agricultural update interesting:\n\n${shareMessage}\n\nAgriKnowledge Hub — Trusted Agricultural Knowledge. Stronger Farming. Better Markets.`
    )}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border-t sm:border border-stone-200 rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#183D29]" />
            <h3 className="font-bold text-stone-900 text-sm font-serif">
              Share Farming Update
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Post Preview snippet */}
        <div className="p-4 bg-emerald-50/50 border-b border-stone-200/80 text-xs text-stone-700">
          <div className="font-bold text-[#183D29] mb-0.5">
            {post.authorName} {post.county ? `• ${post.county}` : ''}
          </div>
          <p className="line-clamp-2 text-stone-600">
            "{post.content}"
          </p>
        </div>

        {/* Feedback Alert Toast */}
        {feedbackMessage && (
          <div className="mx-4 mt-3 bg-emerald-800 text-white text-xs px-3 py-2 rounded-xl flex items-center gap-2 shadow-xs animate-in fade-in">
            <Check className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
            <span>{feedbackMessage}</span>
          </div>
        )}

        {/* Share Action Grid */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-emerald-500 hover:bg-emerald-50/30 transition text-left group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs group-hover:text-emerald-900">
                  WhatsApp
                </div>
                <div className="text-[10px] text-stone-500">
                  Direct message / group
                </div>
              </div>
            </button>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border transition text-left group shadow-2xs ${
                copied
                  ? 'bg-emerald-100/70 border-emerald-500'
                  : 'bg-white border-stone-200/90 hover:border-stone-400 hover:bg-stone-50'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  copied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-stone-800 text-white'
                }`}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs">
                  {copied ? 'Copied!' : 'Copy Link'}
                </div>
                <div className="text-[10px] text-stone-500">
                  Public post URL
                </div>
              </div>
            </button>

            {/* Native Device Share (when supported) */}
            {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
              <button
                onClick={handleShareNative}
                className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 hover:bg-stone-50 transition text-left group shadow-2xs"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Share2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-stone-900 text-xs">
                    Device Share
                  </div>
                  <div className="text-[10px] text-stone-500">
                    Native apps menu
                  </div>
                </div>
              </button>
            )}

            {/* Telegram */}
            <button
              onClick={handleShareTelegram}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-sky-500 hover:bg-sky-50/30 transition text-left group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                <Send className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs">
                  Telegram
                </div>
                <div className="text-[10px] text-stone-500">
                  Farming channels
                </div>
              </div>
            </button>

            {/* Email */}
            <button
              onClick={handleShareEmail}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-stone-400 hover:bg-stone-50 transition text-left group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-stone-700 text-white flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs">
                  Email
                </div>
                <div className="text-[10px] text-stone-500">
                  Send to colleague
                </div>
              </div>
            </button>

            {/* Facebook */}
            <button
              onClick={handleShareFacebook}
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 hover:border-blue-500 hover:bg-blue-50/30 transition text-left group shadow-2xs"
            >
              <div className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-stone-900 text-xs">
                  Facebook
                </div>
                <div className="text-[10px] text-stone-500">
                  Farmer groups
                </div>
              </div>
            </button>
          </div>

          {/* Canonical URL display */}
          <div className="bg-stone-100 rounded-2xl p-3 flex items-center justify-between gap-2 border border-stone-200">
            <span className="text-[11px] font-mono text-stone-600 truncate">
              {canonicalUrl}
            </span>
            <button
              onClick={handleCopyLink}
              className="text-xs font-bold text-[#183D29] hover:underline shrink-0"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
