import React from 'react';
import { 
  ArrowDown, 
  Mail, 
  Layers, 
  Hammer, 
  ShieldCheck, 
  Cpu, 
  MapPin, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ProfileData } from '../types.ts';

interface HeroProps {
  profile: ProfileData;
  onScrollTo3D: () => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onScrollTo3D }) => {
  return (
    <section id="home" className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-slate-800/80">
      
      {/* Background Subtle Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Role Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-500/40 bg-gold-500/10 text-gold-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm">
          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
          <span>{profile.role}</span>
        </div>

        {/* Core Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight md:leading-tight">
          {profile.headline}
        </h1>

        {/* Short Introduction */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
          {profile.shortIntro}
        </p>

        {/* Primary Call to Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-base transition shadow-lg shadow-gold-500/10 flex items-center gap-2 group"
          >
            <span>View My Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-7 py-3.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-white font-medium border border-slate-700 hover:border-gold-500/40 text-base transition flex items-center gap-2"
          >
            <span>Contact Me</span>
            <Mail className="w-4 h-4 text-gold-400" />
          </a>

          <button
            onClick={onScrollTo3D}
            className="px-6 py-3.5 rounded-lg bg-navy-900/90 hover:bg-navy-850 text-gold-300 font-semibold border border-gold-500/40 text-sm transition flex items-center gap-2"
          >
            <Layers className="w-4 h-4 text-gold-400" />
            <span>Interactive 3D Villa &amp; Pavement</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
            <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
              <Hammer className="w-4 h-4 text-gold-500" />
              <span>Built to Last</span>
            </div>
            <p className="text-xs mt-1 text-slate-400 font-medium">Concrete &amp; Carcass Engineering</p>
          </div>

          <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
            <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-500" />
              <span>Verified Title</span>
            </div>
            <p className="text-xs mt-1 text-slate-400 font-medium">Gerald's Property Hub</p>
          </div>

          <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
            <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
              <Cpu className="w-4 h-4 text-gold-500" />
              <span>AI Income Kit</span>
            </div>
            <p className="text-xs mt-1 text-slate-400 font-medium">Digital Toolkits &amp; Systems</p>
          </div>

          <div className="p-3 rounded-lg bg-navy-900/40 border border-slate-800/60">
            <div className="text-xl font-bold text-white flex items-center justify-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-500" />
              <span>Nigeria</span>
            </div>
            <p className="text-xs mt-1 text-slate-400 font-medium">Nationwide Delivery</p>
          </div>
        </div>

      </div>
    </section>
  );
};
