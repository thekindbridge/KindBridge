import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import type { QuerySnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import type { FormState } from '../../types';

type RequestStatus =
  | 'submitted'
  | 'cancelled'
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'rejected';

export interface ServiceRequest {
  id: string;
  userId?: string;
  formData?: FormState;
  status?: RequestStatus;
  createdAt?: unknown;
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
  requestId: string
): Promise<void> => {
  const requestRef = doc(db, 'serviceRequests', requestId);
  await updateDoc(requestRef, {
    status: 'cancelled',
  });
};

/**
 * Subscribe to user requests in real-time
 */
export const subscribeToUserRequests = (
  userId: string,
  callback: (requests: ServiceRequest[]) => void,
  onError?: (error: Error) => void
): (() => void) => {
  const q = query(
    collection(db, 'serviceRequests'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      callback(mapSnapshot(snapshot));
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    }
  );

  return unsubscribe;
};

/**
 * Subscribe to all requests in real-time (Admin only)
 */
