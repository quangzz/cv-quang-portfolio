import React, { useEffect, useRef, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { BentoCard } from '../ui/BentoCard';
import { SectionHeader } from '../ui/SectionHeader';
import { PERSONAL_INFO } from '../../utils/portfolio-data';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Khu vực Liên hệ tuyển dụng & Form gửi email trực tiếp cho Phạm Phúc Quang
export const ContactSection: React.FC = () => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('AI-Driven Software Engineer / Creative Technologist');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<'phone' | 'email' | null>(null);
  const [copyError, setCopyError] = useState<'phone' | 'email' | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyText = async (text: string, type: 'phone' | 'email') => {
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(text);
      setCopyError(null);
      setCopiedType(type);
    } catch {
      setCopiedType(null);
      setCopyError(type);
    }
    copyTimeoutRef.current = setTimeout(() => {
      setCopiedType(null);
      setCopyError(null);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!senderName.trim() || !senderEmail.trim() || !message.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ Họ tên, Email và Nội dung tin nhắn.');
      return;
    }

    if (!EMAIL_REGEX.test(senderEmail.trim())) {
      setErrorMsg('Địa chỉ Email không hợp lệ. Vui lòng kiểm tra lại.');
      return;
    }

    // Tạo liên kết mailto chuẩn để gửi trực tiếp tới email của Phạm Phúc Quang
    const subject = encodeURIComponent(`[Liên hệ Tuyển dụng - ${selectedPosition}] từ ${senderName}`);
    const body = encodeURIComponent(
      `Xin chào ${PERSONAL_INFO.fullName},\n\nTôi là: ${senderName}\nEmail liên hệ: ${senderEmail}\nVị trí quan tâm: ${selectedPosition}\n\nNội dung trao đổi:\n${message}`
    );

    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  const hasError = Boolean(errorMsg);
  const isNameInvalid = hasError && !senderName.trim();
  const isEmailInvalid =
    hasError && (!senderEmail.trim() || !EMAIL_REGEX.test(senderEmail.trim()));
  const isMessageInvalid = hasError && !message.trim();

  return (
    <section id="contact" className="py-14 md:py-20">
      <SectionHeader
        badgeText="Kết Nối Ngay"
        title="Liên Hệ"
        highlightText="Hợp Tác"
        subtitle="Sẵn sàng trao đổi cơ hội AI Engineer, Creative Technologist hoặc IT Support tại Hà Nội."
        badgeVariant="rose"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cột thông tin liên hệ trực tiếp (5 cột) */}
        <BentoCard className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-cyan-700 text-white border-none">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-xs mb-4">
              Phản hồi nhanh trong ngày
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
              Hãy cùng tạo nên những sản phẩm đột phá!
            </h3>
            <p className="mt-3 text-sm text-indigo-100 leading-relaxed">
              Bạn có thể gọi trực tiếp, sao chép địa chỉ email hoặc điền biểu mẫu bên cạnh để gửi thông tin phỏng vấn / hợp tác dự án.
            </p>

            <div className="mt-7 space-y-3.5">
              {/* Thẻ Điện thoại */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-indigo-200">Số điện thoại / Zalo</div>
                    <a
                      href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-base font-extrabold hover:underline"
                    >
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(PERSONAL_INFO.phone, 'phone')}
                  className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors shrink-0 cursor-pointer"
                >
                  <span aria-live="polite" className="inline-flex items-center gap-1">
                    {copiedType === 'phone' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chép
                      </>
                    ) : copyError === 'phone' ? (
                      <span className="text-red-600">Không sao chép được</span>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Sao chép
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Thẻ Email */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-indigo-200">Email cá nhân</div>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-sm sm:text-base font-extrabold hover:underline break-all"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopyText(PERSONAL_INFO.email, 'email')}
                  className="px-3 py-1.5 rounded-xl bg-white text-indigo-700 text-xs font-bold hover:bg-indigo-50 transition-colors shrink-0 cursor-pointer"
                >
                  <span aria-live="polite" className="inline-flex items-center gap-1">
                    {copiedType === 'email' ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã chép
                      </>
                    ) : copyError === 'email' ? (
                      <span className="text-red-600">Không sao chép được</span>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Sao chép
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Thẻ Địa chỉ */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-indigo-200">Địa chỉ hiện tại</div>
                  <div className="text-sm font-bold">{PERSONAL_INFO.shortAddress}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/15 text-xs text-indigo-100">
            Sẵn sàng phỏng vấn trực tiếp tại Hà Nội hoặc trực tuyến (Google Meet / Zoom / MS Teams).
          </div>
        </BentoCard>

        {/* Cột Biểu mẫu gửi lời nhắn nhanh (7 cột) */}
        <BentoCard className="lg:col-span-7 p-6 sm:p-8">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-2">
            Gửi Lời Nhắn Cho {PERSONAL_INFO.fullName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
            Điền thông tin bên dưới để mở nhanh trình gửi Email với tiêu đề và nội dung được định dạng sẵn.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {errorMsg && (
              <div
                id="contact-form-error"
                role="alert"
                className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs sm:text-sm flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {isSubmitted && !errorMsg && (
              <div
                role="status"
                className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>
                  Đã chuẩn bị nội dung Email! Bạn cũng có thể liên hệ trực tiếp qua SĐT{' '}
                  <strong>{PERSONAL_INFO.phone}</strong>.
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="senderName"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Họ tên / Quý Công ty *
                </label>
                <input
                  id="senderName"
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="VD: Nguyễn Văn A - HR TechCorp"
                  aria-invalid={isNameInvalid || undefined}
                  aria-describedby={isNameInvalid ? 'contact-form-error' : undefined}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="senderEmail"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
                >
                  Email liên hệ *
                </label>
                <input
                  id="senderEmail"
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="hr@company.com"
                  aria-invalid={isEmailInvalid || undefined}
                  aria-describedby={isEmailInvalid ? 'contact-form-error' : undefined}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="selectedPosition"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Vị trí / Lĩnh vực hợp tác
              </label>
              <select
                id="selectedPosition"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="AI-Driven Software Engineer / Creative Technologist">
                  AI-Driven Software Engineer / Creative Technologist
                </option>
                <option value="Full-Stack Web & Interactive Developer">
                  Full-Stack Web & Interactive Developer
                </option>
                <option value="IT Helpdesk & System Support Specialist">
                  IT Helpdesk & System Support Specialist
                </option>
                <option value="Hợp tác Dự án Sự kiện Tương tác / AI">
                  Hợp tác Dự án Sự kiện Tương tác / AI
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5"
              >
                Nội dung tin nhắn *
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Nhập lời nhắn, lịch hẹn phỏng vấn hoặc yêu cầu dự án..."
                aria-invalid={isMessageInvalid || undefined}
                aria-describedby={isMessageInvalid ? 'contact-form-error' : undefined}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Soạn Email</span>
              </button>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                Nút này mở ứng dụng email trên máy bạn với nội dung đã điền sẵn.
              </p>
            </div>
          </form>
        </BentoCard>
      </div>
    </section>
  );
};
