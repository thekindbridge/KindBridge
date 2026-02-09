import React, { useMemo, useState } from 'react';
import { serverTimestamp, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ADMIN_EMAIL } from '../constants';
import { db } from '../firebase/config';

interface OnboardingPageProps {
  isDark: boolean;
}

const suggestName = (email: string) => {
  const prefix = email.split('@')[0]?.trim() ?? '';
  return prefix
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
};

const OnboardingPage: React.FC<OnboardingPageProps> = ({ isDark }) => {
  const { currentUser, reloadUserData } = useAuth();
  const navigate = useNavigate();
  const email = currentUser?.email ?? '';
  const defaultName = useMemo(() => suggestName(email), [email]);

  const [name, setName] = useState(defaultName);
  const [mobile, setMobile] = useState('');
  const [education, setEducation] = useState('');
  const [college, setCollege] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser || !email) {
      setError('No authenticated user found. Please login again.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        uid: currentUser.uid,
        name: name.trim(),
        email,
        mobile: mobile.trim() || null,
        education: education.trim(),
        college: college.trim() || null,
        createdAt: serverTimestamp(),
        role: email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'user',
        onboarded: true,
      });

      await reloadUserData();
      navigate('/app', { replace: true });
    } catch (saveError) {
      setError('Could not save your details. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 md:p-10 flex items-center justify-center">
      <div className={`w-full max-w-lg glass p-6 md:p-8 rounded-3xl border ${isDark ? 'border-white/10 bg-slate-900/40' : 'border-slate-200 bg-white/80'}`}>
        <h1 className={`text-2xl md:text-3xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>Complete Your Profile</h1>
        <p className={`mt-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          One quick step before entering the app.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className={`block text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Name
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Mobile Number (Optional)
            </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="+91 9876543210"
              className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Email
            </label>
            <input
              required
              readOnly
              type="email"
              value={email}
              className={`w-full h-12 px-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              Education
            </label>
            <input
              required
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g., B.Tech, MBA, 12th Grade"
              className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
            />
          </div>

          <div>
            <label className={`block text-xs font-bold uppercase tracking-[0.2em] mb-2 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
              College (Optional)
            </label>
            <input
              type="text"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="Your college"
              className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
            />
          </div>

          {error && <p className="text-sm text-rose-500 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingPage;
