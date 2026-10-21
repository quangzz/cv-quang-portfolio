import React from 'react';
import { PortfolioProvider } from './context/PortfolioContext';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroBento } from './components/features/HeroBento';
import { SkillsGrid } from './components/features/SkillsGrid';
import { ProjectsShowcase } from './components/features/ProjectsShowcase';
import { ExperienceTimeline } from './components/features/ExperienceTimeline';
import { EducationHardwareSection } from './components/features/EducationHardwareSection';
import { ContactSection } from './components/features/ContactSection';

// Component chính kết nối các phân khu của trang Portfolio cá nhân Phạm Phú Quang
export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <div className="min-h-screen flex flex-col bg-grid-pattern">
          <Navbar />
          <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <HeroBento />
            <SkillsGrid />
            <ProjectsShowcase />
            <ExperienceTimeline />
            <EducationHardwareSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </PortfolioProvider>
    </ErrorBoundary>
  );
};

export default App;
