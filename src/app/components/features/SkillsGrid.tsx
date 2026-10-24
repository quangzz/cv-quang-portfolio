import React, { useState } from 'react';
import {
  Sparkles,
  BrainCircuit,
  Code2,
  BarChart3,
  Server,
  Headset,
  CheckCircle2,
  ChevronDown,
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
  const { roleMode } = usePortfolio();
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  const toggleGroupDetails = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Sắp xếp đưa nhóm kỹ năng thuộc chế độ đang chọn lên đầu
  const displayedGroups = [...SKILL_GROUPS].sort((a, b) => {
    if (roleMode === 'all') return 0;
    if (a.category === roleMode && b.category !== roleMode) return -1;
    if (a.category !== roleMode && b.category === roleMode) return 1;
    return 0;
  });

  return (
    <section id="skills" className="py-14 md:py-20">
      <SectionHeader
        badgeText="Năng Lực Kỹ Thuật Toàn Diện"
        title="Kỹ Năng"
        highlightText="Công Nghệ"
        subtitle="Phát triển phần mềm với AI, Machine Learning/RAG và quản trị hạ tầng phần cứng, mạng sự kiện."
        badgeVariant="cyan"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {displayedGroups.map((group) => {
          const isHighlighted = roleMode === 'all' || group.category === roleMode;
          const isExpanded = Boolean(expandedGroups[group.id]);
          const detailsId = `skill-details-${group.id}`;
          return (
            <BentoCard
              key={group.id}
              className={`p-5 sm:p-7 flex flex-col justify-between transition-all ${
                isHighlighted
                  ? roleMode !== 'all'
                    ? 'opacity-100 ring-2 ring-indigo-500/40'
                    : 'opacity-100 ring-1 ring-transparent'
                  : 'opacity-80 hover:opacity-100'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center shadow-lg ${
                      accentBoxClasses[group.accent]
                    }`}
                  >
                    {iconMap[group.iconName]}
                  </div>
                  <Badge variant={group.accent}>
                    {group.category === 'ai-engineer' ? 'AI & Software' : 'System & Hardware'}
                  </Badge>
                </div>

                <h3 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {group.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  {group.subtitle}
                </p>

                <ul id={detailsId} className="mt-3 space-y-2">
                  {group.items.map((skill) => (
                    <li key={skill.name}>
                      <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                        {skill.name}
                      </span>
                      <p
                        className={`mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-5.5 ${
                          isExpanded ? 'block' : 'hidden print:block'
                        }`}
                      >
                        {skill.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  onClick={() => toggleGroupDetails(group.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </BentoCard>
          );
        })}
      </div>
    </section>
  );
};
