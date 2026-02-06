import React, { useState } from 'react';
import { Chrome, Sparkles } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import MotionWrapper from './MotionWrapper';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  isDark: boolean;
}

const Login: React.FC<LoginProps> = ({ isDark }) => {
  const { loginWithGoogle, loading } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setIsSigningIn(true);
    setErrorMessage(null);

    try {
      await loginWithGoogle();
    } catch {
      setErrorMessage('Google sign-in failed. Please try again.');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full dark:opacity-100 opacity-50" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[35%] h-[35%] bg-teal-500/10 blur-[120px] rounded-full dark:opacity-100 opacity-50" />

      <MotionWrapper direction="up" className="w-full max-w-md relative z-10">
        <div className={`glass p-8 md:p-10 rounded-[2.5rem] border shadow-2xl transition-all duration-500 ${isDark ? 'dark:border-white/10 bg-slate-900/40' : 'border-slate-200 bg-white/70'}`}>
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-teal-400 mb-6 shadow-xl shadow-indigo-500/20 transform hover:rotate-12 transition-transform duration-500">
              <span className="text-white font-bold text-xl">KB</span>
            </div>
            <h1 className={`text-3xl font-bold font-display tracking-tight mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Welcome to <span className="gradient-text">{BRAND_NAME}</span>
            </h1>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sign in with Google to continue
            </p>
          </div>

          <button
            type="button"
            onClick={() => void handleGoogleLogin()}
            disabled={isSigningIn || loading}
            className={`w-full h-14 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed border ${isDark ? 'bg-white text-slate-900 border-white hover:bg-slate-100' : 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'}`}
          >
            {isSigningIn || loading ? (
              <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
            ) : (
              <>
                <Chrome size={18} />
                Continue with Google
              </>
            )}
          </button>

          {errorMessage && <p className="mt-4 text-sm text-rose-500 font-medium text-center">{errorMessage}</p>}

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Google account only. No password or email-link login.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs font-medium dark:text-teal-400/50 text-teal-600/50 uppercase tracking-[0.2em]">
          <Sparkles size={12} />
          <span>Innovating Human Connectivity</span>
        </div>
      </MotionWrapper>
    </div>
  );
};

export default Login;
