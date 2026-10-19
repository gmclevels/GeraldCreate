import React from 'react';
import { Layers, Edit3, Globe, ShieldCheck, Heart } from 'lucide-react';
import { ProfileData } from '../types.ts';

interface FooterProps {
  profile: ProfileData;
  onOpenEditor: () => void;
  onOpenDocs: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onScrollTo3D: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  onOpenEditor,
  onOpenDocs,
  onOpenPrivacy,
  onOpenTerms,
  onScrollTo3D
}) => {
  return (
    <footer className="bg-navy-950 border-t border-slate-800/80 py-14 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-gold-600 to-gold-400 flex items-center justify-center text-navy-950 font-black text-lg shadow">
                G
              </div>
              <div>
                <span className="text-base font-bold text-white block">{profile.brandName}</span>
                <span className="text-xs text-gold-400 font-semibold">{profile.name}</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Connecting physical structural excellence with digital leverage. Building construction, decorative stamped concrete, verified real estate, and generative AI toolkits.
            </p>

            <div className="text-[11px] text-slate-400 flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Available for physical &amp; digital contracts nationwide</span>
            </div>
          </div>

          {/* Quick Portfolio Links */}
          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Divisions &amp; Ventures
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-gold-400 transition-colors">About Gerald Uzor</a>
              </li>
              <li>
                <a href="#construction" className="hover:text-gold-400 transition-colors">Building, Stamped Concrete &amp; 3D Epoxy</a>
              </li>
              <li>
                <a href="#property" className="hover:text-gold-400 transition-colors">Gerald's Property Hub</a>
              </li>
              <li>
                <a href="#ai-digital" className="hover:text-gold-400 transition-colors">The AI Income Starter Kit</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-gold-400 transition-colors">Full Project Catalog</a>
              </li>
              <li>
                <a href="#services" className="hover:text-gold-400 transition-colors">Professional Contracting Services</a>
              </li>
            </ul>
          </div>

          {/* Administration & Legal */}
          <div className="md:col-span-3 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Tools &amp; Policies
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onScrollTo3D} className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-gold-400" />
                  <span>Interactive 3D Scene</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenEditor} className="hover:text-gold-400 transition-colors flex items-center gap-1.5 text-gold-400 font-medium">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Live Content Editor</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenDocs} className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Host &amp; Custom Domain Guide</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenPrivacy} className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Privacy Statement</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-gold-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                  <span>Terms &amp; Authenticity Policy</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {profile.brandName} ({profile.name}). All rights reserved.
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with precision for Gerald Uzor</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
