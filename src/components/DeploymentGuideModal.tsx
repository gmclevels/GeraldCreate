import React, { useState } from 'react';
import { 
  X, 
  Globe, 
  Terminal, 
  Cloud, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

interface DeploymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuideModal: React.FC<DeploymentGuideModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-navy-900 border border-slate-700 rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-navy-900/95 backdrop-blur-md z-10">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Globe className="w-4 h-4" />
              <span>Deployment &amp; Domain Guide</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              How to Preview, Publish &amp; Connect Custom Domain
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          
          <p className="text-slate-400">
            This project is engineered as a modern, high-performance Vite + React + TypeScript web app. Follow this practical 3-step guide to run it locally, deploy it live on the web, and link your custom branded domain (e.g., <code className="text-gold-400">geraldcreates.com</code>).
          </p>

          {/* Step 1: Local Preview */}
          <div className="p-5 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold flex items-center justify-center">1</span>
                <span>Run &amp; Test Locally</span>
              </h4>
              <span className="text-[11px] text-slate-500">Node.js required</span>
            </div>

            <p className="text-slate-400 text-xs">
              Clone or download the project files. Open your terminal in the directory and run:
            </p>

            <div className="relative group bg-navy-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-emerald-400">
              <code>npm install &amp;&amp; npm run dev</code>
              <button
                onClick={() => handleCopy("npm install && npm run dev", "dev")}
                className="absolute right-2 top-2 p-1 rounded bg-navy-950 hover:bg-slate-800 text-slate-300"
                title="Copy command"
              >
                {copiedKey === 'dev' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400">
              Your browser will open at <code className="text-gold-300">http://localhost:3000</code>.
            </p>
          </div>

          {/* Step 2: One-Click Production Deployment */}
          <div className="p-5 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold flex items-center justify-center">2</span>
              <span>Deploy to Vercel or Netlify (Free Hosting &amp; SSL)</span>
            </h4>

            <p className="text-slate-400 text-xs">
              Both platforms offer generous free tiers with fast global CDN servers:
            </p>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-navy-900 border border-slate-800">
                <span className="font-bold text-white block mb-0.5">Option A: Deploy via Vercel</span>
                <p className="text-slate-400">
                  Push this repository to GitHub. Go to <a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">vercel.com</a>, click <strong>"Add New Project"</strong>, select your repo, and click <strong>Deploy</strong>. Vercel automatically detects Vite.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-navy-900 border border-slate-800">
                <span className="font-bold text-white block mb-0.5">Option B: Deploy via Netlify Drag &amp; Drop</span>
                <p className="text-slate-400">
                  Run <code className="text-emerald-400 font-mono">npm run build</code> locally to produce the <code className="text-gold-300">dist/</code> folder. Drag the <code className="text-gold-300">dist/</code> folder into <a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">app.netlify.com/drop</a> for instant zero-config launch.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3: Connect Custom Domain */}
          <div className="p-5 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold flex items-center justify-center">3</span>
              <span>Connecting Your Custom Domain (e.g. geraldcreates.com)</span>
            </h4>

            <p className="text-slate-400 text-xs">
              Purchase your domain name from Namecheap, Whogohost, or Google Domains. Then set up DNS records:
            </p>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded bg-navy-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400">Type: </span>
                  <span className="text-gold-400 font-bold">A Record</span>
                  <span className="text-slate-400"> | Host: </span>
                  <span className="text-white">@</span>
                  <span className="text-slate-400"> | Value: </span>
                  <span className="text-emerald-400">76.76.21.21</span>
                </div>
                <button
                  onClick={() => handleCopy("76.76.21.21", "a-record")}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy IP"
                >
                  {copiedKey === 'a-record' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-2.5 rounded bg-navy-900 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-slate-400">Type: </span>
                  <span className="text-gold-400 font-bold">CNAME</span>
                  <span className="text-slate-400"> | Host: </span>
                  <span className="text-white">www</span>
                  <span className="text-slate-400"> | Value: </span>
                  <span className="text-emerald-400">cname.vercel-dns.com</span>
                </div>
                <button
                  onClick={() => handleCopy("cname.vercel-dns.com", "cname")}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Copy CNAME"
                >
                  {copiedKey === 'cname' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              DNS propagation usually takes 5 to 30 minutes. An automatic SSL HTTPS certificate will be activated at zero additional cost.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-navy-950 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs transition"
          >
            Done Reading
          </button>
        </div>

      </div>
    </div>
  );
};
