import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import {
  getFeaturedProducts,
  getProductTypes,
  loadProducts,
} from '../../services/productRepository';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await loadProducts();
    } catch (error) {
      return rejectWithValue(error.message || 'No fue posible cargar el catalogo.');
    }
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  source: 'fallback',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload.products;
        state.source = action.payload.source;
        state.status = 'succeeded';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'No fue posible cargar el catalogo.';
      });
  },
});

export const selectProductsState = (state) => state.products;
export const selectProducts = (state) => state.products.items;
export const selectCatalogStatus = (state) => state.products.status;
export const selectCatalogError = (state) => state.products.error;
export const selectCatalogSource = (state) => state.products.source;
export const selectFeaturedProducts = createSelector(selectProducts, getFeaturedProducts);
export const selectProductTypes = createSelector(selectProducts, getProductTypes);
export const selectStarProduct = createSelector(selectProducts, (products) =>
  products.find((product) => product.isStarProduct)
);
export const selectProductBySlug = (state, slug) =>
  state.products.items.find((product) => product.slug === slug);

export default productsSlice.reducer;
