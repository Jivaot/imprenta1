import React from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { siteSettings } from '../data/shopData';

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hola!%20Me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20estampados%20personalizados`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center justify-center h-14 w-14 rounded-full bg-[#3f97d4] hover:bg-[#245c88] shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 animate-pulse-slow"
      aria-label="Contactar por WhatsApp"
      title="¿Preguntas? Contáctanos por WhatsApp"
    >
      <FiMessageCircle size={28} className="text-white" />
    </a>
  );
}
