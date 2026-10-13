import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Lock,
  Sprout,
  Building,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Phone,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { kenyanCounties } from './Navbar';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'forgot';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login } = useAuth();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>(initialMode);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [county, setCounty] = useState('Uasin Gishu');
  const [phone, setPhone] = useState('+254 7');
  const [userRole, setUserRole] = useState<UserRole>('farmer');
  const [farmName, setFarmName] = useState('');
  const [farmingInterests, setFarmingInterests] = useState('Maize, Dairy, Horticulture');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMessage('Please enter your email or username.');
      return;
    }
    login(loginEmail, undefined, 'farmer');
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !email.trim() || !displayName.trim()) {
      setErrorMessage('Please fill in all required registration fields.');
      return;
    }
    // Clean username
    const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    login(email, displayName, userRole);
    onClose();
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FAF7F0] border border-stone-200 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="bg-[#183D29] text-[#FAF7F0] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-200">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight font-serif">
                {mode === 'login' && 'Sign in to AgriHub'}
                {mode === 'register' && 'Create Farmer or Business Account'}
                {mode === 'forgot' && 'Reset Account Password'}
              </h3>
              <p className="text-[11px] text-emerald-200/80">
                {mode === 'login' && 'Access farm records, comments & marketplace'}
                {mode === 'register' && 'Join thousands of farmers & agribusinesses worldwide'}
                {mode === 'forgot' && 'Secure password recovery via email'}
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

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-3 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* LOGIN MODE */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Email Address or Username
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="kiprono@highlandfarms.co.ke"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-stone-800">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage(null);
                    }}
                    className="text-[11px] text-emerald-800 font-bold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant One-Click Profile Access */}
              <div className="pt-2 border-t border-stone-200/80 space-y-2">
                <div className="text-[11px] font-bold text-stone-500 uppercase tracking-wider text-center">
                  Quick Access • One-Click Verified Sign In
                </div>
                <div className="grid grid-cols-2 gap-2 text-left">
                  <button
                    type="button"
                    onClick={() => {
                      login('adams@agriknowledgehub.com', 'Adams Kipkoech Kering', 'admin');
                      onClose();
                    }}
                    className="p-2.5 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-xs transition"
                  >
                    <div className="font-bold text-emerald-950 flex items-center gap-1">
                      <span>Adams Kering</span>
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                    </div>
                    <div className="text-[10px] text-emerald-700">Founder & Tech Lead</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      login('erick@seedhub.co.ke', 'Erick Korir', 'farmer');
                      onClose();
                    }}
                    className="p-2.5 bg-amber-50 hover:bg-amber-100 rounded-xl border border-amber-200 text-xs transition"
                  >
                    <div className="font-bold text-amber-950">Erick Korir</div>
                    <div className="text-[10px] text-amber-700">Grain Farmer, Kitale</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      login('mary@livestockvet.co.ke', 'Dr. Mary Wambui', 'expert');
                      onClose();
                    }}
                    className="p-2.5 bg-indigo-50 hover:bg-indigo-100 rounded-xl border border-indigo-200 text-xs transition"
                  >
                    <div className="font-bold text-indigo-950">Dr. Mary Wambui</div>
                    <div className="text-[10px] text-indigo-700">Veterinary Expert</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      login('orders@nakurufresh.co.ke', 'Nakuru Co-op', 'buyer');
                      onClose();
                    }}
                    className="p-2.5 bg-sky-50 hover:bg-sky-100 rounded-xl border border-sky-200 text-xs transition"
                  >
                    <div className="font-bold text-sky-950">Nakuru Co-op</div>
                    <div className="text-[10px] text-sky-700">Verified Buyer</div>
                  </button>
                </div>
              </div>

              <div className="text-center pt-1 text-xs text-stone-600">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#183D29] hover:underline"
                >
                  Create an account
                </button>
              </div>
            </form>
          )}

          {/* REGISTER MODE */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Unique Username
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. kering_farms"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 font-mono focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Adams Kering"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.co.ke"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Account Type
                </label>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as UserRole)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="farmer">Individual Farmer / Smallholder</option>
                  <option value="buyer">Produce Buyer / Agribusiness</option>
                  <option value="expert">Agronomist / Extension Officer</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
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

                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Phone (M-Pesa)
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Farm or Enterprise Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rift Valley Agro-Demonstration Farm"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Create Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-3 px-4 rounded-xl font-bold text-xs shadow-md transition flex items-center justify-center gap-2 mt-2"
              >
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center pt-1 text-xs text-stone-600">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
                  className="font-bold text-[#183D29] hover:underline"
                >
                  Sign in
                </button>
              </div>
            </form>
          )}

          {/* FORGOT PASSWORD MODE */}
          {mode === 'forgot' && (
            <div className="space-y-4">
              {!forgotSent ? (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Enter the email associated with your account, and we will send a password reset link in accordance with security protocols.
                  </p>
                  <div>
                    <label className="text-xs font-semibold text-stone-800 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs text-stone-900 focus:ring-2 focus:ring-emerald-700 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#183D29] hover:bg-[#122e1f] text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition"
                  >
                    Send Recovery Link
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setMode('login')}
                      className="text-xs font-bold text-stone-600 hover:text-stone-900"
                    >
                      Back to Sign In
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#183D29] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm">
                    Recovery Link Dispatched
                  </h4>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                    If an account is associated with <strong>{forgotEmail}</strong>, an encrypted reset link has been dispatched.
                  </p>
                  <button
                    onClick={() => {
                      setMode('login');
                      setForgotSent(false);
                    }}
                    className="w-full bg-[#183D29] text-white py-2 rounded-xl font-bold text-xs"
                  >
                    Return to Sign In
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
