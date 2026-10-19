import React, { useState } from 'react';
import { 
  Hammer, 
  Grid, 
  RefreshCw, 
  Layers, 
  Calculator, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle,
  FileText,
  Sparkles
} from 'lucide-react';
import { ProjectItem } from '../types.ts';

interface ConstructionSectionProps {
  constructionProjects: ProjectItem[];
  whatsappNumber: string;
  onOpenInquiry: (title: string, type: string) => void;
  onScrollTo3D: () => void;
}

export const ConstructionSection: React.FC<ConstructionSectionProps> = ({
  constructionProjects,
  whatsappNumber,
  onOpenInquiry,
  onScrollTo3D
}) => {
  // Interactive Concrete & Epoxy Estimator state
  const [projectType, setProjectType] = useState<'stamped' | 'epoxy'>('stamped');
  const [areaSqm, setAreaSqm] = useState<number>(200);
  const [selectedPattern, setSelectedPattern] = useState<string>('slate');
  const [sealerType, setSealerType] = useState<string>('gloss');

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  const handleEstimateWhatsApp = () => {
    const typeLabel = projectType === 'epoxy' ? '3D Epoxy Flooring Installation' : 'Decorative Stamped Concrete Paving';
    const text = encodeURIComponent(
      `Hello Gerald, I used your Flooring Estimator on Gerald Creates:\n- Project Category: ${typeLabel}\n- Estimated Surface Area: ${areaSqm} sqm\n- Design / Pattern: ${selectedPattern.toUpperCase()}\n- Topcoat / Sealer: ${sealerType.toUpperCase()}\nCould you provide a detailed Bill of Quantities (BOQ) and site inspection date?`
    );
    window.open(`https://wa.me/${cleanWhatsApp}?text=${text}`, '_blank');
  };

  return (
    <section id="construction" className="py-20 bg-navy-900/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Hammer className="w-3.5 h-3.5" />
              <span>Division 01 • Physical &amp; Interior Engineering</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Construction, Stamped Concrete &amp; 3D Epoxy Flooring
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              From heavy-duty monolithic stamped compound pavements that never sink or sprout weeds, to luxury seamless 3D metallic epoxy floorings with liquid marble veining and crystal-clear polyaspartic protection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
            <button
              onClick={onScrollTo3D}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-gold-400 border border-gold-500/40 font-semibold text-xs transition"
            >
              <Layers className="w-4 h-4" />
              <span>Inspect 3D Virtual Model</span>
            </button>

            <button
              onClick={() => onOpenInquiry("Flooring & Construction Quotation", "CONSTRUCTION_AND_EPOXY")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs sm:text-sm transition shadow"
            >
              <Calculator className="w-4 h-4" />
              <span>Get Quotation</span>
            </button>
          </div>
        </div>

        {/* 4 Core Specializations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          
          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/30 transition shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-800 border border-slate-700 flex items-center justify-center text-gold-400 mb-5">
                <Grid className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Artisan Stamped Concrete</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Monolithic pours with engineered BRC reinforcement wire mesh. Italian slate, ashlar stone, and cobblestone patterns that eliminate interlock sinking.
              </p>
            </div>
            <div className="text-xs text-gold-400 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>UV-resistant color hardeners &amp; antiquing release</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-gold-500/40 hover:border-gold-400 transition shadow-lg flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold-500/10 rounded-full blur-xl pointer-events-none"></div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-300 mb-5 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="inline-block px-2 py-0.5 rounded bg-gold-500/15 text-gold-300 text-[10px] font-bold uppercase tracking-wider mb-2">
                Luxury Interior Finish
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3D Metallic Epoxy Flooring</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Seamless, mirror-gloss self-leveling resin installations. Features liquid marble veins, metallic mica pigments, and 3D optical depth for living rooms, salons, and penthouses.
              </p>
            </div>
            <div className="text-xs text-gold-400 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>100% waterproof, seamless, stain-proof mirror shine</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/30 transition shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-800 border border-slate-700 flex items-center justify-center text-gold-400 mb-5">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Building Carcass &amp; Finishes</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Structural engineering from raft/strip foundations and reinforced column-beam framing to parapet casting and turnkey luxury finishing.
              </p>
            </div>
            <div className="text-xs text-gold-400 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Strict compliance with Nigerian structural codes</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-gold-500/30 transition shadow-lg flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-navy-800 border border-slate-700 flex items-center justify-center text-gold-400 mb-5">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Floor Restoration &amp; Sealing</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Revitalize faded stamped concrete or scuffed epoxy. Chemical deep clean, color pigment refresh, and scratch-resistant polyaspartic coats.
              </p>
            </div>
            <div className="text-xs text-gold-400 font-semibold flex items-center gap-1.5 pt-2 border-t border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Restores original vibrant luster &amp; chemical resistance</span>
            </div>
          </div>

        </div>

        {/* Interactive Stamped Concrete & 3D Epoxy Estimator Tool */}
        <div className="rounded-2xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-900 border border-gold-500/30 p-8 shadow-2xl mb-14">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 text-gold-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Calculator className="w-3.5 h-3.5" />
                <span>Site &amp; Flooring Specification Tool</span>
              </div>
              <h3 className="text-2xl font-bold text-white">Project Budget &amp; Scope Estimator</h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                Plan your compound stamped concrete or interior 3D epoxy flooring project. Adjust your area and desired finish to send a preliminary spec directly to Gerald.
              </p>

              {/* Project Type Switcher */}
              <div className="mt-5 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('stamped');
                    setSelectedPattern('slate');
                    setSealerType('gloss');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
                    projectType === 'stamped'
                      ? 'bg-gold-500 text-navy-950 shadow'
                      : 'bg-navy-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Exterior Stamped Concrete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProjectType('epoxy');
                    setSelectedPattern('3d_metallic_gold');
                    setSealerType('polyaspartic');
                  }}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    projectType === 'epoxy'
                      ? 'bg-gold-500 text-navy-950 shadow'
                      : 'bg-navy-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span>3D Epoxy Flooring</span>
                </button>
              </div>

              {/* Area Slider */}
              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
                    <span>Floor / Compound Footprint:</span>
                    <span className="text-gold-400 font-bold text-sm">{areaSqm} Square Meters (sqm)</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="1500"
                    step="10"
                    value={areaSqm}
                    onChange={(e) => setAreaSqm(Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer h-2 bg-navy-950 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>30 sqm (Living lounge / room)</span>
                    <span>350 sqm (Standard duplex compound)</span>
                    <span>1,500+ sqm (Commercial / Estate)</span>
                  </div>
                </div>

                {/* Pattern & Sealer selections */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">
                      {projectType === 'epoxy' ? '3D Epoxy Style:' : 'Stamping Pattern:'}
                    </label>
                    {projectType === 'epoxy' ? (
                      <select
                        value={selectedPattern}
                        onChange={(e) => setSelectedPattern(e.target.value)}
                        className="w-full p-2.5 rounded bg-navy-950 border border-slate-700 text-white font-medium"
                      >
                        <option value="3d_metallic_gold">3D Liquid Gold Marble Veins</option>
                        <option value="3d_optical_depth">3D Optical Illusion Art / Mural</option>
                        <option value="pearl_azure_marble">Pearlescent Azure &amp; Charcoal</option>
                        <option value="self_leveling_solid">Solid Color Self-Leveling Epoxy</option>
                      </select>
                    ) : (
                      <select
                        value={selectedPattern}
                        onChange={(e) => setSelectedPattern(e.target.value)}
                        className="w-full p-2.5 rounded bg-navy-950 border border-slate-700 text-white font-medium"
                      >
                        <option value="slate">Italian Slate Pattern</option>
                        <option value="ashlar">Ashlar Cut Stone Pattern</option>
                        <option value="cobble">European Cobblestone</option>
                        <option value="wood_plank">Timber Plank Impression</option>
                      </select>
                    )}
                  </div>

                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">
                      {projectType === 'epoxy' ? 'Protective Topcoat:' : 'Sealer Finish:'}
                    </label>
                    {projectType === 'epoxy' ? (
                      <select
                        value={sealerType}
                        onChange={(e) => setSealerType(e.target.value)}
                        className="w-full p-2.5 rounded bg-navy-950 border border-slate-700 text-white font-medium"
                      >
                        <option value="polyaspartic">Ultra-Clear Polyaspartic (Mirror Gloss)</option>
                        <option value="scratch_matte">Satin Matte Anti-Scratch Coat</option>
                        <option value="anti_slip_epoxy">High-Traction Anti-Slip Finish</option>
                      </select>
                    ) : (
                      <select
                        value={sealerType}
                        onChange={(e) => setSealerType(e.target.value)}
                        className="w-full p-2.5 rounded bg-navy-950 border border-slate-700 text-white font-medium"
                      >
                        <option value="gloss">High-Gloss Wet Look (Solvent)</option>
                        <option value="matte">Matte Natural Satin (Non-Slip)</option>
                      </select>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Estimator Summary Card */}
            <div className="w-full lg:max-w-md bg-navy-950 border border-slate-700/80 rounded-xl p-6 shadow-xl">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Site Specification</span>
                <span className="text-xs text-gold-400 font-normal">Custom BOQ</span>
              </h4>

              <div className="space-y-2.5 text-xs text-slate-300 border-b border-slate-800 pb-4 mb-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Project Type:</span>
                  <span className="font-bold text-gold-400">
                    {projectType === 'epoxy' ? '3D Metallic Epoxy Floor' : 'Decorative Stamped Concrete'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Surface Footprint:</span>
                  <span className="font-bold text-white">{areaSqm} sqm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Structural / Base Spec:</span>
                  <span className="font-medium text-slate-200">
                    {projectType === 'epoxy' ? 'Moisture Vapor Barrier + 100% Solid Base' : 'Heavy-Gauge BRC Steel Mesh + Grade 30'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Design Mold / Style:</span>
                  <span className="font-medium text-white uppercase">{selectedPattern.replace(/_/g, ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Protective Coating:</span>
                  <span className="font-medium text-slate-200">{sealerType.replace(/_/g, ' ').toUpperCase()}</span>
                </div>
              </div>

              <button
                onClick={handleEstimateWhatsApp}
                className="w-full py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send Estimate to WhatsApp</span>
              </button>
              <p className="text-[10px] text-slate-500 text-center mt-2">
                Residential &amp; commercial installations deployed nationwide in Nigeria.
              </p>
            </div>

          </div>
        </div>

        {/* Construction Sample Showcase Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Featured Structural &amp; Stamping Works</h3>
            <span className="text-xs text-gold-400 font-semibold">Marked Samples</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {constructionProjects.map((p) => (
              <div 
                key={p.id}
                className="rounded-xl overflow-hidden bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition group flex flex-col sm:flex-row"
              >
                <div className="sm:w-2/5 h-48 sm:h-auto relative overflow-hidden bg-navy-950">
                  <img 
                    src={p.image} 
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-blue-900/90 text-blue-200 text-[10px] font-bold border border-blue-400/30">
                    Sample Showcase
                  </span>
                </div>

                <div className="p-6 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] text-gold-400 font-semibold mb-1">{p.meta}</div>
                    <h4 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                      {p.title}
                    </h4>
                    <p className="mt-2 text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <button
                      onClick={() => onOpenInquiry(p.title, "CONSTRUCTION")}
                      className="text-xs font-bold text-gold-400 hover:text-gold-300 inline-flex items-center gap-1"
                    >
                      <span>{p.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
