import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { subscribeToUserRequests, updateRequestStatus } from '../firebase/requests';
import type { ServiceRequest } from '../types';
import { formatRequestDate, statusClasses } from '../utils/requestUi';

interface MyRequestsPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const MyRequestsPage: React.FC<MyRequestsPageProps> = ({ isDark, toggleTheme }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const unsubscribe = subscribeToUserRequests(currentUser.uid, (items) => {
      setRequests(items);
      setLoading(false);
    }, (message) => {
      setError(`Could not load your requests: ${message}`);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  const handleCancel = async (requestId: string) => {
    setUpdatingId(requestId);
    setError(null);
    try {
      await updateRequestStatus(requestId, 'Cancelled');
    } catch {
      setError('Could not cancel request. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="pt-28 px-4 md:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <p className={`text-xs uppercase tracking-[0.2em] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Requests</p>
              <h1 className={`mt-2 text-2xl md:text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>My Requests</h1>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/app')}
                className={`h-11 px-4 rounded-xl text-sm font-bold inline-flex items-center justify-center border ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                    : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                Back to Home
              </button>
              <Link
                to="/requests/new"
                className="h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold inline-flex items-center justify-center"
              >
                New Request
              </Link>
            </div>
          </div>

          {error && <p className="mb-4 text-sm text-rose-500">{error}</p>}

          {loading ? (
            <div className="py-16 flex justify-center">
              <div className="w-6 h-6 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
            </div>
          ) : requests.length === 0 ? (
            <div className={`glass rounded-3xl p-8 border text-center ${isDark ? 'border-white/10 bg-slate-900/40' : 'border-slate-200 bg-white/80'}`}>
              <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'} font-medium`}>No requests yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map((item) => (
                <div key={item.id} className={`glass rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-900/40' : 'border-slate-200 bg-white/80'}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h3 className={`text-base font-bold break-words ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.service}</h3>
                    <span className={`px-3 h-7 inline-flex items-center rounded-full text-xs font-bold ${statusClasses(item.status)}`}>{item.status}</span>
                  </div>
                  <p className={`mt-3 text-sm break-words ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.message}</p>
                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Created: {formatRequestDate(item.createdAt)}</p>
                    {item.status === 'Submitted' && (
                      <button
                        type="button"
                        disabled={updatingId === item.id}
                        onClick={() => void handleCancel(item.id)}
                        className="h-9 px-4 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-sm font-semibold disabled:opacity-70"
                      >
                        {updatingId === item.id ? 'Cancelling...' : 'Cancel Request'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default MyRequestsPage;
