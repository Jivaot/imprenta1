import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  FiArrowRight,
  FiCheckCircle,
  FiMessageCircle,
  FiShoppingBag,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import {
  heroHighlights,
  mugCatalogBenefits,
  personalizationIdeas,
  purchaseSteps,
  siteSettings,
  starProductChecklist,
} from '../data/shopData';
import {
  selectCatalogStatus,
  selectFeaturedProducts,
  selectProducts,
  selectStarProduct,
  selectProductTypes,
} from '../store/slices/productsSlice';
import { formatPrice } from '../utils/helpers';

export default function HomePage() {
  const status = useSelector(selectCatalogStatus);
  const products = useSelector(selectProducts);
  const featuredProducts = useSelector(selectFeaturedProducts);
  const starProduct = useSelector(selectStarProduct);
  const mugTypes = useSelector(selectProductTypes);
  const catalogPreview = products.slice(0, 6);
  const heroProducts = featuredProducts.slice(0, 3);

  return (
    <div className="pb-8">
      <section className="relative overflow-hidden px-4 pb-16 pt-10 sm:px-6 lg:px-8 lg:pt-16">
        <div className="pointer-events-none absolute left-[-4rem] top-10 -z-10 h-44 w-44 rounded-full bg-[#ccefed]/80 blur-3xl animate-herobg" />
        <div className="pointer-events-none absolute right-[-2rem] top-24 -z-10 h-52 w-52 rounded-full bg-[#ffe0ba]/80 blur-3xl animate-herobg" />

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <span className="brand-pill inline-flex px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-[#0f8c93]">
              Catalogo online de tazas personalizadas
            </span>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-black tracking-tight text-[#184a53] sm:text-6xl lg:text-7xl">
              Tazas personalizadas para marcas, regalos y pedidos especiales
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#56747b]">
              Elige tu modelo, revisa precios base y cotiza de forma rapida.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/catalogo"
                className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold"
              >
                <FiShoppingBag />
                Ver catalogo
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

              <div className="hidden">
                {heroHighlights.map((item) => (
                  <div key={item.id} className="glass-card px-5 py-5">
                    <p className="font-display text-2xl font-black text-[#184a53]">{item.value}</p>
                  </div>
                ))}
              </div>
          </div>

          <div className="grid gap-5">
            <div className="brand-panel rounded-[34px] p-6 text-[#184a53]">
              <p className="text-sm uppercase tracking-[0.24em] text-[#0f8c93]">
                Modelos mas pedidos
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold">
                Explora tazas clasicas, magicas, premium y listas para regalo.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#56747b]">
                Cada ficha muestra capacidad, precio base, cantidad minima y tiempo de produccion.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {heroProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/producto/${product.slug}`}
                    className="glass-card glass-card-hover overflow-hidden"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-36 w-full object-cover"
                    />
                    <div className="space-y-2 p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#0f8c93]">
                        {product.type}
                      </p>
                      <p className="font-display text-lg font-bold text-[#184a53]">
                        {product.name}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden">
              <article className="glass-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f8c93]">
                  Personalizacion
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#184a53]">
                  Personalizamos logos, frases, nombres y pedidos por lote.
                </h3>
                <div className="mt-4 space-y-2 text-sm text-[#56747b]">
                  {personalizationIdeas.slice(0, 3).map((idea) => (
                    <p key={idea}>{idea}</p>
                  ))}
                </div>
              </article>

              <article className="glass-card p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f8c93]">
                  Tipos disponibles
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mugTypes.map((type) => (
                    <Link
                      key={type}
                      to={`/catalogo?tipo=${encodeURIComponent(type)}`}
                      className="brand-pill px-3 py-2 text-sm font-medium text-[#28535b]"
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {starProduct ? (
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.04fr_0.96fr]">
            <div className="brand-dark-panel rounded-[34px] p-8 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#ffe2b7]">
                Producto estrella
              </p>
              <h2 className="mt-4 font-display text-4xl font-black tracking-tight">
                Personaliza tu taza
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[#ecf8f8]">
                {starProduct.name}
              </p>
              <div className="mt-6 flex items-end gap-3">
                <p className="font-display text-4xl font-black text-white">
                  {formatPrice(starProduct.price)}
                </p>
                <p className="pb-1 text-sm text-[#d9f5f3]">Precio base</p>
              </div>

              <div className="hidden">
                {starProductChecklist.map((item) => (
                  <div
                    key={item}
                    className="rounded-[22px] border border-white/12 bg-white/10 px-4 py-4 text-sm font-medium text-white"
                  >
                    {item}
                  </div>
                ))}
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

            <div className="glass-card overflow-hidden p-6">
              <img
                src={starProduct.image_url}
                alt={starProduct.name}
                className="h-full w-full rounded-[28px] object-cover"
              />
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Catalogo"
            title="Catalogo de tazas"
            description="Encuentra modelos clasicos, magicos, premium y personalizados para cada necesidad."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            {mugTypes.map((type) => (
              <Link
                key={type}
                to={`/catalogo?tipo=${encodeURIComponent(type)}`}
                className="brand-pill px-4 py-2 text-sm font-semibold text-[#28535b] transition hover:border-[rgba(15,140,147,0.28)] hover:text-[#184a53]"
              >
                {type}
              </Link>
            ))}
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
                  <FiCheckCircle className="mt-0.5 text-[#0f8c93]" />
                  <div>
                    <p className="font-semibold text-[#184a53]">{item.title}</p>
                    <p className="mt-2 leading-7 text-[#56747b]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="brand-dark-panel rounded-[34px] p-8 text-white">
            <p className="text-sm uppercase tracking-[0.24em] text-[#ffe2b7]">Como funciona</p>
            <div className="mt-6 grid gap-4">
              {purchaseSteps.map((step, index) => (
                <article
                  key={step.id}
                  className="rounded-[24px] border border-white/12 bg-white/10 px-5 py-5"
                >
                  <p className="font-display text-4xl font-black text-[#ffd08f]">{`0${index + 1}`}</p>
                  <p className="mt-3 text-lg font-semibold">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#ecf8f8]">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Destacados"
              title="Tazas destacadas"
              description="Los modelos mas pedidos para regalos, empresas, eventos y ventas."
            />
            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f8c93] transition hover:text-[#14697b]"
            >
              Ver todo el catalogo
              <FiArrowRight />
            </Link>
          </div>

          {status === 'loading' && featuredProducts.length === 0 ? (
            <div className="glass-card mt-10 p-8 text-center text-sm text-[#56747b]">
              Cargando tazas destacadas...
            </div>
          ) : (
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="brand-panel mx-auto flex max-w-7xl flex-col gap-6 rounded-[34px] p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0f8c93]">
              Cotizacion rapida
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight text-[#184a53]">
              Ya sabes cual quieres?
            </h2>
            <p className="mt-4 text-base leading-8 text-[#56747b]">
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
