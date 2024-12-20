import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore } from './types';
import { createCartSlice } from './actions';

export const useCart = create<CartStore>()(
  persist(
    createCartSlice,
    {
      name: 'cart-storage',
    }
  )
);