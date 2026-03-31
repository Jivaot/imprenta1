import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { clearCart } from '../store/slices/cartSlice';
import { checkoutAdvantages } from '../data/shopData';
import { getLastOrder, saveOrder } from '../utils/demoStorage';
import {
  calculateCartSubtotal,
  calculateShipping,
  calculateTotal,
  formatPrice,
} from '../utils/helpers';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  deliveryMethod: 'retiro',
  address: '',
  commune: '',
  notes: '',
  paymentMethod: 'transferencia',
};

export default function CheckoutPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [formState, setFormState] = React.useState(initialForm);
  const [orderSuccess, setOrderSuccess] = React.useState(null);
  const subtotal = calculateCartSubtotal(cartItems);
  const shipping = calculateShipping(formState.deliveryMethod, subtotal);
  const total = calculateTotal(subtotal, shipping);

  React.useEffect(() => {
    if (cartItems.length === 0) {
      setOrderSuccess(getLastOrder());
    }
  }, [cartItems.length]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cartItems.length === 0) {
      toast.error('Tu carrito esta vacio');
      return;
    }

    const order = saveOrder({
      customer: formState,
      items: cartItems,
      subtotal,
      shipping,
      total,
    });

    dispatch(clearCart());
    setOrderSuccess(order);
    setFormState(initialForm);
    toast.success('Pedido recibido');
  };

  if (cartItems.length === 0 && !orderSuccess) {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="glass-card mx-auto max-w-3xl p-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
            Checkout vacio
          </p>
          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.2rem]">
            Agrega tazas antes de continuar.
          </h1>
          <Link
            to="/catalogo"
            className="brand-button-primary mt-8 inline-flex rounded-full px-5 py-3 text-sm font-semibold"
          >
            Volver
          </Link>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0 && orderSuccess) {
    return (
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[34px] border border-[rgba(63,151,212,0.22)] bg-white p-10 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#245c88]">
            Pedido recibido
          </p>
          <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.2rem]">
            Gracias, tu pedido quedo registrado.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
            Pronto podremos continuar con la confirmacion comercial de tu compra.
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            <div className="rounded-[26px] bg-[#edf5fb] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Numero</p>
              <p className="mt-2 font-display text-2xl font-black text-slate-950">
                {orderSuccess.id}
              </p>
            </div>
            <div className="rounded-[26px] bg-[#edf5fb] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total</p>
              <p className="mt-2 font-display text-2xl font-black text-slate-950">
                {formatPrice(orderSuccess.total)}
              </p>
            </div>
            <div className="rounded-[26px] bg-[#edf5fb] p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Entrega</p>
              <p className="mt-2 font-display text-2xl font-black text-slate-950">
                {orderSuccess.customer.deliveryMethod === 'retiro' ? 'Retiro' : 'Despacho'}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/catalogo"
              className="brand-button-primary inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Seguir comprando
            </Link>
            <Link
              to="/cotizar"
              className="brand-button-outline inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold"
            >
              Cotizar otro pedido
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#3f97d4]">
            Checkout
          </p>
          <h1 className="mt-3 font-display text-3xl font-black tracking-tight text-[#184a53] sm:text-[2.2rem]">
            Completa tus datos y deja listo tu pedido.
          </h1>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {checkoutAdvantages.map((item) => (
              <div
                key={item}
                className="glass-card px-4 py-4 text-sm text-slate-600"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="glass-card space-y-6 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nombre completo
                <input
                  required
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Telefono
                <input
                  required
                  name="phone"
                  value={formState.phone}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Empresa
                <input
                  name="company"
                  value={formState.company}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                  placeholder="Opcional"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Entrega
                <select
                  name="deliveryMethod"
                  value={formState.deliveryMethod}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                >
                  <option value="retiro">Retiro coordinado</option>
                  <option value="despacho">Despacho</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Metodo de pago
                <select
                  name="paymentMethod"
                  value={formState.paymentMethod}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                >
                  <option value="transferencia">Transferencia</option>
                  <option value="link">Link de pago</option>
                  <option value="coordinar">Coordinar con ventas</option>
                </select>
              </label>
            </div>

            {formState.deliveryMethod === 'despacho' ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Direccion
                  <input
                    required
                    name="address"
                    value={formState.address}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                  />
                </label>
                <label className="space-y-2 text-sm font-medium text-slate-700">
                  Comuna
                  <input
                    required
                    name="commune"
                    value={formState.commune}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                  />
                </label>
              </div>
            ) : null}

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Comentarios del pedido
              <textarea
                name="notes"
                rows={4}
                value={formState.notes}
                onChange={handleChange}
                className="w-full rounded-[24px] border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                placeholder="Horarios, referencias del pedido o datos para coordinar la entrega."
              />
            </label>
          </div>

          <aside className="glass-card space-y-5 p-6 lg:sticky lg:top-28">
            <h2 className="font-display text-2xl font-black tracking-tight text-[#184a53] sm:text-[2rem]">
              Resumen final
            </h2>

            <div className="space-y-3 rounded-[24px] bg-slate-50 p-5">
              {cartItems.map((item) => (
                <div
                  key={item.lineKey}
                  className="flex items-start justify-between gap-4 text-sm text-slate-700"
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.name}</p>
                    <p className="text-slate-500">Cantidad: {item.quantity}</p>
                  </div>
                  <p>{formatPrice(item.unitPrice * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 border-t border-slate-200 pt-4 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Despacho</span>
                <span>{shipping === 0 ? 'Sin costo' : formatPrice(shipping)}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-bold text-slate-950">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="rounded-[24px] border border-[rgba(63,151,212,0.16)] bg-[#edf6ff] p-5 text-sm leading-7 text-[#234767]">
              El total considera el precio base visible de cada producto. La personalizacion final
              se confirma antes de producir.
            </div>

            <button
              type="submit"
              className="brand-button-primary w-full rounded-full px-5 py-4 text-sm font-semibold"
            >
              Confirmar pedido
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
}
