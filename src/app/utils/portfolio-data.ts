import {
  PersonalInfo,
  SkillGroup,
  ProjectItem,
  ExperienceItem,
  EducationInfo,
} from '../types/portfolio';

// Thông tin cá nhân cốt lõi từ CV của Phạm Phúc Quang
export const PERSONAL_INFO: PersonalInfo = {
  fullName: 'Phạm Phúc Quang',
  englishRoleBadge: 'AI-Driven Engineer • Creative Technologist • IT Specialist',
  primaryTitle: 'AI-Driven Software Engineer / Creative Technologist',
  secondaryTitle: 'IT Helpdesk & System Support Specialist',
  birthDate: '21/03/2001',
  gender: 'Nam',
  phone: '0963 253 930',
  email: 'quangsicmedia@gmail.com',
  address: 'P22 N11C, Phường Kim Liên, Đống Đa, Hà Nội',
  shortAddress: 'Kim Liên, Đống Đa, Hà Nội',
  statusText: 'Open to Work • Sẵn sàng nhận cơ hội mới tại Hà Nội',
  aiCareerObjective:
    'Là một AI-Driven Engineer & Creative Technologist đi đầu trong việc phát triển các giải pháp phần mềm thông minh và hệ thống tương tác thực tế ảo. Với triết lý làm việc hiện đại dựa trên AI-driven development (Vibe Coding), tôi ứng dụng các AI Agents tiên tiến (Antigravity, Cursor) để rút ngắn chu kỳ phát triển sản phẩm gấp 5 lần mà vẫn đảm bảo độ bền vững của cấu trúc mã nguồn. Có kinh nghiệm thực chiến đa dạng trong việc xây dựng hệ thống chatbot AI chuyên sâu (RAG), các miniapp tương tác kết xuất video tự động bằng AI, dashboard phân tích dữ liệu thời gian thực và giải pháp tương tác đa màn hình tại sự kiện của các tập đoàn đa quốc gia.',
  itCareerObjective:
    'Kỹ sư Công nghệ Thông tin có kinh nghiệm thực chiến trong việc quản trị hạ tầng mạng LAN/Wi-Fi, lắp đặt & bảo trì hệ thống máy tính, máy trạm GPU, thiết bị nhúng (NVIDIA Jetson), máy in văn phòng, hệ thống máy chấm công và thiết bị màn LED sự kiện. Nắm vững quy trình troubleshooting, hỗ trợ người dùng cuối (End-user Support) trực tiếp và từ xa với SLA dưới 3 phút, cam kết đảm bảo hoạt động liên tục 100% cho trang thiết bị CNTT doanh nghiệp.',
  highlights: [
    {
      label: 'Tốc độ phát triển',
      value: '5x Faster',
      description: 'Ứng dụng Vibe Coding & AI Agents (Antigravity, Cursor) tối ưu kiến trúc Full-Stack',
      accentColor: 'from-indigo-500 to-cyan-500',
      role: 'ai-engineer',
    },
    {
      label: 'Lượt tạo Video AI',
      value: '50,000+',
      description: 'Xử lý ổn định chiến dịch Zalo Mini App Ensure Gold với 100% độ chính xác tracking',
      accentColor: 'from-amber-500 to-orange-500',
      role: 'ai-engineer',
    },
    {
      label: 'Độ trễ đồng bộ',
      value: '< 50ms',
      description: 'Hệ thống Web tương tác đa màn hình thời gian thực bằng WebSockets & Socket.io',
      accentColor: 'from-cyan-500 to-emerald-500',
      role: 'ai-engineer',
    },
    {
      label: 'Xử lý Ticket & Uptime',
      value: '< 3 Phút',
      description: 'Giám sát SLA, quản trị mạng LAN/Wi-Fi, thiết bị văn phòng & hạ tầng sự kiện 100% uptime',
      accentColor: 'from-rose-500 to-amber-500',
      role: 'it-system',
    },
  ],
  hobbies: [
    'Nghiên cứu công nghệ AI nguồn mở mới',
    'Chạy bộ nâng cao sức bền',
    'Khám phá du lịch trải nghiệm',
  ],
};

