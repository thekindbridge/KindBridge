import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

interface LoginPageProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ isDark, toggleTheme }) => {
  return (
    <>
      <div className="fixed top-5 left-5 z-[70]">
        <Link
          to="/"
          className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-colors ${isDark ? 'bg-slate-900/80 border-white/10 text-white hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-100'}`}
        >
          Home
        </Link>
      </div>
      <div className="fixed top-5 right-5 z-[70]">
        <button
          onClick={toggleTheme}
          className={`px-4 py-3 rounded-2xl text-sm font-bold border transition-colors ${isDark ? 'bg-slate-900/80 border-white/10 text-yellow-400 hover:bg-slate-800' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-100'}`}
        >
          {isDark ? 'Dark' : 'Light'}
        </button>
      </div>
      <Login isDark={isDark} />
    </>
  );
};

export default LoginPage;
