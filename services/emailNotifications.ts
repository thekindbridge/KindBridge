import emailjs from '@emailjs/browser';
import type { ServiceRequest } from '../types';

const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

const formatDateTime = (value: unknown) => {
  const date =
    value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function'
      ? (value as { toDate: () => Date }).toDate()
      : new Date();

  const formatted = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);

  return formatted.replace('am', 'AM').replace('pm', 'PM');
};

export const notifyAdminOnNewRequest = async (request: ServiceRequest) => {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error('EmailJS environment variables are missing');
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      name: request.name,
      email: request.email,
      phoneNumber: request.phoneNumber?.trim() ? request.phoneNumber : 'Not provided',
      service: request.service,
      message: request.message,
      date: formatDateTime(request.createdAt),
    },
    { publicKey },
  );
};