// Danh sách nhóm kỹ năng toàn diện (AI Engineering + Full-Stack + IT System Support)
export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'vibe-coding',
    title: 'AI-Driven Engineering & Vibe Coding',
    subtitle: 'Tăng tốc phát triển sản phẩm gấp 5 lần với kiến trúc bền vững',
    category: 'ai-engineer',
    accent: 'indigo',
    iconName: 'Sparkles',
    items: [
      {
        name: 'AI Agents Orchestration',
        detail: 'Điều phối chuyên sâu Antigravity, Cursor, Claude, ChatGPT trong toàn bộ vòng đời phát triển.',
        featured: true,
      },
      {
        name: 'Prompt Engineering & Architecture',
        detail: 'Thiết kế prompt hệ thống, phân rã bài toán và xây dựng kiến trúc Full-Stack chuẩn hóa.',
        featured: true,
      },
      {
        name: 'Vibe Coding Workflow',
        detail: 'Kết hợp tư duy kỹ sư phần mềm với AI Copilots để rapid prototyping và kiểm thử nhanh.',
      },
    ],
  },
  {
    id: 'ai-ml-nlp',
    title: 'AI, Machine Learning & Generative Media',
    subtitle: 'LLM, RAG, Computer Vision & Xử lý Đa phương tiện thời gian thực',
    category: 'ai-engineer',
    accent: 'cyan',
    iconName: 'BrainCircuit',
    items: [
      {
        name: 'LLM APIs & Hệ thống RAG',
        detail: 'Tinh chỉnh OpenAI GPT-4, Gemini API; xây dựng cơ sở tri thức RAG chính xác tuyệt đối.',
        featured: true,
      },
      {
        name: 'Generative AI & Face Swap',
        detail: 'InsightFace, Stable Diffusion, ControlNet, tự động ghép mặt vào ảnh/video sự kiện.',
        featured: true,
      },
      {
        name: 'Voice AI & Digital Human',
        detail: 'Speech-to-Text lọc nhiễu hội trường, Text-to-Speech, đồng bộ khẩu hình Viseme-based Lip Sync.',
      },
      {
        name: 'Deep Learning & Edge AI',
        detail: 'TensorFlow, Keras, CNN, KNN, SVM, Decision Trees & Model Quantization cho thiết bị nhúng.',
      },
    ],
  },
  {
    id: 'fullstack-realtime',
    title: 'Full-Stack Web & Real-Time Interactive',
    subtitle: 'Ứng dụng Web, Zalo Mini App & Đồng bộ đa màn hình sự kiện',
    category: 'ai-engineer',
    accent: 'emerald',
    iconName: 'Code2',
    items: [
      {
        name: 'Frontend & Interactive UI',
        detail: 'React, TypeScript, HTML5 Canvas, GSAP Animation, Tailwind CSS, Zalo Mini App SDK.',
        featured: true,
      },
      {
        name: 'Backend & Task Queue',
        detail: 'Node.js, Express, Redis Task Queue phân phối tải render video, CDN optimization.',
        featured: true,
      },
      {
        name: 'Real-Time Multi-Screen Sync',
        detail: 'WebSockets, Socket.io kết nối Controller App & LED Display App với độ trễ < 50ms.',
      },
      {
        name: 'Firebase Ecosystem',
        detail: 'Firestore, Realtime Database, Cloud Storage, Cloud Functions, Authentication.',
      },
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data Analytics, Tracking & MLOps',
    subtitle: 'Đo lường hành vi người dùng & Dashboard quản trị thời gian thực',
    category: 'ai-engineer',
    accent: 'amber',
    iconName: 'BarChart3',
    items: [
      {
        name: 'Custom Tracking Library',
        detail: 'Tự xây dựng thư viện đo lường click, thời gian dừng, conversion funnel chịu tải lớn.',
        featured: true,
      },
      {
        name: 'Real-Time Analytics Dashboard',
        detail: 'React, Chart.js, Recharts trực quan hóa hàng đợi render GPU & nhân khẩu học người dùng.',
      },
      {
        name: 'Data Science & Cloud ML',
        detail: 'Python (NumPy, pandas, scikit-learn, matplotlib), SQL, Git, Azure ML.',
      },
    ],
  },
  {
    id: 'hardware-network',
    title: 'Hạ Tầng Mạng, Phần Cứng & Thiết Bị Sự Kiện',
    subtitle: 'Quản trị mạng LAN/Wi-Fi, Workstation GPU, Jetson Nano & LED sự kiện',
    category: 'it-system',
    accent: 'rose',
    iconName: 'Server',
    items: [
      {
        name: 'Phần cứng & Thiết bị Nhúng AI',
        detail: 'Lắp ráp, bảo dưỡng PC, Laptop, Workstation GPU (GTX 1050Ti+), NVIDIA Jetson Nano, màn LED.',
        featured: true,
      },
      {
        name: 'Quản trị Mạng & Hạ tầng Sự kiện',
        detail: 'Cấu hình Router, Switch, Wi-Fi AP, đi dây LAN; xử lý DHCP, DNS, IP tĩnh, VPN, NAT.',
        featured: true,
      },
      {
        name: 'Thiết bị Văn phòng & Máy chấm công',
        detail: 'Lắp đặt, cấu hình Ronald Jack, ZKTeco, Wise Eye; đồng bộ dữ liệu HR & sửa chữa máy in Canon/HP/Brother/Epson.',
      },
    ],
  },
  {
    id: 'it-helpdesk-os',
    title: 'IT Helpdesk, Hệ Điều Hành & Quản Trị Hệ Thống',
    subtitle: 'Hỗ trợ người dùng cuối On-site / Remote với SLA xử lý dưới 3 phút',
    category: 'it-system',
    accent: 'violet',
    iconName: 'Headset',
    items: [
      {
        name: 'Hệ điều hành đa nền tảng',
        detail: 'Cài đặt và quản trị Windows 10/11, Windows Server cơ bản, Ubuntu Linux, macOS.',
        featured: true,
      },
      {
        name: 'Helpdesk & Quản trị phần mềm',
        detail: 'Microsoft 365, Google Workspace, CRM; hỗ trợ từ xa qua TeamViewer, AnyDesk, UltraViewer.',
      },
      {
        name: 'An toàn dữ liệu & Quản lý tài sản',
        detail: 'Sao lưu định kỳ, phòng chống mã độc, quản lý ticket SLA, kiểm kê thiết bị & viết SOP.',
      },
    ],
  },
];

