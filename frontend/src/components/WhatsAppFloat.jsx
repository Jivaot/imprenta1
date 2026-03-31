import React from 'react';
import { siteSettings } from '../data/shopData';

export default function WhatsAppFloat() {
  return (
    <a
      href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hola!%20Me%20interesa%20conocer%20mas%20sobre%20los%20estampados%20personalizados`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-8 right-8 z-40 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#25d366] to-[#1fa851] text-white shadow-[0_24px_48px_rgba(37,211,102,0.35)] ring-4 ring-white/90 transition-all duration-300 hover:scale-125 hover:shadow-[0_32px_56px_rgba(31,168,81,0.4)] group overflow-hidden"
      aria-label="Contactar por WhatsApp"
      title="Preguntas? Contactanos por WhatsApp"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img 
          src="/logo-jama.svg" 
          alt="JAMA" 
          className="h-12 w-auto drop-shadow-lg group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
    </a>
  );
}
