import { enrichProduct, fallbackProducts } from '../data/shopData';
import { supabase } from '../lib/supabase';
import { loadMercadoLibreProducts } from './mercadoLibreCsv';

const PRODUCT_FIELDS =
  'id, slug, name, type, capacity_oz, price, min_qty, production_time, description, image_url, featured, active, sort_order, updated_at';

const sortProducts = (products) =>
  [...products].sort((left, right) => {
    if (left.sort_order === right.sort_order) {
      return new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime();
    }

    return left.sort_order - right.sort_order;
  });

export const loadProducts = async () => {
  const csvProducts = loadMercadoLibreProducts();

  if (csvProducts.length > 0) {
    return {
      products: sortProducts(csvProducts),
      source: 'csv',
    };
  }

  if (!supabase) {
    return {
      products: fallbackProducts,
      source: 'fallback',
    };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select(PRODUCT_FIELDS)
      .eq('active', true)
      .order('sort_order', { ascending: true })
      .order('updated_at', { ascending: false });

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      return {
        products: fallbackProducts,
        source: 'fallback',
      };
    }

    return {
      products: sortProducts(data.map((row, index) => enrichProduct(row, index))),
      source: 'supabase',
    };
  } catch (error) {
    return {
      products: fallbackProducts,
      source: 'fallback',
    };
  }
};

export const getProductTypes = (products = []) =>
  [...new Set(products.map((product) => product.type).filter(Boolean))];

export const getFeaturedProducts = (products = []) =>
  [...products]
    .filter((product) => product.featured)
    .sort((left, right) => {
      if (left.isStarProduct === right.isStarProduct) {
        return left.sort_order - right.sort_order;
      }

      return Number(right.isStarProduct) - Number(left.isStarProduct);
    })
    .slice(0, 6);

export const getRelatedProducts = (products = [], currentProduct, limit = 4) =>
  products
    .filter(
      (product) =>
        product.slug !== currentProduct.slug &&
        (product.type === currentProduct.type || product.featured)
    )
    .slice(0, limit);
