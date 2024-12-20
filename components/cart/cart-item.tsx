import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/cart';
import { findServiceById } from '@/lib/services/utils';
import type { CartItem as CartItemType } from '@/lib/store/cart/types';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { removeFromCart } = useCart();
  const service = findServiceById(item.serviceId);

  if (!service) return null;

  return (
    <div className="bg-gray-900 rounded-lg p-6 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-cormorant">{service.name}</h3>
        <p className="text-gray-400">${service.price} × {item.quantity}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeFromCart(item.serviceId)}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}