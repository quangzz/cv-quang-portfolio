import React, { useState } from 'react';
import {
  Sparkles,
  Sun,
  Moon,
  Menu,
  X,
  Cpu,
  Layers,
  Headset,
  Printer,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { RoleMode } from '../../types/portfolio';

const navLinks = [
  { label: 'Giới thiệu', href: '#hero' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Dự án thực chiến', href: '#projects' },
  { label: 'Kinh nghiệm', href: '#experience' },
  { label: 'Học vấn & Hạ tầng', href: '#education' },
  { label: 'Liên hệ', href: '#contact' },
];

const roleModes: { id: RoleMode; label: string; shortLabel: string; icon: React.ReactNode }[] = [
  {
    id: 'all',
    label: 'Hồ sơ Toàn diện (AI + System)',
    shortLabel: 'Tất cả',
    icon: <Layers className="w-3.5 h-3.5" />,
  },
  {
    id: 'ai-engineer',
    label: 'AI Engineer & Creative Tech',
    shortLabel: 'AI Engineer',
    icon: <Sparkles className="w-3.5 h-3.5" />,
  },
  {
    id: 'it-system',
    label: 'IT Helpdesk & System Support',
    shortLabel: 'IT System',
    icon: <Headset className="w-3.5 h-3.5" />,
  },
];

// Thanh điều hướng nổi tích hợp bộ chuyển đổi góc nhìn nhà tuyển dụng (Role Switcher)
export const Navbar: React.FC = () => {
  const { theme, toggleTheme, roleMode, setRoleMode } = usePortfolio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handlePrintCV = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200/70 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Tên thương hiệu cá nhân Phạm Phúc Quang */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Trang chủ Phạm Phúc Quang"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              Q
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                PHẠM PHÚC QUANG
                <span className="hidden xl:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  VIBE CODER
                </span>
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {roleMode === 'it-system'
                  ? 'IT Helpdesk & System Support Specialist'
                  : 'AI-Driven Engineer & Creative Technologist'}
              </span>
            </div>
          </a>

          {/* Menu điều hướng trên màn hình lớn */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Điều hướng chính">
            {navLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400 hover:bg-slate-100/80 dark:hover:bg-slate-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Cụm nút chức năng: Role Switcher, In CV, Đổi giao diện Sáng/Tối */}
          <div className="flex items-center gap-2">
            {/* Bộ lọc chế độ xem CV theo vị trí ứng tuyển */}
            <div
              className="hidden md:flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800"
              role="group"
              aria-label="Chuyển đổi góc nhìn hồ sơ"
            >
              {roleModes.map((mode) => {
                const isActive = roleMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setRoleMode(mode.id)}
                    title={mode.label}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {mode.icon}
                    <span>{mode.shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {/* Nút In / Lưu PDF hồ sơ */}
            <button
              type="button"
              onClick={handlePrintCV}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title="In hoặc Lưu CV dạng PDF"
              aria-label="Lưu hồ sơ PDF"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden xl:inline">Lưu PDF</span>
            </button>

            {/* Nút chuyển đổi Sáng / Tối */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Chuyển sang giao diện tối' : 'Chuyển sang giao diện sáng'}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-slate-700" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Nút mở menu trên điện thoại */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Mở menu điều hướng"
              className="lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Thanh chuyển đổi chế độ hồ sơ trên màn hình Mobile */}
        <div className="flex md:hidden items-center justify-between gap-1 py-2 border-t border-slate-200/60 dark:border-slate-800/60 overflow-x-auto">
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-indigo-500" /> Góc nhìn CV:
          </span>
          <div className="flex items-center gap-1">
            {roleModes.map((mode) => {
              const isActive = roleMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setRoleMode(mode.id)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.shortLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Menu thả xuống trên Mobile */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-900 hover:text-indigo-600"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
