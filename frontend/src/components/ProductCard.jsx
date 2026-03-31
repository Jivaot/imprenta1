import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { formatPrice } from '../utils/helpers';

export default function ProductCard({ product }) {
  return (
    <article className="glass-card glass-card-hover group overflow-hidden">
      <Link className="block overflow-hidden bg-white/50" to={`/producto/${product.slug}`}>
        <img
          src={product.image_url}
          alt={product.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
      </Link>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="brand-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#4f6f75]">
            {product.type}
          </span>
          <span className="rounded-full bg-[#fff0de] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#dd7d18]">
            {product.capacityLabel}
          </span>
        </div>

        <div>
          <Link
            to={`/producto/${product.slug}`}
            className="font-display text-xl font-bold tracking-tight text-[#184a53] transition hover:text-[#0f8c93]"
          >
            {product.name}
          </Link>
          {product.shortDescription ? (
            <p className="mt-2 text-sm leading-6 text-[#56747b]">{product.shortDescription}</p>
          ) : null}
        </div>

        <div className="grid gap-3 rounded-[24px] bg-white/60 p-4 text-sm text-[#56747b]">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#7b9195]">Precio base</p>
              <div className="flex items-end gap-2">
                <p className="text-2xl font-extrabold tracking-tight text-[#184a53]">
                  {formatPrice(product.price)}
                </p>
                {product.compareAtPrice ? (
                  <p className="pb-0.5 text-xs text-[#7b9195] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                ) : null}
              </div>
            </div>
            <p className="text-right text-xs text-[#56747b]">{product.production_time}</p>
          </div>
          <div className="flex items-center justify-between text-xs text-[#56747b]">
            <span>{product.minQtyLabel}</span>
            <span>{product.discountLabel || product.badge}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[rgba(15,140,147,0.12)] pt-3">
          <span className="text-sm font-medium text-[#56747b]">
            {product.isCustomizable ? 'Personalizable' : 'Disponible'}
          </span>
          <Link
            to={`/producto/${product.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f8c93] transition hover:text-[#14697b]"
          >
            Ver producto
            <FiArrowUpRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
