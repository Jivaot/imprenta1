import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';

export default function HeroVideo() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto-cambiar video cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveVideo((prev) => (prev === 0 ? 1 : 0));
        setIsTransitioning(false);
      }, 500);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const videos = [
    { src: '/video-creativo.mp4', label: 'Tazas', title: 'Tazas Personalizadas', subtitle: 'Para Marcas y Regalos', description: 'Diseño, estampados y personalizaciones profesionales' },
    { src: '/video-estampados.mp4', label: 'Técnicas', title: 'Estampados y Efectos', subtitle: 'De Calidad Premium', description: 'Técnicas avanzadas de impresión con acabados espectaculares' },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-[50px] mx-auto">
      <div className="relative h-[580px] w-full sm:h-[700px] lg:h-[820px] xl:h-[900px] 2xl:h-[960px]">
        {/* Videos con transición */}
        {videos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              activeVideo === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
              <source src={video.src} type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>
          </div>
        ))}

        {/* Overlay mejorado con gradiente */}
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.6)_0%,rgba(26,26,26,0.5)_50%,rgba(0,0,0,0.6)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,102,255,0.1),transparent_60%)]" />

        {/* Contenedor centrado - flex center */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-14 xl:px-16 xl:py-16 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-full max-w-3xl text-center">
            <span className="inline-flex rounded-lg border border-[#0066ff]/50 bg-gradient-to-r from-[#0066ff]/20 to-[#00ccff]/20 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#00ddff] sm:text-xs backdrop-blur-sm">
              {videos[activeVideo].label}
            </span>

            <h1 className="mt-6 font-display text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl drop-shadow-lg">
              {videos[activeVideo].title}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#0066ff] to-[#00ccff] mt-2">
                {videos[activeVideo].subtitle}
              </span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/95 drop-shadow-md sm:text-xl lg:text-2xl">
              {videos[activeVideo].description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0066ff] to-[#0052cc] hover:from-[#0052cc] hover:to-[#003d99] px-8 py-4 text-base sm:text-lg font-bold text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <FiShoppingBag size={20} />
                Ver Catálogo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
