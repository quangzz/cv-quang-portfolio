import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Layers,
  Headset,
  Printer,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { RoleMode } from '../../types/portfolio';

const navLinks = [
  { label: 'Giới thiệu', href: '#hero' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Kinh nghiệm', href: '#experience' },
  { label: 'Liên hệ', href: '#contact' },
];

const roleModes: { id: RoleMode; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Tất cả', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'ai-engineer', label: 'AI', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'it-system', label: 'IT', icon: <Headset className="w-3.5 h-3.5" /> },
];

// Thanh điều hướng tối giản, hiện đại theo phong cách Floating Glassmorphism
export const Navbar: React.FC = () => {
  const { theme, toggleTheme, roleMode, setRoleMode } = usePortfolio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-500 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:scale-105 transition-transform">
              Q
            </div>
            <span className="hidden sm:inline font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
              Phạm Phúc Quang
            </span>
          </a>

          {/* Menu điều hướng chính gọn gàng */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Điều hướng chính">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Cụm công cụ tinh gọn bên phải */}
          <div className="flex items-center gap-2">
            {/* Chuyển nhanh chế độ: Tất cả | AI | IT */}
            <div
              className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800"
              role="group"
              aria-label="Chế độ hồ sơ"
            >
              {roleModes.map((mode) => {
                const isActive = roleMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setRoleMode(mode.id)}
                    aria-label={mode.label}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {mode.icon}
                    <span className="hidden sm:inline">{mode.label}</span>
                  </button>
                );
              })}
            </div>

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
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-900 hover:text-indigo-600"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
