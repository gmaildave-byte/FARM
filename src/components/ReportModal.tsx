import React, { useState } from 'react';
import {
  X,
  AlertTriangle,
  Flag,
  CheckCircle2,
  ShieldAlert,
  Send
} from 'lucide-react';
import { ReportItem } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'post' | 'listing' | 'comment' | 'user';
  targetId: string;
  targetTitle: string;
  onReportSubmitted?: (report: ReportItem) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  targetType,
  targetId,
  targetTitle,
  onReportSubmitted,
}) => {
  const [reason, setReason] = useState<ReportItem['reason']>('misleading_claim');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const reasonOptions: { id: ReportItem['reason']; label: string; desc: string }[] = [
    {
      id: 'misleading_claim',
      label: 'Misleading Agronomic Claim',
      desc: 'Inaccurate fertilizer dosage, unproven chemical efficacy, or false yield claims.',
    },
    {
      id: 'scam',
      label: 'Suspected Fraud or Scam',
      desc: 'Demanding advance payment without physical inspection, or fake seller identity.',
    },
    {
      id: 'prohibited_goods',
      label: 'Prohibited / Counterfeit Seed or Chemical',
      desc: 'Banned agrochemicals or uncertified seed varieties without KEPHIS tags.',
    },
    {
      id: 'spam',
      label: 'Spam or Repetitive Advertising',
      desc: 'Irrelevant off-topic links, duplicate spam listings or bot comments.',
    },
    {
      id: 'harassment',
      label: 'Harassment or Inappropriate Conduct',
      desc: 'Abusive language, hate speech, or threatening communications.',
    },
    {
      id: 'unrelated',
      label: 'Unrelated to Agriculture',
      desc: 'Content completely non-farming or non-rural development in nature.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/reports/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetType,
          targetId,
          targetTitle,
          reason,
          details,
          reportedBy: 'Active Farmer',
        }),
      });

      const data = await res.json();
      setSubmitted(true);
      if (onReportSubmitted && data.report) {
        onReportSubmitted(data.report);
      }
    } catch (err) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-stone-900 text-[#FAF7F0] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-950 text-rose-300 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight font-serif">
                Report Content for Moderation
              </h3>
              <p className="text-[11px] text-stone-400">
                Community Safety & Truth in Agronomy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center text-stone-200 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white rounded-2xl p-3 border border-stone-200 text-xs text-stone-600">
                <span className="font-bold text-stone-900 block truncate">
                  Reporting: {targetTitle}
                </span>
                <span className="text-[10px] text-stone-500 uppercase">
                  Target type: {targetType}
                </span>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800">
                  Select Violation Reason
                </label>
                <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                  {reasonOptions.map((opt) => (
                    <label
                      key={opt.id}
                      className={`p-2.5 rounded-xl border block cursor-pointer transition text-xs ${
                        reason === opt.id
                          ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-400'
                          : 'bg-white border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="radio"
                          name="reason"
                          checked={reason === opt.id}
                          onChange={() => setReason(opt.id)}
                          className="mt-0.5 text-rose-700 focus:ring-rose-600"
                        />
                        <div>
                          <div className="font-bold text-stone-900 text-xs">
                            {opt.label}
                          </div>
                          <div className="text-[11px] text-stone-500 leading-tight mt-0.5">
                            {opt.desc}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Additional Context (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Provide specific details or links to help our moderators evaluate this case..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-rose-800 hover:bg-rose-900 text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{submitting ? 'Submitting Report...' : 'Submit Report for Moderation'}</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#183D29] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">
                Report Submitted Successfully
              </h4>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                Thank you for safeguarding the farming community. Our moderation team has queued this item for investigation.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-[#183D29] text-white py-2 rounded-xl font-bold text-xs transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
