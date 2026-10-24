import React from 'react';
import { Calendar, Sparkles, Server, CheckCircle2 } from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { SectionHeader } from '../ui/SectionHeader';
import { BrandLogoBadge } from '../ui/ProjectBrandLogo';
import { EXPERIENCE_DATA } from '../../utils/portfolio-data';
import { usePortfolio } from '../../context/PortfolioContext';

// Timeline kinh nghiệm làm việc tại URAH Network và TriAn Corp kèm Logo công ty
export const ExperienceTimeline: React.FC = () => {
  const { roleMode } = usePortfolio();

  return (
    <section id="experience" className="py-14 md:py-20">
      <SectionHeader
        badgeText="Hành Trình Sự Nghiệp"
        title="Kinh Nghiệm"
        highlightText="Làm Việc"
        subtitle="Từ thực tập sinh Machine Learning đến AI Engineer và quản trị hệ thống CNTT."
        badgeVariant="emerald"
      />

      <div className="space-y-6">
        {EXPERIENCE_DATA.map((exp) => (
          <BentoCard key={exp.id} className="p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200/70 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <BrandLogoBadge brandKey={exp.brandLogo} size="md" />
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {exp.company}
                    </span>
                    {exp.isCurrent && (
                      <Badge variant="emerald" dot>
                        Đang công tác
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                    {roleMode === 'it-system' ? exp.itRoleTitle : exp.aiRoleTitle}
                  </h3>

                  {roleMode === 'all' && (
                    <p className="text-xs sm:text-sm font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                      Kiêm nhiệm: {exp.itRoleTitle}
                    </p>
                  )}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-mono font-bold self-start lg:self-center shrink-0">
                <Calendar className="w-4 h-4 text-indigo-500" />
                {exp.period}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Khối trách nhiệm AI & Software */}
              {(roleMode === 'all' || roleMode === 'ai-engineer') && (
                <div
                  className={`p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900/40 ${
                    roleMode === 'ai-engineer' ? 'lg:col-span-2' : ''
                  }`}
                >
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 mb-3">
                    <Sparkles className="w-4 h-4" />
                    Phát triển AI, Phần mềm & Tương tác (AI / Full-Stack):
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.aiHighlights.map((point) => (
                      <li
                        key={point}
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Khối trách nhiệm Quản trị hệ thống & Hỗ trợ CNTT */}
              {(roleMode === 'all' || roleMode === 'it-system') && (
                <div
                  className={`p-5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/25 border border-cyan-100 dark:border-cyan-900/40 ${
                    roleMode === 'it-system' ? 'lg:col-span-2' : ''
                  }`}
                >
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 flex items-center gap-1.5 mb-3">
                    <Server className="w-4 h-4" />
                    Quản trị Hệ thống, Hạ tầng Mạng & IT Helpdesk:
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.itHighlights.map((point) => (
                      <li
                        key={point}
                        className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Từ khóa công nghệ */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {exp.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
