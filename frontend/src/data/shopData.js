import { slugify, truncateText } from '../utils/helpers';

const toDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

const createMugArtwork = (title, tag, palette) => {
  const [surface, highlight, accent] = palette;
  const safeTitle = title.replace(/&/g, '&amp;');
  const safeTag = tag.replace(/&/g, '&amp;');

  return toDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${safeTitle}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${surface}" />
          <stop offset="100%" stop-color="${highlight}" />
        </linearGradient>
        <linearGradient id="mug" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f4f6fb" />
        </linearGradient>
      </defs>

      <rect width="1200" height="900" rx="48" fill="url(#bg)" />
      <circle cx="210" cy="180" r="160" fill="${accent}" opacity="0.18" />
      <circle cx="980" cy="720" r="180" fill="#ffffff" opacity="0.18" />
      <rect x="70" y="70" width="1060" height="760" rx="42" fill="rgba(255,255,255,0.18)" />

      <text x="96" y="150" fill="#10344a" font-size="28" font-family="Arial, Helvetica, sans-serif" font-weight="700">${safeTag}</text>
      <text x="96" y="228" fill="#082133" font-size="72" font-family="Arial, Helvetica, sans-serif" font-weight="800">${safeTitle}</text>
      <text x="96" y="290" fill="#335068" font-size="30" font-family="Arial, Helvetica, sans-serif">Tazas personalizadas para pedidos con imagen, logo o frase</text>

      <ellipse cx="665" cy="640" rx="180" ry="34" fill="#0f172a" opacity="0.12" />
      <ellipse cx="664" cy="350" rx="160" ry="28" fill="#dbe6f0" />
      <path d="M520 350h290v265c0 34-28 62-62 62H582c-34 0-62-28-62-62V350z" fill="url(#mug)" stroke="#d2dbe6" stroke-width="10" />
      <path d="M806 392c58 0 105 47 105 105s-47 105-105 105h-20v-58h20c26 0 47-21 47-47s-21-47-47-47h-20v-58h20z" fill="none" stroke="#d2dbe6" stroke-width="18" />
      <rect x="556" y="424" width="220" height="122" rx="28" fill="${accent}" opacity="0.16" />
      <text x="576" y="500" fill="#10344a" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="700">Tu diseno aqui</text>
      <rect x="520" y="712" width="220" height="52" rx="26" fill="rgba(255,255,255,0.82)" />
      <text x="564" y="746" fill="#10344a" font-size="26" font-family="Arial, Helvetica, sans-serif" font-weight="700">Desde precio base</text>
    </svg>
  `);
};

export const siteSettings = {
  brandName: 'Tazas Matriz',
  shortName: 'TM',
  tagline: 'Tazas personalizadas para marcas, regalos y pedidos especiales',
  whatsappNumber: '56968461122',
  phoneDisplay: '+56 9 6846 1122',
  email: 'hola@tazasmatriz.cl',
  address: 'Santiago, Chile',
  hoursWeek: 'Lunes a viernes de 09:00 a 19:00',
  hoursSaturday: 'Sabado de 10:00 a 14:00',
  shippingMessage: 'Retiro en taller y despacho a todo Chile',
  dispatchNote: 'Produccion rapida segun modelo, volumen y personalizacion',
};

export const mugTypeMeta = {
  Personalizable: {
    badge: 'Producto estrella',
    heroNote: 'Nuestro modelo principal para pedidos con foto, logo, frase o arte personalizado.',
    printAreas: ['Cara frontal', 'Doble cara', 'Envolvente 360'],
    finishOptions: ['Sublimacion full color', 'Logo mas frase', 'Imagen completa'],
    packagingOptions: ['Caja individual', 'Caja premium', 'Sin empaque'],
    useCases: ['Empresas', 'Regalos', 'Eventos', 'Emprendimientos'],
    palette: ['#dff2ff', '#fff5e9', '#38bdf8'],
  },
  Clasica: {
    badge: 'Top ventas',
    heroNote: 'Ideal para regalos, ventas al detalle y acciones de marca.',
    printAreas: ['Cara frontal', 'Doble cara', 'Envolvente 360'],
    finishOptions: ['Sublimacion full color', 'Logo simple', 'Nombre por unidad'],
    packagingOptions: ['Caja individual', 'Bolsa de regalo', 'Sin empaque'],
    useCases: ['Regalos de empresa', 'Recuerdos', 'Venta online'],
    palette: ['#e3f2ff', '#fff6ea', '#ff9d5c'],
  },
  Magica: {
    badge: 'Efecto sorpresa',
    heroNote: 'Perfecta para lanzamientos, sorpresas y regalos memorables.',
    printAreas: ['Cara frontal', 'Doble cara'],
    finishOptions: ['Sublimacion completa', 'Foto o collage', 'Nombre mas imagen'],
    packagingOptions: ['Caja premium', 'Caja individual'],
    useCases: ['Regalos especiales', 'Campanas', 'Aniversarios'],
    palette: ['#0f172a', '#2d3748', '#f59e0b'],
  },
  Premium: {
    badge: 'Acabado premium',
    heroNote: 'Un formato mas cuidado para regalos corporativos y ediciones especiales.',
    printAreas: ['Cara frontal', 'Doble cara', 'Envolvente parcial'],
    finishOptions: ['Sublimacion full color', 'Acabado perlado', 'Caja de presentacion'],
    packagingOptions: ['Caja premium', 'Caja con ventana', 'Bolsa de regalo'],
    useCases: ['Regalos corporativos', 'Tienda premium', 'Eventos'],
    palette: ['#f4f5ff', '#fef7f0', '#7c89ff'],
  },
  Latte: {
    badge: 'Mayor capacidad',
    heroNote: 'Pensada para cafeterias, oficinas y pedidos que buscan mas presencia.',
    printAreas: ['Cara frontal', 'Doble cara'],
    finishOptions: ['Sublimacion completa', 'Logo con nombre', 'Diseno vertical'],
    packagingOptions: ['Caja individual', 'Caja premium'],
    useCases: ['Cafeterias', 'Oficinas', 'Regalos de equipo'],
    palette: ['#fdf1dc', '#fff8f3', '#f59e0b'],
  },
  Enamel: {
    badge: 'Estilo outdoor',
    heroNote: 'Muy pedida para marcas con look artesanal, kits y regalos tematicos.',
    printAreas: ['Cara frontal', 'Doble cara'],
    finishOptions: ['UV DTF', 'Logo simple', 'Frase corta'],
    packagingOptions: ['Caja kraft', 'Caja individual'],
    useCases: ['Merch de marca', 'Regalos outdoor', 'Kits creativos'],
    palette: ['#edf7f3', '#f8fffb', '#22c55e'],
  },
  Termica: {
    badge: 'Formato ejecutivo',
    heroNote: 'Una opcion funcional para pedidos corporativos y regalos reutilizables.',
    printAreas: ['Cara frontal', 'Area central'],
    finishOptions: ['Grabado laser', 'Impresion UV', 'Logo de marca'],
    packagingOptions: ['Caja premium', 'Caja individual'],
    useCases: ['Equipos internos', 'Eventos', 'Regalos corporativos'],
    palette: ['#eef2f7', '#f9fbfd', '#64748b'],
  },
  Regalo: {
    badge: 'Lista para regalar',
    heroNote: 'Pensada para pedidos de detalle, fechas especiales y sets con valor percibido.',
    printAreas: ['Cara frontal', 'Doble cara'],
    finishOptions: ['Imagen mas nombre', 'Frase corta', 'Set con accesorio'],
    packagingOptions: ['Caja con cucharita', 'Caja premium', 'Bolsa de regalo'],
    useCases: ['Cumpleanos', 'Celebraciones', 'Ventas estacionales'],
    palette: ['#fff1f7', '#fff9fc', '#ec4899'],
  },
};

const fallbackRows = [
  {
    id: 'mug-01',
    name: 'Taza clasica blanca 11 oz',
    type: 'Clasica',
    capacity_oz: 11,
    price: 3490,
    min_qty: 6,
    production_time: '2 a 4 dias habiles',
    description:
      'La opcion mas versatil para regalos, branding y pedidos recurrentes. Funciona muy bien con logos, ilustraciones y frases personalizadas.',
    featured: true,
    active: true,
    sort_order: 1,
    updated_at: '2026-03-30T10:00:00.000Z',
  },
  {
    id: 'mug-02',
    name: 'Taza clasica full color 11 oz',
    type: 'Clasica',
    capacity_oz: 11,
    price: 3990,
    min_qty: 12,
    production_time: '2 a 4 dias habiles',
    description:
      'Recomendada para pedidos con imagen completa, disenos coloridos y produccion para eventos, equipos o emprendimientos.',
    featured: true,
    active: true,
    sort_order: 2,
    updated_at: '2026-03-30T10:05:00.000Z',
  },
  {
    id: 'mug-03',
    name: 'Taza magica negra 11 oz',
    type: 'Magica',
    capacity_oz: 11,
    price: 5790,
    min_qty: 6,
    production_time: '3 a 5 dias habiles',
    description:
      'Cambia de color con el calor y revela el diseno al servir la bebida. Muy pedida para regalos con efecto sorpresa.',
    featured: true,
    active: true,
    sort_order: 3,
    updated_at: '2026-03-30T10:10:00.000Z',
  },
  {
    id: 'mug-04',
    name: 'Taza premium perlada 11 oz',
    type: 'Premium',
    capacity_oz: 11,
    price: 6490,
    min_qty: 12,
    production_time: '3 a 5 dias habiles',
    description:
      'Acabado brillante con presentacion mas cuidada para regalos corporativos, kits premium y fechas especiales.',
    featured: true,
    active: true,
    sort_order: 4,
    updated_at: '2026-03-30T10:15:00.000Z',
  },
  {
    id: 'mug-05',
    name: 'Taza interior color 11 oz',
    type: 'Clasica',
    capacity_oz: 11,
    price: 4290,
    min_qty: 12,
    production_time: '2 a 4 dias habiles',
    description:
      'Una base comercial con detalle de color interior para pedidos de marca, equipos y regalos con un look mas vivo.',
    featured: false,
    active: true,
    sort_order: 5,
    updated_at: '2026-03-30T10:20:00.000Z',
  },
  {
    id: 'mug-06',
    name: 'Taza latte 17 oz personalizada',
    type: 'Latte',
    capacity_oz: 17,
    price: 6890,
    min_qty: 6,
    production_time: '3 a 5 dias habiles',
    description:
      'Formato alto y amplio para cafeterias, oficinas y regalos que buscan mayor capacidad y presencia visual.',
    featured: true,
    active: true,
    sort_order: 6,
    updated_at: '2026-03-30T10:25:00.000Z',
  },
  {
    id: 'mug-07',
    name: 'Taza enamel metalica 12 oz',
    type: 'Enamel',
    capacity_oz: 12,
    price: 7490,
    min_qty: 10,
    production_time: '4 a 6 dias habiles',
    description:
      'Modelo liviano y con estilo outdoor para marcas creativas, cajas de regalo y kits con personalidad.',
    featured: false,
    active: true,
    sort_order: 7,
    updated_at: '2026-03-30T10:30:00.000Z',
  },
  {
    id: 'mug-08',
    name: 'Mug termico acero 15 oz',
    type: 'Termica',
    capacity_oz: 15,
    price: 10990,
    min_qty: 10,
    production_time: '4 a 6 dias habiles',
    description:
      'Una opcion funcional para pedidos corporativos, regalos de equipo y acciones de marca con uso diario.',
    featured: true,
    active: true,
    sort_order: 8,
    updated_at: '2026-03-30T10:35:00.000Z',
  },
  {
    id: 'mug-09',
    name: 'Taza con cucharita personalizada',
    type: 'Regalo',
    capacity_oz: 11,
    price: 6290,
    min_qty: 6,
    production_time: '3 a 5 dias habiles',
    description:
      'Muy pedida para fechas especiales, cumpleanos y regalos listos para entregar con presentacion mas completa.',
    featured: false,
    active: true,
    sort_order: 9,
    updated_at: '2026-03-30T10:40:00.000Z',
  },
  {
    id: 'mug-10',
    name: 'Set de taza regalo personalizada',
    type: 'Regalo',
    capacity_oz: 11,
    price: 7990,
    min_qty: 6,
    production_time: '4 a 6 dias habiles',
    description:
      'Incluye presentacion lista para regalar y funciona muy bien para campanas, celebraciones y tiendas de regalos.',
    featured: true,
    active: true,
    sort_order: 10,
    updated_at: '2026-03-30T10:45:00.000Z',
  },
];

const buildShortDescription = (description, type) =>
  truncateText(description || mugTypeMeta[type]?.heroNote || 'Taza personalizada para pedidos especiales.', 110);

export const enrichProduct = (row, index = 0) => {
  const type = row.type || 'Clasica';
  const typeMeta = mugTypeMeta[type] || mugTypeMeta.Clasica;
  const name = row.name || `Taza personalizada ${index + 1}`;
  const slug = row.slug || slugify(name);
  const resolvedDescription =
    row.description || 'Taza personalizada lista para branding, regalos y pedidos especiales.';
  const image =
    row.image_url ||
    createMugArtwork(name, type, typeMeta.palette);

  return {
    ...row,
    id: row.id || slug,
    slug,
    name,
    type,
    capacity_oz: Number(row.capacity_oz || 11),
    price: Number(row.price || 0),
    min_qty: Number(row.min_qty || 1),
    production_time: row.production_time || '2 a 4 dias habiles',
    description: resolvedDescription,
    image_url: image,
    featured: Boolean(row.featured),
    isStarProduct: Boolean(row.isStarProduct),
    isCustomizable: Boolean(row.isCustomizable),
    active: row.active !== false,
    sort_order: Number(row.sort_order || index + 1),
    updated_at: row.updated_at || new Date().toISOString(),
    shortDescription:
      resolvedDescription.trim().toLowerCase() === name.trim().toLowerCase()
        ? ''
        : buildShortDescription(resolvedDescription, type),
    badge: typeMeta.badge,
    heroNote: typeMeta.heroNote,
    printAreas: typeMeta.printAreas,
    finishOptions: typeMeta.finishOptions,
    packagingOptions: typeMeta.packagingOptions,
    useCases: typeMeta.useCases,
    priceNote: 'Precio base por unidad',
    capacityLabel: `${Number(row.capacity_oz || 11)} oz`,
    minQtyLabel:
      Number(row.min_qty || 1) === 1
        ? 'Desde 1 unidad'
        : `Pedido minimo ${Number(row.min_qty || 1)} unidades`,
  };
};

export const fallbackProducts = fallbackRows.map((row, index) => enrichProduct(row, index));

export const heroHighlights = [
  {
    id: 'hero-1',
    value: 'Modelos variados',
  },
  {
    id: 'hero-2',
    value: 'Precios base claros',
  },
  {
    id: 'hero-3',
    value: 'Atencion rapida',
  },
];

export const starProductChecklist = [
  'Sube tu logo o imagen',
  'Escribe tu frase',
  'Ajusta la vista previa',
];

export const mugCatalogBenefits = [
  {
    id: 'benefit-1',
    title: 'Catalogo simple y ordenado',
    description: 'Todo gira en torno a modelos de taza para que elegir sea rapido y claro.',
  },
  {
    id: 'benefit-2',
    title: 'Cotizacion agil',
    description: 'Puedes revisar precio base, elegir modelo y pedir atencion inmediata por WhatsApp.',
  },
  {
    id: 'benefit-3',
    title: 'Ideal para marcas y regalos',
    description: 'Modelos pensados para empresas, eventos, emprendimientos y pedidos especiales.',
  },
];

export const purchaseSteps = [
  {
    id: 'step-1',
    title: 'Elige tu modelo',
    description: 'Compara tipos de taza, capacidad, cantidad minima y precio base.',
  },
  {
    id: 'step-2',
    title: 'Comparte tu idea',
    description: 'Indica logo, frase, fecha y cualquier detalle del pedido.',
  },
  {
    id: 'step-3',
    title: 'Cotiza y confirma',
    description: 'Recibe atencion rapida para cerrar tu pedido con retiro o despacho.',
  },
];

export const personalizationIdeas = [
  'Logo para empresas o equipos',
  'Frases para regalos y fechas especiales',
  'Nombres por unidad para eventos o ventas',
  'Sets con empaque para entregar listo',
];

export const faqItems = [
  {
    id: 'faq-1',
    question: 'Se puede pedir una sola taza?',
    answer: 'Depende del modelo. En la ficha de cada producto puedes ver la cantidad minima sugerida.',
  },
  {
    id: 'faq-2',
    question: 'Puedo enviar mi logo o diseno?',
    answer: 'Si. Puedes adjuntar una referencia al cotizar o enviarla directamente por WhatsApp.',
  },
  {
    id: 'faq-3',
    question: 'Los precios publicados son finales?',
    answer: 'Mostramos precios base. El valor final puede variar segun cantidad, tecnica y presentacion.',
  },
  {
    id: 'faq-4',
    question: 'Hacen despacho?',
    answer: 'Si. Tenemos retiro coordinado y despacho a distintas comunas y regiones.',
  },
];

export const contactChannels = [
  {
    id: 'contact-1',
    title: 'WhatsApp',
    detail: siteSettings.phoneDisplay,
    helper: 'Para pedir una cotizacion rapida o resolver dudas sobre un modelo.',
  },
  {
    id: 'contact-2',
    title: 'Correo',
    detail: siteSettings.email,
    helper: 'Ideal para enviar logos, referencias y detalles de pedidos especiales.',
  },
  {
    id: 'contact-3',
    title: 'Retiro y despacho',
    detail: siteSettings.shippingMessage,
    helper: 'Coordinamos entrega segun cantidad, destino y fecha requerida.',
  },
];

export const checkoutAdvantages = [
  'Resumen de compra claro antes de confirmar el pedido',
  'Opcion de retiro coordinado o despacho',
  'Datos listos para seguimiento comercial del pedido',
];

export const quoteWorkTypes = [
  'Taza clasica personalizada',
  'Taza magica personalizada',
  'Taza premium o regalo',
  'Pedido para empresa o evento',
  'Pedido especial con varias unidades',
];
