"use client";

import { useRouter } from 'next/navigation';
import { Home, ArrowLeft, User, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';

export function NavButtons() {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Back button - top left */}
      {/* <div className="fixed top-6 left-6 z-50">
        <Button
          size="icon"
          variant="outline"
          onClick={() => router.back()}
          className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-gold-500/50 hover:border-gold-400"
        >
          <ArrowLeft className="h-5 w-5 text-gold-400" />
        </Button>
      </div> */}

      {/* Navigation buttons - top right */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <Link href="/">
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-gold-500/50 hover:border-gold-400"
          >
            <Home className="h-5 w-5 text-gold-400" />
          </Button>
        </Link>

        {/* <Link href="/cart">
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-gold-500/50 hover:border-gold-400"
          >
            <ShoppingBag className="h-5 w-5 text-gold-400" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gold-500 text-black text-sm flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Button>
        </Link>

        <Link href={user ? "/profile" : "/auth/signin"}>
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full bg-black/80 backdrop-blur-sm border-gold-500/50 hover:border-gold-400"
          >
            <User className="h-5 w-5 text-gold-400" />
          </Button>
        </Link> */}
      </div>
    </>
  );
}