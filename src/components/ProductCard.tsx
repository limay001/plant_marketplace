import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { useApp } from '@/context/AppContext';
import { formatINR, calculateDiscount } from '@/lib/format';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({ product, index = 0, className }: ProductCardProps) {
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const isWishlisted = wishlist.includes(product.id);
  const discount = calculateDiscount(product.price, product.mrp);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.4) }}
      className={cn('group relative', className)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-card border border-border/50 shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {discount > 0 && (
              <span className="absolute top-2 left-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground shadow">
                {discount}% OFF
              </span>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
                toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
              }}
              className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart
                className={cn(
                  'h-4 w-4 transition-colors',
                  isWishlisted ? 'fill-destructive text-destructive' : 'text-muted-foreground'
                )}
              />
            </button>
          </div>
          <div className="p-3">
            <p className="text-xs text-muted-foreground">{product.category}</p>
            <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold leading-tight">
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-1">
              <span className="flex items-center gap-0.5 rounded bg-primary/10 px-1.5 py-0.5 text-xs font-bold text-primary">
                {product.rating} ★
              </span>
              <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-base font-bold">{formatINR(product.price)}</span>
              {product.mrp > product.price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatINR(product.mrp)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button
        onClick={() => {
          addToCart({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1,
            size: product.size,
          });
          toast.success(`${product.name} added to cart`);
        }}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Add to cart"
      >
        <ShoppingCart className="h-4 w-4" />
      </button>
    </motion.div>
  );
}
