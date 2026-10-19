import React from 'react';
import { 
  Briefcase, 
  Hammer, 
  Building2, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ServiceItem } from '../types.ts';

interface ServicesSectionProps {
  services: ServiceItem[];
  onOpenInquiry: (title: string, type: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onOpenInquiry
}) => {
  return (
    <section id="services" className="py-20 bg-navy-900/50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Scope of Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Professional Services
          </h2>
          <p className="text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Directly contracting Gerald Uzor and the Gerald Creates team for physical construction execution, real estate procurement, and scalable digital solutions.
          </p>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((svc) => (
            <div 
              key={svc.id}
              className="rounded-2xl bg-navy-900 border border-slate-800 p-8 flex flex-col justify-between hover:border-gold-500/40 transition shadow-xl group"
            >
              <div>
                {/* Service Icon */}
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 text-gold-400 flex items-center justify-center mb-6 border border-gold-500/20 group-hover:scale-105 transition-transform">
                  {svc.category === 'construction' && <Hammer className="w-7 h-7" />}
                  {svc.category === 'property' && <Building2 className="w-7 h-7" />}
                  {svc.category === 'digital' && <Cpu className="w-7 h-7" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-gold-300 transition-colors">
                  {svc.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm mb-6 leading-relaxed">
                  {svc.summary}
                </p>

                {/* Point checklist */}
                <ul className="space-y-3 text-xs text-slate-300">
                  {svc.points.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Action */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => onOpenInquiry(svc.title, "SERVICE_CONSULTATION")}
                  className="w-full py-3 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-gold-400 text-xs font-bold transition flex items-center justify-center gap-2 border border-slate-700 hover:border-gold-500 shadow-sm"
                >
                  <span>Request Project Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
