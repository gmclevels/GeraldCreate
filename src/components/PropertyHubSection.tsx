import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Home, 
  LandPlot, 
  Key
} from 'lucide-react';
import { PropertyListing } from '../types.ts';

interface PropertyHubSectionProps {
  properties: PropertyListing[];
  whatsappNumber: string;
  onOpenInquiry: (title: string, type: string) => void;
}

export const PropertyHubSection: React.FC<PropertyHubSectionProps> = ({
  properties,
  whatsappNumber,
  onOpenInquiry
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'land' | 'sale' | 'rental'>('all');

  const filtered = activeTab === 'all' 
    ? properties 
    : properties.filter(item => item.type === activeTab);

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="property" className="py-20 bg-navy-950 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Division 02 • Real Estate Facilitation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Gerald's Property Hub
            </h2>
            <p className="text-slate-400 mt-2 max-w-2xl text-sm sm:text-base leading-relaxed">
              Your verified real estate channel for title-authenticated land, off-plan residential developments, and executive rental placements across high-yield growth corridors in Nigeria.
            </p>
          </div>

          <a
            href={`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(
              "Hello Gerald, I am reaching out to Gerald's Property Hub to discuss available land plots and residential houses."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm transition shadow self-start md:self-auto"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consult Property Desk</span>
          </a>
        </div>

        {/* 3 Real Estate Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-xs">
          <div className="p-5 rounded-xl bg-navy-900 border border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 flex-shrink-0">
              <LandPlot className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Clear Title Land Acquisitions</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                No communal family disputes, zero double allocations. Every plot undergoes physical beacon tracing and registry search before listing.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-navy-900 border border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 flex-shrink-0">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Houses &amp; Turnkey Duplexes</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Solidly constructed 3 to 5-bedroom homes with decorative stamped concrete compounds, proper drainage, and high rental return potential.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-navy-900 border border-slate-800 flex items-start gap-4">
            <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 flex-shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Executive Rentals &amp; Leases</h4>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Serviced residential apartments and commercial units for corporate professionals, remote workers, and growing businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Property Listings' },
            { id: 'land', label: 'Virgin Land & Plots' },
            { id: 'sale', label: 'Houses & Duplexes for Sale' },
            { id: 'rental', label: 'Rental & Leases' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-gold-500 text-navy-950 font-bold shadow'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-850 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div 
              key={item.id}
              className="rounded-xl bg-navy-900 border border-slate-800 hover:border-gold-500/40 transition flex flex-col justify-between p-6 group"
            >
              <div>
                {/* Header Tag & Sample Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.type === 'land' ? 'bg-blue-500/15 text-blue-300 border border-blue-500/30' :
                    item.type === 'sale' ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' :
                    'bg-gold-500/15 text-gold-300 border border-gold-500/30'
                  }`}>
                    {item.type === 'land' ? 'Land Plot' : item.type === 'sale' ? 'House for Sale' : 'Rental Listing'}
                  </span>

                  {item.isSample && (
                    <span className="px-2 py-0.5 rounded bg-blue-900/80 text-blue-200 text-[10px] font-semibold">
                      Sample Listing
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-2.5 space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span className="text-emerald-300 font-medium">Title: {item.titleDocument}</span>
                  </div>
                </div>

                <p className="mt-4 text-slate-400 text-xs leading-relaxed">
                  {item.description}
                </p>

                {/* Features list */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                  {item.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3 h-3 text-gold-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-gold-400">
                  {item.priceNote}
                </span>

                <button
                  onClick={() => onOpenInquiry(item.title, "PROPERTY")}
                  className="px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 hover:border-gold-500"
                >
                  <span>Book Inspection</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
