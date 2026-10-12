import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  Eye,
  ShieldCheck
} from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';
import { MarketplaceListing, PaymentTransaction } from '../types';

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  listing: MarketplaceListing | null;
  onPromotedSuccess: (listingId: string, days: number, tx: PaymentTransaction) => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({
  isOpen,
  onClose,
  listing,
  onPromotedSuccess,
}) => {
  const [selectedDuration, setSelectedDuration] = useState<7 | 14 | 30>(7);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  if (!isOpen || !listing) return null;

  const packages: Record<7 | 14 | 30, { price: number; label: string; viewsMultiplier: string }> = {
    7: { price: 450, label: '7 Days Boost', viewsMultiplier: '3x Expected Inquiries' },
    14: { price: 800, label: '14 Days Featured (Popular)', viewsMultiplier: '5x Expected Inquiries' },
    30: { price: 1500, label: '30 Days Full Month', viewsMultiplier: '8x Expected Inquiries' },
  };

  const selectedPkg = packages[selectedDuration];

  const handleOpenCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCheckoutSuccess = (tx: PaymentTransaction) => {
    onPromotedSuccess(listing.id, selectedDuration, tx);
    setCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-[#183D29] text-[#FAF7F0] px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-900 flex items-center justify-center font-bold">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-bold text-base tracking-tight font-serif">
                  Promote Marketplace Listing
                </h3>
                <p className="text-[11px] text-emerald-200/80">
                  Top Search Placement & Featured Badge
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 flex items-center justify-center text-emerald-100 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {/* Listing Target Card */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 text-xs space-y-1">
              <span className="text-[10px] uppercase font-bold text-stone-500">
                Target Listing
              </span>
              <div className="font-bold text-stone-900 text-sm truncate">
                {listing.title}
              </div>
              <div className="text-stone-600">
                KES {listing.priceKES.toLocaleString()} {listing.unit} • {listing.county}
              </div>
            </div>

            {/* Duration Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-800">
                Choose Promotion Duration
              </label>
              <div className="space-y-2.5">
                {([7, 14, 30] as const).map((days) => {
                  const pkg = packages[days];
                  const isSelected = selectedDuration === days;
                  return (
                    <div
                      key={days}
                      onClick={() => setSelectedDuration(days)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-50/60 border-amber-600 ring-2 ring-amber-500/20'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                          <span>{pkg.label}</span>
                          {days === 14 && (
                            <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                              Best Value
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {pkg.viewsMultiplier}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-sm text-[#183D29]">
                          KES {pkg.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-stone-500">
                          Total
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Perks */}
            <div className="bg-white rounded-2xl p-4 border border-stone-200 text-xs space-y-2 text-stone-700">
              <div className="font-bold text-stone-900 text-xs">
                Featured Benefits:
              </div>
              <div className="grid grid-cols-1 gap-1.5 text-[11px]">
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Gold "FEATURED" badge on listing card</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Priority position at the top of category searches</span>
                </div>
                <div className="flex items-center gap-2 text-stone-600">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>SMS alert for buyer phone & WhatsApp click-throughs</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOpenCheckout}
              className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Promote for KES {selectedPkg.price.toLocaleString()}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <PaymentCheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        title={`Promote Listing: ${listing.title}`}
        amountKES={selectedPkg.price}
        purpose="featured_listing"
        targetId={listing.id}
        targetTitle={`Featured Listing (${selectedDuration} Days)`}
        onSuccess={handleCheckoutSuccess}
      />
    </>
  );
};
