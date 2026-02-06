
import React, { useState, useEffect } from 'react';
import { ServiceId, FormState } from '../types';
import { ALL_SERVICES } from '../constants';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuth } from '../src/firebase/useAuth';
import { db } from '../src/firebase/firebase';
import { sendServiceRequestEmail } from '../src/services/emailService';

interface RequestFormProps {
  initialService?: ServiceId | '';
  onNavigate?: (page: string) => void;
}

const RequestForm: React.FC<RequestFormProps> = ({ initialService = '', onNavigate }) => {
  const { currentUser } = useAuth();
  
  const [formData, setFormData] = useState<FormState>({
    name: '',
    contact: '',
    phoneNumber: '',
    service: initialService,
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setFormData(prev => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!currentUser || !currentUser.email) {
      setError('You must be logged in to submit a request.');
      setLoading(false);
      return;
    }

    try {
      const requestRef = doc(collection(db, 'serviceRequests'));
      await setDoc(requestRef, {
        id: requestRef.id,
        userId: currentUser.uid,
        formData,
        status: 'submitted',
        createdAt: serverTimestamp(),
      });

      // Get service name for email
      const selectedService = ALL_SERVICES.find(s => s.id === formData.service);
      const serviceName = selectedService?.title || formData.service;

      try {
        await sendServiceRequestEmail({
          name: formData.name,
          email: formData.contact,
          phoneNumber: formData.phoneNumber || '',
          service: serviceName,
          message: formData.message,
          date: new Date().toLocaleString(),
        });
      } catch (emailErr) {
        console.error('Error sending confirmation email:', emailErr);
      }

      console.log('Request submitted with ID:', requestRef.id);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAnother = () => {
    setIsSubmitted(false);
    setFormData({
      name: '',
      contact: '',
      phoneNumber: '',
      service: '',
      message: '',
    });
    const section = document.getElementById('request');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGoToMyRequests = () => {
    setIsSubmitted(false);
    if (onNavigate) {
      onNavigate('my-requests');
      return;
    }
    const section = document.getElementById('request');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-4xl mx-auto">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      {isSubmitted ? (
        <div className="text-center py-12 animate-fade-in">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">Request submitted</h3>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={handleRequestAnother}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-md shadow-blue-200 dark:shadow-blue-900/20 active:scale-[0.98]"
            >
              Request Another Form
            </button>
            <button
              type="button"
              onClick={handleGoToMyRequests}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-300"
            >
              My Request
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
                className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email or Phone</label>
              <input
                required
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter email or phone"
                className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number <span className="text-slate-400">(Optional)</span></label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Service Category</label>
            <select
              required
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white appearance-none"
            >
              <option value="">Select a service...</option>
              {ALL_SERVICES.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">How can we help you?</label>
            <textarea
              required
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              placeholder="Tell us about your project or requirement..."
              className="w-full px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading || !currentUser}
            className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all transform hover:scale-[1.01] shadow-lg shadow-blue-200 dark:shadow-blue-900/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Requirement'}
          </button>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            By submitting, you agree to our privacy standards and human-centric processing.
          </p>
        </form>
      )}
    </div>
  );
};

export default RequestForm;
