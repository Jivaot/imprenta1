import mercadoLibreCsvRaw from '../../../mercadolibre.csv?raw';
import { enrichProduct } from '../data/shopData';
import { slugify } from '../utils/helpers';

const PRICE_HEADER = 'andes-money-amount__fraction';
const DISCOUNT_HEADER = 'andes-money-amount__discount';
const IMAGE_HEADER = 'poly-component__picture src';
const TITLE_HEADER = 'poly-component__title';
const LINK_HEADER = 'poly-component__title href';
const ORIGINAL_PRICE_HEADER = 'andes-money-amount__fraction 3';
const INSTALLMENTS_HEADER = 'poly-price__installments';
const STAR_PRODUCT_NAME = 'Taza Personalizada Ceramica Foto Imagen Logo Sublimado';
const STAR_PRODUCT_SLUG = slugify(STAR_PRODUCT_NAME);
const STAR_PRODUCT_IMAGE =
  'https://tazonespersonalizados.cl/web/wp-content/uploads/2022/01/Taz%C3%B3n-blanco-444ml-1.jpg';
const STAR_PRODUCT_LINK =
  'https://click1.mercadolibre.cl/mclics/clicks/external/MLC/count?a=KUkhtLLZw1MVlxijK4kyF9F3M%2F66ub6sW3JK0URTOu8NhblUnqSkVk6Fv8%2Fj%2BWcp94GBwZjSoAPtiC1lM9z%2B05OMIAhAWHxQpLH0nMNNk78a1vSqte%2Fiunbx%2FXESPvYLZ2NqJ6Lk3u9LpbrRmX0UFMMjUh4zulw1Vnz0ZNQt8LN8pLT%2FBxpibjFF1bcE%2BC1NHrYXrZPgJc4DjIQgd2PdWi2Zk37sN9tkjYtVQ%2BUNzcNQmnR%2Bk6GQoaeEtGKIhoPJ1P%2FusoHoDNjazF1orIsvkdlgQFHQou80LvEttYTbKyn45UgXwn5bDjSjBbKyw29FsJ8p9UyKotkSq2GVjSsx%2FrJQelGp3%2BDgSzjsiVJ%2BR95QXnzePACjlr4kglmYJF3w%2FG27JuYe8MixLXYZKsySDCtcuKCkPDVEOY%2FCW7Qc%2F4Ik94v0J%2BD4i6KMe0EUOJYnBSEXX528YZ5RehsTufkX%2Fy4rwqUhXwbUYOoT5%2FRF5%2FCMEGlnZFuTjmqMLfD90SUTXDNYgd2SPc7DHLQgroY2%2FIPlQ0YOp1geS7hLlQD9GydD8FpnyfIuhToJsrkUhz3QDuj4csLJaUo8ux2XA7eGiD0ErFxOLbJ6shZmdIqCvKz%2BrZnPCGW5ebBrfHRQDjnowwQZ5w4lOm9%2FhB0dgR0CluQw6W0O0OKAZQ4rfujS5Hoeh72dS4jaQR2Z%2F%2B1uINQ2uA%2FpO10RCltzZTv6Us45D0mq%2BiDAt9Vzjx%2BcbzDLYgLRUOtUtcn8jca3vLrdeowytDs895x7GPjZMly7%2BfuZ83J3Z0j%2F2AQOkVC5IEB0E%2FZnpukR8EAQ99ZJNNMGDXkFTSWLHuqGPbBRLmhdVZjrUlIi6CPjBAR4zxCGFJ3AmldOOU5liFyKFhk%2FmpvBtpvNFFfPvBwPxYjGPLr97hwtlcbeg0PvwYqfPUSNQvl7HCe5AWRBUMMiM0UPXG2mOGzA%2F6d70%2B31kSMz1EoyuZQ7&catalog_product_id=MLCU11196405&zip_code=CL-RM_TUxDQ1NBTjk4M2M';
const STAR_PRODUCT_PRICE = 2894;

const repairText = (value = '') => {
  if (!value || !/[ÃÂ]/.test(value)) {
    return value;
  }

  try {
    return new TextDecoder('utf-8').decode(
      Uint8Array.from(value, (character) => character.charCodeAt(0))
    );
  } catch (error) {
    return value;
  }
};

