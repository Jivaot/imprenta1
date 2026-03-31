import { createSlice } from '@reduxjs/toolkit';
import { calculateCartSubtotal } from '../../utils/helpers';

const readInitialItems = () => {
  if (typeof window === 'undefined') return [];

  try {
    return JSON.parse(window.localStorage.getItem('cartItems') || '[]');
  } catch (error) {
    return [];
  }
};

const persistItems = (items) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('cartItems', JSON.stringify(items));
};

const buildLineKey = (item) =>
  [
    item.productSlug,
    item.selectedPrintArea || item.selectedColor || '',
    item.selectedPackaging || item.selectedSize || '',
    item.selectedMaterial || '',
    item.selectedFinish || '',
    item.selectedTechnique || '',
    item.customText || '',
    item.uploadedFileName || '',
  ]
    .join('|')
    .toLowerCase();

const initialState = {
  items: readInitialItems(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = {
        ...action.payload,
        lineKey: action.payload.lineKey || buildLineKey(action.payload),
      };
      const existingItem = state.items.find((entry) => entry.lineKey === item.lineKey);

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
        existingItem.notes = item.notes || existingItem.notes;
        existingItem.customText = item.customText || existingItem.customText;
      } else {
        state.items.push({
          ...item,
          quantity: item.quantity || 1,
        });
      }

      persistItems(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.lineKey !== action.payload);
      persistItems(state.items);
    },
    updateQuantity: (state, action) => {
      const { lineKey, quantity } = action.payload;
      const item = state.items.find((entry) => entry.lineKey === lineKey);

      if (!item) return;

      if (quantity <= 0) {
        state.items = state.items.filter((entry) => entry.lineKey !== lineKey);
      } else {
        item.quantity = quantity;
      }

      persistItems(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('cartItems');
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const selectCartItems = (state) => state.cart.items;
export const selectCartUnits = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartSubtotal = (state) => calculateCartSubtotal(state.cart.items);
export default cartSlice.reducer;
