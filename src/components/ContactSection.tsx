import React, { useState } from 'react';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  ExternalLink,
  Twitter,
  Linkedin,
  Instagram,
  Lock,
  ArrowRight
} from 'lucide-react';
import { ProfileData } from '../types.ts';

interface ContactSectionProps {
  profile: ProfileData;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  onOpenPrivacy,
  onOpenTerms
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Decorative Stamped Concrete Project');
  const [message, setMessage] = useState('');

  const cleanWhatsApp = profile.whatsapp.replace(/[^0-9]/g, '');

  const buildWhatsAppUrl = (customText?: string) => {
    const text = encodeURIComponent(
      customText || `Hello ${profile.name}, I am reaching out to discuss a business engagement.`
    );
    return `https://wa.me/${cleanWhatsApp}?text=${text}`;
  };

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hello Gerald, my name is ${name || 'a client'}.\nSubject: [${category}]\nProject Details: ${message || 'I would like to discuss this project.'}`;
    window.open(buildWhatsAppUrl(formatted), '_blank');
  };

  const handleOpenEmail = () => {
    const subject = encodeURIComponent(`${category} - Inquiry from ${name || 'Client'}`);
    const body = encodeURIComponent(`Full Name: ${name || 'N/A'}\nSubject: ${category}\n\nProject Requirements / Location:\n${message || 'Please contact me regarding this engagement.'}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 bg-navy-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Direct Communication Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Direct Access</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Let’s Start a Conversation
              </h2>
              <p className="text-slate-400 mt-3 text-sm leading-relaxed">
                Whether you are preparing a decorative stamped concrete installation in Nigeria, acquiring verified plots via Gerald's Property Hub, or licensing the AI Income Starter Kit, connect through your preferred channel.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              
              {/* WhatsApp Quick Connect Card */}
              <a
                href={buildWhatsAppUrl("Hello Gerald, I am reaching out to discuss a business engagement.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 hover:bg-emerald-900/25 transition group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] text-emerald-400 font-bold uppercase tracking-wider">Fastest Direct Response</div>
                  <div className="text-white font-bold text-sm sm:text-base group-hover:text-emerald-300">
                    WhatsApp: {profile.phone}
                  </div>
                  <div className="text-[11px] text-slate-400">Available Mon &ndash; Sat for project discussions</div>
                </div>
              </a>

              {/* Official Email */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow">
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[11px] text-gold-400 font-bold uppercase tracking-wider">Official Email</div>
                  <a href={`mailto:${profile.email}`} className="text-white font-bold hover:underline truncate block text-sm sm:text-base">
                    {profile.email}
                  </a>
                  <div className="text-[11px] text-slate-400">Written proposals &amp; formal contracts</div>
                </div>
              </div>

              {/* Geographic Coverage */}
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-navy-900 border border-slate-800 shadow">
                <div className="w-12 h-12 rounded-xl bg-navy-800 text-gold-400 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[11px] text-gold-400 font-bold uppercase tracking-wider">Operational Base</div>
                  <div className="text-white font-bold text-xs sm:text-sm">{profile.location}</div>
                  <div className="text-[11px] text-slate-400">Deploying on-site teams nationwide</div>
                </div>
              </div>

            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3">
                Official Channels
              </div>
              <div className="flex items-center gap-3">
                {profile.twitter && (
                  <a 
                    href={profile.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                    title="Twitter / X"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a 
                    href={profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {profile.instagram && (
                  <a 
                    href={profile.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 rounded-xl bg-navy-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-gold-400 hover:border-gold-500/40 transition"
                    title="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Instant Project Brief Dispatcher */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-navy-900 border border-slate-800 p-8 sm:p-10 shadow-2xl">
              
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Send Direct Project Brief</h3>
                <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Client-Side Privacy</span>
                </span>
              </div>

              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Fill in your project requirements below. This dispatcher prepares your formatted message for instant WhatsApp delivery or your native email client with zero sensitive data stored on remote servers.
              </p>

              <form onSubmit={handleSubmitWhatsApp} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Your Full Name
                    </label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Chukwuemeka Adeleke"
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-gold-500 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Service / Project Topic
                    </label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-gold-500 transition font-medium"
                    >
                      <option value="Decorative Stamped Concrete Project">Decorative Stamped Concrete Paving</option>
                      <option value="3D Epoxy Floor Installation">3D Metallic &amp; Optical Epoxy Floor Installation</option>
                      <option value="Building Construction & Carcass">Building Construction Consultation</option>
                      <option value="Gerald's Property Hub (Land/House)">Property Hub (Land / House for Sale)</option>
                      <option value="AI Income Starter Kit License">The AI Income Starter Kit / Digital Tools</option>
                      <option value="General Strategic Partnership">General Business Engagement</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Brief Requirements, Location &amp; Scope
                  </label>
                  <textarea 
                    rows={4} 
                    required 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide site location (e.g. Lagos, Anambra, Abuja), estimated square meterage, plot needs, or project timeline..."
                    className="w-full px-4 py-3 rounded-xl bg-navy-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-gold-500 transition resize-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via Direct WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenEmail}
                    className="py-3.5 px-6 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 border border-slate-700 font-semibold text-sm transition flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-gold-400" />
                    <span>Open in Email</span>
                  </button>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Lock className="w-3 h-3 text-slate-400" />
                    <span>No visitor data is stored on remote databases.</span>
                  </span>
                  
                  <div className="flex gap-3">
                    <button type="button" onClick={onOpenPrivacy} className="hover:text-gold-400 underline">
                      Privacy Policy
                    </button>
                    <button type="button" onClick={onOpenTerms} className="hover:text-gold-400 underline">
                      Terms of Authenticity
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
