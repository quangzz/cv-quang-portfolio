import React from 'react';

type BadgeVariant = 'indigo' | 'cyan' | 'amber' | 'emerald' | 'rose' | 'violet' | 'slate';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  dot?: boolean;
}

const variantClasses: Record<BadgeVariant, string> = {
  indigo:
    'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60',
  cyan:
    'bg-cyan-50 text-cyan-700 border-cyan-200/80 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60',
  amber:
    'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60',
  emerald:
    'bg-emerald-50 text-emerald-700 border-emerald-200/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60',
  rose:
    'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60',
  violet:
    'bg-violet-50 text-violet-700 border-violet-200/80 dark:bg-violet-950/60 dark:text-violet-300 dark:border-violet-800/60',
  slate:
    'bg-slate-100 text-slate-700 border-slate-200/80 dark:bg-slate-800/80 dark:text-slate-300 dark:border-slate-700/70',
};

const dotClasses: Record<BadgeVariant, string> = {
  indigo: 'bg-indigo-500',
  cyan: 'bg-cyan-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  rose: 'bg-rose-500',
  violet: 'bg-violet-500',
  slate: 'bg-slate-500',
};

// Nhãn hiển thị kỹ năng, trạng thái hoặc danh mục dự án
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'indigo',
  className = '',
  dot = false,
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${variantClasses[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
};
