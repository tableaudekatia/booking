"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartState, CartItem } from '@/lib/types/services';
import { serviceCategories } from '@/lib/data/services';

interface CartStore extends CartState {
  addToCart: (serviceId: string) => void;
  removeFromCart: (serviceId: string) => void;
  clearCart: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
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
        
        // Update total
        const newTotal = get().items.reduce((acc, item) => {
          const service = serviceCategories
            .flatMap(cat => cat.services)
            .find(s => s.id === item.serviceId);
          return acc + (service?.price ?? 0) * item.quantity;
        }, 0);
        
        set({ total: newTotal });
      },
      removeFromCart: (serviceId) => {
        set(state => ({
          items: state.items.filter(item => item.serviceId !== serviceId)
        }));
      },
      clearCart: () => set({ items: [], total: 0 }),
    }),
    {
      name: 'cart-storage',
    }
  )
);