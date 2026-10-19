import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  ArrowRight, 
  MessageCircle, 
  Filter,
  CheckCircle2,
  Layers,
  Sparkles
} from 'lucide-react';
import { ProjectItem } from '../types.ts';

interface ProjectsGalleryProps {
  projects: ProjectItem[];
  whatsappNumber: string;
  onOpenInquiry: (title: string, type: string) => void;
  onScrollTo3D: () => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  projects,
  whatsappNumber,
  onOpenInquiry,
  onScrollTo3D
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'construction' | 'property' | 'digital'>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="projects" className="py-20 bg-navy-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Comprehensive Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            All Works &amp; Ventures
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Explore verified structural works, property developments, and digital tools. Projects containing demonstration mockups are strictly marked with sample badges for transparent review.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {[
            { id: 'all', label: 'All Ventures' },
            { id: 'construction', label: 'Building & Stamped Concrete' },
            { id: 'property', label: "Gerald's Property Hub" },
            { id: 'digital', label: 'AI & Digital Products' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                activeFilter === tab.id
                  ? 'bg-gold-500 text-navy-950 font-bold shadow'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-850 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((item) => (
            <div 
              key={item.id}
              className="rounded-2xl overflow-hidden bg-navy-900 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 flex flex-col justify-between group shadow-lg"
            >
              {/* Image & Status Badges */}
              <div>
                <div className="relative h-52 overflow-hidden bg-navy-950">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded bg-navy-950/90 text-gold-400 text-[10px] font-bold uppercase tracking-wider border border-gold-500/30">
                      {item.category === 'construction' ? 'Construction' :
                       item.category === 'property' ? 'Real Estate' : 'AI / Digital'}
                    </span>

                    {item.isSample && (
                      <span className="px-2 py-0.5 rounded bg-blue-900/90 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                        Sample Project
                      </span>
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-navy-950/90 text-slate-200 text-[11px] font-medium border border-slate-700">
                      {item.status}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  <div className="text-[11px] font-semibold text-gold-400 mb-1.5">{item.meta}</div>
                  
                  <h3 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {item.highlights && (
                    <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1">
                      {item.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <CheckCircle2 className="w-3 h-3 text-gold-400 flex-shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => onOpenInquiry(item.title, item.category.toUpperCase())}
                  className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1.5 transition"
                >
                  <span>{item.linkText || "Inquire Details"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hi Gerald, inquiring about: ${item.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-navy-800 hover:bg-emerald-600 hover:text-white text-emerald-400 transition"
                    title="Quick WhatsApp message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
