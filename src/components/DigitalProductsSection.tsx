import React from 'react';
import { 
  Cpu, 
  Zap, 
  BookOpen, 
  CheckCircle2, 
  Download, 
  MessageCircle, 
  Layers, 
  Sparkles, 
  Workflow, 
  Terminal, 
  Lock
} from 'lucide-react';
import { ProjectItem } from '../types.ts';

interface DigitalProductsSectionProps {
  digitalProjects: ProjectItem[];
  whatsappNumber: string;
  onOpenInquiry: (title: string, type: string) => void;
}

export const DigitalProductsSection: React.FC<DigitalProductsSectionProps> = ({
  digitalProjects,
  whatsappNumber,
  onOpenInquiry
}) => {
  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="ai-digital" className="py-20 bg-navy-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Division 03 • Digital Leverage</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              AI &amp; Digital Products
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              Pragmatic frameworks, prompt systems, and digital micro-assets engineered by Gerald Uzor to help freelancers, creators, and business builders monetize modern Artificial Intelligence without technical friction.
            </p>
          </div>

          <button
            onClick={() => onOpenInquiry("AI Income Starter Kit Instant License", "AI_PRODUCT")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm transition shadow self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Access Starter Kit</span>
          </button>
        </div>

        {/* Featured Flagship Product: The AI Income Starter Kit */}
        <div className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border border-gold-500/40 p-8 sm:p-12 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Product Blueprint */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-300 text-xs font-bold uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5 text-gold-400" />
                <span>Featured Flagship Release</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                The AI Income Starter Kit
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                A battle-tested digital manual and prompt library created by Gerald Uzor. Stripping away the technical jargon, it provides step-by-step workflows for generating client-ready deliverables, copywriting, workflow automations, and digital micro-products that businesses actively pay for.
              </p>

              {/* 4 Core Modules Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                
                <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                  <div className="text-gold-400 font-bold text-sm flex items-center gap-2 mb-1">
                    <Terminal className="w-4 h-4" />
                    <span>250+ High-Conversion Prompts</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Pre-engineered prompt chains for high-converting marketing copy, business proposals, and content frameworks.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                  <div className="text-gold-400 font-bold text-sm flex items-center gap-2 mb-1">
                    <Workflow className="w-4 h-4" />
                    <span>Monetization Blueprints</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Actionable freelance packaging guide: how to pitch AI-augmented deliverables to Nigerian and international clients.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                  <div className="text-gold-400 font-bold text-sm flex items-center gap-2 mb-1">
                    <BookOpen className="w-4 h-4" />
                    <span>Digital Product Fast-Track</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    The exact roadmap for designing, formatting, and launching sellable PDF guides, Notion templates, and prompt suites.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-navy-950/80 border border-slate-800">
                  <div className="text-gold-400 font-bold text-sm flex items-center gap-2 mb-1">
                    <Lock className="w-4 h-4" />
                    <span>Lifetime Resource Updates</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Direct access to new prompt templates and workflow updates as AI tools continue to evolve.
                  </p>
                </div>

              </div>

              {/* Call to Actions */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onOpenInquiry("The AI Income Starter Kit Order", "AI_PRODUCT")}
                  className="px-7 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-sm transition shadow-lg shadow-gold-500/10"
                >
                  Order AI Starter Kit Directly
                </button>

                <a
                  href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
                    "Hello Gerald, I would like to inquire about purchasing The AI Income Starter Kit."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 text-sm font-semibold flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Inquire via WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Right Column: Visual Product Deck Box */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-navy-950 border border-slate-700 p-8 text-center shadow-2xl relative">
                
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-gold-600/30 to-gold-400/20 text-gold-400 mx-auto flex items-center justify-center mb-6 border border-gold-500/40">
                  <BookOpen className="w-10 h-10 text-gold-400" />
                </div>

                <h4 className="text-lg font-bold text-white mb-1">Instant Digital Access</h4>
                <p className="text-xs text-gold-400 font-semibold mb-4">Curated by Gerald Uzor</p>
                
                <div className="space-y-2 text-xs text-slate-300 text-left bg-navy-900/80 p-4 rounded-xl border border-slate-800 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Downloadable Comprehensive Guide</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Ready-to-use Prompt Templates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>Mobile &amp; Desktop Optimized</span>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Secure instant digital delivery upon confirmation.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Other Digital Products & AI Tools */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6">More Digital Tools &amp; Resources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {digitalProjects.map((p) => (
              <div 
                key={p.id}
                className="rounded-xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-gold-400 uppercase tracking-wider">
                      {p.meta}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-navy-950 text-slate-400 text-[10px] font-semibold border border-slate-800">
                      {p.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-white group-hover:text-gold-300 transition-colors">
                    {p.title}
                  </h4>

                  <p className="mt-2 text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {p.description}
                  </p>

                  {p.highlights && (
                    <div className="mt-4 pt-3 border-t border-slate-800 space-y-1.5">
                      {p.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => onOpenInquiry(p.title, "DIGITAL_TOOL")}
                    className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1.5"
                  >
                    <span>{p.linkText}</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(`Hi Gerald, inquiring about: ${p.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded hover:bg-navy-800 text-emerald-400 transition"
                    title="Quick WhatsApp message"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
