const isBrowser = typeof window !== 'undefined';

const readCollection = (key) => {
  if (!isBrowser) return [];

  try {
    return JSON.parse(window.localStorage.getItem(key) || '[]');
  } catch (error) {
    return [];
  }
};

const writeCollection = (key, value) => {
  if (!isBrowser) return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const saveQuoteRequest = (quoteRequest) => {
  const current = readCollection('imprenta_quote_requests');
  const entry = {
    id: `quote-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'pendiente',
    ...quoteRequest,
  };

  writeCollection('imprenta_quote_requests', [entry, ...current]);
  return entry;
};

export const saveOrder = (order) => {
  const current = readCollection('imprenta_orders');
  const entry = {
    id: `ord-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'recibido',
    ...order,
  };

  writeCollection('imprenta_orders', [entry, ...current]);
  writeCollection('imprenta_last_order', entry);
  return entry;
};

export const getLastOrder = () => {
  if (!isBrowser) return null;

  try {
    return JSON.parse(window.localStorage.getItem('imprenta_last_order') || 'null');
  } catch (error) {
    return null;
  }
};
