import React, { useState } from 'react';
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Copy,
  Check,
  ArrowRight,
  GraduationCap,
  Cpu,
  ShieldCheck,
  Zap,
  Award,
} from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { BrandLogoBadge, BrandLogoKey } from '../ui/ProjectBrandLogo';
import { PERSONAL_INFO } from '../../utils/portfolio-data';
import { usePortfolio } from '../../context/PortfolioContext';

const featuredBrands: { key: BrandLogoKey; targetId: string }[] = [
  { key: 'ge-vernova', targetId: '#project-ge-vernova-multiscreen' },
  { key: 'ensure-gold', targetId: '#project-ensure-gold-zalo-miniapp' },
  { key: 'ai-for-good', targetId: '#project-ai-for-good-2026' },
  { key: 'nutifood', targetId: '#project-nutifood-faceswap-video' },
  { key: 'vietnam-80-years', targetId: '#project-historical-ai-ambassador' },
  { key: 'urah-network', targetId: '#experience' },
  { key: 'trian-corp', targetId: '#experience' },
  { key: 'tlu-university', targetId: '#education' },
];

// Tổ hợp Bento mở đầu trang: Giới thiệu cá nhân Phạm Phúc Quang, Dải Logo Thương hiệu & Các con số biết nói
export const HeroBento: React.FC = () => {
  const { roleMode, setRoleMode } = usePortfolio();
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (value: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="hero" className="pt-6 pb-14 md:pt-10 md:pb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Khối Bento chính (Chiếm 8 cột trên màn hình lớn) */}
        <BentoCard className="lg:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          {/* Trang trí quầng sáng nền */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-500/15 via-cyan-400/15 to-amber-400/15 blur-3xl" />

          <div>
            {/* Nhãn trạng thái sẵn sàng làm việc */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <Badge variant="emerald" dot>
                {PERSONAL_INFO.statusText}
              </Badge>
              <Badge variant="indigo">
                <Sparkles className="w-3 h-3" /> Vibe Coding 5x Speed
              </Badge>
            </div>

            {/* Họ tên Phạm Phúc Quang & Chức danh */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Xin chào, tôi là{' '}
              <span className="bg-gradient-to-r from-indigo-600 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
                {PERSONAL_INFO.fullName}
              </span>
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-sm sm:text-base font-bold text-indigo-700 dark:text-indigo-300">
              <span>
                {roleMode === 'it-system'
                  ? PERSONAL_INFO.secondaryTitle
                  : PERSONAL_INFO.primaryTitle}
              </span>
              {roleMode === 'all' && (
                <>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-cyan-700 dark:text-cyan-300">
                    {PERSONAL_INFO.secondaryTitle}
                  </span>
                </>
              )}
            </div>

            {/* Mục tiêu nghề nghiệp tùy biến theo góc nhìn */}
            <div className="mt-5 space-y-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {(roleMode === 'all' || roleMode === 'ai-engineer') && (
                <p className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-indigo-100 dark:border-indigo-900/50">
                  <strong className="text-indigo-600 dark:text-indigo-400 font-bold block mb-1">
                    🚀 Định hướng AI-Driven Software Engineer & Creative Technologist:
                  </strong>
                  {PERSONAL_INFO.aiCareerObjective}
                </p>
              )}

              {(roleMode === 'all' || roleMode === 'it-system') && (
                <p className="p-4 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-cyan-100 dark:border-cyan-900/50">
                  <strong className="text-cyan-600 dark:text-cyan-400 font-bold block mb-1">
                    🛠️ Định hướng IT Helpdesk & System Support Specialist:
                  </strong>
                  {PERSONAL_INFO.itCareerObjective}
                </p>
              )}
            </div>
          </div>

          {/* Cụm nút hành động (CTA) */}
          <div className="mt-7 pt-5 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all"
            >
              <span>Khám Phá 6 Dự Án & Logo Thương Hiệu</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Liên Hệ Tuyển Dụng</span>
            </a>

            {/* Nút chuyển nhanh góc nhìn CV */}
            <div className="ml-auto flex items-center gap-1.5 text-xs">
              <span className="text-slate-400 hidden sm:inline">Chế độ xem:</span>
              <button
                type="button"
                onClick={() =>
                  setRoleMode(
                    roleMode === 'all'
                      ? 'ai-engineer'
                      : roleMode === 'ai-engineer'
                      ? 'it-system'
                      : 'all'
                  )
                }
                className="px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 font-bold transition-colors cursor-pointer"
              >
                Đổi góc nhìn: {roleMode === 'all' ? 'Tất cả' : roleMode === 'ai-engineer' ? 'AI Engineer' : 'IT System'}
              </button>
            </div>
          </div>
        </BentoCard>

        {/* Khối Bento Thông tin cá nhân & Liên hệ nhanh (Chiếm 4 cột) */}
        <BentoCard className="lg:col-span-4 p-6 sm:p-7 flex flex-col justify-between bg-white dark:bg-slate-900">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-400 p-0.5 shadow-lg shadow-indigo-500/20 shrink-0">
                <div className="w-full h-full rounded-[22px] bg-white dark:bg-slate-950 flex items-center justify-center">
                  <span className="text-2xl font-black bg-gradient-to-tr from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    PQ
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-bold">
                  Hồ Sơ Cá Nhân
                </span>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {PERSONAL_INFO.fullName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kỹ sư CNTT • Đại học Thủy Lợi
                </p>
              </div>
            </div>

            {/* Danh sách thông tin trích xuất từ CV */}
            <ul className="space-y-3 text-sm">
              <li className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 font-medium">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 cursor-pointer"
                  aria-label="Sao chép số điện thoại"
                >
                  {copiedField === 'phone' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </li>

              <li className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 font-medium truncate pr-2">
                  <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 hover:border-cyan-400 shrink-0 cursor-pointer"
                  aria-label="Sao chép địa chỉ email"
                >
                  {copiedField === 'email' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Đã chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </li>

              <li className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>
                  Ngày sinh: <strong>{PERSONAL_INFO.birthDate}</strong> • Giới tính:{' '}
                  <strong>{PERSONAL_INFO.gender}</strong>
                </span>
              </li>

              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{PERSONAL_INFO.address}</span>
              </li>

              <li className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300">
                <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Đại học Thủy Lợi</strong> (2019 - 2026) — Kỹ sư Công nghệ Thông tin
                </span>
              </li>
            </ul>
          </div>

          {/* Tóm tắt thế mạnh lõi */}
          <div className="mt-5 pt-4 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400">
              <Cpu className="w-3.5 h-3.5" /> AI Agents & Edge GPU
            </span>
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Event Uptime
            </span>
          </div>
        </BentoCard>

        {/* Hàng 4 Thẻ Chỉ Số Thực Chiến (Metric Bento Cards) */}
        {PERSONAL_INFO.highlights.map((metric) => {
          const isDimmed =
            roleMode !== 'all' && metric.role !== 'all' && metric.role !== roleMode;
          return (
            <BentoCard
              key={metric.label}
              className={`lg:col-span-3 p-6 transition-opacity ${
                isDimmed ? 'opacity-55' : 'opacity-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  {metric.label}
                </span>
                <span className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400">
                  <Zap className="w-4 h-4" />
                </span>
              </div>
              <div
                className={`text-3xl sm:text-4xl font-black bg-gradient-to-r ${metric.accentColor} bg-clip-text text-transparent`}
              >
                {metric.value}
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {metric.description}
              </p>
            </BentoCard>
          );
        })}

        {/* Dải Logo Thương Hiệu, Tập Đoàn & Sự Kiện Đã Triển Khai (Bento Brand Wall chuẩn Portfolio quốc tế) */}
        <BentoCard className="lg:col-span-12 p-5 sm:p-6 bg-white/90 dark:bg-slate-900/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Award className="w-4 h-4" />
                Thương Hiệu, Tập Đoàn & Tổ Chức Đã Triển Khai
              </span>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Nhấn vào logo bất kỳ để di chuyển nhanh tới dự án hoặc đơn vị tương ứng
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {featuredBrands.map((brand) => (
                <a
                  key={brand.key}
                  href={brand.targetId}
                  className="transition-transform hover:scale-105 focus:outline-none"
                >
                  <BrandLogoBadge brandKey={brand.key} size="sm" />
                </a>
              ))}
            </div>
          </div>
        </BentoCard>
      </div>
    </section>
  );
};
