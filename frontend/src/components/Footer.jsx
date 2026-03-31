import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from 'react-icons/fi';
import { siteSettings } from '../data/shopData';
import { selectProductTypes } from '../store/slices/productsSlice';

const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Productos' },
  { to: '/cotizar', label: 'Cotizar' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Footer() {
  const mugTypes = useSelector(selectProductTypes);
  const currentYear = new Date().getFullYear();
  const contactItems = [
    {
      icon: FiPhone,
      label: 'Telefono',
      value: siteSettings.phoneDisplay,
      secondary: 'Atencion directa para pedidos y cotizaciones',
    },
    {
      icon: FiMail,
      label: 'Correo',
      value: siteSettings.email,
      secondary: 'Respuestas para marcas, regalos y consultas',
    },
    {
      icon: FiMapPin,
      label: 'Direccion',
      value: siteSettings.address,
      secondary: siteSettings.shippingMessage,
    },
    {
      icon: FiClock,
      label: 'Horarios',
      value: siteSettings.hoursWeek,
      secondary: siteSettings.hoursSaturday,
    },
  ];

  return (
    <footer className="relative mt-20 overflow-hidden bg-[linear-gradient(180deg,#122b43_0%,#102339_55%,#0a1726_100%)] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(143,216,255,0.7),transparent)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-8 -z-10 h-56 w-56 rounded-full bg-[#54aef0]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] bottom-[-2rem] -z-10 h-72 w-72 rounded-full bg-[#214f82]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 border-b border-white/10 py-12 lg:gap-8 xl:grid-cols-[1.1fr_0.72fr_0.78fr_1.1fr] xl:py-14">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_24px_60px_rgba(7,16,28,0.18)] backdrop-blur-sm sm:p-7">
            <img src="/logo-jama.svg" alt="JAMA IMAGEN" className="h-20 w-auto" />
            <p className="mt-5 max-w-md text-sm leading-7 text-[#d5e4f2]">
              Diseno, impresion y personalizados con una presentacion limpia y comercial para
              marcas, regalos y pedidos especiales.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8fcfff]">
                  Despacho
                </p>
                <p className="mt-2 text-sm leading-6 text-[#e5f1fb]">
                  {siteSettings.shippingMessage}
                </p>
              </div>
              <div className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8fcfff]">
                  Produccion
                </p>
                <p className="mt-2 text-sm leading-6 text-[#e5f1fb]">
                  {siteSettings.dispatchNote}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-[#d8e9f8] transition hover:border-[#6dc8ef] hover:bg-[#173a63] hover:text-white"
                aria-label="Instagram"
              >
                <FiInstagram size={17} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-[#d8e9f8] transition hover:border-[#6dc8ef] hover:bg-[#173a63] hover:text-white"
                aria-label="Facebook"
              >
                <FiFacebook size={17} />
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-[#a9dfff]">
              Navegacion
            </h3>
            <nav className="mt-5 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center justify-between rounded-[18px] px-3 py-2.5 text-sm text-[#d5e4f2] transition hover:bg-white/[0.06] hover:text-white"
                >
                  <span>{item.label}</span>
                  <span className="text-[#7abde8]">/</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm">
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-[#a9dfff]">
              Productos
            </h3>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {mugTypes.slice(0, 6).map((type) => (
                <Link
                  key={type}
                  to={`/catalogo?tipo=${encodeURIComponent(type)}`}
                  className="rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-sm font-medium text-[#d5e4f2] transition hover:border-[#6dc8ef] hover:bg-[#173a63] hover:text-white"
                >
                  {type}
                </Link>
              ))}
            </div>
            <Link
              to="/catalogo"
              className="mt-6 inline-flex rounded-full border border-[#6dc8ef]/30 px-4 py-2 text-sm font-semibold text-[#a9dfff] transition hover:border-[#6dc8ef] hover:bg-[#173a63] hover:text-white"
            >
              Ver catalogo completo
            </Link>
          </div>

          <div className="rounded-[30px] border border-[rgba(143,216,255,0.16)] bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_60px_rgba(7,16,28,0.18)] backdrop-blur-sm sm:p-7">
            <h3 className="text-sm font-bold uppercase tracking-[0.24em] text-[#a9dfff]">
              Contacto
            </h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {contactItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[24px] border border-white/10 bg-[rgba(9,25,41,0.38)] px-4 py-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#6dc8ef]/20 bg-[#173a63]/70 text-[#8fd8ff]">
                        <Icon size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#89b9d8]">
                          {item.label}
                        </p>
                        <p className="mt-1 break-words text-sm font-semibold leading-6 text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-sm leading-6 text-[#c9dced]">{item.secondary}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-[#9fb6ca]">
            (c) {currentYear} {siteSettings.brandName}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-[#9fb6ca]">
            Atencion para marcas, regalos y pedidos especiales en una tienda clara y ordenada.
          </p>
        </div>
      </div>
    </footer>
  );
}
