import React from 'react';
import {
  Sparkles,
  BrainCircuit,
  Code2,
  BarChart3,
  Server,
  Headset,
  CheckCircle2,
} from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { SectionHeader } from '../ui/SectionHeader';
import { SKILL_GROUPS } from '../../utils/portfolio-data';
import { usePortfolio } from '../../context/PortfolioContext';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  BrainCircuit: <BrainCircuit className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Headset: <Headset className="w-5 h-5" />,
};

const accentBoxClasses: Record<string, string> = {
  indigo: 'bg-indigo-600 text-white shadow-indigo-500/25',
  cyan: 'bg-cyan-600 text-white shadow-cyan-500/25',
  emerald: 'bg-emerald-600 text-white shadow-emerald-500/25',
  amber: 'bg-amber-500 text-white shadow-amber-500/25',
  rose: 'bg-rose-600 text-white shadow-rose-500/25',
  violet: 'bg-violet-600 text-white shadow-violet-500/25',
};

// Khu vực hiển thị 6 nhóm kỹ năng cốt lõi theo bố cục Bento Grid
export const SkillsGrid: React.FC = () => {
  const { roleMode, setRoleMode } = usePortfolio();

  // Sắp xếp đưa nhóm kỹ năng thuộc chế độ đang chọn lên đầu
  const displayedGroups = [...SKILL_GROUPS].sort((a, b) => {
    if (roleMode === 'all') return 0;
    if (a.category === roleMode && b.category !== roleMode) return -1;
    if (a.category !== roleMode && b.category === roleMode) return 1;
    return 0;
  });

  return (
    <section id="skills" className="py-14 md:py-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <SectionHeader
          badgeText="Năng Lực Kỹ Thuật Toàn Diện"
          title="Kỹ Năng Công Nghệ &"
          highlightText="Hệ Sinh Thái Thực Chiến"
          subtitle="Sự kết hợp giữa tư duy phát triển phần mềm bằng AI (Vibe Coding), thuật toán Machine Learning/RAG và năng lực làm chủ hạ tầng phần cứng, mạng sự kiện."
          badgeVariant="cyan"
        />

        {/* Bộ lọc nhanh theo mảng kỹ năng */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto mb-4 md:mb-12">
          <button
            type="button"
            onClick={() => setRoleMode('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              roleMode === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            Tất cả (6 Nhóm)
          </button>
          <button
            type="button"
            onClick={() => setRoleMode('ai-engineer')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              roleMode === 'ai-engineer'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            AI & Full-Stack
          </button>
          <button
            type="button"
            onClick={() => setRoleMode('it-system')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              roleMode === 'it-system'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
            }`}
          >
            IT System & Phần cứng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedGroups.map((group) => {
          const isHighlighted = roleMode === 'all' || group.category === roleMode;
          return (
            <BentoCard
              key={group.id}
              className={`p-6 sm:p-7 flex flex-col justify-between transition-all ${
                isHighlighted
                  ? 'opacity-100 ring-1 ring-transparent'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg ${
                      accentBoxClasses[group.accent]
                    }`}
                  >
                    {iconMap[group.iconName]}
                  </div>
                  <Badge variant={group.accent}>
                    {group.category === 'ai-engineer' ? 'AI & Software' : 'System & Hardware'}
                  </Badge>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {group.subtitle}
                </p>

                <ul className="mt-5 space-y-3.5">
                  {group.items.map((skill) => (
                    <li
                      key={skill.name}
                      className="p-3.5 rounded-2xl bg-slate-50/90 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                          {skill.name}
                        </span>
                        {skill.featured && (
                          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold">
                            Core
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5">
                        {skill.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
};
