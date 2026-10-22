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

interface BrandMeta {
  logoSrc: string;
  secondaryLogoSrc?: string;
  name: string;
  subLabel: string;
  imgClassName: string;
}

// Danh mục cấu hình đường dẫn ảnh Logo thật (đã tải về trong public/logos/)
const BRAND_META_MAP: Record<BrandLogoKey, BrandMeta> = {
  'ge-vernova': {
    logoSrc: '/logos/ge-vernova.svg',
    name: 'GE Vernova',
    subLabel: 'Interactive Event',
    imgClassName: 'h-5 sm:h-6 w-auto object-contain',
  },
  'ensure-gold': {
    logoSrc: '/logos/ensure-gold.svg',
    secondaryLogoSrc: '/logos/abbott.svg',
    name: 'Ensure Gold',
    subLabel: 'Abbott Vietnam',
    imgClassName: 'h-4 sm:h-5 w-auto object-contain',
  },
  'ai-for-good': {
    logoSrc: '/logos/ai-for-good.png',
    name: 'AI for Good 2026',
    subLabel: 'ITU Global Summit',
    imgClassName: 'h-7 sm:h-8 w-auto object-contain',
  },
  nutifood: {
    logoSrc: '/logos/nutifood.svg',
    name: 'Nutifood',
    subLabel: 'AI Face Swap Video',
    imgClassName: 'h-5 sm:h-6 w-auto object-contain',
  },
  'vietnam-80-years': {
    logoSrc: '/logos/vietnam-emblem.svg',
    name: 'Triển Lãm Quốc Gia 80 Năm',
    subLabel: 'Đại Sứ Ảo AI Lịch Sử',
    imgClassName: 'h-7 sm:h-8 w-7 sm:w-8 object-contain',
  },
  'urah-trian-infra': {
    logoSrc: '/logos/urah-network.png',
    name: 'URAH Network',
    subLabel: 'IT Infrastructure & GPU',
    imgClassName: 'h-7 sm:h-8 w-auto object-contain',
  },
  'urah-network': {
    logoSrc: '/logos/urah-network.png',
    name: 'URAH Network',
    subLabel: 'Media & AI Engineering',
    imgClassName: 'h-7 sm:h-8 w-auto object-contain',
  },
  'trian-corp': {
    logoSrc: '/logos/trian-corp.svg',
    name: 'TriAn Corp',
    subLabel: 'Eldercare AI & Edge GPU',
    imgClassName: 'h-7 sm:h-8 w-auto object-contain',
  },
  'tlu-university': {
    logoSrc: '/logos/tlu-university.jpg',
    name: 'Đại Học Thủy Lợi',
    subLabel: 'Kỹ Sư CNTT (2019-2026)',
    imgClassName: 'h-7 sm:h-8 w-7 sm:w-8 rounded-full object-contain',
  },
};

const sizeContainerClasses = {
  sm: 'px-3 py-1.5 gap-2.5',
  md: 'px-3.5 py-2 gap-3',
  lg: 'px-4 py-2.5 gap-3.5',
};

// Component hiển thị Logo thật của các Thương hiệu, Dự án & Trường Đại học Thủy Lợi
export const BrandLogoBadge: React.FC<BrandLogoProps> = ({
  brandKey,
  size = 'md',
  className = '',
}) => {
  const meta = BRAND_META_MAP[brandKey] || BRAND_META_MAP['tlu-university'];

  return (
    <div
      className={`inline-flex items-center rounded-2xl bg-white text-slate-900 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all ${sizeContainerClasses[size]} ${className}`}
    >
      {/* Khung chứa ảnh Logo thương hiệu thật */}
      <div className="flex items-center gap-1.5 shrink-0">
        {meta.secondaryLogoSrc && (
          <img
            src={meta.secondaryLogoSrc}
            alt="Abbott"
            loading="lazy"
            className="h-4 sm:h-4.5 w-auto object-contain"
          />
        )}
        <img
          src={meta.logoSrc}
          alt={meta.name}
          loading="lazy"
          className={meta.imgClassName}
        />
      </div>

      {/* Nhãn phụ cho các logo chỉ có biểu tượng hoặc cần làm rõ tên chiến dịch */}
      {(brandKey === 'vietnam-80-years' ||
        brandKey === 'tlu-university' ||
        brandKey === 'ensure-gold' ||
        brandKey === 'ai-for-good') && (
        <div className="flex flex-col leading-tight border-l border-slate-200 pl-2.5">
          <span className="font-extrabold text-[11px] sm:text-xs text-slate-900 tracking-tight">
            {meta.name}
          </span>
          <span className="text-[9px] sm:text-[10px] font-medium text-slate-500">
            {meta.subLabel}
          </span>
        </div>
      )}
    </div>
  );
};
