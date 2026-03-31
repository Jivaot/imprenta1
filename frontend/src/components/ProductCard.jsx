import React from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiArrowUpRight, FiShoppingCart } from 'react-icons/fi';
import { addItem } from '../store/slices/cartSlice';
import { formatPrice } from '../utils/helpers';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const defaultQuantity = Math.max(product.min_qty || 1, 1);

  const handleAddToCart = () => {
    dispatch(
      addItem({
        productId: product.id,
        productSlug: product.slug,
        name: product.name,
        image: product.image_url,
        unitPrice: product.price,
        quantity: defaultQuantity,
        categoryName: product.type,
        selectedPackaging: product.packagingOptions?.[0] || '',
        minQuantity: defaultQuantity,
      })
    );

    toast.success(`${product.name} agregado al carrito`);
  };

  return (
    <article className="glass-card glass-card-hover group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300">
      <Link
        className="block aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 p-3 sm:p-4"
        to={`/producto/${product.slug}`}
        aria-label={`Ver detalle de ${product.name}`}
      >
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.08]"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-4">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700">
            {product.type}
          </span>
          <span className="inline-block rounded-full bg-cyan-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-700">
            {product.capacityLabel}
          </span>
        </div>

        {/* Título */}
        <Link
          to={`/producto/${product.slug}`}
          className="transition hover:text-blue-600"
        >
          <p className="clamp-2 font-bold leading-tight text-slate-800 text-sm sm:text-base">
            {product.name}
          </p>
        </Link>

        {/* Descripción - más compacta */}
        {product.shortDescription ? (
          <p className="line-clamp-2 text-xs sm:text-sm leading-relaxed text-slate-600">
            {product.shortDescription}
          </p>
        ) : null}

        {/* Precio y Info */}
        <div className="rounded-xl bg-white/70 p-3 space-y-2">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Precio</p>
              <div className="flex items-end gap-1.5">
                <p className="text-lg sm:text-xl font-bold text-slate-800">
                  {formatPrice(product.price)}
                </p>
                {product.compareAtPrice ? (
                  <p className="pb-0.5 text-[9px] text-slate-400 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                ) : null}
              </div>
            </div>
            {product.production_time && (
              <p className="text-[9px] leading-tight text-slate-500 text-right max-w-[5rem]">
                {product.production_time}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 text-[9px] text-slate-600">
            <span className="truncate">{product.minQtyLabel}</span>
            {product.discountLabel && (
              <span className="inline-block bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-semibold whitespace-nowrap">
                {product.discountLabel}
              </span>
            )}
          </div>
        </div>

        {/* Links y botón */}
        <div className="mt-auto space-y-2">
          <Link
            to={`/producto/${product.slug}`}
            className="inline-flex items-center justify-center gap-1.5 w-full text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 rounded-lg hover:bg-blue-50 py-1.5 transition"
          >
            Ver ficha completa
            <FiArrowUpRight size={14} />
          </Link>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 px-3 py-2 text-xs sm:text-sm font-bold text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            <FiShoppingCart size={16} />
            <span className="hidden sm:inline">Agregar</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </article>
  );
}
