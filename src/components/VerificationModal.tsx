import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Building,
  GraduationCap,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  ArrowRight,
  Clock,
  Check
} from 'lucide-react';
import { kenyanCounties } from './Navbar';
import { VerificationApplication } from '../types';

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: {
    id: string;
    name: string;
    email: string;
    county: string;
  };
  onApplicationSubmitted: (app: VerificationApplication) => void;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onApplicationSubmitted,
}) => {
  const [selectedTier, setSelectedTier] = useState<
    'farmer_verified' | 'business_verified' | 'professional_verified'
  >('farmer_verified');

  const [businessOrFarmName, setBusinessOrFarmName] = useState('Highland Organic Farm');
  const [idOrRegNumber, setIdOrRegNumber] = useState('');
  const [county, setCounty] = useState(currentUser.county || 'Uasin Gishu');
  const [userPhone, setUserPhone] = useState('+254 712 345 678');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<VerificationApplication | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const names = Array.from(e.target.files).map(f => f.name);
      setUploadedFiles(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      setErrorMessage('Please accept the verification terms and privacy agreement.');
      return;
    }
    if (uploadedFiles.length === 0) {
      setErrorMessage('Please attach at least one verification document (ID or Registration certificate).');
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/verification/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          userName: currentUser.name,
          userEmail: currentUser.email,
          userPhone,
          tier: selectedTier,
          businessOrFarmName,
          idOrRegNumber,
          county,
          documentNames: uploadedFiles,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application');
      }

      setSubmittedApp(data.application);
      onApplicationSubmitted(data.application);
    } catch (err: any) {
      setErrorMessage(err.message || 'Submission error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#183D29] text-[#FAF7F0] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight font-serif">
                Account Verification Program
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                Kenya Agricultural Trust & Safety Framework
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {!submittedApp ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Tier Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800">
                  Select Verification Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedTier('farmer_verified')}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      selectedTier === 'farmer_verified'
                        ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-600/20'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <ShieldCheck className="w-4 h-4 text-emerald-700 mb-1" />
                      <div className="font-bold text-xs text-stone-900">Farmer ID</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">National ID verification</div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 mt-2">Free</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('business_verified')}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      selectedTier === 'business_verified'
                        ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-600/20'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <Building className="w-4 h-4 text-emerald-700 mb-1" />
                      <div className="font-bold text-xs text-stone-900">Agribusiness</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">CR12 / Registration</div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 mt-2">Verified Seller</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('professional_verified')}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      selectedTier === 'professional_verified'
                        ? 'bg-emerald-50 border-emerald-700 ring-2 ring-emerald-600/20'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div>
                      <GraduationCap className="w-4 h-4 text-emerald-700 mb-1" />
                      <div className="font-bold text-xs text-stone-900">Agronomist / Vet</div>
                      <div className="text-[10px] text-stone-500 mt-0.5">KVB / Degree</div>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-800 mt-2">Expert Badge</span>
                  </button>
                </div>
              </div>

              {/* Requirements & Transparency Disclosure */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-xs space-y-2 text-stone-700">
                <div className="font-bold text-stone-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Processing Time: 24 to 48 business hours</span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Verification ensures trust for buyers and sellers across Kenya. We verify against the Registrar of Persons and official agricultural registries. <strong>Uploaded documents are encrypted and never shown publicly.</strong>
                </p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    {selectedTier === 'business_verified'
                      ? 'Registered Business / Entity Name'
                      : 'Farm / Enterprise Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={businessOrFarmName}
                    onChange={(e) => setBusinessOrFarmName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-stone-800 block mb-1">
                      {selectedTier === 'farmer_verified'
                        ? 'Kenyan National ID Number'
                        : selectedTier === 'business_verified'
                        ? 'BN / CPR Registration No.'
                        : 'KVB / License Number'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={selectedTier === 'farmer_verified' ? 'e.g. 28491820' : 'e.g. CPR/2021/1094'}
                      value={idOrRegNumber}
                      onChange={(e) => setIdOrRegNumber(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-stone-800 block mb-1">
                      County
                    </label>
                    <select
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    >
                      {kenyanCounties.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Official Contact Phone (for verification SMS)
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                {/* Document Upload Area */}
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Upload Supporting Documents (ID, Certificate, Permit)
                  </label>
                  <div className="border-2 border-dashed border-stone-300 hover:border-emerald-600 rounded-2xl p-4 text-center bg-white cursor-pointer transition relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf"
                      onChange={handleSimulateFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <Upload className="w-6 h-6 text-emerald-800 mx-auto mb-1.5" />
                    <div className="text-xs font-bold text-stone-800">
                      Click to upload documents or drag & drop
                    </div>
                    <div className="text-[10px] text-stone-500">
                      PDF, JPG, PNG up to 10MB per file
                    </div>
                  </div>

                  {/* Attached files list */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {uploadedFiles.map((fn, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-900"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="truncate">{fn}</span>
                          </div>
                          <span className="text-[10px] text-emerald-700 font-semibold">Attached</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2.5 text-xs text-stone-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>
                    I confirm that the submitted identification and business information is genuine and complies with the Kenya Data Protection Act 2019. I understand false representations will result in permanent account termination.
                  </span>
                </label>
              </div>

              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{submitting ? 'Submitting Application...' : 'Submit Verification Application'}</span>
              </button>
            </form>
          ) : (
            /* Success confirmation */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#183D29] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-base">
                  Verification Application Received
                </h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                  Your application reference is <strong>{submittedApp.id}</strong>. Our compliance team will review your credentials within 24–48 hours.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-stone-500">Tier:</span>
                  <span className="font-semibold text-stone-900 capitalize">
                    {submittedApp.tier.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Status:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200 text-[11px]">
                    Pending Review
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Submitted:</span>
                  <span className="text-stone-800">
                    {new Date(submittedApp.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition"
              >
                Close & Return to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
