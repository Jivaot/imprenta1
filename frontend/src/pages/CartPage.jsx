import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FiChevronRight,
  FiMessageCircle,
  FiPackage,
  FiShield,
  FiTrash2,
  FiTruck,
} from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
import QuantitySelector from '../components/QuantitySelector';
import { clearCart, removeItem, updateQuantity } from '../store/slices/cartSlice';
import { selectFeaturedProducts } from '../store/slices/productsSlice';
import { calculateCartSubtotal, formatPrice } from '../utils/helpers';
import { buildWhatsAppLink } from '../utils/whatsapp';

const getItemDetails = (item) =>
  [
    item.selectedPackaging ? `Presentacion: ${item.selectedPackaging}` : '',
    item.customText ? `Texto: ${item.customText}` : '',
    item.uploadedFileName ? `Archivo: ${item.uploadedFileName}` : '',
    item.selectedPrintArea ? `Impresion: ${item.selectedPrintArea}` : '',
    item.selectedFinish ? `Acabado: ${item.selectedFinish}` : '',
  ].filter(Boolean);

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const featuredProducts = useSelector(selectFeaturedProducts);
  const subtotal = calculateCartSubtotal(items);
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="glass-card mx-auto max-w-3xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f8c93]">
            Carrito vacio
          </p>
          <h1 className="mt-4 font-display text-4xl font-black tracking-tight text-[#184a53]">
            Aun no agregas productos a tu pedido.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#56747b]">
            Revisa el catalogo y suma las tazas que quieres cotizar o comprar.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/catalogo"
              className="brand-button-primary rounded-full px-5 py-3 text-sm font-semibold"
            >
              Ver catalogo
            </Link>
            <Link
              to="/cotizar"
              className="brand-button-outline rounded-full px-5 py-3 text-sm font-semibold"
            >
              Ir a cotizar
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0f8c93]">
              Carrito
            </p>
            <h1 className="mt-3 font-display text-4xl font-black tracking-tight text-[#184a53]">
              Tu pedido
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#56747b]">
              Revisa cantidades, personalizaciones y subtotal antes de seguir al checkout.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/catalogo"
              className="brand-button-outline inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Seguir comprando
            </Link>
            <button
              type="button"
              onClick={() => dispatch(clearCart())}
              className="inline-flex items-center justify-center rounded-full border border-[rgba(239,68,68,0.22)] bg-white px-5 py-3 text-sm font-semibold text-[#b42318] transition hover:border-[rgba(239,68,68,0.34)] hover:bg-[#fff5f5]"
            >
              Vaciar carrito
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b9195]">
              Productos
            </p>
            <p className="mt-3 font-display text-4xl font-black text-[#184a53]">{items.length}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b9195]">
              Unidades
            </p>
            <p className="mt-3 font-display text-4xl font-black text-[#184a53]">{totalUnits}</p>
          </div>
          <div className="glass-card p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7b9195]">
              Subtotal
            </p>
            <p className="mt-3 font-display text-4xl font-black text-[#184a53]">
              {formatPrice(subtotal)}
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 xl:grid-cols-[minmax(0,1.15fr)_380px]">
          <div className="space-y-5">
            <div className="glass-card overflow-hidden">
              <div className="hidden grid-cols-[120px_minmax(0,1fr)_140px_180px_140px] gap-4 border-b border-[rgba(15,140,147,0.12)] bg-white/55 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#7b9195] lg:grid">
                <span>Producto</span>
                <span>Detalle</span>
                <span>Unitario</span>
                <span>Cantidad</span>
                <span className="text-right">Subtotal</span>
              </div>

              <div className="divide-y divide-[rgba(15,140,147,0.12)]">
                {items.map((item) => {
                  const itemDetails = getItemDetails(item);

                  return (
                    <article
                      key={item.lineKey}
                      className="grid gap-5 p-5 lg:grid-cols-[120px_minmax(0,1fr)_140px_180px_140px] lg:items-center"
                    >
                      <Link
                        to={`/producto/${item.productSlug}`}
                        className="overflow-hidden rounded-[24px] bg-white/70"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-28 w-full object-cover transition duration-500 hover:scale-[1.03]"
                        />
                      </Link>

                      <div className="min-w-0 space-y-3">
                        <div>
                          <Link
                            to={`/producto/${item.productSlug}`}
                            className="font-display text-2xl font-bold tracking-tight text-[#184a53] transition hover:text-[#0f8c93]"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-[#6f8a8f]">{item.categoryName}</p>
                        </div>

                        {itemDetails.length ? (
                          <div className="flex flex-wrap gap-2">
                            {itemDetails.map((detail) => (
                              <span
                                key={detail}
                                className="rounded-full bg-[#eef7f6] px-3 py-1 text-xs font-medium text-[#48686f]"
                              >
                                {detail}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {item.notes ? (
                          <div className="rounded-[20px] border border-[rgba(15,140,147,0.1)] bg-white/75 px-4 py-3 text-sm leading-7 text-[#56747b]">
                            {item.notes}
                          </div>
                        ) : null}
                      </div>

                      <div className="space-y-1 lg:text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b9195] lg:hidden">
                          Precio unitario
                        </p>
                        <p className="text-xl font-extrabold tracking-tight text-[#184a53]">
                          {formatPrice(item.unitPrice)}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b9195] lg:hidden">
                            Cantidad
                          </p>
                          <div className="mt-2 lg:mt-0">
                            <QuantitySelector
                              value={item.quantity}
                              onChange={(value) =>
                                dispatch(updateQuantity({ lineKey: item.lineKey, quantity: value }))
                              }
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => dispatch(removeItem(item.lineKey))}
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[#b42318] transition hover:text-[#8f1b13]"
                        >
                          <FiTrash2 />
                          Eliminar
                        </button>
                      </div>

                      <div className="flex items-end justify-between lg:block lg:text-right">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b9195] lg:hidden">
                          Subtotal
                        </p>
                        <p className="text-2xl font-black tracking-tight text-[#184a53]">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="glass-card p-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#184a53]">
                  <FiPackage className="text-[#0f8c93]" />
                  Produccion
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">
                  El tiempo final se confirma segun el modelo y la cantidad.
                </p>
              </div>

              <div className="glass-card p-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#184a53]">
                  <FiTruck className="text-[#f59e0b]" />
                  Entrega
                </p>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">
                  Puedes retirar o coordinar despacho al momento de finalizar.
                </p>
              </div>
            </div>
          </div>

          <aside className="glass-card space-y-5 p-6 xl:sticky xl:top-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7b9195]">
                Resumen
              </p>
              <h2 className="mt-2 font-display text-3xl font-black tracking-tight text-[#184a53]">
                Total del pedido
              </h2>
            </div>

            <div className="rounded-[28px] bg-white/70 p-5">
              <div className="space-y-3 text-sm text-[#56747b]">
                <div className="flex items-center justify-between">
                  <span>Productos</span>
                  <span>{items.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Unidades</span>
                  <span>{totalUnits}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Despacho</span>
                  <span>A convenir</span>
                </div>
              </div>

              <div className="mt-4 border-t border-[rgba(15,140,147,0.12)] pt-4">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7b9195]">
                      Subtotal
                    </p>
                    <p className="mt-2 font-display text-4xl font-black text-[#184a53]">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                  <span className="rounded-full bg-[#eef7f6] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#0f8c93]">
                    Pedido actual
                  </span>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="rounded-[24px] border border-[rgba(15,140,147,0.12)] bg-[#f8fbfb] p-4 text-sm leading-7 text-[#56747b]">
                <p className="inline-flex items-center gap-2 font-semibold text-[#184a53]">
                  <FiShield className="text-[#0f8c93]" />
                  Revisa antes de pagar
                </p>
                <p className="mt-2">
                  En el checkout podras ingresar tus datos y definir retiro o despacho.
                </p>
              </div>
            </div>

            <div className="grid gap-3">
              <Link
                to="/checkout"
                className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold"
              >
                Continuar al checkout
                <FiChevronRight />
              </Link>
              <Link
                to="/catalogo"
                className="brand-button-outline inline-flex items-center justify-center rounded-full px-5 py-4 text-sm font-semibold"
              >
                Seguir comprando
              </Link>
            </div>

            <a
              href={buildWhatsAppLink(
                `Hola, quiero ayuda con mi carrito. Llevo ${items.length} producto(s) y ${totalUnits} unidad(es).`
              )}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f8c93] transition hover:text-[#14697b]"
            >
              <FiMessageCircle />
              Necesito ayuda con este pedido
            </a>
          </aside>
        </div>

        <div className="mt-14">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#0f8c93]">
                Recomendados
              </p>
              <h2 className="mt-3 font-display text-3xl font-black tracking-tight text-[#184a53]">
                Puedes sumar mas modelos
              </h2>
            </div>

            <Link
              to="/catalogo"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0f8c93] transition hover:text-[#14697b]"
            >
              Ver catalogo
              <FiChevronRight />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
