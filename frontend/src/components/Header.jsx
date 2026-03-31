import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiClock,
  FiMenu,
  FiPhoneCall,
  FiShoppingBag,
  FiTruck,
  FiX,
} from 'react-icons/fi';
import { siteSettings } from '../data/shopData';

const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Catalogo' },
  { to: '/cotizar', label: 'Cotizar' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive
      ? 'bg-[#0f8c93] text-white shadow-[0_10px_24px_rgba(15,140,147,0.22)]'
      : 'text-[#28535b] hover:bg-white/80 hover:text-[#184a53]'
  }`;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(15,140,147,0.12)] bg-[rgba(250,252,247,0.88)] backdrop-blur-xl">
      <div className="border-b border-[rgba(15,140,147,0.12)] bg-[rgba(229,245,243,0.78)] text-[#28535b]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <FiPhoneCall className="text-[#f59e0b]" />
              {siteSettings.phoneDisplay}
            </span>
            <span className="inline-flex items-center gap-2 text-[#3e6a72]">
              <FiClock className="text-[#0f8c93]" />
              {siteSettings.hoursWeek}
            </span>
            <span className="inline-flex items-center gap-2 text-[#3e6a72]">
              <FiTruck className="text-[#f59e0b]" />
              {siteSettings.shippingMessage}
            </span>
          </div>
          <p className="text-[#56747b]">{siteSettings.dispatchNote}</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#0f8c93] to-[#14697b] text-lg font-black text-white shadow-[0_12px_28px_rgba(15,140,147,0.25)]">
            {siteSettings.shortName}
          </span>
          <div>
            <p className="font-display text-lg font-extrabold tracking-tight text-[#184a53]">
              {siteSettings.brandName}
            </p>
            <p className="text-xs text-[#5b767b]">{siteSettings.tagline}</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/carrito"
            className="brand-button-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            <FiShoppingBag />
            Carrito
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">{cartCount}</span>
          </NavLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <NavLink
            to="/carrito"
            className="brand-button-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
          >
            <FiShoppingBag />
            <span>{cartCount}</span>
          </NavLink>
          <button
            type="button"
            className="glass-card inline-flex h-11 w-11 items-center justify-center rounded-full text-[#165c63]"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[rgba(15,140,147,0.12)] bg-[rgba(250,252,247,0.98)] px-4 py-4 lg:hidden sm:px-6">
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
