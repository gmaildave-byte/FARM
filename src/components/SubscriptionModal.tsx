import React, { useState } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Sparkles,
  ShoppingBag,
  TrendingUp,
  ArrowRight,
  Zap,
  Building
} from 'lucide-react';
import { PaymentCheckoutModal } from './PaymentCheckoutModal';
import { PaymentTransaction } from '../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlan?: 'free' | 'business' | 'professional';
  onPlanUpgraded: (plan: 'business' | 'professional') => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentPlan = 'free',
  onPlanUpgraded,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [selectedPlanDetails, setSelectedPlanDetails] = useState<{
    plan: 'business' | 'professional';
    title: string;
    amountKES: number;
  } | null>(null);

  if (!isOpen) return null;

  const handleSelectPlan = (plan: 'business' | 'professional') => {
    let amount = 990;
    let title = 'Business Seller Subscription (Monthly)';

    if (plan === 'business') {
      if (billingCycle === 'annual') {
        amount = 9500;
        title = 'Business Seller Subscription (Annual — 20% Discount)';
      } else {
        amount = 990;
        title = 'Business Seller Subscription (Monthly)';
      }
    } else if (plan === 'professional') {
      amount = billingCycle === 'annual' ? 28000 : 2900;
      title = `Professional Enterprise Plan (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`;
    }

    setSelectedPlanDetails({ plan, title, amountKES: amount });
    setCheckoutModalOpen(true);
  };

  const handleCheckoutSuccess = (tx: PaymentTransaction) => {
    if (selectedPlanDetails) {
      onPlanUpgraded(selectedPlanDetails.plan);
    }
    setCheckoutModalOpen(false);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
        <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
          {/* Header */}
          <div className="bg-[#183D29] text-[#FAF7F0] px-6 py-6 flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-[11px] font-semibold text-emerald-200">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>AgriKnowledge Hub Seller Services</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight font-serif">
                Grow Your Agribusiness in Kenya
              </h3>
              <p className="text-xs text-emerald-200/90 max-w-xl">
                Upgrade your seller account to reach thousands of farmers, commercial buyers, and cooperatives across all 47 counties.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 flex items-center justify-center text-emerald-100 transition shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Billing Cycle Switcher */}
          <div className="bg-white border-b border-stone-200 py-3 px-6 flex justify-center items-center gap-2">
            <span className="text-xs text-stone-600 font-medium">Billed:</span>
            <div className="bg-stone-100 p-1 rounded-xl flex items-center border border-stone-200">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                  billingCycle === 'monthly'
                    ? 'bg-[#183D29] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition flex items-center gap-1 ${
                  billingCycle === 'annual'
                    ? 'bg-[#183D29] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Annual</span>
                <span className="bg-amber-400 text-stone-900 text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plan Cards Grid */}
          <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Free Farmer Plan */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Standard
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">
                    Free Farmer
                  </h4>
                  <div className="text-2xl font-black text-[#183D29]">
                    KES 0
                  </div>
                  <p className="text-xs text-stone-600">
                    For individual smallholders discovering knowledge and community.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Up to 3 active marketplace listings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Access to full agricultural knowledge base</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>26 precision farming calculators</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Farmer social feed & discussions</span>
                  </li>
                  <li className="flex items-start gap-2 text-stone-400">
                    <X className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Verified seller trust badge</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  disabled
                  className="w-full bg-stone-100 text-stone-500 py-2.5 px-4 rounded-xl font-bold text-xs cursor-default"
                >
                  Current Free Tier
                </button>
              </div>
            </div>

            {/* Business Plan (Recommended) */}
            <div className="bg-emerald-50/50 rounded-3xl p-6 border-2 border-emerald-700 flex flex-col justify-between shadow-md relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-800 text-white text-[11px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Most Popular for Sellers
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    Commercial
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">
                    Business Plan
                  </h4>
                  <div className="text-2xl font-black text-[#183D29]">
                    KES {billingCycle === 'annual' ? '9,500' : '990'}
                    <span className="text-xs font-normal text-stone-600">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    For serious produce producers, input stockists, and seed distributors.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-emerald-200">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>25 Active Marketplace Listings</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Verified Agribusiness Badge</strong> (Boosts buyer trust)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Featured in Certified Supplier Directory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Direct WhatsApp & Call Click-throughs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Listing views & enquiry analytics dashboard</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSelectPlan('business')}
                  className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>Upgrade to Business Plan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Professional Enterprise */}
            <div className="bg-white rounded-3xl p-6 border border-stone-200 flex flex-col justify-between shadow-2xs">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Enterprise
                  </div>
                  <h4 className="text-lg font-bold text-stone-900">
                    Professional Suite
                  </h4>
                  <div className="text-2xl font-black text-[#183D29]">
                    KES {billingCycle === 'annual' ? '28,000' : '2,900'}
                    <span className="text-xs font-normal text-stone-600">
                      /{billingCycle === 'annual' ? 'year' : 'month'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600">
                    For agricultural cooperatives, machinery importers, and large distributors.
                  </p>
                </div>

                <ul className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span><strong>Unlimited Marketplace Listings</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>1 Reserved Sponsored Banner Slot monthly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Bulk produce buyer inquiry alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Multi-agent farm team accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <span>Priority telephone support</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => handleSelectPlan('professional')}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white py-2.5 px-4 rounded-xl font-bold text-xs transition"
                >
                  Choose Professional
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Modal Trigger */}
      {selectedPlanDetails && (
        <PaymentCheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          title={selectedPlanDetails.title}
          amountKES={selectedPlanDetails.amountKES}
          purpose="subscription"
          targetId={`plan-${selectedPlanDetails.plan}`}
          targetTitle={selectedPlanDetails.title}
          onSuccess={handleCheckoutSuccess}
        />
      )}
    </>
  );
};
