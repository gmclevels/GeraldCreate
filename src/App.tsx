import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { About } from './components/About.tsx';
import { ConstructionSection } from './components/ConstructionSection.tsx';
import { PropertyHubSection } from './components/PropertyHubSection.tsx';
import { DigitalProductsSection } from './components/DigitalProductsSection.tsx';
import { ProjectsGallery } from './components/ProjectsGallery.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { ThreeScene } from './components/ThreeScene.tsx';
import { LiveContentEditor } from './components/LiveContentEditor.tsx';
import { DeploymentGuideModal } from './components/DeploymentGuideModal.tsx';
import { LegalModals } from './components/LegalModals.tsx';
import { InquiryModal } from './components/InquiryModal.tsx';
import { INITIAL_CONFIG } from './data/initialData.ts';
import { PortfolioConfig } from './types.ts';
import { Layers, Sparkles, Hammer, ShieldCheck } from 'lucide-react';

export default function App() {
  // Load configuration with LocalStorage persistence so Gerald can modify details live
  const [config, setConfig] = useState<PortfolioConfig>(() => {
    try {
      const saved = localStorage.getItem('gerald_creates_config_v2');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn("Could not load saved portfolio config, using initial default.", e);
    }
    return INITIAL_CONFIG;
  });

  // Modal & Drawer visibility states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | null>(null);
  
  // Item-specific inquiry modal state
  const [inquiryModal, setInquiryModal] = useState<{
    isOpen: boolean;
    title: string;
    type: string;
  }>({
    isOpen: false,
    title: '',
    type: 'GENERAL'
  });

  const threeRef = useRef<HTMLDivElement>(null);

  // Save changes to localStorage
  const handleSaveConfig = (newConfig: PortfolioConfig) => {
    setConfig(newConfig);
    try {
      localStorage.setItem('gerald_creates_config_v2', JSON.stringify(newConfig));
    } catch (e) {
      console.error("Failed to save to localStorage", e);
    }
  };

  const handleResetConfig = () => {
    if (window.confirm("Reset all contact details, biography, and projects to original defaults?")) {
      setConfig(INITIAL_CONFIG);
      try {
        localStorage.removeItem('gerald_creates_config_v2');
      } catch (e) {
        console.error(e);
      }
      setIsEditorOpen(false);
    }
  };

  const handleOpenInquiry = (title: string, type: string) => {
    setInquiryModal({
      isOpen: true,
      title,
      type
    });
  };

  const handleScrollTo3D = () => {
    if (threeRef.current) {
      threeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter projects by category for specialized views
  const constructionProjects = config.projects.filter(p => p.category === 'construction');
  const digitalProjects = config.projects.filter(p => p.category === 'digital');

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-gold-500 selection:text-navy-950">
      
      {/* 1. Header & Navigation */}
      <Navbar 
        profile={config.profile}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenDocs={() => setShowDocsModal(true)}
        onScrollTo3D={handleScrollTo3D}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        
        {/* 2. Hero Section */}
        <Hero 
          profile={config.profile} 
          onScrollTo3D={handleScrollTo3D}
        />

        {/* 3. Three.js Interactive 3D Architectural & Stamped Concrete Scene */}
        <section 
          id="three-showcase" 
          ref={threeRef}
          className="py-16 bg-navy-900/30 border-b border-slate-800/80 scroll-mt-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-wider mb-2">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Interactive 3D Virtual Showcase</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Villa Architecture, Stamped Pavement &amp; 3D Epoxy Explorer
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
                  Inspect the physical layering of decorative stamped concrete and luxury seamless 3D metallic epoxy flooring alongside contemporary villa architecture and solar integration.
                </p>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>WebGL Studio PBR</span>
                </span>
                <span className="text-slate-600">•</span>
                <span>RoomEnvironment Lighting</span>
              </div>
            </div>

            {/* Three.js Canvas Container */}
            <ThreeScene 
              onInquireTopic={(topic) => handleOpenInquiry(topic, "3D_SHOWCASE")}
            />

          </div>
        </section>

        {/* 4. About Gerald Uzor Section */}
        <About 
          profile={config.profile}
          onOpenEditor={() => setIsEditorOpen(true)}
          onScrollTo3D={handleScrollTo3D}
        />

        {/* 5. Construction & Decorative Stamped Concrete Section */}
        <ConstructionSection 
          constructionProjects={constructionProjects}
          whatsappNumber={config.profile.whatsapp}
          onOpenInquiry={handleOpenInquiry}
          onScrollTo3D={handleScrollTo3D}
        />

        {/* 6. Gerald's Property Hub Section */}
        <PropertyHubSection 
          properties={config.properties}
          whatsappNumber={config.profile.whatsapp}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 7. AI & Digital Products Section */}
        <DigitalProductsSection 
          digitalProjects={digitalProjects}
          whatsappNumber={config.profile.whatsapp}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 8. Full Projects Catalog Gallery */}
        <ProjectsGallery 
          projects={config.projects}
          whatsappNumber={config.profile.whatsapp}
          onOpenInquiry={handleOpenInquiry}
          onScrollTo3D={handleScrollTo3D}
        />

        {/* 9. Professional Services Section */}
        <ServicesSection 
          services={config.services}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* 10. Contact & Instant Brief Dispatcher */}
        <ContactSection 
          profile={config.profile}
          onOpenPrivacy={() => setLegalModalType('privacy')}
          onOpenTerms={() => setLegalModalType('terms')}
        />

      </main>

      {/* 11. Footer */}
      <Footer 
        profile={config.profile}
        onOpenEditor={() => setIsEditorOpen(true)}
        onOpenDocs={() => setShowDocsModal(true)}
        onOpenPrivacy={() => setLegalModalType('privacy')}
        onOpenTerms={() => setLegalModalType('terms')}
        onScrollTo3D={handleScrollTo3D}
      />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* Live Content Editor Drawer */}
      <LiveContentEditor 
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        config={config}
        onSave={handleSaveConfig}
        onReset={handleResetConfig}
      />

      {/* Deployment & Custom Domain Master Guide Modal */}
      <DeploymentGuideModal 
        isOpen={showDocsModal}
        onClose={() => setShowDocsModal(false)}
      />

      {/* Item-Specific WhatsApp / Email Inquiry Modal */}
      <InquiryModal 
        isOpen={inquiryModal.isOpen}
        onClose={() => setInquiryModal(prev => ({ ...prev, isOpen: false }))}
        title={inquiryModal.title}
        type={inquiryModal.type}
        whatsappNumber={config.profile.whatsapp}
        email={config.profile.email}
      />

      {/* Privacy Policy & Terms Modals */}
      <LegalModals 
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

    </div>
  );
}
