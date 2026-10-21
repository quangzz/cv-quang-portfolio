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

// Tổ hợp Bento mở đầu đã được tối giản, súc tích và thoáng mắt
export const HeroBento: React.FC = () => {
  const { roleMode } = usePortfolio();
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const handleCopy = (value: string, field: 'email' | 'phone') => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Tóm tắt ngắn gọn 2 câu tùy theo góc nhìn để phần đầu trang thoáng và có điểm nhấn
  const concisePitch =
    roleMode === 'it-system'
      ? 'Kỹ sư CNTT chuyên quản trị hạ tầng mạng LAN/Wi-Fi, máy trạm GPU, thiết bị nhúng Jetson Nano, máy chấm công & hệ thống màn LED sự kiện lớn. Cam kết xử lý sự cố (SLA) dưới 3 phút và đảm bảo 100% uptime.'
      : 'Tiên phong ứng dụng Vibe Coding & AI Agents (Antigravity, Cursor) rút ngắn 5 lần chu kỳ phát triển sản phẩm. Chuyên sâu xây dựng hệ thống RAG Chatbot, Generative Video/Face Swap AI, Zalo Mini App và Web tương tác đa màn hình thời gian thực.';

  return (
    <section id="hero" className="pt-6 pb-12 md:pt-8 md:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Khối Bento chính: Giới thiệu tinh gọn (8 cột) */}
        <BentoCard className="lg:col-span-8 p-6 sm:p-8 md:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-indigo-50/25 to-cyan-50/35 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-500/15 via-cyan-400/15 to-amber-400/15 blur-3xl" />

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="emerald" dot>
                Open to Work • Hà Nội
              </Badge>
              <Badge variant="indigo">
                <Sparkles className="w-3 h-3" /> Vibe Coding 5x
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {PERSONAL_INFO.fullName}
            </h1>

            <p className="mt-2 text-base sm:text-lg font-bold bg-gradient-to-r from-indigo-600 via-cyan-600 to-teal-500 dark:from-indigo-400 dark:via-cyan-400 dark:to-teal-300 bg-clip-text text-transparent">
              {roleMode === 'it-system'
                ? PERSONAL_INFO.secondaryTitle
                : `${PERSONAL_INFO.primaryTitle} • IT System Specialist`}
            </p>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {concisePitch}
            </p>

            {/* 3 Nhãn định vị nhanh */}
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                🤖 RAG / Face Swap / Digital Human
              </span>
              <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                ⚡ Multi-Screen WebSockets (&lt;50ms)
              </span>
              <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-200">
                🛠️ GPU Workstation, LAN &amp; IT Support
              </span>
            </div>
          </div>

          <div className="mt-7 pt-5 border-t border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 transition-all"
            >
              <span>Xem Dự Án Thực Chiến</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-sm transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Liên Hệ Ngay</span>
            </a>
          </div>
        </BentoCard>

        {/* Khối Bento Thông tin liên hệ nhanh (4 cột - Tối giản) */}
        <BentoCard className="lg:col-span-4 p-6 flex flex-col justify-between bg-white dark:bg-slate-900">
          <div>
            <div className="flex items-center gap-3.5 mb-5">
              <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 via-cyan-500 to-amber-400 p-0.5 shrink-0">
                <div className="w-full h-full rounded-[14px] bg-white dark:bg-slate-950 flex items-center justify-center">
                  <span className="text-lg font-black bg-gradient-to-tr from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                    PQ
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {PERSONAL_INFO.fullName}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Kỹ sư CNTT • Đại học Thủy Lợi
                </p>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                  <Phone className="w-4 h-4 text-indigo-500 shrink-0" />
                  {PERSONAL_INFO.phone}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                  className="px-2 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 cursor-pointer"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </li>

              <li className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60">
                <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold truncate pr-2">
                  <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                  className="px-2 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </li>

              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{PERSONAL_INFO.birthDate} • {PERSONAL_INFO.gender}</span>
              </li>

              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="truncate">{PERSONAL_INFO.shortAddress}</span>
              </li>

              <li className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300">
                <GraduationCap className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate">ĐH Thủy Lợi (2019 - 2026)</span>
              </li>
            </ul>
          </div>
        </BentoCard>

        {/* Hàng 4 Thẻ Chỉ Số Thực Chiến gọn gàng */}
        {PERSONAL_INFO.highlights.map((metric) => (
          <BentoCard key={metric.label} className="lg:col-span-3 p-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {metric.label}
              </span>
              <Zap className="w-4 h-4 text-indigo-500" />
            </div>
            <div
              className={`text-2xl sm:text-3xl font-black bg-gradient-to-r ${metric.accentColor} bg-clip-text text-transparent`}
            >
              {metric.value}
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
              {metric.description}
            </p>
          </BentoCard>
        ))}

        {/* Dải Logo Thương Hiệu & Dự Án */}
        <BentoCard className="lg:col-span-12 p-4 sm:p-5 bg-white/90 dark:bg-slate-900/90">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 shrink-0">
              <Award className="w-4 h-4" />
              Dự án &amp; Đơn vị tiêu biểu:
            </span>

            <div className="flex flex-wrap items-center gap-2">
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
