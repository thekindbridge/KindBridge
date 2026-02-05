import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { QuerySnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';

type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected' | 'Cancelled';

export interface ServiceRequest {
  id: string;
  userId?: string;
  userEmail?: string;
  userName?: string;
  phoneNumber?: string | null;
  serviceType?: string;
  description?: string;
  status?: RequestStatus;
  createdAt?: unknown;
  cancelledBy?: string;
  cancelledAt?: unknown;
}

const mapSnapshot = (snapshot: QuerySnapshot): ServiceRequest[] => {
  return snapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...(docSnap.data() as Omit<ServiceRequest, 'id'>),
  }));
};

/**
 * Cancel a request from the user side
 */
export const cancelRequest = async (
  requestId: string,
  cancelledBy: string
): Promise<void> => {
  const requestRef = doc(db, 'serviceRequests', requestId);
  await updateDoc(requestRef, {
    status: 'Cancelled',
    cancelledBy,
    cancelledAt: serverTimestamp(),
  });
};

/**
 * Subscribe to user requests in real-time
 */
export const subscribeToUserRequests = (
  userId: string,
  callback: (requests: ServiceRequest[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'serviceRequests'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, (snapshot) => {
    callback(mapSnapshot(snapshot));
  });

  return unsubscribe;
};

/**
 * Subscribe to all requests in real-time (Admin only)
 */
