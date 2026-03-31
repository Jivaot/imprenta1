import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/helpers';

export default function CategoryCard({ category }) {
  const [primary, secondary] = category.palette;

  return (
    <Link
      to={`/categoria/${category.slug}`}
      className="glass-card glass-card-hover group relative overflow-hidden p-6"
    >
      <div
        className="absolute inset-x-0 top-0 h-1.5"
        style={{ background: `linear-gradient(90deg, ${primary}, ${secondary})` }}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: `${primary}18`, color: primary }}
        >
          {category.badge}
        </div>
        <div className="brand-pill px-3 py-1 text-xs font-semibold text-[#4c6f75]">
          {category.productCount} productos
        </div>
      </div>

      <h3 className="mt-6 font-display text-2xl font-bold tracking-tight text-[#184a53]">
        {category.name}
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#56747b]">{category.description}</p>

      <div className="mt-6 grid gap-3 rounded-[24px] bg-white/60 p-4 text-sm text-[#56747b]">
        <div className="flex items-center justify-between">
          <span>Desde</span>
          <span className="font-semibold text-[#184a53]">{formatPrice(category.priceFrom)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Linea</span>
          <span className="font-semibold text-[#184a53]">{category.shortName}</span>
        </div>
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#3f97d4]">
        Ver productos
        <span className="transition group-hover:translate-x-1">-&gt;</span>
      </div>
    </Link>
  );
}
