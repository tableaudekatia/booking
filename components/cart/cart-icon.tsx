"use client";

import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/store/cart';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function CartIcon() {
  const { items } = useCart();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="fixed top-6 right-6 z-50">
      <Link href="/cart">
        <Button
          size="icon"
          variant="outline"
          className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-gold-500/50 hover:border-gold-400"
        >
          <ShoppingBag className="h-5 w-5 text-gold-400" />
          <AnimatePresence>
            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gold-500 text-black text-sm flex items-center justify-center font-medium"
              >
                {itemCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </Link>
    </div>
  );
}