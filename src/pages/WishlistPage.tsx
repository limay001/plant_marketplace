import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { products } from '@/data/seed';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export function WishlistPage() {
  const { wishlist } = useApp();
  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  if (wishlistProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Your wishlist is empty</h2>
        <p className="mt-1 text-sm text-muted-foreground">Tap the heart icon on any plant to save it here.</p>
        <Button asChild className="mt-4"><Link to="/listing">Discover Plants</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl mb-6">
        My Wishlist <span className="text-muted-foreground font-normal">({wishlistProducts.length})</span>
      </h1>
      <motion.div layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {wishlistProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </motion.div>
    </div>
  );
}
