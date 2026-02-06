import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type Unsubscribe,
} from 'firebase/firestore';
import type { RequestStatus, ServiceRequest, ServiceRequestInput } from '../types';
import { db } from './config';

const requestsCollection = collection(db, 'requests');

const mapRequest = (id: string, data: Record<string, unknown>): ServiceRequest => ({
  id,
  userId: String(data.userId ?? ''),
  name: String(data.name ?? data.userName ?? ''),
  email: String(data.email ?? data.userEmail ?? ''),
  phoneNumber: data.phoneNumber ? String(data.phoneNumber) : null,
  service: String(data.service ?? data.subject ?? ''),
  message: String(data.message ?? ''),
  status: String(data.status ?? 'Submitted') as RequestStatus,
  createdAt: data.createdAt,
  updatedAt: data.updatedAt,
});

export const createServiceRequest = async (input: ServiceRequestInput) => {
  const payload = {
    ...input,
    status: 'Submitted' as RequestStatus,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  return addDoc(requestsCollection, payload);
};

export const subscribeToUserRequests = (
  userId: string,
  callback: (requests: ServiceRequest[]) => void,
  onError?: (message: string) => void,
): Unsubscribe => {
  const q = query(requestsCollection, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((item) => mapRequest(item.id, item.data())));
    },
    (error) => {
      onError?.(error.message);
    },
  );
};

export const subscribeToAllRequests = (callback: (requests: ServiceRequest[]) => void, onError?: (message: string) => void): Unsubscribe => {
  const q = query(requestsCollection, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      callback(snapshot.docs.map((item) => mapRequest(item.id, item.data())));
    },
    (error) => {
      onError?.(error.message);
    },
  );
};

export const updateRequestStatus = async (requestId: string, status: RequestStatus) => {
  await updateDoc(doc(db, 'requests', requestId), {
    status,
    updatedAt: serverTimestamp(),
  });
};
