import { siteSettings } from '../data/shopData';
import { formatPrice } from './helpers';

const sanitizePhone = (value) => value.replace(/\D/g, '');

export const buildWhatsAppLink = (message) => {
  const phone = sanitizePhone(siteSettings.whatsappNumber);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};

export const buildProductMessage = (product, extra = '') => {
  const message = [
    `Hola ${siteSettings.brandName}, quiero pedir informacion sobre "${product.name}".`,
    product.type ? `Tipo: ${product.type}.` : '',
    product.capacity_oz ? `Capacidad: ${product.capacity_oz} oz.` : '',
    product.price ? `Precio base: ${formatPrice(product.price)}.` : '',
    extra,
  ]
    .filter(Boolean)
    .join(' ');

  return buildWhatsAppLink(message);
};

export const buildQuoteMessage = (payload) => {
  const message = [
    `Hola ${siteSettings.brandName}, quiero cotizar una taza personalizada.`,
    payload.clientName ? `Nombre: ${payload.clientName}.` : '',
    payload.company ? `Empresa: ${payload.company}.` : '',
    payload.email ? `Email: ${payload.email}.` : '',
    payload.phone ? `Telefono: ${payload.phone}.` : '',
    payload.typeOfWork ? `Solicitud: ${payload.typeOfWork}.` : '',
    payload.productName ? `Modelo: ${payload.productName}.` : '',
    payload.quantity ? `Cantidad: ${payload.quantity}.` : '',
    payload.printArea ? `Impresion: ${payload.printArea}.` : '',
    payload.finish ? `Acabado: ${payload.finish}.` : '',
    payload.deliveryMethod ? `Entrega: ${payload.deliveryMethod}.` : '',
    payload.city ? `Ciudad o comuna: ${payload.city}.` : '',
    payload.neededDate ? `Fecha estimada: ${payload.neededDate}.` : '',
    payload.description ? `Detalle: ${payload.description}.` : '',
    payload.fileName ? `Archivo: ${payload.fileName}.` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return buildWhatsAppLink(message);
};
