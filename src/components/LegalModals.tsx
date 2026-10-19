import React from 'react';
import { X, ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalModalsProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModals: React.FC<LegalModalsProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-navy-900 border border-slate-700 rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
          {type === 'privacy' ? <Lock className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
          <span>{type === 'privacy' ? 'Data & Privacy Policy' : 'Terms & Authenticity Standard'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
          {type === 'privacy' ? 'Privacy Statement' : 'Terms & Authenticity Policy'}
        </h3>
        
        <p className="text-xs text-slate-400 mb-6">
          Gerald Creates • Gerald Uzor Portfolio
        </p>

        <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div className="p-3.5 rounded-lg bg-navy-950 border border-slate-800">
                <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>1. Zero Covert Data Tracking</span>
                </h5>
                <p className="text-slate-400 text-xs">
                  We do not track, collect, scrape, or sell any personal visitor information. There are no covert third-party cookies or telemetry trackers installed on this website.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-navy-950 border border-slate-800">
                <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>2. Client-Side Contact Dispatch</span>
                </h5>
                <p className="text-slate-400 text-xs">
                  When you submit a project brief through this site, your message is formatted purely on your device and redirected directly to your own WhatsApp application or default mail client. No message contents or credentials are stored on external database servers.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-navy-950 border border-slate-800">
                <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>3. LocalStorage Preferences</span>
                </h5>
                <p className="text-slate-400 text-xs">
                  Changes made via the "Live Content Editor" are saved exclusively in your personal browser's <code className="text-gold-400">localStorage</code>. They never transmit over the wire to central databases without your explicit export.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="p-3.5 rounded-lg bg-navy-950 border border-slate-800">
                <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>1. Zero Fabricated Reviews Policy</span>
                </h5>
                <p className="text-slate-400 text-xs">
                  In strict accordance with professional integrity, Gerald Creates does not display fake testimonials, artificial five-star ratings, or unverified claims. Real references and site inspections are coordinated directly upon client request.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-navy-950 border border-slate-800">
                <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>2. Sample Showcase Transparency</span>
                </h5>
                <p className="text-slate-400 text-xs">
                  Items carrying the <code className="text-blue-300 bg-navy-900 px-1 py-0.5 rounded border border-blue-500/30">[Sample Project]</code> or <code className="text-blue-300 bg-navy-900 px-1 py-0.5 rounded border border-blue-500/30">[Sample Listing]</code> tag represent architectural demonstrations and prototype showcases. All genuine structural contracts and land transactions are executed with formal registered physical legal paperwork.
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-navy-950 border border-slate-800">
                <h5 className="font-bold text-white mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>3. Intellectual Property</span>
                </h5>
                <p className="text-slate-400 text-xs">
                  The AI Income Starter Kit curriculum, prompt sequences, 3D architectural representations, and original design blueprints remain intellectual property of Gerald Uzor and Gerald Creates.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-slate-200 text-xs font-bold transition border border-slate-700 hover:border-gold-500"
          >
            I Understand &amp; Agree
          </button>
        </div>

      </div>
    </div>
  );
};
