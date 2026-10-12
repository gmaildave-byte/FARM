import React from 'react';
import {
  X,
  Camera,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Plus,
  ArrowRight,
  Sprout,
  Users,
  Tag
} from 'lucide-react';
import { Page } from '../types';

interface CreateActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (action: 'post' | 'listing' | 'ask' | 'verify') => void;
}

export const CreateActionModal: React.FC<CreateActionModalProps> = ({
  isOpen,
  onClose,
  onSelectAction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border-t sm:border border-stone-200 rounded-t-3xl sm:rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#183D29] text-white flex items-center justify-center">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 text-sm font-serif">
                Create & Contribute
              </h3>
              <p className="text-[10px] text-stone-500">
                Share with the Kenyan farming community
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Action Options */}
        <div className="p-5 space-y-3">
          {/* Option 1: Farm Post */}
          <button
            onClick={() => {
              onSelectAction('post');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition text-left group shadow-2xs"
          >
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 group-hover:bg-emerald-800 group-hover:text-white transition">
              <Camera className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-emerald-900">
                Share Field Update & Photos
              </div>
              <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                Post crop growth, harvest yields, or ask advice from fellow farmers.
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 transition" />
          </button>

          {/* Option 2: Marketplace Listing */}
          <button
            onClick={() => {
              onSelectAction('listing');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition text-left group shadow-2xs"
          >
            <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-amber-900">
                List Produce, Seeds or Machinery
              </div>
              <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                Sell fresh harvest, certified seeds, livestock, feeds, or farm services.
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-amber-700 transition" />
          </button>

          {/* Option 3: Ask Agronomist */}
          <button
            onClick={() => {
              onSelectAction('ask');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition text-left group shadow-2xs"
          >
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0 group-hover:bg-indigo-700 group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-stone-900 text-xs sm:text-sm group-hover:text-indigo-900">
                Ask Agricultural Scientist
              </div>
              <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                24/7 KALRO-grounded agronomy advice for pests, soils & diseases.
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-indigo-700 transition" />
          </button>

          {/* Option 4: Verification */}
          <button
            onClick={() => {
              onSelectAction('verify');
              onClose();
            }}
            className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition text-left group shadow-2xs"
          >
            <div className="w-11 h-11 rounded-2xl bg-stone-100 text-stone-800 flex items-center justify-center shrink-0 group-hover:bg-stone-800 group-hover:text-white transition">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-stone-900 text-xs sm:text-sm">
                Apply for Account Verification
              </div>
              <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                Unlock higher seller listing limits and verified badge credentials.
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};
