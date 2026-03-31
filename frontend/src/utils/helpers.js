export const formatPrice = (price) =>
  new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(price);

export const formatDate = (date) =>
  new Intl.DateTimeFormat('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

export const truncateText = (text = '', length = 120) =>
  text.length > length ? `${text.substring(0, length)}...` : text;

export const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const calculateCartSubtotal = (items = []) =>
  items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

export const calculateShipping = (method, subtotal) => {
  if (method === 'retiro') return 0;
  if (subtotal >= 90000) return 0;
  return 5990;
};

export const calculateTotal = (subtotal = 0, shipping = 0) => subtotal + shipping;

export const groupBy = (items, getKey) =>
  items.reduce((accumulator, item) => {
    const key = getKey(item);
    if (!accumulator[key]) {
      accumulator[key] = [];
    }
    accumulator[key].push(item);
    return accumulator;
  }, {});
