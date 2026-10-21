// Định nghĩa các kiểu dữ liệu cho Portfolio của Phạm Phúc Quang
import { BrandLogoKey } from '../components/ui/ProjectBrandLogo';

export type RoleMode = 'all' | 'ai-engineer' | 'it-system';

export interface PersonalInfo {
  fullName: string;
  englishRoleBadge: string;
  primaryTitle: string;
  secondaryTitle: string;
  birthDate: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  shortAddress: string;
  statusText: string;
  aiCareerObjective: string;
  itCareerObjective: string;
  highlights: {
    label: string;
    value: string;
    description: string;
    accentColor: string;
    role: RoleMode;
  }[];
  hobbies: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  subtitle: string;
  category: RoleMode;
  accent: 'indigo' | 'cyan' | 'amber' | 'emerald' | 'rose' | 'violet';
  iconName: string;
  items: {
    name: string;
    detail: string;
    featured?: boolean;
  }[];
}

export interface ProjectItem {
  id: string;
  brandLogo: BrandLogoKey;
  title: string;
  clientOrEvent: string;
  period: string;
  category: 'interactive-event' | 'ai-product' | 'analytics-miniapp' | 'it-infrastructure';
  roleTag: RoleMode;
  architectureFlow: [string, string, string];
  summary: string;
  technicalContributions: string[];
  achievements: string[];
  metrics: string[];
  techStack: string[];
  accentGradient: string;
  badgeText: string;
}

export interface ExperienceItem {
  id: string;
  brandLogo: BrandLogoKey;
  company: string;
  aiRoleTitle: string;
  itRoleTitle: string;
  period: string;
  isCurrent?: boolean;
  aiHighlights: string[];
  itHighlights: string[];
  tags: string[];
}

export interface EducationInfo {
  university: string;
  brandLogo: BrandLogoKey;
  degree: string;
  major: string;
  period: string;
  thesisTitle: string;
  certifications: string[];
  activities: string[];
}
