import React, { useState } from 'react';
import {
  Layers,
  Award,
  Cpu,
  CheckCircle,
  Sparkles,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { SectionHeader } from '../ui/SectionHeader';
import { BrandLogoBadge } from '../ui/ProjectBrandLogo';
import { PROJECTS_DATA } from '../../utils/portfolio-data';
import { usePortfolio } from '../../context/PortfolioContext';

type ProjectFilter = 'all' | 'ai-product' | 'interactive-event' | 'analytics-miniapp' | 'it-infrastructure';

const filterButtons: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'Tất cả dự án (6)' },
  { id: 'ai-product', label: 'Generative AI / RAG / Digital Human' },
  { id: 'interactive-event', label: 'Tương tác Đa màn hình' },
  { id: 'analytics-miniapp', label: 'Zalo Mini App & Tracking' },
  { id: 'it-infrastructure', label: 'Hạ tầng Mạng & Thiết bị' },
];

// Khu vực trưng bày các dự án thực chiến kèm Logo Thương hiệu & Sơ đồ Kiến trúc (Case Study Cards)
export const ProjectsShowcase: React.FC = () => {
  const { roleMode } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<ProjectFilter>('all');

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory !== 'all' && project.category !== selectedCategory) {
      return false;
    }
    if (roleMode === 'it-system') {
      return project.roleTag === 'it-system' || project.roleTag === 'all';
    }
    return true;
  });

  return (
    <section id="projects" className="py-14 md:py-20">
      <SectionHeader
        badgeText="Case Studies & Logo Dự Án Thực Chiến"
        title="Các Dự Án Tiêu Biểu Cho"
        highlightText="Tập Đoàn Quốc Tế & Sự Kiện Quốc Gia"
        subtitle="Mỗi dự án dưới đây đi kèm nhận diện thương hiệu đối tác, sơ đồ luồng kiến trúc kỹ thuật (Architecture Pipeline) và các chỉ số đo lường thực tế."
        badgeVariant="indigo"
      />

      {/* Thanh bộ lọc danh mục dự án */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {filterButtons.map((btn) => {
          const isActive = selectedCategory === btn.id;
          return (
            <button
              key={btn.id}
              type="button"
              onClick={() => setSelectedCategory(btn.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
              }`}
            >
              {btn.label}
            </button>
          );
        })}
      </div>

      {/* Lưới hiển thị chi tiết từng dự án */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project, index) => (
          <BentoCard
            key={project.id}
            id={`project-${project.id}`}
            className="flex flex-col justify-between overflow-hidden"
          >
            <div>
              {/* Visual Header Banner với Logo Thương hiệu & Sơ đồ Kiến trúc 3 bước */}
              <div
                className={`p-5 sm:p-6 bg-gradient-to-r ${project.accentGradient} text-white relative overflow-hidden`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  {/* Logo thương hiệu của dự án */}
                  <BrandLogoBadge brandKey={project.brandLogo} size="md" />

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-black/25 backdrop-blur-md border border-white/20">
                      {project.badgeText}
                    </span>
                    <span className="px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-white/15 backdrop-blur-md">
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Sơ đồ luồng kiến trúc trực quan (Architecture Pipeline) */}
                <div className="mt-4 pt-3.5 border-t border-white/20">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-white/80 mb-2">
                    System Architecture Flow:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {project.architectureFlow.map((step, stepIdx) => (
                      <div
                        key={step}
                        className="flex items-center justify-between gap-1.5 px-3 py-2 rounded-xl bg-black/25 backdrop-blur-xs border border-white/15 text-xs font-mono font-semibold"
                      >
                        <span className="truncate">{step}</span>
                        {stepIdx < 2 && (
                          <ArrowRight className="w-3.5 h-3.5 text-amber-300 shrink-0 hidden sm:inline" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nội dung chi tiết dự án */}
              <div className="p-6 sm:p-8 pb-4">
                <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">
                    {project.clientOrEvent}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {project.period}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                  {project.title}
                </h3>
                <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {project.summary}
                </p>

                {/* Chỉ số nổi bật của dự án */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {project.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-800 text-center"
                    >
                      <span className="text-xs font-extrabold text-indigo-700 dark:text-indigo-300 font-mono">
                        {metric}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Đóng góp kỹ thuật */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                    Giải pháp & Đóng góp kỹ thuật:
                  </h4>
                  <ul className="space-y-2">
                    {project.technicalContributions.map((item) => (
                      <li
                        key={item}
                        className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2 leading-relaxed"
                      >
                        <CheckCircle className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Thành tựu đạt được */}
                <div className="mt-4 p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 mb-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Thành tựu thực tế:
                  </h4>
                  <ul className="space-y-1">
                    {project.achievements.map((ach) => (
                      <li
                        key={ach}
                        className="text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 flex items-start gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Danh sách công nghệ sử dụng */}
            <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-slate-400 mr-1" />
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </BentoCard>
        ))}
      </div>
    </section>
  );
};
