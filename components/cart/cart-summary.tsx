import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/store/cart';

export function CartSummary() {
  const { total } = useCart();

  return (
    <div className="border-t border-gold-500/20 pt-6">
      <div className="flex justify-between items-center mb-6">
        <span className="text-xl">Total</span>
        <span className="text-2xl font-cormorant text-gold-400">
          ${total}
        </span>
      </div>
      
      <Button
        size="lg"
        className="w-full bg-gold-500 hover:bg-gold-600 text-black"
      >
        Proceed to Checkout
        <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );
}