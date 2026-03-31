import React from 'react';
import { Link } from 'react-router-dom';
import SectionHeading from '../components/SectionHeading';
import { contactChannels } from '../data/shopData';
import { buildWhatsAppLink } from '../utils/whatsapp';

export default function ContactPage() {
  const [message, setMessage] = React.useState(
    'Hola, quiero ayuda para elegir una taza personalizada y revisar opciones de precio.'
  );

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeading
          eyebrow="Contacto"
          title="Hablemos de tu pedido de tazas personalizadas."
          description="Si necesitas ayuda para elegir un modelo o confirmar una cotizacion, te atendemos por WhatsApp o correo."
        />

        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="brand-dark-panel space-y-5 rounded-[34px] p-6 text-white shadow-[0_30px_100px_rgba(15,23,42,0.24)]">
            {contactChannels.map((channel) => (
              <div key={channel.id} className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-[#bfeaff]">{channel.title}</p>
                <p className="mt-2 text-lg font-semibold">{channel.detail}</p>
                <p className="mt-2 text-sm leading-7 text-slate-300">{channel.helper}</p>
              </div>
            ))}
          </div>

          <div className="glass-card p-6">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Mensaje rapido
              <textarea
                rows={6}
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                className="w-full rounded-[24px] border border-slate-300 px-4 py-3 outline-none transition focus:border-[#3f97d4]"
              />
            </label>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a
                href={buildWhatsAppLink(message)}
                target="_blank"
                rel="noreferrer"
                className="brand-button-accent inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold text-white"
              >
                Abrir WhatsApp
              </a>
              <Link
                to="/cotizar"
                className="brand-button-outline inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold text-[#234767]"
              >
                Ir a cotizar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
