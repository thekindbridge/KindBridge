import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const GuardLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="flex items-center gap-3 text-sm font-semibold text-slate-500">
      <div className="w-5 h-5 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
      <span>Loading account...</span>
    </div>
  </div>
);

export const PublicOnlyRoute: React.FC = () => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <GuardLoader />;
  }

  if (!currentUser) {
    return <Outlet />;
  }

  return <Navigate to={userData?.onboarded ? '/app' : '/onboarding'} replace />;
};

export const ProtectedRoute: React.FC = () => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <GuardLoader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (!userData?.onboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export const OnboardingRoute: React.FC = () => {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return <GuardLoader />;
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.onboarded) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};

export const AdminRoute: React.FC = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return <GuardLoader />;
  }

  if (!isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return <Outlet />;
};
