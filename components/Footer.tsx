
import React from 'react';
import { BRAND_NAME, CONTACT_EMAIL } from '../constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t dark:border-white/5 border-slate-200 dark:bg-slate-950 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-teal-400 rounded-lg group-hover:rotate-12 transition-transform"></div>
              <span className="text-xl font-bold font-display tracking-tight dark:text-white text-slate-900">{BRAND_NAME}</span>
            </a>
            <p className="dark:text-slate-500 text-slate-500 text-sm max-w-xs text-center md:text-left font-medium">
              The bridge between people, technology, and solutions.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="dark:text-slate-400 text-slate-600 font-bold break-all text-center md:text-right">{CONTACT_EMAIL}</div>
            <div className="dark:text-slate-600 text-slate-400 text-sm font-medium">
              &copy; {currentYear} {BRAND_NAME}. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
