import React, { useState } from 'react';
import { Download, Smartphone, X, CheckCircle2, Share, PlusSquare, ArrowRight } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'drawer' | 'footer' | 'banner';
  className?: string;
  onInstalledOrDismissed?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'nav',
  className = '',
  onInstalledOrDismissed,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showAndroidManualModal, setShowAndroidManualModal] = useState(false);

  // If already running in standalone PWA mode, suppress install buttons
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted && onInstalledOrDismissed) {
        onInstalledOrDismissed();
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // In browsers where beforeinstallprompt hasn't fired yet or is already dismissed
      setShowAndroidManualModal(true);
    }
  };

  return (
    <>
      {variant === 'nav' && (
        <button
          onClick={handleInstallClick}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs ${
            className ||
            'bg-amber-400 hover:bg-amber-300 text-stone-950 border border-amber-300'
          }`}
          title="Install AgriHub App on your device"
        >
          <Download className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>Install App</span>
        </button>
      )}

      {variant === 'drawer' && (
        <button
          onClick={handleInstallClick}
          className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition ${
            className ||
            'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#183D29] text-white flex items-center justify-center">
              <Download className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="font-bold text-stone-900">Install AgriHub</div>
              <div className="text-[11px] text-stone-500 font-normal">Fast, offline-friendly farming app</div>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-emerald-800" />
        </button>
      )}

      {variant === 'footer' && (
        <button
          onClick={handleInstallClick}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
            className ||
            'bg-emerald-950 hover:bg-emerald-900 text-emerald-200 border border-emerald-800/80'
          }`}
        >
          <Smartphone className="w-4 h-4 text-emerald-400" />
          <span>Install Web App on Phone</span>
        </button>
      )}

      {variant === 'banner' && (
        <div className="bg-emerald-950 text-white px-4 py-2 text-xs flex items-center justify-between gap-3 border-b border-emerald-800">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span className="truncate">
              Install <strong>AgriHub</strong> on your phone for instant offline crop guides & calculators.
            </span>
          </div>
          <button
            onClick={handleInstallClick}
            className="shrink-0 bg-amber-400 hover:bg-amber-300 text-stone-950 px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1"
          >
            <Download className="w-3 h-3 stroke-[2.5]" />
            <span>Install</span>
          </button>
        </div>
      )}

      {/* iOS Safari Guided Install Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-stone-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#183D29] text-white flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-serif">Install on iPhone / iPad</h3>
                  <p className="text-[11px] text-stone-500">Add to Home Screen in 2 taps</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 space-y-3 text-xs text-stone-700 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  Tap the <strong className="text-emerald-950 inline-flex items-center gap-1 font-bold"><Share className="w-3.5 h-3.5 text-emerald-800 inline" /> Share</strong> button at the bottom of Safari.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  Scroll down the share sheet and tap <strong className="text-emerald-950 inline-flex items-center gap-1 font-bold"><PlusSquare className="w-3.5 h-3.5 text-emerald-800 inline" /> Add to Home Screen</strong>.
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  Tap <strong>Add</strong> in the top right corner. AgriHub will launch like an app!
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-2.5 rounded-xl font-bold text-xs transition"
            >
              Got It
            </button>
          </div>
        </div>
      )}

      {/* Android / Desktop Browser Manual Install Modal */}
      {showAndroidManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-stone-200 space-y-4 text-stone-900">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#183D29] text-white flex items-center justify-center">
                  <Download className="w-5 h-5 text-emerald-300" />
                </div>
                <div>
                  <h3 className="font-bold text-sm font-serif">Install AgriHub</h3>
                  <p className="text-[11px] text-stone-500">Progressive Web Application</p>
                </div>
              </div>
              <button
                onClick={() => setShowAndroidManualModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-2 text-xs text-stone-700 leading-relaxed">
              <p>
                To install AgriHub on your device:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-1 text-stone-800">
                <li><strong>Chrome / Edge:</strong> Click the install icon (computer with down arrow) in your browser address bar, or open the browser menu (⋮) and tap <strong>Install App</strong> or <strong>Add to Home screen</strong>.</li>
                <li><strong>Firefox / Samsung:</strong> Tap the menu (⋮) and select <strong>Install</strong> or <strong>Add to Home Screen</strong>.</li>
              </ul>
              <p className="text-[11px] text-stone-500 pt-1">
                Once installed, the app opens full screen with instant access to farming guides, 26 calculators, and direct marketplace trade.
              </p>
            </div>

            <button
              onClick={() => setShowAndroidManualModal(false)}
              className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-2.5 rounded-xl font-bold text-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