// 6 Dự án thực chiến tiêu biểu kèm Logo Thương hiệu & Sơ đồ kiến trúc
export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'ge-vernova-multiscreen',
    brandLogo: 'ge-vernova',
    title: 'Hệ Thống Web Tương Tác Đa Màn Hình Thời Gian Thực',
    clientOrEvent: 'Sự kiện Tập đoàn GE Vernova',
    period: '2025 - 2026',
    category: 'interactive-event',
    roleTag: 'all',
    badgeText: 'Low Latency < 50ms',
    architectureFlow: ['Tablet Controller App', 'Node.js + Socket.io (<50ms)', 'LED Display Canvas/GSAP'],
    summary:
      'Giải pháp tương tác không gian kết nối thời gian thực giữa Bộ điều khiển (Controller Web App trên Tablet/Mobile) và Màn hiển thị lớn (Display Web App trên màn hình LED chính tại sự kiện).',
    technicalContributions: [
      'Thiết kế giao thức truyền thông hai chiều bằng Socket.io và WebSockets qua máy chủ Node.js với độ trễ đồng bộ dưới 50ms.',
      'Xây dựng hệ thống kích hoạt hiệu ứng chuyển động phức tạp bằng GSAP và HTML5 Canvas tức thì khi khách mời thao tác trên màn điều khiển.',
      'Trực tiếp khảo sát, lắp đặt máy tính điều khiển, kết nối màn hình LED và thiết lập đường truyền mạng LAN/Wi-Fi chuyên dụng tại sự kiện.',
    ],
    achievements: [
      'Vận hành trơn tru 100% thời gian diễn ra sự kiện quốc tế, không mất kết nối hay trễ nhịp khung hình.',
      'Tạo hiệu ứng thị giác ấn tượng, nâng tầm trải nghiệm tương tác công nghệ cho khách mời cấp cao.',
    ],
    metrics: ['< 50ms Latency', '100% Event Uptime', 'Dual-Screen Sync'],
    techStack: ['Node.js', 'Socket.io', 'WebSockets', 'GSAP', 'HTML5 Canvas', 'Event LAN/LED Setup'],
    accentGradient: 'from-emerald-600 via-teal-600 to-cyan-500',
  },
  {
    id: 'ensure-gold-zalo-miniapp',
    brandLogo: 'ensure-gold',
    title: 'Zalo Mini App Tạo Video Chúc Mừng AI & Real-time Tracking Dashboard',
    clientOrEvent: 'Chiến dịch Ensure Gold Vietnam (Abbott)',
    period: '2025',
    category: 'analytics-miniapp',
    roleTag: 'ai-engineer',
    badgeText: '50,000+ AI Videos',
    architectureFlow: ['Zalo Mini App + Tracking SDK', 'High-Load Event API', 'React + Chart.js Funnel'],
    summary:
      'Nền tảng Zalo Mini App cho phép người dùng tạo thiệp và kết xuất video cá nhân hóa tự động bằng AI, đi kèm hệ thống Tracking hành vi và Dashboard phân tích thời gian thực cho Brand Manager.',
    technicalContributions: [
      'Tự phát triển thư viện Tracking chuyên biệt thu thập toàn bộ hành vi người dùng (clicks, dwell time, conversion funnel từng bước, tỷ lệ xem hết video).',
      'Tối ưu hóa API thu thập dữ liệu chịu tải cao, chống nghẽn cổ chai khi lượng truy cập tăng đột biến cùng lúc.',
      'Xây dựng trang quản trị Real-time Dashboard bằng React & Chart.js giám sát phễu chuyển đổi và trạng thái hàng đợi kết xuất video (Video Render Queue).',
    ],
    achievements: [
      'Xử lý ổn định hơn 50,000 lượt tạo video AI cá nhân hóa trên toàn chiến dịch.',
      'Lưu trữ chính xác 100% dữ liệu hành vi, giúp đội ngũ Marketing tối ưu hóa chiến dịch ngay trong thời gian thực.',
    ],
    metrics: ['50,000+ Videos', '100% Tracking Accuracy', 'Real-time Funnel'],
    techStack: ['React', 'Zalo Mini App SDK', 'Chart.js', 'Node.js', 'Custom Tracking SDK', 'REST API'],
    accentGradient: 'from-amber-500 via-orange-500 to-rose-500',
  },
  {
    id: 'ai-for-good-2026',
    brandLogo: 'ai-for-good',
    title: 'Nhân Vật Ảo Tương Tác (Digital Human) & Photobooth AI',
    clientOrEvent: "Hội nghị Quốc tế 'AI for Good 2026'",
    period: '2026',
    category: 'ai-product',
    roleTag: 'all',
    badgeText: '< 2s Voice Response',
    architectureFlow: ['Noise-Canceling STT + GPT-4', 'Viseme Lip-Sync (<2s)', 'InsightFace + ControlNet QR'],
    summary:
      'Giải pháp trải nghiệm kép kết hợp MC Nhân vật số trò chuyện trực tiếp bằng giọng nói thời gian thực và hệ thống Photobooth AI tự động biến đổi phong cách, trang phục theo chủ đề hội nghị.',
    technicalContributions: [
      'Đồng bộ hóa 3 module: Speech-to-Text lọc nhiễu hội trường, hội thoại thông minh qua LLM GPT-4 API và đồng bộ khẩu hình môi thời gian thực (Viseme-based Lip Sync).',
      'Xây dựng pipeline Photobooth AI kết hợp InsightFace (Face Swap) và Stable Diffusion / ControlNet tạo ảnh chất lượng cao kèm mã QR tải ngay.',
      'Lắp đặt đồng bộ cụm máy trạm GPU, camera, micro định hướng và hạ tầng mạng tại khu vực triển lãm.',
    ],
    achievements: [
      'Đạt tốc độ phản hồi hội thoại tự nhiên dưới 2 giây và kết xuất ảnh AI hoàn chỉnh chỉ trong 10 giây.',
      'Thu hút hàng trăm chuyên gia công nghệ quốc tế trực tiếp tương tác và trải nghiệm tại booth.',
    ],
    metrics: ['< 2s Voice AI', '10s AI Photo Render', 'Viseme Lip-Sync'],
    techStack: ['GPT-4 API', 'STT/TTS', 'Viseme Lip Sync', 'InsightFace', 'Stable Diffusion', 'ControlNet'],
    accentGradient: 'from-indigo-600 via-blue-600 to-cyan-500',
  },
  {
    id: 'nutifood-faceswap-video',
    brandLogo: 'nutifood',
    title: 'Web App Đổi Khuôn Mặt Sinh Video Truyền Thông & GPU Queue Dashboard',
    clientOrEvent: 'Chiến dịch Thương hiệu Nutifood',
    period: '2025',
    category: 'ai-product',
    roleTag: 'ai-engineer',
    badgeText: 'Redis GPU Task Queue',
    architectureFlow: ['Client Portrait Upload', 'Node.js + Redis Task Queue', 'GPU Face Swap + CDN'],
    summary:
      'Ứng dụng web cho phép người dùng tải ảnh chân dung để AI tự động ghép mặt vào nhân vật trong các video clip truyền thông mẫu và chia sẻ nhanh lên mạng xã hội.',
    technicalContributions: [
      'Thiết kế hệ thống hàng đợi tác vụ (Task Queue) bằng Redis và Node.js để điều phối yêu cầu sinh video tới cụm máy chủ AI Face Swap.',
      'Tối ưu hóa dung lượng video đầu ra và tích hợp CDN giúp tải/chia sẻ video mượt mà với độ trễ thấp nhất.',
      'Xây dựng Dashboard giám sát hiệu năng máy chủ (GPU Utilization, Queue Processing Time) và thống kê nhân khẩu học người dùng.',
    ],
    achievements: [
      'Phân phối tải GPU mượt mà, không xảy ra tình trạng quá tải server trong các khung giờ cao điểm của chiến dịch.',
      'Cung cấp báo cáo trực quan theo thời gian thực cho ban lãnh đạo nhãn hàng.',
    ],
    metrics: ['Redis Task Queue', 'CDN Video Delivery', 'GPU Monitoring'],
    techStack: ['Node.js', 'Redis', 'AI Face Swap', 'CDN', 'React Dashboard', 'GPU Server'],
    accentGradient: 'from-lime-600 via-emerald-600 to-teal-600',
  },
  {
    id: 'historical-ai-ambassador',
    brandLogo: 'vietnam-80-years',
    title: 'Đại Sứ Ảo AI Hỏi Đáp Lịch Sử Chuyên Sâu (Hệ thống RAG)',
    clientOrEvent: "Triển lãm Quốc gia '80 năm Hành trình Độc lập - Tự do - Hạnh phúc'",
    period: '2025',
    category: 'ai-product',
    roleTag: 'all',
    badgeText: '100% Fact-Checked RAG',
    architectureFlow: ['Verified Historical Corpus', 'Vector RAG + Moderation', '100% Accurate Kiosk AI'],
    summary:
      'Hệ thống AI Chatbot chuyên sâu phục vụ khách tham quan tra cứu và tìm hiểu kiến thức lịch sử tại Triển lãm Quốc gia với yêu cầu khắt khe về độ chính xác và an toàn nội dung.',
    technicalContributions: [
      'Xây dựng cơ sở tri thức lịch sử chuẩn hóa thông qua kiến trúc RAG (Retrieval-Augmented Generation).',
      'Thiết lập lớp kiểm duyệt nội dung (Content Moderation) đa tầng, đảm bảo độ chính xác tuyệt đối trước các chủ đề lịch sử.',
      'Triển khai hạ tầng thiết bị kiosk trưng bày, mạng kết nối và tối ưu hóa hệ thống chịu tải cao tại triển lãm.',
    ],
    achievements: [
      'Đảm bảo 100% câu trả lời bám sát dữ liệu lịch sử chính thống, an toàn và bảo mật.',
      'Hoạt động bền bỉ phục vụ đông đảo khách tham quan xuyên suốt thời gian triển lãm.',
    ],
    metrics: ['100% Fact Accuracy', 'RAG Architecture', 'Content Moderation'],
    techStack: ['RAG Pipeline', 'LLM API', 'Vector Search', 'Content Moderation', 'Node.js', 'On-site Kiosk'],
    accentGradient: 'from-rose-600 via-red-600 to-amber-500',
  },
  {
    id: 'enterprise-it-infrastructure',
    brandLogo: 'urah-trian-infra',
    title: 'Quản Trị Hạ Tầng CNTT, Máy Trạm GPU, Thiết Bị Văn Phòng & Sự Kiện',
    clientOrEvent: 'URAH Network & TriAn Corp',
    period: '2024 - Nay',
    category: 'it-infrastructure',
    roleTag: 'it-system',
    badgeText: 'SLA < 3 Phút',
    architectureFlow: ['LAN/Wi-Fi & ZKTeco HR Sync', 'Workstation GPU & Jetson Nano', 'On-site/Remote SLA < 3m'],
    summary:
      'Vận hành toàn diện hạ tầng mạng LAN/Wi-Fi doanh nghiệp, hệ thống máy chấm công, máy in văn phòng, dàn Workstation GPU và thiết bị nhúng phục vụ phát triển AI & sự kiện.',
    technicalContributions: [
      'Lắp đặt, cấu hình IP tĩnh và phần mềm quản lý máy chấm công vân tay/khuôn mặt (Ronald Jack, ZKTeco, Wise Eye), đồng bộ dữ liệu tự động cho HR.',
      'Bảo trì, khắc phục triệt để sự cố máy in (Canon, HP, Brother, Epson), chia sẻ in ấn qua mạng LAN/Wi-Fi.',
      'Tháo lắp, nâng cấp, bảo dưỡng dàn máy trạm GPU, tối ưu hóa mô hình chạy trên NVIDIA Jetson Nano & GTX 1050Ti.',
    ],
    achievements: [
      'Thiết lập dashboard giám sát tài nguyên và quy trình hỗ trợ từ xa/on-site giúp rút ngắn thời gian phản hồi ticket SLA xuống dưới 3 phút.',
      'Đảm bảo 100% tính sẵn sàng của thiết bị văn phòng và hạ tầng mạng trong công ty.',
    ],
    metrics: ['< 3m Ticket SLA', '100% Office Uptime', 'GPU & Jetson Setup'],
    techStack: ['LAN/Wi-Fi Networking', 'ZKTeco / Ronald Jack', 'NVIDIA Jetson Nano', 'Workstation GPU', 'Windows/Linux'],
    accentGradient: 'from-violet-600 via-purple-600 to-indigo-600',
  },
  {
    id: 'msb-heritage-music',
    brandLogo: 'urah-network',
    title: 'Hệ Sinh Thái Chiến Dịch AI "Vươn Tầm Từ Di Sản" – Tạp Chí Di Sản & AI Music Game',
    clientOrEvent: 'Ngân hàng TMCP Hàng Hải Việt Nam (MSB)',
    period: '2026',
    category: 'ai-product',
    roleTag: 'ai-engineer',
    badgeText: '3.59M+ TikTok Interactions',
    architectureFlow: ['Multi-SPA React + Vite', 'LLM Lyrics + AI Voice/Music', 'Brand Safety & TikTok Sync'],
    summary:
      'Phát triển hệ thống Web tương tác cho chuỗi 2 chiến dịch AI trọng điểm của ngân hàng MSB: "Lên Bìa Tạp Chí Di Sản Tương Lai" (tạo ảnh bìa tạp chí cá nhân hóa bằng AI) và "MSB AI Music Game – Cùng Quang Hùng MasterD Viết Tiếp Di Sản" (sáng tác lời ca khúc, tổng hợp giọng hát AI và kết xuất MV âm nhạc).',
    technicalContributions: [
      'Xây dựng kiến trúc Multi-SPA bằng React, TypeScript, Vite, Tailwind CSS v4 triển khai trên Firebase Hosting & Global CDN.',
      'Phát triển pipeline Backend tích hợp LLM sinh lời nhạc, AI Voice/Music synthesis ghép nối giai điệu gốc và bộ lọc kiểm duyệt Brand Safety đa tầng.',
      'Tự động kết xuất video lyric, hệ thống bình chọn (Voting) kèm thu thập và đồng bộ số liệu tương tác bài thi trên TikTok.',
    ],
    achievements: [
      'Phục vụ ổn định hơn 10,500+ lượt truy cập, khởi tạo thành công 2,729 bìa tạp chí AI và 4,068 bài nhạc/video AI.',
      'Thu hút 257 video dự thi trên TikTok đạt tổng cộng hơn 3,59 triệu lượt tương tác (Likes, Shares, Comments).',
    ],
    metrics: ['4,068 AI Music Videos', '2,729 AI Covers', '3.59M+ TikTok Reach'],
    techStack: ['React', 'TypeScript', 'Tailwind v4', 'LLM & AI Audio', 'Brand Safety', 'Firebase Hosting'],
    accentGradient: 'from-orange-600 via-red-600 to-rose-600',
  },
  {
    id: 'nestle-milo-2026',
    brandLogo: 'urah-network',
    title: 'Hệ Thống Tạo Video & Giọng Nói AI – Chiến Dịch "Cùng MILO Cổ Vũ Tới Cùng"',
    clientOrEvent: 'Nestlé Việt Nam (MILO)',
    period: '2026',
    category: 'ai-product',
    roleTag: 'ai-engineer',
    badgeText: 'OWASP ASVS Level 2',
    architectureFlow: ['React 19 + HMAC OTP', 'ElevenLabs v3 + OpenCV/MediaPipe', 'FFmpeg 4-Thread Full HD'],
    summary:
      'Nền tảng Web App tương tác cho chiến dịch của Nestlé Việt Nam, cho phép người dùng tải ảnh chân dung và chọn chủ đề để AI tự động sinh giọng đọc cổ vũ cá nhân hóa, đồng thời ghép mặt chuyển động vào video/karaoke Full HD.',
    technicalContributions: [
      'Phát triển Frontend (React 19, TypeScript) và Backend Media Engine (Node.js Express kết hợp Python OpenCV, MediaPipe, PyTorch, FFmpeg 4 luồng) trên Google Cloud VM & Platform.sh.',
      'Tích hợp ElevenLabs TTS (eleven_v3) sinh giọng nói AI cá nhân hóa và cổng xác thực OTP Zalo ZNS/Voice Call ký mã HMAC-SHA256 chống bot bào mòn ngân sách API.',
      'Triển khai bộ lọc Brand Safety đa tầng kiểm duyệt khuôn mặt chính khách/nhạy cảm và từ cấm.',
    ],
    achievements: [
      'Vượt qua 100% quy trình kiểm định bảo mật doanh nghiệp của Nestlé (OWASP ASVS v4.0.3 Level 2 & OWASP API Security Top 10).',
      'Tối ưu hóa tốc độ kết xuất video Full HD đa luồng và phân phối mượt mà qua Firebase Storage.',
    ],
    metrics: ['100% OWASP Passed', 'ElevenLabs v3 TTS', 'Full HD Multi-thread'],
    techStack: ['React 19', 'Node.js', 'Python OpenCV/MediaPipe', 'ElevenLabs TTS', 'FFmpeg', 'GCP VM / Platform.sh'],
    accentGradient: 'from-emerald-600 via-green-600 to-lime-500',
  },
  {
    id: 'nutifood-bridge-2026',
    brandLogo: 'nutifood',
    title: 'Nền Tảng Tương Tác QR Code "Cầu Đi Bộ Nutifood" – Bản Đồ Tọa Độ & Ảnh/Video AI',
    clientOrEvent: 'Chiến dịch Cầu Đi Bộ Nutifood 2026',
    period: '2026',
    category: 'interactive-event',
    roleTag: 'ai-engineer',
    badgeText: '29M+ QR Database',
    architectureFlow: ['29M QR SQLite (<200ms)', 'Gemini AI Safety + Resume Flow', 'Bridge Coordinate Map + 2FA Admin'],
    summary:
      'Nền tảng Web tương tác quy mô lớn cho dự án Cầu Đi Bộ của Nutifood, nơi người dùng quét mã QR định danh, xác thực OTP để nhận tọa độ vị trí riêng trên bản đồ mặt cầu, đồng thời tạo ảnh thẻ có tọa độ và video AI cá nhân hóa.',
    technicalContributions: [
      'Thiết kế kiến trúc Backend (Express, TypeScript, Docker trên GCP VM) tối ưu hóa truy vấn cơ sở dữ liệu SQLite quy mô 29 triệu bản ghi mã QR (3GB) với độ trễ dưới 200ms.',
      'Xây dựng cơ chế khôi phục hành trình thông minh (QR Resume Flow), kiểm duyệt hình ảnh/tên tự động bằng Gemini AI và thuật toán ghim tọa độ trực quan trên bản đồ mặt cầu.',
      'Phát triển hệ thống Admin Dashboard bảo mật 2 lớp (Argon2id + TOTP 2FA) phục vụ giám sát thời gian thực, tra cứu log và xuất báo cáo.',
    ],
    achievements: [
      'Đảm bảo trải nghiệm liền mạch 100% ngay cả khi người dùng thoát trang giữa chừng và quét lại mã QR.',
      'Xử lý truy vấn tức thì trên tập dữ liệu 29 triệu mã QR và bảo vệ toàn diện dữ liệu cá nhân bằng HMAC-SHA256.',
    ],
    metrics: ['29M+ QR Records', '< 200ms Query Time', 'TOTP 2FA Dashboard'],
    techStack: ['React 19', 'Express + TypeScript', 'SQLite (29M rows)', 'Gemini AI', 'Docker / GCP', 'Argon2id + 2FA'],
    accentGradient: 'from-teal-600 via-cyan-600 to-blue-600',
  },
  {
    id: 'ai-doc-nhanh-tclife-cungai',
    brandLogo: 'urah-network',
    title: 'Hệ Sinh Thái AI Đọc Nhanh, Techcombank/TCLIFE Photobooth & Cùng AI Workshops',
    clientOrEvent: 'DocNhanh • Techcombank / TC Life • Cùng AI SME',
    period: '2025 - 2026',
    category: 'ai-product',
    roleTag: 'ai-engineer',
    badgeText: 'Multi-Project Ecosystem',
    architectureFlow: ['AI Document Summarizer (Traefik)', 'TCLIFE AI Outfit & Analytics', 'Cùng AI SME Landing Pages'],
    summary:
      'Tập hợp các nền tảng ứng dụng AI chuyên biệt: Hệ thống tóm tắt và đọc nhanh tài liệu thông minh (DocNhanh), ứng dụng tạo ảnh AI theo trang phục kèm Dashboard thống kê cho Techcombank/TCLIFE, và chuỗi trang đích chuyển đổi AI cho SME (Cùng AI).',
    technicalContributions: [
      'Xây dựng kiến trúc Full-Stack cho AI Đọc Nhanh tích hợp Docker và Reverse Proxy bảo mật qua Traefik.',
      'Phát triển luồng biến đổi trang phục AI (Reference Outfit Pipeline) và Real-time Dashboard theo dõi số liệu cho chiến dịch Techcombank / TC Life.',
      'Thiết kế và tối ưu hóa hiệu năng chuyển đổi cho hệ sinh thái Landing Page đào tạo AI Mindset & AI SME Workshop.',
    ],
    achievements: [
      'Rút ngắn thời gian triển khai đa dự án song song nhờ áp dụng chuẩn hóa kiến trúc và Vibe Coding.',
      'Đảm bảo tính ổn định, giao diện chuẩn Responsive và bảo mật API trên toàn bộ các sản phẩm.',
    ],
    metrics: ['3+ Live Platforms', 'Docker & Traefik', 'AI Outfit Pipeline'],
    techStack: ['React', 'TypeScript', 'Node.js', 'PHP Analytics', 'Docker', 'Traefik'],
    accentGradient: 'from-blue-600 via-indigo-600 to-violet-600',
  },
];

