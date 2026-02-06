import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { createServiceRequest } from '../firebase/requests';
import { notifyAdminOnNewRequest } from '../services/emailNotifications';
import type { ServiceRequest } from '../types';

interface ServiceRequestFormProps {
  title?: string;
  subtitle?: string;
  initialService?: string;
  showCloseButton?: boolean;
  closeTo?: string;
}

type ToastState = {
  type: 'success' | 'error';
  message: string;
} | null;

const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({
  title = 'Submit a Request',
  subtitle = 'Service Request',
  initialService,
  showCloseButton = false,
  closeTo = '/app',
}) => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const suggestedName = useMemo(() => userData?.name ?? currentUser?.displayName ?? '', [currentUser?.displayName, userData?.name]);
  const email = currentUser?.email ?? userData?.email ?? '';
  const defaultPhoneNumber = useMemo(() => userData?.mobile ?? '', [userData?.mobile]);
  const prefilledService = useMemo(() => {
    if (typeof initialService === 'string') {
      return initialService.trim();
    }
    return (searchParams.get('service') ?? '').trim();
  }, [initialService, searchParams]);
  const [name, setName] = useState(suggestedName);
  const [phoneNumber, setPhoneNumber] = useState(defaultPhoneNumber);
  const [service, setService] = useState(prefilledService);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    setService(prefilledService);
  }, [prefilledService]);

  const resetForm = () => {
    setName(suggestedName);
    setPhoneNumber(defaultPhoneNumber);
    setService(prefilledService);
    setMessage('');
    setError(null);
    setIsSubmitted(false);
  };

  const showToast = (next: ToastState) => {
    setToast(next);
    window.setTimeout(() => setToast(null), 3200);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!currentUser || !email) {
      setError('You need to be logged in to submit a request.');
      showToast({ type: 'error', message: 'You need to be logged in to submit a request.' });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await createServiceRequest({
        userId: currentUser.uid,
        name: name.trim(),
        email,
        phoneNumber: phoneNumber.trim() || null,
        service: service.trim(),
        message: message.trim(),
      });

      setIsSubmitted(true);
      showToast({ type: 'success', message: 'Message received.' });

      const requestForEmail: ServiceRequest = {
        id: 'new',
        userId: currentUser.uid,
        name: name.trim(),
        email,
        phoneNumber: phoneNumber.trim() || null,
        service: service.trim(),
        message: message.trim(),
        status: 'Submitted',
        createdAt: new Date(),
      };

      void notifyAdminOnNewRequest(requestForEmail).catch(() => {
        showToast({ type: 'error', message: 'Request saved, but admin email notification failed.' });
      });
    } catch (submitError) {
      const messageText =
        submitError instanceof Error && submitError.message.toLowerCase().includes('permission')
          ? 'Could not submit request: Firestore permission denied. Publish Firestore rules and try again.'
          : 'Could not submit request. Please try again.';
      setError(messageText);
      showToast({ type: 'error', message: messageText });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="glass rounded-3xl p-6 md:p-8 border dark:border-white/10 border-slate-200 dark:bg-slate-900/40 bg-white/80">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-bold dark:text-slate-400 text-slate-500">{subtitle}</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-bold dark:text-white text-slate-900">{title}</h2>
          </div>
          {showCloseButton && (
            <button
              type="button"
              onClick={() => navigate(closeTo)}
              className="h-10 px-4 rounded-xl text-sm font-semibold border dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:text-slate-200 text-slate-700 dark:hover:bg-white/10 hover:bg-slate-100"
            >
              Close
            </button>
          )}
        </div>

        {!isSubmitted ? (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-950/50 bg-slate-50 dark:border-white/10 border-slate-200 dark:text-white text-slate-900 dark:focus:border-indigo-500 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Email</label>
              <input
                readOnly
                type="email"
                value={email}
                className="w-full h-12 px-4 rounded-2xl border dark:bg-slate-900 bg-slate-100 dark:border-white/10 border-slate-200 dark:text-slate-300 text-slate-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Phone Number (Optional)</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 555 123 4567"
                className="w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-950/50 bg-slate-50 dark:border-white/10 border-slate-200 dark:text-white text-slate-900 dark:focus:border-indigo-500 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Service / Subject</label>
              <input
                required
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g., Consultation, Technical Support"
                className="w-full h-12 px-4 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:bg-slate-950/50 bg-slate-50 dark:border-white/10 border-slate-200 dark:text-white text-slate-900 dark:focus:border-indigo-500 focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.2em] mb-2 text-slate-500">Message</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your request in detail."
                className="w-full px-4 py-3 rounded-2xl border focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none dark:bg-slate-950/50 bg-slate-50 dark:border-white/10 border-slate-200 dark:text-white text-slate-900 dark:focus:border-indigo-500 focus:border-indigo-600"
              />
            </div>

            {error && <p className="text-sm text-rose-500">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        ) : (
          <div className="mt-6 space-y-5">
            <div className="rounded-2xl p-4 border dark:border-emerald-500/30 border-emerald-200 dark:bg-emerald-500/10 bg-emerald-50">
              <p className="dark:text-emerald-300 text-emerald-700 font-semibold">Message received.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={resetForm}
                className="h-11 px-5 rounded-xl font-semibold border dark:bg-white/5 bg-white dark:border-white/10 border-slate-200 dark:text-white text-slate-900 dark:hover:bg-white/10 hover:bg-slate-100"
              >
                Send another request
              </button>
              <Link
                to="/my-requests"
                className="h-11 px-5 rounded-xl font-semibold bg-indigo-600 hover:bg-indigo-500 text-white inline-flex items-center justify-center"
              >
                My Requests
              </Link>
            </div>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[90] px-4 w-full max-w-sm">
          <div className={`rounded-xl px-4 py-3 text-sm font-semibold shadow-xl ${toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'}`}>
            {toast.message}
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceRequestForm;
