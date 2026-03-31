import React from 'react';
import SectionHeading from '../components/SectionHeading';
import { mugCatalogBenefits, purchaseSteps, siteSettings } from '../data/shopData';

const values = [
  {
    title: 'Especialistas en tazas personalizadas',
    description:
      'Trabajamos una sola linea de producto para ayudarte a elegir mas rapido y cotizar con menos vueltas.',
  },
  {
    title: 'Precios base claros',
    description:
      'Cada modelo muestra su base comercial para que puedas comparar opciones antes de pedir tu cotizacion.',
  },
  {
    title: 'Atencion cercana',
    description:
      'Acompanamos pedidos para empresas, eventos, regalos y ventas al detalle con una comunicacion rapida.',
  },
];

export default function AboutPage() {
  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Nosotros"
          title="Una tienda enfocada por completo en tazas personalizadas."
          description="Nuestro trabajo esta pensado para ayudarte a elegir modelo, revisar precio base y avanzar a cotizacion con claridad."
        />

        <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[34px] bg-slate-950 p-8 text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-200">
              {siteSettings.brandName}
            </p>
            <h2 className="mt-4 font-display text-4xl font-black tracking-tight">
              Tazas para regalos, marcas, equipos y pedidos especiales.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Reunimos modelos clasicos, premium, magicos y ejecutivos en una tienda simple,
              comercial y lista para cotizar por unidad o por lote.
            </p>
            <div className="mt-8 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
              {siteSettings.address}
              <br />
              {siteSettings.hoursWeek}
              <br />
              {siteSettings.hoursSaturday}
            </div>
          </div>

          <div className="grid gap-5">
            {values.map((item) => (
              <article
                key={item.title}
                className="glass-card p-6"
              >
                <h3 className="font-display text-2xl font-bold text-[#184a53]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Como trabajamos"
            title="Un proceso simple para cotizar y confirmar tu pedido."
            description="Desde el modelo hasta la entrega, cada paso esta pensado para que avances con confianza."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {purchaseSteps.map((step) => (
              <article key={step.id} className="glass-card p-6">
                <h3 className="font-display text-2xl font-bold text-[#184a53]">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Ventajas"
            title="Todo gira en torno a elegir y pedir la taza correcta."
            description="Menos ruido, mas claridad comercial y una experiencia lista para convertir."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {mugCatalogBenefits.map((item) => (
              <article key={item.id} className="glass-card p-6">
                <p className="font-display text-2xl font-bold text-[#184a53]">{item.title}</p>
                <p className="mt-3 text-sm leading-7 text-[#56747b]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
