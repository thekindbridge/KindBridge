import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { REQUEST_STATUSES } from '../constants';
import { subscribeToAllRequests, updateRequestStatus } from '../firebase/requests';
import type { RequestStatus, ServiceRequest } from '../types';
import { formatRequestDate, statusClasses } from '../utils/requestUi';

interface AdminDashboardPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

type RequestFilter = 'All' | 'Pending' | 'In Progress' | 'Completed' | 'Rejected' | 'Cancelled';

const filterFromStatus = (status: RequestStatus): Exclude<RequestFilter, 'All'> | null => {
  if (status === 'Submitted' || status === "We'll contact") {
    return 'Pending';
  }
  if (status === 'In process') {
    return 'In Progress';
  }
  if (status === 'Completed') {
    return 'Completed';
  }
  if (status === 'Rejected') {
    return 'Rejected';
  }
  if (status === 'Cancelled') {
    return 'Cancelled';
  }
  return null;
};

const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ isDark, toggleTheme }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<RequestFilter>('All');

  useEffect(() => {
    const unsubscribe = subscribeToAllRequests((items) => {
      setRequests(items);
      setLoadingRequests(false);
    }, (message) => {
      setStatusError(`Could not load requests: ${message}`);
      setLoadingRequests(false);
    });

    return unsubscribe;
  }, []);

  const sortedRequests = useMemo(() => {
    const toMillis = (value: unknown) => {
      if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
        return (value as { toDate: () => Date }).toDate().getTime();
      }
      return 0;
    };

    return [...requests].sort((a, b) => toMillis(b.createdAt) - toMillis(a.createdAt));
  }, [requests]);

  const counts = useMemo(() => {
    const byFilter = (filter: Exclude<RequestFilter, 'All'>) =>
      sortedRequests.filter((item) => filterFromStatus(item.status) === filter).length;

    return {
      total: sortedRequests.length,
      pending: byFilter('Pending'),
      inProgress: byFilter('In Progress'),
      completed: byFilter('Completed'),
      rejected: byFilter('Rejected'),
      cancelled: byFilter('Cancelled'),
    };
  }, [sortedRequests]);

  const filteredRequests = useMemo(() => {
    if (activeFilter === 'All') {
      return sortedRequests;
    }

    return sortedRequests.filter((item) => filterFromStatus(item.status) === activeFilter);
  }, [activeFilter, sortedRequests]);

  const handleStatusChange = async (requestId: string, status: string) => {
    setUpdatingId(requestId);
    setStatusError(null);
    try {
      await updateRequestStatus(requestId, status as RequestStatus);
    } catch {
      setStatusError('Could not update request status. Please retry.');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="min-h-screen px-4 py-8 md:p-10 pt-32 md:pt-36">
        <div className="max-w-6xl mx-auto space-y-6">
          <section id="requests" className={`glass rounded-3xl p-6 md:p-8 border ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
              <div>
                <p className={`text-xs uppercase tracking-[0.2em] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Admin Dashboard</p>
                <h1 className={`text-3xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Kind-Bridge Admin</h1>
              </div>
              <div className="flex flex-wrap items-center lg:justify-end gap-2">
                <Link
                  to="/app"
                  className={`h-11 min-w-[130px] px-4 rounded-xl text-sm font-bold inline-flex items-center justify-center border ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10'
                      : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  Back to App
                </Link>
                <a
                  href="#requests"
                  className="h-11 min-w-[130px] px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold inline-flex items-center justify-center"
                >
                  Requests
                </a>
              </div>
            </div>

            <div className="mb-5">
              <p className={`text-xs uppercase tracking-[0.2em] font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Requests</p>
              <h2 className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>User Requests</h2>
            </div>

            {statusError && <p className="mb-4 text-sm text-rose-500">{statusError}</p>}

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-5">
              <div className={`rounded-2xl p-3 border ${isDark ? 'border-white/10 bg-slate-900/50' : 'border-slate-200 bg-white/80'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Total</p>
                <p className={`text-xl mt-2 font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{counts.total}</p>
              </div>
              <div className={`rounded-2xl p-3 border ${isDark ? 'border-amber-500/20 bg-amber-500/10' : 'border-amber-200 bg-amber-50'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-amber-600">Pending</p>
                <p className={`text-xl mt-2 font-bold ${isDark ? 'text-amber-200' : 'text-amber-700'}`}>{counts.pending}</p>
              </div>
              <div className={`rounded-2xl p-3 border ${isDark ? 'border-blue-500/20 bg-blue-500/10' : 'border-blue-200 bg-blue-50'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">In Progress</p>
                <p className={`text-xl mt-2 font-bold ${isDark ? 'text-blue-200' : 'text-blue-700'}`}>{counts.inProgress}</p>
              </div>
              <div className={`rounded-2xl p-3 border ${isDark ? 'border-emerald-500/20 bg-emerald-500/10' : 'border-emerald-200 bg-emerald-50'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-600">Completed</p>
                <p className={`text-xl mt-2 font-bold ${isDark ? 'text-emerald-200' : 'text-emerald-700'}`}>{counts.completed}</p>
              </div>
              <div className={`rounded-2xl p-3 border ${isDark ? 'border-rose-500/20 bg-rose-500/10' : 'border-rose-200 bg-rose-50'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-rose-600">Rejected</p>
                <p className={`text-xl mt-2 font-bold ${isDark ? 'text-rose-200' : 'text-rose-700'}`}>{counts.rejected}</p>
              </div>
              <div className={`rounded-2xl p-3 border ${isDark ? 'border-slate-500/20 bg-slate-500/10' : 'border-slate-200 bg-slate-100'}`}>
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-600">Cancelled</p>
                <p className={`text-xl mt-2 font-bold ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>{counts.cancelled}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {(['All', 'Pending', 'In Progress', 'Completed', 'Rejected', 'Cancelled'] as RequestFilter[]).map((filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`h-9 px-4 rounded-lg text-sm font-semibold transition-colors border ${
                      isActive
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : isDark
                          ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {loadingRequests ? (
              <div className="py-12 flex justify-center">
                <div className="w-6 h-6 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
              </div>
            ) : filteredRequests.length === 0 ? (
              <div className="py-12 text-center">
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-700'}`}>No requests found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((item) => (
                  <div key={item.id} className={`rounded-2xl p-4 border ${isDark ? 'border-white/10 bg-slate-900/40' : 'border-slate-200 bg-white/70'}`}>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                      <div className="space-y-2">
                        <h3 className={`text-base font-bold break-words ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.service}</h3>
                        <p className={`text-sm break-words ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>{item.message}</p>
                        <p className={`text-xs break-all ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>By {item.name} ({item.email})</p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Phone: {item.phoneNumber?.trim() ? item.phoneNumber : 'Not provided'}</p>
                        <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Created: {formatRequestDate(item.createdAt)}</p>
                      </div>

                      <div className="md:w-56 space-y-2">
                        <span className={`px-3 h-7 inline-flex items-center rounded-full text-xs font-bold ${statusClasses(item.status)}`}>{item.status}</span>
                        <select
                          value={item.status}
                          onChange={(e) => void handleStatusChange(item.id, e.target.value)}
                          disabled={updatingId === item.id}
                          className={`w-full h-10 px-3 rounded-xl border text-sm ${isDark ? 'bg-slate-950/50 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                        >
                          {REQUEST_STATUSES.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default AdminDashboardPage;
