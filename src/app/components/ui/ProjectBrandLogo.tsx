import React from 'react';

export type BrandLogoKey =
  | 'ge-vernova'
  | 'ensure-gold'
  | 'ai-for-good'
  | 'nutifood'
  | 'vietnam-80-years'
  | 'urah-trian-infra'
  | 'urah-network'
  | 'trian-corp'
  | 'tlu-university';

interface BrandLogoProps {
  brandKey: BrandLogoKey;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-12 px-4 text-sm',
  lg: 'h-14 px-5 text-base',
};

// Component hiển thị Logo SVG chuẩn màu sắc thương hiệu cho từng Dự án, Đối tác & Trường học
export const BrandLogoBadge: React.FC<BrandLogoProps> = ({
  brandKey,
  size = 'md',
  className = '',
}) => {
  switch (brandKey) {
    case 'ge-vernova':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-[#062E22] text-white border border-emerald-500/40 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          {/* Biểu tượng vòng xoáy năng lượng GE Vernova */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="15" stroke="#00E676" strokeWidth="2.2" />
            <path
              d="M11 18C11 14.134 14.134 11 18 11C21.866 11 25 14.134 25 18C25 21.866 21.866 25 18 25"
              stroke="#A7F3D0"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M15 18L17.5 20.5L22 15.5"
              stroke="#00E676"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wider text-[#00E676] text-[11px] sm:text-xs">
              GE VERNOVA
            </span>
            <span className="text-[9px] text-emerald-200/80 font-mono">ENERGY EVENT TECH</span>
          </div>
        </div>
      );

    case 'ensure-gold':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#0F294A] to-[#1E3A5F] text-white border border-amber-400/50 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          {/* Biểu tượng Abbott & Vương miện vàng Ensure Gold */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <rect x="3" y="3" width="30" height="30" rx="8" fill="#F59E0B" fillOpacity="0.18" />
            <path
              d="M8 24L11 13L18 18L25 13L28 24H8Z"
              fill="url(#ensureGoldGrad)"
              stroke="#FCD34D"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="ensureGoldGrad" x1="8" y1="13" x2="28" y2="24" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="1" stopColor="#D97706" />
              </linearGradient>
            </defs>
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-amber-300 text-[11px] sm:text-xs">
              ENSURE GOLD
            </span>
            <span className="text-[9px] text-sky-200 font-semibold">ABBOTT VIETNAM • ZALO AI</span>
          </div>
        </div>
      );

    case 'ai-for-good':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-cyan-950 text-white border border-cyan-400/40 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          {/* Biểu tượng Quả cầu AI for Good */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" stroke="#22D3EE" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="18" cy="18" r="9" stroke="#818CF8" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="3.5" fill="#22D3EE" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-cyan-300 text-[11px] sm:text-xs">
              AI FOR GOOD 2026
            </span>
            <span className="text-[9px] text-indigo-200 font-mono">GLOBAL SUMMIT • DIGITAL HUMAN</span>
          </div>
        </div>
      );

    case 'nutifood':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-[#0B3B24] text-white border border-lime-400/40 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          {/* Biểu tượng chiếc lá dinh dưỡng Nutifood */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <path
              d="M28 8C17 8 9 15 9 26C19 26 28 19 28 8Z"
              fill="#84CC16"
              stroke="#Bef264"
              strokeWidth="1.6"
            />
            <path
              d="M9 26C14 21 19 16 25 11"
              stroke="#0B3B24"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="24" cy="24" r="4" fill="#EF4444" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-lime-300 text-[11px] sm:text-xs">
              NUTIFOOD
            </span>
            <span className="text-[9px] text-emerald-100 font-mono">AI FACE SWAP CAMPAIGN</span>
          </div>
        </div>
      );

    case 'vietnam-80-years':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-[#7F1D1D] to-[#991B1B] text-white border border-amber-400/50 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          {/* Biểu tượng Ngôi sao vàng Triển lãm Quốc gia 80 năm */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="14" fill="#B91C1C" stroke="#FBBF24" strokeWidth="1.5" />
            <path
              d="M18 8L20.6 14.8L27.8 15.2L22.2 19.6L24.1 26.6L18 22.6L11.9 26.6L13.8 19.6L8.2 15.2L15.4 14.8L18 8Z"
              fill="#FACC15"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-amber-300 text-[11px] sm:text-xs">
              TRIỂN LÃM QUỐC GIA 80 NĂM
            </span>
            <span className="text-[9px] text-amber-100 font-mono">ĐẠI SỨ ẢO AI LỊCH SỬ (RAG)</span>
          </div>
        </div>
      );

    case 'urah-trian-infra':
    case 'urah-network':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-indigo-900 to-violet-900 text-white border border-indigo-400/40 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <rect x="4" y="6" width="28" height="24" rx="5" stroke="#A5B4FC" strokeWidth="2" />
            <path d="M11 14H25M11 20H20" stroke="#38BDF8" strokeWidth="2.2" strokeLinecap="round" />
            <circle cx="25" cy="20" r="2" fill="#34D399" />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-white text-[11px] sm:text-xs">
              URAH NETWORK
            </span>
            <span className="text-[9px] text-indigo-200 font-mono">MEDIA & AI TECH SYSTEM</span>
          </div>
        </div>
      );

    case 'trian-corp':
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-gradient-to-r from-teal-900 to-emerald-900 text-white border border-teal-400/40 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 30C18 30 7 23 7 14.5C7 10.5 10.2 7.5 14 7.5C16.2 7.5 18 8.8 18 8.8C18 8.8 19.8 7.5 22 7.5C25.8 7.5 29 10.5 29 14.5C29 23 18 30 18 30Z"
              stroke="#5EEAD4"
              strokeWidth="2.2"
              fill="#14B8A6"
              fillOpacity="0.25"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-teal-200 text-[11px] sm:text-xs">
              TRIAN CORP
            </span>
            <span className="text-[9px] text-emerald-200 font-mono">ELDERCARE AI & EDGE GPU</span>
          </div>
        </div>
      );

    case 'tlu-university':
    default:
      return (
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl bg-[#0C2D57] text-white border border-sky-400/40 shadow-sm ${sizeClasses[size]} ${className}`}
        >
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 36 36" fill="none">
            <path
              d="M18 6L31 13L18 20L5 13L18 6Z"
              fill="#38BDF8"
              stroke="#BAE6FD"
              strokeWidth="1.5"
            />
            <path
              d="M10 16.5V24.5C10 26.5 13.5 28.5 18 28.5C22.5 28.5 26 26.5 26 24.5V16.5"
              stroke="#38BDF8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex flex-col leading-none">
            <span className="font-black tracking-wide text-sky-200 text-[11px] sm:text-xs">
              ĐẠI HỌC THỦY LỢI (TLU)
            </span>
            <span className="text-[9px] text-sky-100/80 font-mono">KỸ SƯ CNTT • 2019 - 2026</span>
          </div>
        </div>
      );
  }
};
