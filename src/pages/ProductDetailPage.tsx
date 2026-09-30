import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Zap, Star, Truck, Shield, Check, Droplets, Sun, Wind, MapPin, Thermometer, Home, CheckCircle2, XCircle, AirVent } from 'lucide-react';
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

  const difficultyColor = (d?: string) => {
    if (!d) return 'bg-muted text-muted-foreground border-border';
    if (d === 'Very Easy') return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/40';
    if (d === 'Easy') return 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/40';
    if (d === 'Moderate') return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/40';
    return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900/40';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Breadcrumb */}
      <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to={`/listing?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">{product.category}</Link>
        <span>/</span>
        <span className="text-foreground font-medium line-clamp-1">{product.name}</span>
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

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-primary/10 px-2 py-1">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-bold text-primary">{product.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
            {product.petSafe && <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">🐾 Pet Safe</Badge>}
            {product.beginner && <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">🌱 Beginner</Badge>}
            {product.careGuide.difficulty && (
              <Badge variant="secondary" className={cn(difficultyColor(product.careGuide.difficulty))}>
                {product.careGuide.difficulty}
              </Badge>
            )}
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

          {/* Quick care snapshot */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="rounded-xl border border-border/50 bg-card p-2.5 text-center">
              <Droplets className="mx-auto h-4 w-4 text-blue-500" />
              <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Water</p>
              <p className="text-xs font-medium leading-tight mt-0.5">{product.careGuide.water}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-2.5 text-center">
              <Sun className="mx-auto h-4 w-4 text-amber-500" />
              <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Light</p>
              <p className="text-xs font-medium leading-tight mt-0.5">{product.careGuide.light}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-2.5 text-center">
              <Wind className="mx-auto h-4 w-4 text-cyan-500" />
              <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Humidity</p>
              <p className="text-xs font-medium leading-tight mt-0.5">{product.careGuide.humidity}</p>
            </div>
          </div>

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
                  Delivery available! Order now for delivery in 5-7 days.
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
              <p className="text-[10px] text-muted-foreground">over Rs.499</p>
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
            <motion.div key="description" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 max-w-3xl">
              <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

              {/* Product highlights grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-border/50 bg-card p-3 text-center">
                  <span className="text-2xl">{product.light === 'Low' ? '🌑' : product.light === 'Medium' ? '🌤️' : '☀️'}</span>
                  <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Light Need</p>
                  <p className="text-xs font-semibold mt-0.5">{product.light}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-3 text-center">
                  <span className="text-2xl">{product.size === 'Small' ? '🪴' : product.size === 'Medium' ? '🌿' : '🌳'}</span>
                  <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Plant Size</p>
                  <p className="text-xs font-semibold mt-0.5">{product.size}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-3 text-center">
                  <span className="text-2xl">{product.petSafe ? '🐾' : '⚠️'}</span>
                  <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Pet Safety</p>
                  <p className="text-xs font-semibold mt-0.5">{product.petSafe ? 'Safe' : 'Keep Away'}</p>
                </div>
                <div className="rounded-xl border border-border/50 bg-card p-3 text-center">
                  <span className="text-2xl">{product.beginner ? '👶' : '🌿'}</span>
                  <p className="mt-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Experience</p>
                  <p className="text-xs font-semibold mt-0.5">{product.beginner ? 'Beginner' : 'Enthusiast'}</p>
                </div>
              </div>

              {/* Ideal placement */}
              {product.careGuide.idealPlacement && product.careGuide.idealPlacement.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                    <Home className="h-4 w-4 text-primary" />
                    Ideal Placement
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.careGuide.idealPlacement.map((place) => (
                      <span key={place} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                        📍 {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ideal environment */}
              {product.careGuide.idealEnvironment && (
                <div className="mt-4 rounded-xl border border-border/50 bg-card p-3">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-1">Best Environment</p>
                  <p className="text-sm text-foreground">{product.careGuide.idealEnvironment}</p>
                </div>
              )}

              {/* Suitability */}
              {product.careGuide.suitability && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-950/20">
                    <h4 className="flex items-center gap-1.5 text-sm font-bold text-green-700 dark:text-green-400 mb-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Good For
                    </h4>
                    <ul className="space-y-1.5">
                      {product.careGuide.suitability.goodFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-green-700 dark:text-green-400">
                          <span className="mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                    <h4 className="flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-red-400 mb-2">
                      <XCircle className="h-4 w-4" />
                      Not Good For
                    </h4>
                    <ul className="space-y-1.5">
                      {product.careGuide.suitability.notGoodFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-red-700 dark:text-red-400">
                          <span className="mt-0.5 shrink-0">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">{tag.replace(/-/g, ' ')}</Badge>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'care' && (
            <motion.div key="care" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 max-w-3xl">
              {/* Difficulty + AC safe */}
              <div className="mb-5 flex flex-wrap gap-3">
                {product.careGuide.difficulty && (
                  <div className={cn('rounded-xl border px-4 py-2 text-sm font-semibold', difficultyColor(product.careGuide.difficulty))}>
                    Care Level: {product.careGuide.difficulty}
                  </div>
                )}
                {product.careGuide.airConditionedSafe !== undefined && (
                  <div className={cn(
                    'flex items-center gap-1.5 rounded-xl border px-4 py-2 text-sm font-semibold',
                    product.careGuide.airConditionedSafe
                      ? 'border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-900/40 dark:bg-sky-950/20 dark:text-sky-400'
                      : 'border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-400'
                  )}>
                    <AirVent className="h-4 w-4" />
                    {product.careGuide.airConditionedSafe ? 'AC Room Friendly' : 'Avoid Direct AC Draft'}
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {/* Water */}
                <div className="rounded-2xl border border-border/50 bg-card p-4">
                  <Droplets className="h-6 w-6 text-blue-500" />
                  <h4 className="mt-2 font-semibold">Water</h4>
                  <p className="mt-1 text-sm text-primary font-medium">{product.careGuide.water}</p>
                  {product.careGuide.waterQuantity && (
                    <p className="mt-1 text-xs text-muted-foreground">💧 {product.careGuide.waterQuantity}</p>
                  )}
                  {product.careGuide.waterSchedule && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground border-t border-border/50 pt-2">{product.careGuide.waterSchedule}</p>
                  )}
                </div>

                {/* Light */}
                <div className="rounded-2xl border border-border/50 bg-card p-4">
                  <Sun className="h-6 w-6 text-amber-500" />
                  <h4 className="mt-2 font-semibold">Light</h4>
                  <p className="mt-1 text-sm text-primary font-medium">{product.careGuide.light}</p>
                  {product.careGuide.lightDetail && (
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground border-t border-border/50 pt-2">{product.careGuide.lightDetail}</p>
                  )}
                </div>

                {/* Humidity and Temperature */}
                <div className="rounded-2xl border border-border/50 bg-card p-4">
                  <Wind className="h-6 w-6 text-cyan-500" />
                  <h4 className="mt-2 font-semibold">Humidity</h4>
                  <p className="mt-1 text-sm text-primary font-medium">{product.careGuide.humidity}</p>
                  {product.careGuide.temperature && (
                    <div className="mt-2 flex items-center gap-1.5 border-t border-border/50 pt-2">
                      <Thermometer className="h-3.5 w-3.5 text-rose-400" />
                      <p className="text-xs text-muted-foreground">{product.careGuide.temperature}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ideal spots */}
              {product.careGuide.idealPlacement && product.careGuide.idealPlacement.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-bold flex items-center gap-2 mb-3">
                    <Home className="h-4 w-4 text-primary" />
                    Ideal Spots
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.careGuide.idealPlacement.map((place) => (
                      <span key={place} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary">
                        📍 {place}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suitability */}
              {product.careGuide.suitability && (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-950/20">
                    <h4 className="flex items-center gap-1.5 text-sm font-bold text-green-700 dark:text-green-400 mb-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Good For
                    </h4>
                    <ul className="space-y-1.5">
                      {product.careGuide.suitability.goodFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-green-700 dark:text-green-400">
                          <span className="mt-0.5 shrink-0">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-950/20">
                    <h4 className="flex items-center gap-1.5 text-sm font-bold text-red-700 dark:text-red-400 mb-2">
                      <XCircle className="h-4 w-4" />
                      Not Good For
                    </h4>
                    <ul className="space-y-1.5">
                      {product.careGuide.suitability.notGoodFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-red-700 dark:text-red-400">
                          <span className="mt-0.5 shrink-0">✗</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
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
                {reviews.length > 0 ? reviews.map((review) => (
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
                )) : (
                  <p className="text-sm text-muted-foreground py-8 text-center">No reviews yet. Be the first to review this plant!</p>
                )}
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