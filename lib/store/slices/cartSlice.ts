import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '@/lib/types/services';

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ serviceId: string; price: number }>) => {
      const existingItem = state.items.find(item => item.serviceId === action.payload.serviceId);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ serviceId: action.payload.serviceId, quantity: 1 });
      }
      
      state.total += action.payload.price;
    },
    removeFromCart: (state, action: PayloadAction<{ serviceId: string; price: number }>) => {
      const itemIndex = state.items.findIndex(item => item.serviceId === action.payload.serviceId);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        state.total -= action.payload.price * item.quantity;
        state.items.splice(itemIndex, 1);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ serviceId: string; quantity: number; price: number }>) => {
      const item = state.items.find(item => item.serviceId === action.payload.serviceId);
      if (item) {
        const priceDiff = (action.payload.quantity - item.quantity) * action.payload.price;
        item.quantity = action.payload.quantity;
        state.total += priceDiff;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;