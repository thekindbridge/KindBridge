import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, UserCircle2, LogOut } from 'lucide-react';
import { BRAND_NAME } from '../constants';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const { currentUser, isAdmin, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const showSectionLinks = location.pathname === '/app';
  const isAdminRoute = location.pathname === '/admin';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] w-full max-w-full overflow-x-hidden transition-all duration-500 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className={`absolute inset-0 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
        <div className={`absolute inset-0 backdrop-blur-lg border-b ${isDark ? 'bg-slate-900/80 border-white/5' : 'bg-white/85 border-slate-200'}`} />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative flex items-center justify-between gap-3">
        <Link to={currentUser ? '/app' : '/login'} className="flex items-center gap-3 group shrink-0">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-indigo-500/20" />
            <div className="relative text-white font-bold text-xs">KB</div>
          </div>
          <span className={`text-xl md:text-2xl font-bold font-display tracking-tight group-hover:gradient-text transition-all duration-300 ${isDark ? 'text-white' : 'text-slate-900'}`}>{BRAND_NAME}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {showSectionLinks &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-semibold transition-all relative group ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-400 transition-all group-hover:w-full" />
              </a>
            ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`h-11 w-11 rounded-xl transition-all active:scale-95 border inline-flex items-center justify-center ${isDark ? 'bg-white/5 border-white/10 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
            title="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {!currentUser && (
            <>
              <Link
                to="/login"
                className={`h-11 px-4 rounded-xl border text-sm font-bold transition-colors inline-flex items-center ${isDark ? 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'}`}
              >
                Login
              </Link>
              <Link
                to="/login"
                className="h-11 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-colors inline-flex items-center"
              >
                Get Started
              </Link>
            </>
          )}

          {currentUser && (
            <>
              {!isAdmin && (
                <Link
                  to="/my-requests"
                  className={`h-11 px-4 rounded-xl border text-sm font-bold inline-flex items-center ${isDark ? 'bg-white/5 border-white/10 text-slate-100 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100'}`}
                >
                  My Requests
                </Link>
              )}

              <Link
                to="/profile"
                className={`h-11 px-3 rounded-xl border inline-flex items-center justify-center ${isDark ? 'bg-white/5 border-white/10 text-slate-200 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}
                title="Profile"
              >
                <UserCircle2 size={20} />
              </Link>

              {isAdmin && !isAdminRoute && (
                <Link
                  to="/admin"
                  className="h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-colors inline-flex items-center"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => void logout()}
                className="h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-bold transition-colors inline-flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className={`h-11 w-11 rounded-xl border inline-flex items-center justify-center ${isDark ? 'glass text-yellow-400 border-white/10' : 'bg-slate-100 border-slate-200 text-slate-700'}`}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className={`h-11 w-11 rounded-xl border transition-transform active:scale-90 inline-flex items-center justify-center ${isDark ? 'glass text-white border-white/10' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-50 md:hidden w-full max-w-full overflow-x-hidden transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} ${isDark ? 'bg-slate-950/95' : 'bg-white/95'} backdrop-blur-xl`}>
        <div className="flex flex-col items-center justify-center h-full gap-7 p-8">
          {showSectionLinks &&
            navLinks.map((link, i) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-3xl font-bold font-display transition-all transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {link.name}
              </a>
            ))}

          {!currentUser && (
            <div className={`w-full max-w-xs flex flex-col gap-3 transition-all ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '320ms' }}>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`w-full py-4 rounded-2xl font-bold text-lg text-center border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
              >
                Login
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 rounded-2xl font-bold text-lg text-center bg-indigo-600 text-white"
              >
                Get Started
              </Link>
            </div>
          )}

          {currentUser && (
            <div className={`w-full max-w-xs flex flex-col gap-3 transition-all ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '320ms' }}>
              {!isAdmin && (
                <Link
                  to="/my-requests"
                  onClick={() => setIsOpen(false)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg text-center border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
                >
                  My Requests
                </Link>
              )}
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={`w-full py-4 rounded-2xl font-bold text-lg inline-flex items-center justify-center gap-2 border ${isDark ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}
              >
                <UserCircle2 size={20} />
                Profile
              </Link>
              {isAdmin && !isAdminRoute && (
                <Link
                  to="/admin"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 rounded-2xl font-bold text-lg text-center bg-emerald-600 text-white"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  void logout();
                }}
                className="w-full py-4 rounded-2xl font-bold text-lg inline-flex items-center justify-center gap-2 bg-slate-800 text-white"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
