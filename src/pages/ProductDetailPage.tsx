import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Zap, Star, Truck, Shield, Check, Droplets, Sun, Wind, MapPin } from 'lucide-react';
import { getProductById, getReviewsByProductId, products } from '@/data/seed';
import { useApp } from '@/context/AppContext';
import { formatINR, calculateDiscount } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductCard } from '@/components/ProductCard';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const { addToCart, toggleWishlist, wishlist } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable'>('idle');
  const [activeTab, setActiveTab] = useState<'description' | 'reviews' | 'care'>('description');

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl">🌱</span>
        <h2 className="mt-4 text-xl font-semibold">Plant not found</h2>
        <Button asChild className="mt-4"><Link to="/listing">Browse plants</Link></Button>
      </div>
    );
  }

  const reviews = getReviewsByProductId(product.id);
  const discount = calculateDiscount(product.price, product.mrp);
  const isWishlisted = wishlist.includes(product.id);
  const similarProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 6);

  const handlePincodeCheck = () => {
    if (!/^\d{6}$/.test(pincode)) {
      toast.error('Please enter a valid 6-digit pincode');
      return;
    }
    setPincodeStatus('checking');
    setTimeout(() => {
      setPincodeStatus(Math.random() > 0.1 ? 'available' : 'unavailable');
    }, 1200);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.size,
    });
    toast.success(`${product.name} added to cart`);
  };

  const handleBuyNow = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: product.size,
    });
    navigate('/cart');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/listing?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square overflow-hidden rounded-3xl border border-border/50 bg-card"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover cursor-zoom-in"
              onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
            />
            {discount > 0 && (
              <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground text-sm">
                {discount}% OFF
              </Badge>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm shadow-md transition-all hover:scale-110"
              aria-label="Toggle wishlist"
            >
              <Heart className={cn('h-5 w-5', isWishlisted && 'fill-destructive text-destructive')} />
            </button>
          </motion.div>
          <div className="mt-3 flex gap-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  'h-16 w-16 overflow-hidden rounded-xl border-2 transition-all',
                  selectedImage === i ? 'border-primary shadow-md' : 'border-border opacity-60 hover:opacity-100'
                )}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <p className="text-sm text-muted-foreground">{product.category}</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">{product.name}</h1>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-primary">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            {product.petSafe && <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Pet Safe</Badge>}
            {product.beginner && <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">Beginner Friendly</Badge>}
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatINR(product.price)}</span>
            {product.mrp > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">{formatINR(product.mrp)}</span>
                <span className="text-sm font-semibold text-secondary">{discount}% off</span>
              </>
            )}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Inclusive of all taxes</p>

          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

          {/* Pincode check */}
          <div className="mt-5 rounded-2xl border border-border/50 bg-card p-4">
            <div className="flex items-center gap-2 text-sm font-semibold mb-2">
              <MapPin className="h-4 w-4 text-primary" />
              Check delivery
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit pincode"
                className="flex-1 rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary"
                maxLength={6}
              />
              <Button onClick={handlePincodeCheck} disabled={pincodeStatus === 'checking'} size="sm">
                {pincodeStatus === 'checking' ? 'Checking...' : 'Check'}
              </Button>
            </div>
            <AnimatePresence>
              {pincodeStatus === 'available' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-1.5 text-sm text-primary">
                  <Check className="h-4 w-4" />
                  Delivery available! Order now for delivery in 5–7 days.
                </motion.div>
              )}
              {pincodeStatus === 'unavailable' && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-destructive">
                  Sorry, delivery is not available at this pincode.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-5 flex gap-3">
            <Button onClick={handleAddToCart} size="lg" className="flex-1" variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} size="lg" className="flex-1">
              <Zap className="h-4 w-4 mr-2" />
              Buy Now
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-border/50 bg-card p-3">
              <Truck className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs font-medium">Free delivery</p>
              <p className="text-[10px] text-muted-foreground">over ₹499</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-3">
              <Shield className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs font-medium">7-day guarantee</p>
              <p className="text-[10px] text-muted-foreground">healthy plant</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-3">
              <Check className="mx-auto h-5 w-5 text-primary" />
              <p className="mt-1 text-xs font-medium">{product.stock} in stock</p>
              <p className="text-[10px] text-muted-foreground">ready to ship</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-10">
        <div className="flex gap-1 border-b border-border">
          {(['description', 'care', 'reviews'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-3 text-sm font-semibold capitalize transition-colors border-b-2 -mb-px',
                activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {tab === 'reviews' ? `Reviews (${reviews.length})` : tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'description' && (
            <motion.div key="description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6">
              <p className="text-sm leading-relaxed text-muted-foreground max-w-2xl">{product.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">{tag.replace(/-/g, ' ')}</Badge>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'care' && (
            <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6">
              <div className="grid gap-4 sm:grid-cols-3 max-w-2xl">
                <div className="rounded-2xl border border-border/50 bg-card p-4">
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <h4 className="mt-2 font-semibold">Water</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{product.careGuide.water}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-4">
                  <Sun className="h-6 w-6 text-amber-500" />
                  <h4 className="mt-2 font-semibold">Light</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{product.careGuide.light}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-card p-4">
                  <Wind className="h-6 w-6 text-cyan-500" />
                  <h4 className="mt-2 font-semibold">Humidity</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{product.careGuide.humidity}</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'reviews' && (
            <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 max-w-3xl">
              <div className="mb-6 flex items-center gap-6">
                <div className="text-center">
                  <p className="text-4xl font-bold">{product.rating}</p>
                  <div className="flex gap-0.5 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={cn('h-4 w-4', s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground')} />
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{product.reviewCount} reviews</p>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs w-6">{star}★</span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : 3}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="rounded-2xl border border-border/50 bg-card p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                          {review.userName[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{review.userName}</p>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={cn('h-3 w-3', s <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground')} />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Similar products */}
      {similarProducts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Similar Plants</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {similarProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
