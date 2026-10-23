import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { RoleMode } from '../types/portfolio';

interface PortfolioContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  roleMode: RoleMode;
  setRoleMode: (mode: RoleMode) => void;
  isMounted: boolean;
}

const PortfolioContext = createContext<PortfolioContextValue | undefined>(undefined);

// Provider quản lý giao diện Sáng/Tối và chế độ hiển thị hồ sơ tuân thủ chuẩn an ninh URAH Network
export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('quang_portfolio_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    }
    return 'light';
  });

  const [roleMode, setRoleMode] = useState<RoleMode>('all');

  // Auto-wipe các khóa token nhạy cảm cũ trong localStorage theo chuẩn CWE-522 (frontend-security-audit)
  useEffect(() => {
    setIsMounted(true);
    const sensitiveKeys = ['token', 'accessToken', 'jwt', 'auth'];
    sensitiveKeys.forEach((key) => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // Đồng bộ class 'dark' lên thẻ html và lưu tùy chọn giao diện
  useEffect(() => {
    const rootElement = document.documentElement;
    if (theme === 'dark') {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
    localStorage.setItem('quang_portfolio_theme', theme);
  }, [theme]);

  // Chuyển sang giao diện sáng khi in PDF và khôi phục lại sau khi in
  useEffect(() => {
    const handleBeforePrint = () => {
      document.documentElement.classList.remove('dark');
    };
    const handleAfterPrint = () => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
      roleMode,
      setRoleMode,
      isMounted,
    }),
    [theme, roleMode, isMounted]
  );

  return <PortfolioContext.Provider value={contextValue}>{children}</PortfolioContext.Provider>;
};

// Custom hook truy cập trạng thái PortfolioContext
export function usePortfolio(): PortfolioContextValue {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio phải được sử dụng bên trong PortfolioProvider');
  }
  return context;
}
