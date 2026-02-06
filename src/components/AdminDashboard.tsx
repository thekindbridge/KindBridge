import React, { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { formatRequestDate, getStatusColor, getStatusDotColor } from '../utils/requestFormatting';
import type { FormState } from '../../types';

interface ServiceRequest {
  id: string;
  userId?: string;
  formData?: FormState;
  status?: string;
  createdAt?: unknown;
}

const AdminDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const q = query(collection(db, 'serviceRequests'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedRequests = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<ServiceRequest, 'id'>),
        }));
        setRequests(fetchedRequests);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching requests:', err);
        setError('Failed to load requests. Please try again.');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const filteredRequests = filterStatus === 'All'
    ? requests
    : requests.filter(req => (req.status || 'submitted') === filterStatus);

  const stats = {
    total: requests.length,
    submitted: requests.filter(r => (r.status || 'submitted') === 'submitted').length,
    pending: requests.filter(r => r.status === 'pending').length,
    inProgress: requests.filter(r => r.status === 'in_progress').length,
    completed: requests.filter(r => r.status === 'completed').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
    cancelled: requests.filter(r => r.status === 'cancelled').length,
  };

  const handleStatusChange = async (requestId: string, newStatus: string) => {
    setUpdating(requestId);
    try {
      const requestRef = doc(db, 'serviceRequests', requestId);
      await updateDoc(requestRef, { status: newStatus });
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update status. Please try again.');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              View all service requests
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg transition-colors font-medium"
          >
            Back to Home
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        {!loading && (
          <div className="grid gap-4 md:grid-cols-7 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-400 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">Submitted</p>
              <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">{stats.submitted}</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-700 dark:text-yellow-400 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">{stats.pending}</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">{stats.inProgress}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
              <p className="text-green-700 dark:text-green-400 text-sm font-medium">Completed</p>
              <p className="text-3xl font-bold text-green-800 dark:text-green-300">{stats.completed}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
              <p className="text-red-700 dark:text-red-400 text-sm font-medium">Rejected</p>
              <p className="text-3xl font-bold text-red-800 dark:text-red-300">{stats.rejected}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 text-sm font-medium">Cancelled</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.cancelled}</p>
            </div>
          </div>
        )}

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {['All', 'submitted', 'pending', 'in_progress', 'completed', 'rejected', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">
              {filterStatus === 'All' ? 'No requests found' : `No ${filterStatus} requests`}
            </p>
          </div>
        ) : (
          /* Requests Table */
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Request Details
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {request.formData?.name || 'Unknown User'}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {request.formData?.contact || 'No contact'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400 max-w-xs">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {request.formData?.service || 'Service'}
                        </p>
                        <p className="truncate">{request.formData?.message || 'No description'}</p>
                        <p className="text-xs mt-1">Phone: {request.formData?.phoneNumber || 'N/A'}</p>
                      </td>
                      <td className="px-6 py-4">
                        {request.status === 'cancelled' ? (
                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                              'cancelled'
                            )}`}
                          >
                            <span className={`w-2 h-2 rounded-full ${getStatusDotColor('cancelled')}`}></span>
                            cancelled
                          </span>
                        ) : (
                          <select
                            value={request.status || 'submitted'}
                            onChange={(e) => handleStatusChange(request.id, e.target.value)}
                            disabled={updating === request.id}
                            className={`px-3 py-1 rounded-full text-sm font-medium border cursor-pointer transition-opacity ${getStatusColor(
                              request.status || 'submitted'
                            )} ${updating === request.id ? 'opacity-50 cursor-not-allowed' : ''} dark:bg-slate-700`}
                          >
                            {request.status === 'submitted' && (
                              <option value="submitted" disabled>
                                submitted
                              </option>
                            )}
                            <option value="pending">pending</option>
                            <option value="in_progress">in_progress</option>
                            <option value="completed">completed</option>
                            <option value="rejected">rejected</option>
                          </select>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                        {formatRequestDate(request.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
