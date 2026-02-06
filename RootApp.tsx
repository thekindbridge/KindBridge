import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AdminRoute, OnboardingRoute, ProtectedRoute, PublicOnlyRoute } from './components/guards/RouteGuards';
import LoginPage from './pages/LoginPage';
import MainAppPage from './pages/MainAppPage';
import OnboardingPage from './pages/OnboardingPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import ProfilePage from './pages/ProfilePage';
import HomeRedirectPage from './pages/HomeRedirectPage';
import RequestFormPage from './pages/RequestFormPage';
import MyRequestsPage from './pages/MyRequestsPage';

const RootApp: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <div className="mesh-bg" />
      <div className="grid-pattern" />

      <Routes>
        <Route path="/" element={<HomeRedirectPage />} />

        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage isDark={isDark} toggleTheme={toggleTheme} />} />
        </Route>

        <Route element={<OnboardingRoute />}>
          <Route path="/onboarding" element={<OnboardingPage isDark={isDark} />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<MainAppPage isDark={isDark} toggleTheme={toggleTheme} />} />
          <Route path="/profile" element={<ProfilePage isDark={isDark} toggleTheme={toggleTheme} />} />
          <Route path="/requests/new" element={<RequestFormPage isDark={isDark} toggleTheme={toggleTheme} />} />
          <Route path="/my-requests" element={<MyRequestsPage isDark={isDark} toggleTheme={toggleTheme} />} />

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminDashboardPage isDark={isDark} toggleTheme={toggleTheme} />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default RootApp;
