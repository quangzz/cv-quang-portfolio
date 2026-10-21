import React from 'react';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  id?: string;
}

// Khung thẻ Bento bo góc hiện đại, hỗ trợ hiệu ứng nổi khi di chuột
export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  id,
}) => {
  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/90 shadow-sm ${
        hoverEffect
          ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-300 dark:hover:border-indigo-500/40'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
