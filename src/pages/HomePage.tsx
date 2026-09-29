import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Truck, Sparkles, Shield, Leaf } from 'lucide-react';
import { products, categories } from '@/data/seed';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const rowConfig = [
  { title: 'Trending Now', filter: (p: typeof products[0]) => p.rating >= 4.5, key: 'trending' },
  { title: 'Pet-Safe Plants', filter: (p: typeof products[0]) => p.petSafe, key: 'petsafe' },
  { title: 'Low-Light Heroes', filter: (p: typeof products[0]) => p.light === 'Low', key: 'lowlight' },
  { title: 'Herbs & Edibles', filter: (p: typeof products[0]) => p.category === 'Herbs', key: 'herbs' },
  { title: 'Deals of the Day', filter: (p: typeof products[0]) => p.mrp - p.price >= 150, key: 'deals' },
];

export function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Leaf className="h-3.5 w-3.5" />
                India's AI-powered nursery
              </div>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
                Bring your space
                <br />
                <span className="text-primary">to life</span> with plants
              </h1>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                Shop 100+ plants, pots, and care essentials. Get AI-powered recommendations based on your space, light, and lifestyle.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/listing">Shop Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/ask-leafy" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Ask Leafy AI
                  </Link>
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Free delivery over ₹499</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> 7-day plant guarantee</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/20">
                <img
                  src="https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&w=800"
                  alt="Beautiful indoor plants"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <motion.div
                  className="absolute top-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-3xl">🌿</span>
                </motion.div>
                <motion.div
                  className="absolute bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <span className="text-2xl">🪴</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Free delivery strip */}
        <div className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-2 lg:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Truck className="h-4 w-4" />
              Free delivery on orders above ₹499 • Use code FREESHIP for free shipping
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category chips */}
      <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                to={`/listing?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/50 bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5 min-w-[100px]"
              >
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-center">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product rows */}
      {rowConfig.map((row) => {
        const rowProducts = products.filter(row.filter).slice(0, 6);
        if (rowProducts.length === 0) return null;
        return (
          <section key={row.key} className="mx-auto max-w-7xl px-4 py-4 lg:px-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold sm:text-2xl">{row.title}</h2>
              <Link to="/listing" className="text-sm font-semibold text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {rowProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        );
      })}

      {/* CTA banner */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground sm:p-12">
          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl font-bold sm:text-3xl">Not sure which plant suits you?</h2>
            <p className="mt-2 text-primary-foreground/80">
              Tell Leafy AI about your space, light, and pets. Get personalized plant recommendations in seconds.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-4">
              <Link to="/ask-leafy" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Try Ask Leafy
              </Link>
            </Button>
          </div>
          <div className="absolute -right-8 -bottom-8 text-[120px] opacity-20">🌿</div>
        </div>
      </section>
    </div>
  );
}
