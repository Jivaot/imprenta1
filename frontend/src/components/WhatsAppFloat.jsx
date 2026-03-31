import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { siteSettings } from '../data/shopData';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteSettings.whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="glass-card fixed bottom-5 right-5 z-40 inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-[#165c63] shadow-[0_20px_40px_rgba(15,140,147,0.22)] transition hover:scale-[1.02]"
    >
      <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#0f8c93] to-[#14697b] text-white">
        <FiMessageCircle size={20} />
      </span>
      <span className="hidden sm:block">Pedir por WhatsApp</span>
    </a>
  );
}
