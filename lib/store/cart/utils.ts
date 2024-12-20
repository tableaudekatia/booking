import { CartItem } from './types';
import { findServiceById } from '@/lib/services/utils';

export const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((acc, item) => {
    const service = findServiceById(item.serviceId);
    return acc + (service?.price ?? 0) * item.quantity;
  }, 0);
};