const parseCsv = (content) => {
  const rows = [];
  let current = '';
  let row = [];
  let insideQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index];
    const nextCharacter = content[index + 1];

    if (character === '"') {
      if (insideQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
      } else {
        insideQuotes = !insideQuotes;
      }
      continue;
    }

    if (character === ',' && !insideQuotes) {
      row.push(current);
      current = '';
      continue;
    }

    if ((character === '\n' || character === '\r') && !insideQuotes) {
      if (character === '\r' && nextCharacter === '\n') {
        index += 1;
      }

      row.push(current);
      if (row.some((field) => field !== '')) {
        rows.push(row);
      }
      row = [];
      current = '';
      continue;
    }

    current += character;
  }

  if (current || row.length) {
    row.push(current);
    rows.push(row);
  }

  return rows;
};

const parsePrice = (value = '') => {
  const numeric = value.replace(/[^\d]/g, '');
  return numeric ? Number(numeric) : 0;
};

const inferType = (name) => {
  const normalized = repairText(name).toLowerCase();

  if (normalized.includes('termic')) return 'Termica';
  if (normalized.includes('magica') || normalized.includes('magica')) return 'Magica';
  if (normalized.includes('premium')) return 'Premium';
  if (normalized.includes('pack') || normalized.includes('set') || normalized.includes('regalo')) {
    return 'Regalo';
  }
  if (normalized.includes('tazon') || normalized.includes('tazón')) return 'Latte';
  return 'Clasica';
};

const inferCapacity = (type, name) => {
  const normalized = repairText(name).toLowerCase();
  if (type === 'Termica') return 15;
  if (type === 'Latte' || normalized.includes('tazon') || normalized.includes('tazón')) return 15;
  return 11;
};

const inferProductionTime = (type) => {
  switch (type) {
    case 'Termica':
      return '3 a 6 dias habiles';
    case 'Premium':
    case 'Magica':
      return '3 a 5 dias habiles';
    default:
      return '2 a 4 dias habiles';
  }
};

const inferMinimumQty = (type) => {
  switch (type) {
    case 'Premium':
    case 'Termica':
      return 6;
    default:
      return 1;
  }
};

const buildDescription = (name, installments, discount) => {
  const cleanedName = repairText(name);
  return cleanedName;
};

export const loadMercadoLibreProducts = () => {
  const rows = parseCsv(mercadoLibreCsvRaw.trim());

  if (rows.length <= 1) {
    return [];
  }

  const [headers, ...dataRows] = rows;

  return dataRows
    .map((row, index) => {
      const record = headers.reduce((accumulator, header, headerIndex) => {
        accumulator[header] = row[headerIndex] || '';
        return accumulator;
      }, {});

      const name = repairText(record[TITLE_HEADER] || '').trim();
      if (!name) {
        return null;
      }

      const productSlug = slugify(name);
      const isStarProduct = productSlug === STAR_PRODUCT_SLUG;
      const type = isStarProduct ? 'Personalizable' : inferType(name);
      const price = isStarProduct ? STAR_PRODUCT_PRICE : parsePrice(record[PRICE_HEADER]);
      const compareAtPrice = parsePrice(record[ORIGINAL_PRICE_HEADER]);
      const installments = repairText(record[INSTALLMENTS_HEADER] || '').trim();
      const discount = repairText(record[DISCOUNT_HEADER] || '').trim();

      return enrichProduct(
        {
          id: `ml-${index + 1}`,
          slug: productSlug,
          name,
          type,
          capacity_oz: inferCapacity(type, name),
          price,
          min_qty: isStarProduct ? 1 : inferMinimumQty(type),
          production_time: inferProductionTime(type),
          description: isStarProduct
            ? 'Personaliza tu taza con logo, foto o frase y revisa una vista 3D antes de cotizar.'
            : buildDescription(name, installments, discount),
          image_url: isStarProduct ? STAR_PRODUCT_IMAGE : record[IMAGE_HEADER] || '',
          featured: isStarProduct || index < 6,
          isStarProduct,
          isCustomizable: isStarProduct,
          active: true,
          sort_order: isStarProduct ? 0 : index + 1,
          updated_at: new Date().toISOString(),
          external_url: isStarProduct ? STAR_PRODUCT_LINK : record[LINK_HEADER] || '',
          installments,
          compareAtPrice: compareAtPrice || undefined,
          discountLabel: isStarProduct ? 'Producto estrella' : discount || undefined,
        },
        index
      );
    })
    .filter(Boolean);
};
