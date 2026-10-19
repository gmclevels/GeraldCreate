import React, { useState } from 'react';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Edit3, 
  Globe, 
  Layers, 
  ShieldCheck, 
  Building2, 
  Cpu, 
  FolderGit2,
  Briefcase
} from 'lucide-react';
import { ProfileData } from '../types.ts';

interface NavbarProps {
  profile: ProfileData;
  onOpenEditor: () => void;
  onOpenDocs: () => void;
  onScrollTo3D: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  profile, 
  onOpenEditor, 
  onOpenDocs,
  onScrollTo3D 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanWhatsApp = profile.whatsapp.replace(/[^0-9]/g, '');
  const whatsAppUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
    `Hello ${profile.name}, I am contacting you through Gerald Creates regarding your projects and services.`
  )}`;

  return (
    <>
      {/* TOP NOTIFICATION / QUICK ACTIONS BAR */}
      <div className="bg-navy-900 border-b border-navy-800 text-xs py-2 px-4 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-medium">Open for Construction Contracts, Real Estate &amp; Digital Ventures</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onScrollTo3D}
              className="text-slate-300 hover:text-gold-400 font-medium inline-flex items-center gap-1.5 transition"
            >
              <Layers className="w-3.5 h-3.5 text-gold-400" />
              <span>3D Architecture Model</span>
            </button>
            <button 
              onClick={onOpenEditor}
              className="text-gold-400 hover:text-gold-300 font-semibold inline-flex items-center gap-1.5 transition"
              title="Edit Profile Bio, WhatsApp, Phone, and Details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Live Content Editor</span>
            </button>
            <button 
              onClick={onOpenDocs}
              className="text-slate-300 hover:text-white font-medium inline-flex items-center gap-1.5 transition"
              title="Preview, Publish and Connect Custom Domain"
            >
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>Host &amp; Domain Guide</span>
            </button>
          </div>
        </div>
      </div>

      {/* STICKY MAIN NAVBAR */}
      <header className="sticky top-0 z-40 bg-navy-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo / Brand Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-navy-950 font-black text-xl shadow group-hover:scale-105 transition-transform">
              G
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                {profile.brandName}
              </span>
              <span className="text-xs text-gold-400 tracking-wider uppercase font-semibold block">
                {profile.name}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-gold-400 transition-colors">About</a>
            <a href="#construction" className="hover:text-gold-400 transition-colors">Construction &amp; 3D Epoxy</a>
            <a href="#property" className="hover:text-gold-400 transition-colors">Property Hub</a>
            <a href="#ai-digital" className="hover:text-gold-400 transition-colors">AI &amp; Digital</a>
            <a href="#projects" className="hover:text-gold-400 transition-colors">Projects</a>
            <a href="#services" className="hover:text-gold-400 transition-colors">Services</a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-gold-500 hover:bg-gold-400 text-navy-950 transition shadow-sm"
            >
              <span>Contact Gerald</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-navy-900 border-b border-slate-800 px-6 py-6 space-y-4 shadow-xl">
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-gold-400 text-base font-medium"
            >
              About Gerald Uzor
            </a>
            <a 
              href="#construction" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-gold-400 text-base font-medium"
            >
              Building, Stamped Concrete &amp; 3D Epoxy
            </a>
            <a 
              href="#property" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-gold-400 text-base font-medium"
            >
              Gerald's Property Hub
            </a>
            <a 
              href="#ai-digital" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-gold-400 text-base font-medium"
            >
              AI &amp; Digital Products
            </a>
            <a 
              href="#projects" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-gold-400 text-base font-medium"
            >
              Projects Catalog
            </a>
            <a 
              href="#services" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-slate-200 hover:text-gold-400 text-base font-medium"
            >
              Professional Services
            </a>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollTo3D();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-navy-800 text-gold-400 border border-gold-500/30 text-sm font-semibold"
              >
                <Layers className="w-4 h-4" />
                <span>Explore 3D Architectural Scene</span>
              </button>
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white font-semibold text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3 rounded-lg bg-gold-500 text-navy-950 font-bold text-sm"
              >
                Direct Contact Form
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
