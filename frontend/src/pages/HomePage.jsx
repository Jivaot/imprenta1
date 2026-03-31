import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiCheckCircle,
  FiMessageCircle,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import HeroVideo from '../components/HeroVideo';
import SectionHeading from '../components/SectionHeading';
import {
  fallbackProducts,
  mugCatalogBenefits,
  purchaseSteps,
  siteSettings,
} from '../data/shopData';
import {
  selectProducts,
  selectStarProduct,
  selectProductTypes,
} from '../store/slices/productsSlice';
import { formatPrice } from '../utils/helpers';

export default function HomePage() {
  const products = useSelector(selectProducts);
  const starProduct = useSelector(selectStarProduct);
  const mugTypes = useSelector(selectProductTypes);
  const catalogPreview = React.useMemo(() => {
    const activeProducts = products.filter((product) => product.active !== false);

    if (activeProducts.length >= 50) {
      return activeProducts.slice(0, 50);
    }

    const existingSlugs = new Set(activeProducts.map((product) => product.slug));
    const supplementalProducts = fallbackProducts.filter((product) => !existingSlugs.has(product.slug));

    return [...activeProducts, ...supplementalProducts].slice(0, 50);
  }, [products]);

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden px-3 pb-8 pt-6 sm:px-5 lg:px-6 lg:pt-8">
        <div className="pointer-events-none absolute left-[-4rem] top-10 -z-10 h-44 w-44 rounded-full bg-[#ccefed]/80 blur-3xl animate-herobg" />
        <div className="pointer-events-none absolute right-[-2rem] top-24 -z-10 h-52 w-52 rounded-full bg-[#d8edff]/85 blur-3xl animate-herobg" />
        <div className="mx-auto max-w-[94rem]">
          <HeroVideo />
        </div>
      </section>

      {starProduct ? (
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="brand-dark-panel rounded-[34px] p-7 text-white sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#cbe4fb]">
                Producto estrella
              </p>
              <h2 className="mt-4 font-display text-3xl font-black tracking-tight sm:text-[2.15rem]">
                Personaliza tu taza
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#ecf8f8] sm:text-base">
                {starProduct.name}
              </p>
              <div className="mt-6 flex items-end gap-3">
                <p className="font-display text-3xl font-black text-white sm:text-[2.15rem]">
                  {formatPrice(starProduct.price)}
                </p>
                <p className="pb-1 text-sm text-[#d8ebf9]">Precio base</p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={`/producto/${starProduct.slug}`}
                  className="brand-button-accent inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold"
                >
                  Personalizar ahora
                </Link>
                <a
                  href={`https://wa.me/${siteSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="brand-button-outline inline-flex items-center justify-center rounded-full px-6 py-4 text-sm font-semibold text-white"
                >
                  Pedir por WhatsApp
                </a>
              </div>
            </div>

            <div className="glass-card overflow-hidden p-5 sm:p-6">
              <img
                src={starProduct.image_url}
                alt={starProduct.name}
                className="aspect-[5/4] w-full rounded-[26px] object-contain bg-[linear-gradient(180deg,rgba(238,246,255,0.94),rgba(227,239,248,0.78))] p-5"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Productos"
            title="Tazas personalizadas con 50+ modelos disponibles"
            description="Mostramos mas modelos para que puedas comparar rapido y ver mas opciones sin depender de un bloque de destacados."
          />

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {mugTypes.map((type) => (
              <Link
                key={type}
                to={`/catalogo?tipo=${encodeURIComponent(type)}`}
                className="brand-pill px-4 py-2 text-sm font-semibold text-[#28535b] transition hover:border-[rgba(63,151,212,0.28)] hover:text-[#184a53]"
              >
                {type}
              </Link>
            ))}
            <span className="rounded-full border border-[rgba(63,151,212,0.18)] bg-[#edf6ff] px-4 py-2 text-sm font-semibold text-[#245c88]">
              {catalogPreview.length} productos
            </span>
          </div>

          <div className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {catalogPreview.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="hidden px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="glass-card p-8">
            <SectionHeading
              eyebrow="Por que elegirnos"
              title="Una tienda enfocada en tazas y en decisiones de compra rapidas."
              description="Todo el recorrido esta pensado para comparar modelos, revisar precios base y avanzar a cotizacion sin friccion."
            />
            <div className="mt-8 grid gap-4">
              {mugCatalogBenefits.map((item) => (
                <div key={item.id} className="glass-card flex items-start gap-3 px-4 py-4 text-sm text-[#28535b]">
                  <FiCheckCircle className="mt-0.5 text-[#3f97d4]" />
                  <div>
                    <p className="font-semibold text-[#184a53]">{item.title}</p>
                    <p className="mt-2 leading-7 text-[#56747b]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brand-dark-panel rounded-[34px] p-8 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-[#cbe4fb]">Como funciona</p>
            <div className="mt-6 grid gap-4">
              {purchaseSteps.map((step, index) => (
                <article
                  key={step.id}
                  className="rounded-[24px] border border-white/12 bg-white/10 px-5 py-5"
                >
                  <p className="font-display text-3xl font-black text-[#8fd8ff]">{`0${index + 1}`}</p>
                  <p className="mt-3 text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#ecf8f8]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="brand-panel mx-auto flex max-w-7xl flex-col gap-6 rounded-[34px] p-7 lg:flex-row lg:items-center lg:justify-between lg:p-9">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3f97d4]">
              Cotizacion rapida
            </p>
            <h2 className="mt-4 font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.1rem]">
              Ya sabes cual quieres?
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#56747b] sm:text-base">
              Cotiza tu taza personalizada y recibe atencion rapida para tu pedido.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/cotizar"
              className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold"
            >
              Cotizar ahora
            </Link>
            <a
              href={`https://wa.me/${siteSettings.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="brand-button-accent inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold"
            >
              <FiMessageCircle />
              Pedir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
