import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Settings,
  ArrowUpRight,
  Receipt,
  Download,
  RefreshCw,
  Sliders,
  AlertCircle
} from 'lucide-react';
import { PaymentTransaction, PricingConfig } from '../types';

export const FounderRevenueDashboard: React.FC = () => {
  const [stats, setStats] = useState<{
    grossRevenueKES: number;
    netRevenueKES: number;
    recordedCostsKES: number;
    transactionCount: number;
    byStream: {
      featured_listing: number;
      subscription: number;
      verification_fee: number;
      ad_banner: number;
    };
    pricingConfig: PricingConfig;
    recentTransactions: PaymentTransaction[];
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [editingPricing, setEditingPricing] = useState(false);
  const [pricingForm, setPricingForm] = useState<PricingConfig | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/revenue-stats');
      const data = await res.json();
      setStats(data);
      setPricingForm(data.pricingConfig);
    } catch (err) {
      console.error('Failed to load revenue statistics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSavePricing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pricingForm) return;

    try {
      const res = await fetch('/api/admin/pricing-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pricingForm),
      });
      const data = await res.json();
      if (data.success) {
        showToast('Pricing configurations updated successfully across platform!');
        setEditingPricing(false);
        fetchStats();
      }
    } catch (err) {
      showToast('Error saving pricing configurations.');
    }
  };

  const handleExportLedger = () => {
    if (!stats) return;
    const csvContent =
      'Transaction Ref,M-Pesa Receipt,Customer,Phone,Purpose,Amount (KES),Payment Method,Status,Date\n' +
      stats.recentTransactions
        .map(
          (t) =>
            `"${t.transactionRef}","${t.mpesaReceipt || ''}","${t.userName}","${t.userPhone}","${t.purpose}","${t.amountKES}","${t.paymentMethod}","${t.status}","${t.createdAt}"`
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `agrihub_revenue_ledger_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    showToast('Exported transaction ledger CSV.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="bg-[#183D29] text-white text-xs px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-md animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header with Refresh and Pricing Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold mb-1">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Founder & Enterprise Revenue Portal</span>
          </div>
          <h2 className="text-xl font-bold text-stone-900 font-serif">
            Financial Management & Transactions
          </h2>
          <p className="text-xs text-stone-500">
            Real-time monetization ledger, M-Pesa settlements & platform margins
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setEditingPricing(!editingPricing)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50 transition"
          >
            <Sliders className="w-3.5 h-3.5 text-emerald-800" />
            <span>{editingPricing ? 'Hide Pricing Controls' : 'Configure Prices'}</span>
          </button>
          <button
            onClick={fetchStats}
            className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
          <button
            onClick={handleExportLedger}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#183D29] hover:bg-[#122e1f] text-white text-xs font-bold transition shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export Ledger CSV</span>
          </button>
        </div>
      </div>

      {/* Pricing Configuration Panel */}
      {editingPricing && pricingForm && (
        <form
          onSubmit={handleSavePricing}
          className="bg-emerald-50/70 border-2 border-emerald-700/50 rounded-3xl p-6 shadow-sm space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <Settings className="w-4 h-4 text-emerald-800" />
              <span>Administrator Pricing Controls (Dynamic KES Rates)</span>
            </h3>
            <span className="text-[11px] text-stone-500">
              Changes apply instantly across all checkout flows
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                7 Days Featured (KES)
              </label>
              <input
                type="number"
                value={pricingForm.featured7DaysKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, featured7DaysKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                14 Days Featured (KES)
              </label>
              <input
                type="number"
                value={pricingForm.featured14DaysKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, featured14DaysKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                30 Days Featured (KES)
              </label>
              <input
                type="number"
                value={pricingForm.featured30DaysKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, featured30DaysKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Business Monthly Plan (KES)
              </label>
              <input
                type="number"
                value={pricingForm.businessMonthlyKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, businessMonthlyKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Business Annual Plan (KES)
              </label>
              <input
                type="number"
                value={pricingForm.businessAnnualKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, businessAnnualKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Professional Monthly (KES)
              </label>
              <input
                type="number"
                value={pricingForm.professionalMonthlyKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, professionalMonthlyKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
            <div>
              <label className="font-bold text-stone-700 block mb-1">
                Verification Review Fee (KES)
              </label>
              <input
                type="number"
                value={pricingForm.verificationFeeKES}
                onChange={(e) =>
                  setPricingForm({ ...pricingForm, verificationFeeKES: Number(e.target.value) })
                }
                className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 font-mono font-bold text-stone-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setEditingPricing(false)}
              className="px-4 py-2 rounded-xl text-stone-600 font-semibold text-xs hover:bg-stone-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#183D29] hover:bg-[#122e1f] text-white px-5 py-2 rounded-xl font-bold text-xs shadow-sm transition"
            >
              Save & Apply Prices
            </button>
          </div>
        </form>
      )}

      {/* Primary KPI Metrics Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Gross Receipts */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Gross Receipts (Total Inflows)
            </div>
            <div className="text-2xl font-black text-stone-900">
              KES {stats.grossRevenueKES.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>{stats.transactionCount} verified customer payments</span>
            </p>
          </div>

          {/* Net Platform Revenue */}
          <div className="bg-emerald-50/70 p-5 rounded-3xl border border-emerald-300 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">
              Net Platform Revenue
            </div>
            <div className="text-2xl font-black text-[#183D29]">
              KES {stats.netRevenueKES.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">
              After recorded SMS gateway & hosting
            </p>
          </div>

          {/* Infrastructure Costs */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Recorded Costs & Infrastructure
            </div>
            <div className="text-2xl font-black text-stone-900">
              KES {stats.recordedCostsKES.toLocaleString()}
            </div>
            <p className="text-[11px] text-stone-500">
              Safaricom Daraja API + cloud hosting
            </p>
          </div>

          {/* Average Order Value */}
          <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Average Order Value
            </div>
            <div className="text-2xl font-black text-stone-900">
              KES{' '}
              {stats.transactionCount > 0
                ? Math.round(stats.grossRevenueKES / stats.transactionCount).toLocaleString()
                : '0'}
            </div>
            <p className="text-[11px] text-stone-500">
              Across listings & business subscriptions
            </p>
          </div>
        </div>
      )}

      {/* Revenue Breakdown by Monetization Stream */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Stream Breakdown Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#183D29]" />
              <span>Revenue Streams Breakdown</span>
            </h3>

            <div className="space-y-3">
              {/* Featured Listings */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-700">Stream A: Featured Agricultural Listings</span>
                  <span className="font-mono text-stone-900">
                    KES {stats.byStream.featured_listing.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div
                    className="bg-amber-500 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.grossRevenueKES > 0
                          ? (stats.byStream.featured_listing / stats.grossRevenueKES) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Subscriptions */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-700">Stream B: Seller Business Subscriptions</span>
                  <span className="font-mono text-stone-900">
                    KES {stats.byStream.subscription.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.grossRevenueKES > 0
                          ? (stats.byStream.subscription / stats.grossRevenueKES) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Verification Fees */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-700">Stream C: Commercial Vetting & Audit</span>
                  <span className="font-mono text-stone-900">
                    KES {stats.byStream.verification_fee.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div
                    className="bg-sky-600 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.grossRevenueKES > 0
                          ? (stats.byStream.verification_fee / stats.grossRevenueKES) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Banner Ads */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-stone-700">Stream D: Sponsored Agricultural Banner Ads</span>
                  <span className="font-mono text-stone-900">
                    KES {stats.byStream.ad_banner.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${
                        stats.grossRevenueKES > 0
                          ? (stats.byStream.ad_banner / stats.grossRevenueKES) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Gateway Status Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
            <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800" />
              <span>Payment Gateway Integration Architecture</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <div>
                    <div className="font-bold text-stone-900">Safaricom M-Pesa (Daraja API)</div>
                    <div className="text-[11px] text-stone-500">STK Push & Paybill verification</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                  Active (Real-time)
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-4 h-4 text-stone-700" />
                  <div>
                    <div className="font-bold text-stone-900">Debit / Credit Card</div>
                    <div className="text-[11px] text-stone-500">Visa, Mastercard 3D Secure</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold text-[10px]">
                  Active
                </span>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4 text-stone-700" />
                  <div>
                    <div className="font-bold text-stone-900">Audit & Reconciliation</div>
                    <div className="text-[11px] text-stone-500">Immediate digital receipt generation</div>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-800 font-bold text-[10px]">
                  Automated
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live Transaction Audit Ledger */}
      {stats && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden space-y-3 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                Official Transaction Ledger
              </h3>
              <p className="text-xs text-stone-500">
                Audited payment receipts and user subscriptions
              </p>
            </div>
            <span className="text-xs font-semibold text-stone-600">
              Showing {stats.recentTransactions.length} records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 text-stone-600 border-y border-stone-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Transaction Ref</th>
                  <th className="py-2.5 px-3 font-semibold">M-Pesa Code</th>
                  <th className="py-2.5 px-3 font-semibold">Customer</th>
                  <th className="py-2.5 px-3 font-semibold">Item / Service</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Amount (KES)</th>
                  <th className="py-2.5 px-3 font-semibold">Method</th>
                  <th className="py-2.5 px-3 font-semibold">Status</th>
                  <th className="py-2.5 px-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800 font-medium">
                {stats.recentTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-stone-50/70 transition">
                    <td className="py-2.5 px-3 font-mono text-[11px] text-stone-600">
                      {tx.transactionRef}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">
                      {tx.mpesaReceipt || '—'}
                    </td>
                    <td className="py-2.5 px-3">
                      <div>{tx.userName}</div>
                      <div className="text-[10px] text-stone-400">{tx.userPhone}</div>
                    </td>
                    <td className="py-2.5 px-3 text-stone-700">
                      {tx.targetTitle || tx.purpose.replace('_', ' ')}
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-stone-900">
                      {tx.amountKES.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 uppercase text-[10px] font-bold text-stone-500">
                      {tx.paymentMethod}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Completed</span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-[11px] text-stone-500 whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
