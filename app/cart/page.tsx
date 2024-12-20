"use client";

import { useCart } from '@/lib/store/cart';
import { CartItem } from '@/components/cart/cart-item';
import { CartSummary } from '@/components/cart/cart-summary';

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="heading-lg mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <div className="grid gap-8">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem key={item.serviceId} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </div>
  );
}