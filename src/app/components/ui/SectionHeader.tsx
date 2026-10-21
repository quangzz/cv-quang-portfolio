import React from 'react';
import { Badge } from './Badge';

interface SectionHeaderProps {
  badgeText: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  badgeVariant?: 'indigo' | 'cyan' | 'amber' | 'emerald' | 'rose' | 'violet';
}

// Tiêu đề chuẩn hóa cho từng phân khu trên trang Landing Page
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  title,
  highlightText,
  subtitle,
  badgeVariant = 'indigo',
}) => {
  return (
    <div className="mb-10 md:mb-12 flex flex-col items-start">
      <Badge variant={badgeVariant} dot className="mb-3 uppercase tracking-wider">
        {badgeText}
      </Badge>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}{' '}
        {highlightText && (
          <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
            {highlightText}
          </span>
        )}
      </h2>
      <p className="mt-2.5 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};
