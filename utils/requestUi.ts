import type { RequestStatus } from '../types';

export const formatRequestDate = (value: unknown) => {
  if (value && typeof value === 'object' && 'toDate' in value && typeof (value as { toDate: () => Date }).toDate === 'function') {
    return (value as { toDate: () => Date }).toDate().toLocaleString();
  }
  return '-';
};

export const statusClasses = (status: RequestStatus) => {
  switch (status) {
    case 'Completed':
      return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300';
    case 'In process':
      return 'bg-amber-500/15 text-amber-700 dark:text-amber-300';
    case 'Rejected':
      return 'bg-rose-500/15 text-rose-600 dark:text-rose-300';
    case "We'll contact":
      return 'bg-sky-500/15 text-sky-700 dark:text-sky-300';
    case 'Cancelled':
      return 'bg-slate-500/20 text-slate-700 dark:text-slate-300';
    default:
      return 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300';
  }
};
