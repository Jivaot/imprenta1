import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiSearch, FiSliders } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import {
  faqItems,
  personalizationIdeas,
} from '../data/shopData';
import {
  selectCatalogStatus,
  selectProducts,
  selectProductTypes,
} from '../store/slices/productsSlice';

const sortOptions = [
  { value: 'destacado', label: 'Orden destacado' },
  { value: 'price-asc', label: 'Precio menor a mayor' },
  { value: 'price-desc', label: 'Precio mayor a menor' },
  { value: 'name', label: 'Nombre A-Z' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const products = useSelector(selectProducts);
  const mugTypes = useSelector(selectProductTypes);
  const status = useSelector(selectCatalogStatus);
  const currentType = searchParams.get('tipo') || 'Todas';
  const [search, setSearch] = React.useState('');
  const [sortBy, setSortBy] = React.useState('destacado');

  const filteredProducts = React.useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    let nextProducts =
      currentType === 'Todas'
        ? products
        : products.filter((product) => product.type === currentType);

    if (normalizedSearch) {
      nextProducts = nextProducts.filter((product) =>
        [product.name, product.description, product.type]
          .join(' ')
          .toLowerCase()
          .includes(normalizedSearch)
      );
    }

    const sortedProducts = [...nextProducts];

    switch (sortBy) {
      case 'price-asc':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'destacado':
      default:
        sortedProducts.sort((a, b) => {
          if (a.sort_order === b.sort_order) {
            return Number(b.featured) - Number(a.featured);
          }

          return a.sort_order - b.sort_order;
        });
        break;
    }

    return sortedProducts;
  }, [currentType, products, search, sortBy]);

  const handleTypeChange = (type) => {
    if (type === 'Todas') {
      setSearchParams({});
      return;
    }

    setSearchParams({ tipo: type });
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Catalogo"
          title="Catalogo de tazas"
          description="Encuentra modelos clasicos, magicos, premium y personalizados para cada necesidad."
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => handleTypeChange('Todas')}
            className={`brand-pill px-4 py-2 text-sm font-semibold transition ${
              currentType === 'Todas'
                ? 'bg-[#3f97d4] text-white shadow-[0_12px_28px_rgba(63,151,212,0.2)]'
                : 'text-[#28535b] hover:border-[rgba(63,151,212,0.28)] hover:text-[#184a53]'
            }`}
          >
            Todas
          </button>
          {mugTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeChange(type)}
              className={`brand-pill px-4 py-2 text-sm font-semibold transition ${
                currentType === type
                  ? 'bg-[#3f97d4] text-white shadow-[0_12px_28px_rgba(63,151,212,0.2)]'
                  : 'text-[#28535b] hover:border-[rgba(63,151,212,0.28)] hover:text-[#184a53]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="glass-card mt-8 grid gap-4 p-5 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <label className="flex items-center gap-3 rounded-full border border-[rgba(63,151,212,0.16)] bg-white/70 px-4 py-3 text-sm text-[#6a878c]">
            <FiSearch className="text-[#3f97d4]" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar modelo de taza"
              className="w-full bg-transparent text-sm text-[#184a53] outline-none placeholder:text-[#7b9195]"
            />
          </label>

          <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(63,151,212,0.16)] px-4 py-3 text-sm text-[#56747b]">
            <FiSliders className="text-[#3f97d4]" />
            <span>{filteredProducts.length} modelos</span>
          </div>

          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="rounded-full border border-[rgba(63,151,212,0.16)] bg-white/80 px-4 py-3 text-sm font-medium text-[#184a53] outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <div className="glass-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b9195]">Filtro activo</p>
            <p className="mt-2 font-display text-2xl font-black text-[#184a53] sm:text-[1.9rem]">
              {currentType}
            </p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-[#7b9195]">Personalizacion</p>
            <p className="mt-2 text-sm leading-7 text-[#56747b]">{personalizationIdeas[0]}</p>
            <p className="text-sm leading-7 text-[#56747b]">{personalizationIdeas[1]}</p>
          </div>
          <div className="brand-dark-panel rounded-[24px] p-5 text-white">
            <p className="text-xs uppercase tracking-[0.2em] text-[#cbe4fb]">Atencion rapida</p>
            <p className="mt-2 font-display text-xl font-black sm:text-2xl">
              Cotiza por unidad o por lote segun tu pedido.
            </p>
          </div>
        </div>

        {status === 'loading' && products.length === 0 ? (
          <div className="glass-card mt-10 p-12 text-center">
            <p className="font-display text-2xl font-black text-[#184a53] sm:text-[1.9rem]">
              Cargando catalogo...
            </p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass-card mt-10 border border-dashed p-12 text-center">
            <p className="font-display text-2xl font-black text-[#184a53] sm:text-[1.9rem]">
              No encontramos coincidencias.
            </p>
            <p className="mt-3 text-sm leading-7 text-[#56747b]">
              Prueba con otro termino o revisa todos los tipos de taza.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="brand-panel rounded-[34px] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
              Necesitas un pedido especial?
            </p>
            <h2 className="mt-4 font-display text-2xl font-black tracking-tight text-[#184a53] sm:text-[2rem]">
              Cotiza una taza personalizada con cantidad, acabado y entrega a medida.
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#56747b]">
              Si ya sabes el modelo, podemos avanzar rapido. Si todavia estas comparando, te ayudamos
              a elegir segun presupuesto, uso y volumen.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/cotizar"
                className="brand-button-primary inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
              >
                Ir a cotizar
              </Link>
              <a
                href="https://wa.me/56968461122"
                target="_blank"
                rel="noreferrer"
                className="brand-button-accent inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div>

          <div className="glass-card p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
              Preguntas frecuentes
            </p>
            <div className="mt-6 grid gap-4">
              {faqItems.map((item) => (
                <article key={item.id} className="rounded-[24px] bg-white/60 p-5">
                  <p className="font-display text-lg font-bold text-[#184a53]">{item.question}</p>
                  <p className="mt-3 text-sm leading-7 text-[#56747b]">{item.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
