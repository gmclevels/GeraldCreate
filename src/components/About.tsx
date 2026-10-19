import React from 'react';
import { 
  MapPin, 
  Briefcase, 
  CheckCircle2, 
  Edit3, 
  Sparkles, 
  Hammer, 
  ShieldCheck, 
  Award,
  Layers
} from 'lucide-react';
import { ProfileData } from '../types.ts';

interface AboutProps {
  profile: ProfileData;
  onOpenEditor: () => void;
  onScrollTo3D: () => void;
}

export const About: React.FC<AboutProps> = ({ profile, onOpenEditor, onScrollTo3D }) => {
  return (
    <section id="about" className="py-20 bg-navy-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Profile Box */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl p-1 bg-gradient-to-b from-gold-500/30 via-slate-800 to-transparent">
              <div className="rounded-2xl bg-navy-900 border border-slate-800 p-8 shadow-xl">
                
                {/* Monogram Avatar */}
                <div className="w-24 h-24 rounded-2xl bg-navy-800 border-2 border-gold-500/80 flex items-center justify-center text-gold-400 text-3xl font-black mb-6 shadow-inner tracking-wider">
                  GU
                </div>

                <h3 className="text-2xl font-bold text-white tracking-tight">{profile.name}</h3>
                <p className="text-sm font-semibold text-gold-400 mt-1">{profile.brandName}</p>
                <p className="text-xs text-slate-400 mt-0.5">{profile.role}</p>

                {/* Profile Details List */}
                <div className="mt-6 space-y-3.5 text-sm text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed">{profile.location}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed">
                      Construction • Stamped Concrete • 3D Epoxy Flooring • Real Estate • AI Assets
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-xs leading-relaxed text-emerald-300">
                      Zero Fabricated Claims • Verified Real-World Execution
                    </span>
                  </div>
                </div>

                {/* Actions & Verification */}
                <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={onOpenEditor}
                    className="text-xs text-gold-400 hover:text-gold-300 flex items-center gap-1.5 font-semibold transition"
                    title="Edit biography, contacts, and location"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Bio in Live Editor</span>
                  </button>

                  <span className="text-[11px] text-slate-400 font-medium px-2 py-0.5 rounded bg-navy-950 border border-slate-800">
                    Authentic Portfolio
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Biography & Operational Credo */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-navy-900 border border-slate-800 text-gold-400 text-xs font-semibold uppercase tracking-wider">
              <span>Biography &amp; Core Focus</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-snug">
              Creating tangible value at the intersection of craftsmanship and digital leverage.
            </h2>

            <div className="text-slate-300 text-base leading-relaxed space-y-4 font-light">
              <p className="whitespace-pre-line">{profile.aboutBio}</p>
            </div>

            {/* Pillar highlights */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800 hover:border-gold-500/30 transition">
                <div className="font-bold text-white flex items-center gap-2 text-sm">
                  <Hammer className="w-4 h-4 text-gold-400" />
                  <span>Physical Rigor &amp; Craftsmanship</span>
                </div>
                <p className="mt-1.5 text-slate-400 text-xs leading-relaxed">
                  Monolithic concrete batching, high-grade color hardeners, and precision stamping molds engineered for heavy vehicular traffic.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-navy-900/70 border border-slate-800 hover:border-gold-500/30 transition">
                <div className="font-bold text-white flex items-center gap-2 text-sm">
                  <Sparkles className="w-4 h-4 text-gold-400" />
                  <span>Scalable Digital Toolkits</span>
                </div>
                <p className="mt-1.5 text-slate-400 text-xs leading-relaxed">
                  Practical curricula like the AI Income Starter Kit that simplify modern AI prompting for freelance contracts and product creation.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="#construction"
                className="text-xs font-bold text-gold-400 hover:underline inline-flex items-center gap-1"
              >
                <span>Explore Stamped Concrete &amp; 3D Epoxy</span>
                <span>&rarr;</span>
              </a>
              <span className="text-slate-600">•</span>
              <a
                href="#property"
                className="text-xs font-bold text-slate-300 hover:text-white inline-flex items-center gap-1"
              >
                <span>View Property Hub</span>
                <span>&rarr;</span>
              </a>
              <span className="text-slate-600">•</span>
              <button
                onClick={onScrollTo3D}
                className="text-xs font-bold text-slate-300 hover:text-gold-400 inline-flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Inspect 3D Cutaway</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
