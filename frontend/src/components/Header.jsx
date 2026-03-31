import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiFacebook,
  FiInstagram,
  FiMenu,
  FiMessageCircle,
  FiShoppingBag,
  FiX,
} from 'react-icons/fi';
import { siteSettings } from '../data/shopData';
import { selectCartSubtotal, selectCartUnits } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';

const navigation = [
  { to: '/', label: 'Inicio' },
  { to: '/catalogo', label: 'Productos' },
  { to: '/cotizar', label: 'Cotizar' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

const socialLinks = [
  {
    icon: FiInstagram,
    href: 'https://instagram.com',
    label: 'Instagram',
  },
  {
    icon: FiFacebook,
    href: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: FiMessageCircle,
    href: `https://wa.me/${siteSettings.whatsappNumber}`,
    label: 'WhatsApp',
  },
];

const desktopNavLink = ({ isActive }) =>
  `px-4 py-2 text-sm font-medium transition border-b-2 ${
    isActive
      ? 'border-white text-white'
      : 'border-transparent text-[#d1d5db] hover:text-white hover:border-white/50'
  }`;

const mobileNavLink = ({ isActive }) =>
  `px-4 py-3 text-sm font-medium transition ${
    isActive
      ? 'bg-[#2d2d2d] text-white'
      : 'text-[#d1d5db] hover:bg-[#2d2d2d] hover:text-white'
  }`;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const cartUnits = useSelector(selectCartUnits);
  const cartSubtotal = useSelector(selectCartSubtotal);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2d2d2d] bg-[#1a1a1a] shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex shrink-0 items-center transition hover:opacity-80"
        >
          <img src="/logo-jama.svg" alt="JAMA IMAGEN" className="h-16 w-auto sm:h-16 md:h-20 lg:h-24" />
        </NavLink>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={desktopNavLink}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d2d2d] text-[#d1d5db] transition hover:bg-[#0066ff] hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          <NavLink
            to="/carrito"
            className="group inline-flex items-center gap-3 transition hover:opacity-80"
            title={`${cartUnits} articulo(s)`}
          >
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#2d2d2d] text-white">
              <FiShoppingBag size={16} />
              {cartUnits > 0 ? (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#0066ff] px-1 text-[10px] font-bold text-white">
                  {cartUnits > 99 ? '99+' : cartUnits}
                </span>
              ) : null}
            </span>
          </NavLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <NavLink
            to="/carrito"
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#2d2d2d] text-white transition hover:bg-[#0066ff]"
            title={`${cartUnits} articulo(s)`}
          >
            <FiShoppingBag size={16} />
            {cartUnits > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#0066ff] px-1 text-[10px] font-bold text-white">
                {cartUnits > 9 ? '9+' : cartUnits}
              </span>
            ) : null}
          </NavLink>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2d2d2d] text-white transition hover:bg-[#0066ff]"
            onClick={() => setMobileMenuOpen((current) => !current)}
            aria-label={mobileMenuOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <div className="border-t border-[#2d2d2d] bg-[#1a1a1a] px-4 py-4 lg:hidden sm:px-6">
          <nav className="flex flex-col gap-1">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={mobileNavLink}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mt-4 flex items-center gap-3 border-t border-[#2d2d2d] pt-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2d2d2d] text-[#d1d5db] transition hover:bg-[#0066ff] hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
