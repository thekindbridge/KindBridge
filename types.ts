
export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: 'Globe' | 'Cpu' | 'Users' | 'Shield' | 'Zap' | 'Heart';
}

export interface ValuePoint {
  title: string;
  description: string;
  iconName: 'ShieldCheck' | 'Sparkles' | 'Handshake';
}

export interface AppUserData {
  uid: string;
  name: string;
  email: string;
  mobile?: string | null;
  education: string;
  college?: string | null;
  createdAt?: unknown;
  role: 'user' | 'admin';
  onboarded?: boolean;
}

export type RequestStatus =
  | 'Submitted'
  | 'In process'
  | 'Completed'
  | 'Rejected'
  | "We'll contact"
  | 'Cancelled'
  | (string & {});

export interface ServiceRequestInput {
  userId: string;
  name: string;
  email: string;
  phoneNumber?: string | null;
  service: string;
  message: string;
}

export interface ServiceRequest extends ServiceRequestInput {
  id: string;
  status: RequestStatus;
  createdAt?: unknown;
  updatedAt?: unknown;
}
