import React from 'react';
import {
  Award,
  Heart,
  Printer,
  Fingerprint,
  Wifi,
  Cpu,
  CheckCircle2,
} from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { Badge } from '../ui/Badge';
import { SectionHeader } from '../ui/SectionHeader';
import { BrandLogoBadge } from '../ui/ProjectBrandLogo';
import { EDUCATION_DATA, PERSONAL_INFO } from '../../utils/portfolio-data';

const hardwareSpecialties = [
  {
    icon: <Fingerprint className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
    title: 'Máy Chấm Công & Đồng Bộ HR',
    detail:
      'Lắp đặt, cấu hình IP tĩnh & phần mềm cho máy chấm công vân tay, khuôn mặt, thẻ từ (Ronald Jack, ZKTeco, Wise Eye); đồng bộ dữ liệu tự động về phòng Nhân sự.',
  },
  {
    icon: <Printer className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
    title: 'Thiết Bị Văn Phòng & Máy In LAN',
    detail:
      'Xử lý triệt để sự cố máy in Canon, HP, Brother, Epson (kẹt giấy, thay cartridge, reset drum, lỗi driver, bản in mờ/sọc) và chia sẻ in ấn qua mạng LAN/Wi-Fi.',
  },
  {
    icon: <Cpu className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
    title: 'Workstation GPU & Edge AI (Jetson Nano)',
    detail:
      'Lắp ráp, bảo dưỡng, nâng cấp PC/Workstation GPU (GTX 1050Ti+), nhúng mô hình AI lượng tử hóa lên NVIDIA Jetson Nano và điều khiển màn hình LED sự kiện.',
  },
  {
    icon: <Wifi className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
    title: 'Mạng Nội Bộ & Hạ Tầng Sự Kiện',
    detail:
      'Cấu hình Router, Switch, Wi-Fi AP, bấm dây mạng LAN; xử lý sự cố DHCP, DNS, IP tĩnh, VPN, NAT và giám sát SLA hỗ trợ người dùng dưới 3 phút.',
  },
];

// Khu vực Học vấn (Đại học Thủy Lợi), Đồ án tốt nghiệp & Chuyên môn Phần cứng/Hệ thống
export const EducationHardwareSection: React.FC = () => {
  return (
    <section id="education" className="py-14 md:py-20">
      <SectionHeader
        badgeText="Nền Tảng Học Thuật & Hạ Tầng"
        title="Học Vấn &"
        highlightText="Năng Lực Thiết Bị"
        subtitle="Kỹ sư CNTT Đại học Thủy Lợi, làm chủ cả phần mềm AI lẫn phần cứng và mạng."
        badgeVariant="amber"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Khối Học vấn Đại học Thủy Lợi (Chiếm 5 cột) */}
        <BentoCard className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-white via-amber-50/20 to-indigo-50/30 dark:from-slate-900 dark:to-slate-900">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
              <BrandLogoBadge brandKey={EDUCATION_DATA.brandLogo} size="md" />
              <Badge variant="indigo">{EDUCATION_DATA.period}</Badge>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              {EDUCATION_DATA.university}
            </h3>
            <p className="mt-1 text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400">
              {EDUCATION_DATA.degree} • {EDUCATION_DATA.major}
            </p>

            {/* Đồ án tốt nghiệp xuất sắc */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-1.5 mb-1">
                <Award className="w-4 h-4" />
                Điểm nhấn học thuật
              </span>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {EDUCATION_DATA.thesisTitle}
              </p>
            </div>

            {/* Chứng chỉ & Hoạt động */}
            <div className="mt-5 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Chứng chỉ & Hoạt động ngoại khóa:
              </h4>
              {[...EDUCATION_DATA.certifications, ...EDUCATION_DATA.activities].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sở thích cá nhân */}
          <div className="mt-6 pt-5 border-t border-slate-200/70 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-2.5">
              <Heart className="w-3.5 h-3.5" />
              Sở thích & Cân bằng cuộc sống:
            </h4>
            <div className="flex flex-wrap gap-2">
              {PERSONAL_INFO.hobbies.map((hobby) => (
                <span
                  key={hobby}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        </BentoCard>

        {/* Khối Năng lực Hạ tầng, Thiết bị văn phòng & Phần cứng chuyên sâu (Chiếm 7 cột) */}
        <BentoCard className="lg:col-span-7 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
            <div>
              <Badge variant="rose" className="mb-2">
                IT Helpdesk & Hardware Specialist
              </Badge>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                Làm Chủ Thiết Bị Văn Phòng, Mạng & Phần Cứng Nhúng
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hardwareSpecialties.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center mb-3 shadow-xs">
                    {item.icon}
                  </div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </BentoCard>
      </div>
    </section>
  );
};
