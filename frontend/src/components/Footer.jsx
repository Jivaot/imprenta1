import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiClock, FiMail, FiMapPin, FiMessageCircle, FiPhoneCall } from 'react-icons/fi';
import { siteSettings } from '../data/shopData';
import { selectProductTypes } from '../store/slices/productsSlice';

export default function Footer() {
  const mugTypes = useSelector(selectProductTypes);

  return (
    <footer className="mt-20 border-t border-[rgba(15,140,147,0.12)] bg-[linear-gradient(180deg,rgba(229,245,243,0.76),rgba(255,250,243,0.92))] text-[#28535b]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr_1fr] lg:px-8">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0f8c93] to-[#14697b] text-base font-black text-white shadow-[0_12px_28px_rgba(15,140,147,0.2)]">
              {siteSettings.shortName}
            </span>
            <div>
              <p className="font-display text-xl font-extrabold text-[#184a53]">{siteSettings.brandName}</p>
              <p className="text-sm text-[#5b767b]">{siteSettings.tagline}</p>
            </div>
          </div>

          <p className="max-w-md text-sm leading-7 text-[#56747b]">
            Catalogo online de tazas personalizadas para marcas, regalos y pedidos especiales.
            Explora modelos, revisa precios base y cotiza de forma rapida.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="brand-button-accent inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
            >
              <FiMessageCircle />
              Pedir por WhatsApp
            </a>
            <Link
              to="/catalogo"
              className="brand-button-outline inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Ver catalogo
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f8c93]">
            Navegacion
          </p>
          <div className="space-y-3 text-sm text-[#56747b]">
            <Link className="block transition hover:text-[#184a53]" to="/">
              Inicio
            </Link>
            <Link className="block transition hover:text-[#184a53]" to="/catalogo">
              Catalogo
            </Link>
            <Link className="block transition hover:text-[#184a53]" to="/cotizar">
              Cotizar
            </Link>
            <Link className="block transition hover:text-[#184a53]" to="/contacto">
              Contacto
            </Link>
            <Link className="block transition hover:text-[#184a53]" to="/carrito">
              Carrito
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f8c93]">
            Tipos de taza
          </p>
          <div className="space-y-3 text-sm text-[#56747b]">
            {mugTypes.map((type) => (
              <Link
                key={type}
                className="block transition hover:text-[#184a53]"
                to={`/catalogo?tipo=${encodeURIComponent(type)}`}
              >
                {type}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#0f8c93]">
            Contacto
          </p>
          <div className="space-y-4 text-sm text-[#56747b]">
            <p className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 text-[#f59e0b]" />
              <span>{siteSettings.address}</span>
            </p>
            <p className="flex items-start gap-3">
              <FiClock className="mt-0.5 text-[#f59e0b]" />
              <span>
                {siteSettings.hoursWeek}
                <br />
                {siteSettings.hoursSaturday}
              </span>
            </p>
            <p className="flex items-center gap-3">
              <FiPhoneCall className="text-[#f59e0b]" />
              <span>{siteSettings.phoneDisplay}</span>
            </p>
            <p className="flex items-center gap-3">
              <FiMail className="text-[#f59e0b]" />
              <span>{siteSettings.email}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-[rgba(15,140,147,0.12)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-xs text-[#6b858a] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Retiro coordinado, despacho y personalizacion segun tu pedido.</p>
          <p>{siteSettings.brandName} (c) 2026. Catalogo online de tazas personalizadas.</p>
        </div>
      </div>
    </footer>
  );
}
