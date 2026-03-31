import React from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiFileText, FiMessageCircle, FiUploadCloud } from 'react-icons/fi';
import SectionHeading from '../components/SectionHeading';
import { faqItems, quoteWorkTypes } from '../data/shopData';
import { selectProducts } from '../store/slices/productsSlice';
import { saveQuoteRequest } from '../utils/demoStorage';
import { buildQuoteMessage } from '../utils/whatsapp';

const initialState = {
  clientName: '',
  email: '',
  phone: '',
  company: '',
  productName: '',
  typeOfWork: quoteWorkTypes[0],
  quantity: '12',
  printArea: 'Cara frontal',
  finish: 'Sublimacion full color',
  deliveryMethod: 'Retiro coordinado',
  city: '',
  description: '',
  neededDate: '',
  fileName: '',
};

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const products = useSelector(selectProducts);
  const selectedProduct = products.find((product) => product.slug === searchParams.get('producto'));
  const [formState, setFormState] = React.useState(initialState);
  const [savedQuote, setSavedQuote] = React.useState(null);

  React.useEffect(() => {
    if (!selectedProduct) {
      return;
    }

    setFormState((current) => ({
      ...current,
      productName: selectedProduct.name,
      typeOfWork: `${selectedProduct.type} personalizada`,
      quantity: String(selectedProduct.min_qty),
      printArea: selectedProduct.printAreas[0] || current.printArea,
      finish: selectedProduct.finishOptions[0] || current.finish,
      description: `Quiero cotizar el modelo ${selectedProduct.name}.`,
    }));
  }, [selectedProduct]);

  const whatsappLink = buildQuoteMessage(formState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((current) => ({ ...current, [name]: value }));
  };

  const handleFile = (event) => {
    setFormState((current) => ({
      ...current,
      fileName: event.target.files?.[0]?.name || '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const entry = saveQuoteRequest(formState);
    setSavedQuote(entry);
    toast.success('Solicitud guardada');
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="Cotizacion"
          title="Cuentanos tu pedido y te ayudamos a cotizar la taza correcta."
          description="Comparte el modelo, cantidad y personalizacion que necesitas para recibir una respuesta rapida."
        />

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="glass-card space-y-5 p-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nombre
                <input
                  required
                  name="clientName"
                  value={formState.clientName}
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Modelo de taza
                <input
                  name="productName"
                  value={formState.productName}
                  onChange={handleChange}
                  placeholder="Ej: Taza clasica blanca 11 oz"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Tipo de solicitud
                <select
                  name="typeOfWork"
                  value={formState.typeOfWork}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                >
                  {quoteWorkTypes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Cantidad
                <input
                  name="quantity"
                  value={formState.quantity}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Impresion
                <input
                  name="printArea"
                  value={formState.printArea}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Acabado
                <input
                  name="finish"
                  value={formState.finish}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
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
                  <option value="Retiro coordinado">Retiro coordinado</option>
                  <option value="Despacho en Santiago">Despacho en Santiago</option>
                  <option value="Envio a regiones">Envio a regiones</option>
                </select>
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Ciudad o comuna
                <input
                  name="city"
                  value={formState.city}
                  onChange={handleChange}
                  placeholder="Ej: Providencia"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Fecha estimada
                <input
                  type="date"
                  name="neededDate"
                  value={formState.neededDate}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Archivo o logo
                <input
                  type="file"
                  onChange={handleFile}
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-sm outline-none file:mr-3 file:rounded-full file:border-0 file:bg-[#173a63] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
                />
              </label>
            </div>

            <label className="space-y-2 text-sm font-medium text-slate-700">
              Detalles del pedido
              <textarea
                required
                name="description"
                rows={5}
                value={formState.description}
                onChange={handleChange}
                className="w-full rounded-[24px] border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
                placeholder="Cuentanos si necesitas nombres por unidad, logo, frase, empaque o una fecha especifica."
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                className="brand-button-primary inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold"
              >
                <FiFileText />
                Guardar solicitud
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="brand-button-accent inline-flex items-center justify-center gap-2 rounded-full px-5 py-4 text-sm font-semibold"
              >
                <FiMessageCircle />
                Enviar por WhatsApp
              </a>
            </div>
          </form>

          <div className="space-y-5">
            <div className="brand-dark-panel rounded-[34px] p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#bfeaff]">
                Resumen de tu solicitud
              </p>
              <div className="mt-6 space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <FiUploadCloud className="text-[#8fd8ff]" />
                  {formState.fileName || 'Sin archivo adjunto'}
                </div>
                <p className="font-display text-3xl font-black">
                  {formState.productName || formState.typeOfWork}
                </p>
                <p className="text-sm leading-7 text-slate-300">
                  {formState.description ||
                    'Completa el formulario para preparar mejor tu cotizacion.'}
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cantidad</p>
                    <p className="mt-2 text-xl font-bold">{formState.quantity || 'Por definir'}</p>
                  </div>
                  <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Entrega</p>
                    <p className="mt-2 text-xl font-bold">
                      {formState.deliveryMethod || 'Por definir'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {savedQuote ? (
              <div className="rounded-[30px] border border-[rgba(63,151,212,0.22)] bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#245c88]">
                  Solicitud registrada
                </p>
                <p className="mt-3 font-display text-2xl font-black text-slate-950">
                  {savedQuote.id}
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Ya puedes seguir con tu pedido por WhatsApp si quieres atencion inmediata.
                </p>
              </div>
            ) : null}

            <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3f97d4]">
                Antes de cotizar
              </p>
              <div className="mt-5 space-y-4">
                {faqItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="rounded-[22px] bg-slate-50 p-4">
                    <p className="font-semibold text-slate-950">{item.question}</p>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
