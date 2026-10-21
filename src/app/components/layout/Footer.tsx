import React from 'react';
import { Mail, Phone, MapPin, ArrowUp, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../utils/portfolio-data';

// Chân trang hiển thị thông tin bản quyền, tóm tắt liên hệ và nút cuộn lên đầu trang
export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-lg text-slate-900 dark:text-white">
              <span className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white flex items-center justify-center text-xs">
                Q
              </span>
              <span>{PERSONAL_INFO.fullName}</span>
            </div>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl">
              {PERSONAL_INFO.primaryTitle} • {PERSONAL_INFO.secondaryTitle}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-indigo-500" />
                {PERSONAL_INFO.phone}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-500" />
                {PERSONAL_INFO.email}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                {PERSONAL_INFO.shortAddress}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Built with Vibe Coding & React + Tailwind v4
            </div>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Lên đầu trang"
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-indigo-600 hover:text-white dark:bg-slate-900 dark:hover:bg-indigo-600 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
