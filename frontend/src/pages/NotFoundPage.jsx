import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="glass-card mx-auto max-w-3xl p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">404</p>
        <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-[#184a53]">
          Esta pagina no existe.
        </h1>
        <p className="mt-4 text-base leading-7 text-[#56747b]">
          Vuelve a explorar nuestros modelos de tazas personalizadas.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="brand-button-primary rounded-full px-5 py-3 text-sm font-semibold"
          >
            Ir al inicio
          </Link>
          <Link
            to="/catalogo"
            className="brand-button-outline rounded-full px-5 py-3 text-sm font-semibold"
          >
            Ver productos
          </Link>
        </div>
      </div>
    </section>
  );
}
