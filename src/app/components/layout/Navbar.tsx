import React, { useEffect, useState } from 'react';
import {
  Sun,
  Moon,
  Menu,
  X,
  Printer,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

const navLinks = [
  { label: 'Giới thiệu', href: '#hero' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Kinh nghiệm', href: '#experience' },
  { label: 'Liên hệ', href: '#contact' },
];

// Thanh điều hướng tối giản, hiện đại theo phong cách Floating Glassmorphism
export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = usePortfolio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.href.replace(/^#/, ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/60 dark:border-slate-800/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo & Họ tên tối giản */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 min-w-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            aria-label="Trang chủ Phạm Phúc Quang"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-500 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform shrink-0">
              Q
            </div>
            <span className="truncate font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Phạm Phúc Quang
            </span>
          </a>

          {/* Menu điều hướng chính gọn gàng */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Điều hướng chính">
            {navLinks.map((item) => {
              const sectionId = item.href.replace(/^#/, '');
              const isActive = activeId === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-colors ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Cụm công cụ tinh gọn bên phải */}
          <div className="flex items-center gap-2">
            {/* Nút In PDF dạng Icon gọn gàng */}
            <button
              type="button"
              onClick={() => window.print()}
              title="In hoặc Lưu CV PDF"
              aria-label="Lưu hồ sơ PDF"
              className="hidden sm:inline-flex p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Nút Đổi giao diện Sáng / Tối */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Chế độ tối' : 'Chế độ sáng'}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Nút Menu trên Mobile */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav"
              className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu thả xuống trên Mobile */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav"
          className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1"
        >
          {navLinks.map((item) => {
            const sectionId = item.href.replace(/^#/, '');
            const isActive = activeId === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-50 dark:hover:bg-slate-900 hover:text-indigo-600 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};
