import React, { useState } from 'react';
import { X, MessageCircle, Mail, Send, CheckCircle2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: string;
  whatsappNumber: string;
  email: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  title,
  type,
  whatsappNumber,
  email
}) => {
  const [userName, setUserName] = useState('');
  const [userNotes, setUserNotes] = useState('');

  if (!isOpen) return null;

  const cleanWhatsApp = whatsappNumber.replace(/[^0-9]/g, '');

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Gerald,\nMy name is ${userName || 'a client'}.\nI am inquiring regarding: [${title}] (${type}).\n\nNotes / Location / Scope: ${userNotes || 'Please provide pricing details, availability, and next steps.'}`
    );
    window.open(`https://wa.me/${cleanWhatsApp}?text=${text}`, '_blank');
    onClose();
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Inquiry: ${title} (${type})`);
    const body = encodeURIComponent(
      `Name: ${userName || 'N/A'}\nSubject Item: ${title}\nCategory: ${type}\n\nClient Notes / Location:\n${userNotes || 'Please contact me with more information.'}`
    );
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-navy-900 border border-slate-700 rounded-2xl p-6 sm:p-7 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider mb-1">
          <Send className="w-3.5 h-3.5" />
          <span>Direct Item Inquiry</span>
        </div>

        <h3 className="text-xl font-bold text-white mb-1 leading-snug">{title}</h3>
        <p className="text-xs text-slate-400 mb-6">
          Connect directly with Gerald Uzor regarding this venture or deliverable.
        </p>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Your Name</label>
            <input 
              type="text"
              placeholder="e.g. Tunde Balogun"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full p-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Specific Questions or Scope</label>
            <textarea 
              rows={3}
              placeholder="e.g. Site measurements, inspection availability, or delivery timeframe..."
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-navy-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-gold-500 resize-none"
            />
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={handleWhatsApp}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Continue on WhatsApp</span>
            </button>

            <button
              onClick={handleEmail}
              className="w-full py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-slate-200 border border-slate-700 font-semibold text-xs transition flex items-center justify-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-gold-400" />
              <span>Open in Native Email Client</span>
            </button>
          </div>

          <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Direct channel with Gerald Uzor</span>
          </div>
        </div>

      </div>
    </div>
  );
};
