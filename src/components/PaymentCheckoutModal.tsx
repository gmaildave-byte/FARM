import React, { useState } from 'react';
import {
  X,
  Smartphone,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Lock,
  ArrowRight,
  Receipt,
  Download,
  Loader2,
  Phone
} from 'lucide-react';
import { PaymentTransaction } from '../types';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  amountKES: number;
  purpose: 'featured_listing' | 'subscription' | 'verification_fee' | 'ad_banner';
  targetId?: string;
  targetTitle?: string;
  onSuccess: (tx: PaymentTransaction) => void;
}

export const PaymentCheckoutModal: React.FC<PaymentCheckoutModalProps> = ({
  isOpen,
  onClose,
  title,
  amountKES,
  purpose,
  targetId,
  targetTitle,
  onSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [phone, setPhone] = useState('0712345678');
  const [userName, setUserName] = useState('Adams Kipkoech Kering');
  const [step, setStep] = useState<'input' | 'processing' | 'success' | 'failed'>('input');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedTx, setCompletedTx] = useState<PaymentTransaction | null>(null);

  // Card form state
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('889');

  if (!isOpen) return null;

  const handleInitiateMpesa = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/payments/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          amount: amountKES,
          purpose,
          targetId,
          targetTitle,
          userName,
          userId: 'user-current',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Payment failed to initiate');
      }

      setCompletedTx(data.transaction);
      setStep('success');
      onSuccess(data.transaction);
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment failed. Please verify your phone number and try again.');
      setStep('failed');
    }
  };

  const handleInitiateCard = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setErrorMessage(null);

    try {
      const response = await fetch('/api/payments/card', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cardNumber,
          amount: amountKES,
          purpose,
          targetId,
          targetTitle,
          userName,
          userId: 'user-current',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Card authorization failed');
      }

      setCompletedTx(data.transaction);
      setStep('success');
      onSuccess(data.transaction);
    } catch (err: any) {
      setErrorMessage(err.message || 'Card authorization failed. Please check details.');
      setStep('failed');
    }
  };

  const handleDownloadReceipt = () => {
    if (!completedTx) return;
    const receiptText = `=========================================
AGRIKNOWLEDGE HUB — OFFICIAL RECEIPT
Trusted Agricultural Knowledge. Stronger Farming. Better Markets.
Founded & Developed by Adams Kipkoech Kering
=========================================
Receipt Number: ${completedTx.mpesaReceipt || completedTx.transactionRef}
Reference:      ${completedTx.transactionRef}
Date & Time:    ${new Date(completedTx.createdAt).toLocaleString()}
Customer:       ${completedTx.userName}
Phone/Account:  ${completedTx.userPhone}
Item / Plan:    ${completedTx.targetTitle || title}
Payment Method: ${completedTx.paymentMethod.toUpperCase()}
Status:         COMPLETED (VERIFIED)
=========================================
TOTAL PAID:     KES ${completedTx.amountKES.toLocaleString()}
=========================================
Thank you for supporting sustainable farming in Kenya!
Questions? Email: support@agriknowledge.co.ke
`;
    const blob = new Blob([receiptText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `receipt_${completedTx.mpesaReceipt || 'tx'}.txt`;
    link.click();
  };

  const resetAndClose = () => {
    setStep('input');
    setErrorMessage(null);
    setCompletedTx(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-[#183D29] text-[#FAF7F0] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight font-serif">
                Secure Agricultural Checkout
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                Encrypted Kenyan Payment Gateway
              </p>
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-900 flex items-center justify-center text-emerald-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {step === 'input' && (
            <>
              {/* Order Summary Card */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200/90 shadow-2xs space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Item Details
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {targetTitle || title}
                    </h4>
                    <p className="text-xs text-stone-600">
                      AgriKnowledge Hub Services
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-stone-500 font-medium">Total: </span>
                    <span className="text-base font-extrabold text-[#183D29]">
                      KES {amountKES.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-800">
                  Choose Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('mpesa')}
                    className={`flex items-center justify-center gap-2.5 py-3 px-3 rounded-2xl border text-xs font-bold transition ${
                      paymentMethod === 'mpesa'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <div className="w-3 h-3 rounded-full bg-emerald-600" />
                    <span>M-PESA (Kenya)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-center justify-center gap-2.5 py-3 px-3 rounded-2xl border text-xs font-bold transition ${
                      paymentMethod === 'card'
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-600/20'
                        : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-stone-600" />
                    <span>Card (Visa/Mastercard)</span>
                  </button>
                </div>
              </div>

              {/* M-Pesa Form */}
              {paymentMethod === 'mpesa' && (
                <form onSubmit={handleInitiateMpesa} className="space-y-4 pt-1">
                  <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-3.5 flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-900 leading-relaxed">
                      <strong>Direct STK Push:</strong> An instant PIN prompt will appear on your Safaricom phone. Confirming your PIN completes the payment.
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      Safaricom M-Pesa Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500 text-xs font-medium">
                        <Phone className="w-3.5 h-3.5 mr-1" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0712345678 or 0110123456"
                        className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                      />
                    </div>
                    <p className="text-[11px] text-stone-500">
                      Supported formats: 07XX XXX XXX or 01XX XXX XXX
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <span>Pay KES {amountKES.toLocaleString()} via M-Pesa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Card Form */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleInitiateCard} className="space-y-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-800">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 4242 4242 4242"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-800">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-stone-800">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2.5 text-xs text-stone-900 font-medium focus:ring-2 focus:ring-emerald-700 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Authorize KES {amountKES.toLocaleString()}</span>
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <Lock className="w-3 h-3 text-emerald-700" />
                <span>256-bit SSL encrypted • Daraja API Verified</span>
              </div>
            </>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#183D29] flex items-center justify-center mx-auto animate-pulse">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <div className="space-y-1.5">
                <h4 className="font-bold text-stone-900 text-sm">
                  {paymentMethod === 'mpesa' ? 'Awaiting M-Pesa Confirmation' : 'Authorizing Card Transaction'}
                </h4>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  {paymentMethod === 'mpesa'
                    ? `We sent an STK prompt to ${phone}. Please enter your M-PESA PIN on your mobile device.`
                    : 'Validating card with acquiring bank...'}
                </p>
              </div>
            </div>
          )}

          {step === 'success' && completedTx && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-base">
                  Payment Confirmed!
                </h4>
                <p className="text-xs text-stone-600">
                  Your transaction has been verified and activated immediately.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="bg-white rounded-2xl p-4 border border-stone-200 text-left space-y-2.5 text-xs shadow-2xs">
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="text-stone-500">M-PESA Receipt</span>
                  <span className="font-mono font-bold text-emerald-800">
                    {completedTx.mpesaReceipt || completedTx.transactionRef}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Amount Paid</span>
                  <span className="font-bold text-stone-900">
                    KES {completedTx.amountKES.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-stone-100 pb-2">
                  <span className="text-stone-500">Reference</span>
                  <span className="font-mono text-stone-700 text-[11px]">
                    {completedTx.transactionRef}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-stone-500">Service</span>
                  <span className="font-medium text-stone-800">
                    {completedTx.targetTitle || title}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadReceipt}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 py-2.5 px-3 rounded-xl font-semibold text-xs transition flex items-center justify-center gap-1.5 border border-stone-300"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="flex-1 bg-[#183D29] hover:bg-[#122e1f] text-white py-2.5 px-3 rounded-xl font-bold text-xs shadow-md transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}

          {step === 'failed' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-stone-900 text-sm">
                  Transaction Could Not Be Completed
                </h4>
                <p className="text-xs text-rose-600 max-w-xs mx-auto">
                  {errorMessage || 'Payment was cancelled or timed out. Please try again.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep('input')}
                className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