// Lịch sử công tác kết hợp cả 2 góc độ (AI Software Engineer & IT System Specialist)
export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: 'urah-current',
    brandLogo: 'urah-network',
    company: 'CÔNG TY CỔ PHẦN TRUYỀN THÔNG URAH NETWORK',
    aiRoleTitle: 'AI-Driven Software Engineer (AI Engineer / Creative Technologist)',
    itRoleTitle: 'Kỹ thuật viên Quản trị Hệ thống & Hỗ trợ CNTT',
    period: '06/2025 - Hiện tại',
    isCurrent: true,
    aiHighlights: [
      'Ứng dụng phương pháp Vibe Coding kết hợp AI Agents (Antigravity, Cursor) tăng tốc độ phát triển phần mềm gấp 5 lần và xây dựng kiến trúc hệ thống Full-Stack bền vững.',
      'Chịu trách nhiệm thiết kế, lập trình và vận hành các giải pháp AI tương tác thời gian thực (Digital Human, Face Swap Video, RAG Chatbot) và Real-time Analytics Dashboard cho GE Vernova, Abbott Ensure Gold, Nutifood, AI for Good 2026.',
    ],
    itHighlights: [
      'Khảo sát, lắp đặt và cấu hình toàn bộ hệ thống máy tính điều khiển, màn hình LED, thiết bị mạng Wi-Fi/LAN và đường truyền thời gian thực tại các sự kiện lớn.',
      'Quản trị máy chấm công vân tay/khuôn mặt, bảo trì hệ thống máy in văn phòng qua mạng LAN và hỗ trợ người dùng On-site/Remote với thời gian xử lý ticket SLA dưới 3 phút.',
    ],
    tags: ['Vibe Coding', 'Antigravity', 'Full-Stack AI', 'Socket.io', 'Event Infrastructure', 'IT Helpdesk SLA'],
  },
  {
    id: 'trian-corp',
    brandLogo: 'trian-corp',
    company: 'CÔNG TY CỔ PHẦN TRIAN',
    aiRoleTitle: 'Junior AI Engineer',
    itRoleTitle: 'IT Support & Quản trị Thiết bị / Ứng dụng',
    period: '05/2025 - 06/2025',
    aiHighlights: [
      'Tham gia phát triển ứng dụng di động TriAn tích hợp AI hỗ trợ người cao tuổi theo dõi sức khỏe và hội thoại giảm căng thẳng.',
      'Xây dựng các API hiệu năng cao kết nối các mô hình ngôn ngữ nhỏ (Small Language Models) với hệ thống CRM cốt lõi.',
      'Nghiên cứu kỹ thuật Lượng tử hóa trọng số (Model Quantization), tối ưu hóa mô hình AI chạy mượt mà trực tiếp trên phần cứng nhúng NVIDIA Jetson Nano và máy trạm GTX 1050Ti.',
    ],
    itHighlights: [
      'Cài đặt, đồng bộ hóa thiết bị người dùng cuối (máy tính văn phòng, điện thoại, máy tính bảng) với hệ thống CRM và cơ sở dữ liệu nội bộ.',
      'Xử lý sự cố phần cứng, phần mềm, email công ty; phân quyền truy cập tài nguyên mạng, sao lưu dữ liệu định kỳ và phòng chống mã độc.',
    ],
    tags: ['Small Language Models', 'Model Quantization', 'NVIDIA Jetson Nano', 'CRM API', 'System Security'],
  },
  {
    id: 'urah-intern',
    brandLogo: 'urah-network',
    company: 'CÔNG TY CỔ PHẦN TRUYỀN THÔNG URAH NETWORK',
    aiRoleTitle: 'Thực tập sinh Machine Learning & Web Developer',
    itRoleTitle: 'Thực tập sinh Phần cứng & Quản trị Hệ thống',
    period: '07/2024 - 05/2025',
    aiHighlights: [
      'Thiết kế và lập trình Frontend các trang web chính thức (Urah Network, Nhanhieucot, Wcag...) chuẩn Responsive trên mọi thiết bị và tối ưu hóa SEO khắt khe.',
      'Xây dựng và tối ưu hóa mô hình phân loại hình ảnh bằng TensorFlow & mạng CNN; áp dụng thuật toán KNN, SVM để phân tích phân cụm dữ liệu người dùng.',
      'Viết tài liệu kỹ thuật chi tiết, hỗ trợ đóng gói mô hình AI và sửa lỗi hệ thống.',
    ],
    itHighlights: [
      'Tháo lắp, vệ sinh, tra keo tản nhiệt, nâng cấp linh kiện (RAM, SSD, PSU) cho dàn máy trạm đồ họa GPU và thiết bị nhúng Jetson Nano.',
      'Cài đặt Windows 10/11, Ubuntu Linux, phần mềm văn phòng/kế toán và quản lý kiểm kê tài sản CNTT định kỳ.',
    ],
    tags: ['Frontend SEO', 'TensorFlow / CNN', 'KNN & SVM', 'Workstation GPU Maintenance', 'Ubuntu / Windows'],
  },
];

// Thông tin Học vấn & Hoạt động
export const EDUCATION_DATA: EducationInfo = {
  university: 'ĐẠI HỌC THỦY LỢI (Thuyloi University)',
  brandLogo: 'tlu-university',
  degree: 'Kỹ sư Công nghệ Thông tin',
  major: 'Chuyên ngành: Công nghệ Thông tin',
  period: '2019 - 2026',
  thesisTitle: 'Đồ án tốt nghiệp xuất sắc: “Giải pháp ứng dụng Trí tuệ nhân tạo vào lĩnh vực y tế”',
  certifications: [
    'Hoàn thành chương trình đào tạo chuyên sâu về Trí tuệ nhân tạo (AI) và Machine Learning tại Đại học Thủy Lợi.',
    'Hoàn thành chương trình chuyên sâu về CNTT, Mạng máy tính & Quản trị Hệ thống tại Đại học Thủy Lợi.',
  ],
  activities: [
    'Thành viên tích cực tham gia các kỳ thi lập trình Hackathon sinh viên.',
    'Thành viên Câu lạc bộ Nghiên cứu Khoa học trẻ – phát triển các đề tài ứng dụng AI thực tiễn.',
  ],
};
