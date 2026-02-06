export const formatRequestDate = (value: unknown): string => {
  if (!value) return 'N/A';
  if (typeof value === 'number' || typeof value === 'string') {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'N/A';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (typeof value === 'object' && value !== null && 'seconds' in (value as { seconds: number })) {
    const date = new Date((value as { seconds: number }).seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return 'N/A';
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'submitted':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-700';
    case 'pending':
      return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700';
    case 'in_progress':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 border-blue-300 dark:border-blue-700';
    case 'completed':
      return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 border-green-300 dark:border-green-700';
    case 'rejected':
      return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border-red-300 dark:border-red-700';
    case 'cancelled':
      return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
    default:
      return 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-400 border-slate-300 dark:border-slate-700';
  }
};

export const getStatusDotColor = (status: string): string => {
  switch (status) {
    case 'submitted':
      return 'bg-blue-400';
    case 'pending':
      return 'bg-yellow-400';
    case 'in_progress':
      return 'bg-blue-400';
    case 'completed':
      return 'bg-green-400';
    case 'rejected':
      return 'bg-red-400';
    case 'cancelled':
      return 'bg-slate-400';
    default:
      return 'bg-slate-400';
  }
};
