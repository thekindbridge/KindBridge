const STORAGE_KEY = 'requests';

type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected' | 'Cancelled';

export interface ServiceRequest {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  phoneNumber?: string;
  serviceType: string;
  description: string;
  status: RequestStatus;
  createdAt: number;
  cancelledBy?: string;
  cancelledAt?: number;
}

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const readRequests = (): ServiceRequest[] => {
  if (!isBrowser) return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to parse requests from storage:', error);
    return [];
  }
};

const sortRequests = (requests: ServiceRequest[]): ServiceRequest[] => {
  return [...requests].sort((a, b) => b.createdAt - a.createdAt);
};

const subscribers = new Set<(requests: ServiceRequest[]) => void>();
let storageListenerAttached = false;

const notifySubscribers = () => {
  const requests = sortRequests(readRequests());
  subscribers.forEach((callback) => callback(requests));
};

const ensureStorageListener = () => {
  if (!isBrowser || storageListenerAttached) return;
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) {
      notifySubscribers();
    }
  });
  storageListenerAttached = true;
};

const writeRequests = (requests: ServiceRequest[]) => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  notifySubscribers();
};

const generateId = (): string => {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
};

/**
 * Submit a new service request
 */
export const submitServiceRequest = async (
  userId: string,
  userEmail: string,
  userName: string,
  serviceType: string,
  description: string,
  phoneNumber?: string
): Promise<string> => {
  const requestId = generateId();
  const newRequest: ServiceRequest = {
    id: requestId,
    userId,
    userEmail,
    userName,
    phoneNumber: phoneNumber || undefined,
    serviceType,
    description,
    status: 'Pending',
    createdAt: Date.now(),
  };

  const updatedRequests = [newRequest, ...readRequests()];
  writeRequests(updatedRequests);

  return requestId;
};

/**
 * Get all service requests for a specific user
 */
export const getUserRequests = async (userId: string): Promise<ServiceRequest[]> => {
  return sortRequests(readRequests().filter((request) => request.userId === userId));
};

/**
 * Get all service requests (Admin only)
 */
export const getAllRequests = async (): Promise<ServiceRequest[]> => {
  return sortRequests(readRequests());
};

/**
 * Update the status of a service request (Admin only)
 */
export const updateRequestStatus = async (
  requestId: string,
  status: RequestStatus
): Promise<void> => {
  const requests = readRequests();
  const updatedRequests = requests.map((request) => {
    if (request.id !== requestId) return request;
    if (status === 'Cancelled') {
      return {
        ...request,
        status,
        cancelledAt: request.cancelledAt || Date.now(),
        cancelledBy: request.cancelledBy || 'admin',
      };
    }
    const { cancelledAt, cancelledBy, ...rest } = request;
    return {
      ...rest,
      status,
    };
  });

  writeRequests(updatedRequests);
};

/**
 * Cancel a request from the user side
 */
export const cancelRequest = async (
  requestId: string,
  cancelledBy: string
): Promise<void> => {
  const requests = readRequests();
  const updatedRequests = requests.map((request) => {
    if (request.id !== requestId) return request;
    return {
      ...request,
      status: 'Cancelled',
      cancelledBy,
      cancelledAt: Date.now(),
    };
  });

  writeRequests(updatedRequests);
};

/**
 * Subscribe to user requests in real-time
 */
export const subscribeToUserRequests = (
  userId: string,
  callback: (requests: ServiceRequest[]) => void
): (() => void) => {
  ensureStorageListener();

  const handler = (requests: ServiceRequest[]) => {
    callback(requests.filter((request) => request.userId === userId));
  };

  subscribers.add(handler);
  handler(sortRequests(readRequests()));

  return () => {
    subscribers.delete(handler);
  };
};

/**
 * Subscribe to all requests in real-time (Admin only)
 */
export const subscribeToAllRequests = (
  callback: (requests: ServiceRequest[]) => void
): (() => void) => {
  ensureStorageListener();

  const handler = (requests: ServiceRequest[]) => {
    callback(requests);
  };

  subscribers.add(handler);
  handler(sortRequests(readRequests()));

  return () => {
    subscribers.delete(handler);
  };
};
