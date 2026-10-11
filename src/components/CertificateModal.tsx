import React from 'react';
import { Award, CheckCircle, Download, Printer, X, ShieldCheck, Sprout } from 'lucide-react';
import { Course } from '../types';

interface CertificateModalProps {
  course: Course;
  studentName: string;
  score: number;
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  studentName,
  score,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const certNumber = `AKH-CERT-${course.id.toUpperCase().slice(7, 13)}-${Date.now().toString().slice(-6)}`;
  const issueDate = new Date().toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border-4 border-emerald-800 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Outer Border Styling */}
        <div className="border-2 border-dashed border-emerald-600/40 p-6 sm:p-8 rounded-2xl text-center space-y-6 relative overflow-hidden bg-gradient-to-b from-stone-50/50 to-emerald-50/30">
          {/* Watermark Seal */}
          <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none">
            <Award className="w-80 h-80 text-emerald-900" />
          </div>

          {/* Header */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-2xl bg-emerald-800 text-white flex items-center justify-center shadow-md">
              <Sprout className="w-8 h-8 text-emerald-300" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
              AgriKnowledge <span className="text-emerald-700">Hub</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-emerald-800 font-bold">
              Agricultural Learning Centre • Kenya
            </div>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
              Certificate of Agricultural Mastery
            </h1>
            <p className="text-xs text-stone-700">This verified record certifies that</p>
          </div>

          {/* Student Name */}
          <div className="py-2 border-b-2 border-emerald-800/40 inline-block px-8 max-w-full">
            <span className="text-2xl sm:text-3xl font-serif font-black text-emerald-950 tracking-wide">
              {studentName || 'Kiprono Cheruiyot'}
            </span>
          </div>

          {/* Body description */}
          <p className="text-xs sm:text-sm text-stone-700 max-w-xl mx-auto leading-relaxed">
            has successfully satisfied all rigorous curriculum modules, field checklists, and achieved a passing score of{' '}
            <strong className="text-emerald-800 font-bold">{score}%</strong> in the comprehensive agricultural examination for:
          </p>

          <div className="bg-white/80 border border-emerald-200 py-3 px-6 rounded-xl inline-block shadow-xs">
            <div className="text-base sm:text-lg font-bold text-stone-900">{course.title}</div>
            <div className="text-xs text-stone-700">{course.durationHours} Hours Practical Field Study • {course.level} Level</div>
          </div>

          {/* Signatures & Verification Details */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center border-t border-stone-200 text-xs">
            <div>
              <div className="font-serif italic text-stone-800 font-bold text-sm">Dr. Beatrice Wambui, PhD</div>
              <div className="text-stone-700 text-[10px] mt-0.5">Dean of Agronomy Instruction</div>
              <div className="text-stone-700 text-[9px]">AgriKnowledge Hub Faculty</div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-700 flex items-center justify-center text-emerald-700 bg-white shadow-xs">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[9px] uppercase font-bold text-emerald-800 mt-1">Verified Credential</span>
            </div>

            <div>
              <div className="font-semibold text-stone-800">{issueDate}</div>
              <div className="text-stone-700 text-[10px] mt-0.5">Date of Examination</div>
              <div className="text-stone-700 text-[9px] font-mono">{certNumber}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons (Print / Close) */}
        <div className="mt-6 flex flex-wrap justify-between items-center gap-3 print:hidden">
          <div className="text-xs text-stone-700">
            Certificate is permanently stored in your AgriKnowledge Hub profile.
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl text-xs font-semibold transition shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>Print Certificate</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-semibold transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
