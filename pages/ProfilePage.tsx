import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase/config';

interface ProfilePageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ isDark, toggleTheme }) => {
  const { userData, currentUser, reloadUserData } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [education, setEducation] = useState('');
  const [college, setCollege] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const email = useMemo(() => currentUser?.email ?? userData?.email ?? '-', [currentUser?.email, userData?.email]);

  const syncFormFromUserData = () => {
    setName(userData?.name ?? '');
    setMobile(userData?.mobile?.toString() ?? '');
    setEducation(userData?.education ?? '');
    setCollege(userData?.college?.toString() ?? '');
  };

  useEffect(() => {
    if (!isEditing) {
      syncFormFromUserData();
    }
  }, [isEditing, userData]);

  const handleStartEdit = () => {
    syncFormFromUserData();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    syncFormFromUserData();
    setErrorMessage(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!currentUser) {
      setErrorMessage('Could not update profile. Please login again.');
      return;
    }

    if (!education.trim()) {
      setErrorMessage('Education is required.');
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name: name.trim(),
        mobile: mobile.trim() || null,
        education: education.trim(),
        college: college.trim() || null,
      });

      await reloadUserData();
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully.');
      window.setTimeout(() => setSuccessMessage(null), 3000);
    } catch {
      setErrorMessage('Could not save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="pt-28 px-4 md:px-8 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className={`glass rounded-3xl p-6 md:p-8 border transition-all duration-300 ${isDark ? 'border-white/10 bg-slate-900/40' : 'border-slate-200 bg-white/80'}`}>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div>
                <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Profile</p>
                <h1 className={`text-2xl md:text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Your Details</h1>
              </div>
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleStartEdit}
                  className={`px-4 h-10 rounded-xl text-sm font-semibold inline-flex items-center gap-2 border ${isDark ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'}`}
                >
                  <Pencil size={15} />
                  Edit Profile
                </button>
              )}
            </div>

            {successMessage && (
              <div className={`mb-5 rounded-xl px-4 py-3 text-sm font-semibold ${isDark ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className={`mb-5 rounded-xl px-4 py-3 text-sm font-semibold ${isDark ? 'bg-rose-500/15 text-rose-300 border border-rose-500/20' : 'bg-rose-50 text-rose-700 border border-rose-200'}`}>
                {errorMessage}
              </div>
            )}

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300">
                <div className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-200 bg-white/70'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Name</p>
                  <p className={`mt-2 text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{userData?.name ?? '-'}</p>
                </div>
                <div className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-200 bg-white/70'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Email</p>
                  <p className={`mt-2 text-base break-all ${isDark ? 'text-white' : 'text-slate-900'}`}>{email}</p>
                </div>
                <div className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-200 bg-white/70'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Mobile</p>
                  <p className={`mt-2 text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{userData?.mobile || '-'}</p>
                </div>
                <div className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-200 bg-white/70'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Education</p>
                  <p className={`mt-2 text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{userData?.education ?? '-'}</p>
                </div>
                <div className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-200 bg-white/70'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">College</p>
                  <p className={`mt-2 text-base ${isDark ? 'text-white' : 'text-slate-900'}`}>{userData?.college || '-'}</p>
                </div>
                <div className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-950/30' : 'border-slate-200 bg-white/70'}`}>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Role</p>
                  <p className={`mt-2 text-base capitalize ${isDark ? 'text-white' : 'text-slate-900'}`}>{userData?.role ?? 'user'}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 transition-all duration-300">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Name</label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Email</label>
                  <input
                    disabled
                    readOnly
                    type="email"
                    value={email}
                    className={`w-full h-12 px-4 rounded-2xl border cursor-not-allowed ${isDark ? 'bg-slate-900 border-white/10 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Mobile (Optional)</label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+1 555 123 4567"
                    className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Education</label>
                  <input
                    required
                    type="text"
                    value={education}
                    onChange={(e) => setEducation(e.target.value)}
                    className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">College (Optional)</label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className={`w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 ${isDark ? 'bg-slate-950/50 border-white/10 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-600'}`}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => void handleSave()}
                    disabled={isSaving}
                    className="h-11 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSaving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSaving}
                    className={`h-11 px-5 rounded-xl text-sm font-semibold border transition-colors ${isDark ? 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'}`}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6">
              <Link
                to="/app"
                className="inline-flex items-center justify-center px-4 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
              >
                Back to App
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
