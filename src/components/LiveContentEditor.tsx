import React, { useState } from 'react';
import { 
  X, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Sliders, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { PortfolioConfig } from '../types.ts';

interface LiveContentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  config: PortfolioConfig;
  onSave: (newConfig: PortfolioConfig) => void;
  onReset: () => void;
}

export const LiveContentEditor: React.FC<LiveContentEditorProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
  onReset
}) => {
  const [formData, setFormData] = useState<PortfolioConfig>(config);
  const [savedAlert, setSavedAlert] = useState(false);

  if (!isOpen) return null;

  const handleProfileChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
      onClose();
    }, 1200);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gerald_creates_config_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile) {
          setFormData(parsed);
          onSave(parsed);
          alert("Configuration imported and applied successfully!");
        }
      } catch (err) {
        alert("Invalid JSON configuration file.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-xl bg-navy-900 border-l border-slate-700 h-full overflow-y-auto flex flex-col justify-between shadow-2xl">
        
        {/* Top Header */}
        <div className="p-6 border-b border-slate-800 bg-navy-950/80 sticky top-0 z-10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-gold-400" />
              <span>Live Content Editor</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize Gerald's contact information, bio, and portfolio copy.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form id="editorForm" onSubmit={handleSave} className="p-6 space-y-5 text-xs text-slate-300">
          
          {savedAlert && (
            <div className="p-3 rounded-lg bg-emerald-900/60 border border-emerald-500/40 text-emerald-200 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Portfolio configuration saved locally!</span>
            </div>
          )}

          {/* Core Profile */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider pb-1 border-b border-slate-800">
              Personal &amp; Brand Identity
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.profile.name}
                  onChange={(e) => handleProfileChange('name', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Brand Name</label>
                <input 
                  type="text" 
                  value={formData.profile.brandName}
                  onChange={(e) => handleProfileChange('brandName', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Professional Tagline / Role</label>
              <input 
                type="text" 
                value={formData.profile.role}
                onChange={(e) => handleProfileChange('role', e.target.value)}
                className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Main Headline</label>
              <input 
                type="text" 
                value={formData.profile.headline}
                onChange={(e) => handleProfileChange('headline', e.target.value)}
                className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Introduction Paragraph</label>
              <textarea 
                rows={3}
                value={formData.profile.shortIntro}
                onChange={(e) => handleProfileChange('shortIntro', e.target.value)}
                className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500 resize-none"
                required
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider pb-1 border-b border-slate-800">
              Verified Contact Channels
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">WhatsApp (Digits with country code)</label>
                <input 
                  type="text" 
                  value={formData.profile.whatsapp}
                  onChange={(e) => handleProfileChange('whatsapp', e.target.value)}
                  placeholder="e.g. 2348012345678"
                  className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Display Phone Number</label>
                <input 
                  type="text" 
                  value={formData.profile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  placeholder="e.g. +234 800 000 0000"
                  className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1">Official Email Address</label>
              <input 
                type="email" 
                value={formData.profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Geographic Coverage &amp; Delivery</label>
              <input 
                type="text" 
                value={formData.profile.location}
                onChange={(e) => handleProfileChange('location', e.target.value)}
                className="w-full p-2.5 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500"
                required
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold mb-1">Twitter / X</label>
                <input 
                  type="text" 
                  value={formData.profile.twitter}
                  onChange={(e) => handleProfileChange('twitter', e.target.value)}
                  className="w-full p-2 rounded bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">LinkedIn</label>
                <input 
                  type="text" 
                  value={formData.profile.linkedin}
                  onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                  className="w-full p-2 rounded bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Instagram</label>
                <input 
                  type="text" 
                  value={formData.profile.instagram}
                  onChange={(e) => handleProfileChange('instagram', e.target.value)}
                  className="w-full p-2 rounded bg-navy-950 border border-slate-700 text-white text-xs"
                />
              </div>
            </div>
          </div>

          {/* Factual Biography */}
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider pb-1 border-b border-slate-800">
              Factual Biography (No Fabrications)
            </h4>

            <div>
              <label className="block font-semibold mb-1">Gerald Uzor's Biography Text</label>
              <textarea 
                rows={6}
                value={formData.profile.aboutBio}
                onChange={(e) => handleProfileChange('aboutBio', e.target.value)}
                className="w-full p-3 rounded-lg bg-navy-950 border border-slate-700 text-white focus:outline-none focus:border-gold-500 resize-none font-sans leading-relaxed"
                required
              />
            </div>
          </div>

          {/* Import / Export JSON Actions */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={handleExportJSON}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" />
              <span>Export Config JSON</span>
            </button>

            <label className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white cursor-pointer">
              <Upload className="w-3.5 h-3.5 text-gold-400" />
              <span>Import Config JSON</span>
              <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
            </label>
          </div>

        </form>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-navy-950 sticky bottom-0 z-10 flex items-center justify-between">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-rose-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg bg-navy-800 text-slate-300 text-xs font-semibold hover:bg-navy-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="editorForm"
              className="px-5 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs transition flex items-center gap-1.5 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
