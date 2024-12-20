import { StateCreator } from 'zustand';
import { CartStore } from './types';
import { calculateTotal } from './utils';

export const createCartSlice: StateCreator<CartStore> = (set, get) => ({
  items: [],
  total: 0,
  addToCart: (serviceId) => {
    const currentItems = get().items;
    const existingItem = currentItems.find(item => item.serviceId === serviceId);
    
    if (existingItem) {
      const updatedItems = currentItems.map(item =>
        item.serviceId === serviceId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...currentItems, { serviceId, quantity: 1 }] });
    }
    
    get().updateTotal();
  },
  removeFromCart: (serviceId) => {
    set(state => ({
      items: state.items.filter(item => item.serviceId !== serviceId)
    }));
    get().updateTotal();
  },
  clearCart: () => set({ items: [], total: 0 }),
  updateTotal: () => {
    const newTotal = calculateTotal(get().items);
    set({ total: newTotal });
  }
});