import { Link } from 'react-router-dom';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Truck, Sparkles, Shield, Leaf, ArrowRight } from 'lucide-react';
import { products, categories } from '@/data/seed';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useRef, useEffect } from 'react';

/* ── helpers ── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

function ScrollSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString('en-IN') + suffix);

  useEffect(() => {
    if (inView) mv.set(target);
  }, [inView, mv, target]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const rowConfig = [
  { title: 'Trending Now 🔥', filter: (p: typeof products[0]) => p.rating >= 4.5, key: 'trending' },
  { title: 'Pet-Safe Plants 🐾', filter: (p: typeof products[0]) => p.petSafe, key: 'petsafe' },
  { title: 'Low-Light Heroes 🌑', filter: (p: typeof products[0]) => p.light === 'Low', key: 'lowlight' },
  { title: 'Herbs & Edibles 🌿', filter: (p: typeof products[0]) => p.category === 'Herbs', key: 'herbs' },
  { title: 'Deals of the Day ⚡', filter: (p: typeof products[0]) => p.mrp - p.price >= 150, key: 'deals' },
];

const stats = [
  { label: 'Plants in stock', value: 500, suffix: '+' },
  { label: 'Happy customers', value: 12000, suffix: '+' },
  { label: 'Cities delivered', value: 180, suffix: '+' },
  { label: 'Day guarantee', value: 7, suffix: '-day' },
];

const marqueeItems = [
  '🚚 Free delivery over ₹499',
  '🌱 7-day healthy plant guarantee',
  '🤖 AI plant advisor — Ask Leafy',
  '🐾 100+ pet-safe varieties',
  '💧 Care guides for every plant',
  '🎁 Gift packs & gift cards',
  '✨ New arrivals every week',
];

export function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* ambient blobs */}
        <div className="pointer-events-none absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-secondary/15 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            >
              <motion.div
                className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Leaf className="h-3.5 w-3.5" />
                India's AI-powered nursery
              </motion.div>

              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl text-balance">
                Bring your space
                <br />
                <motion.span
                  className="text-primary inline-block"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  to life
                </motion.span>{' '}
                with plants
              </h1>

              <motion.p
                className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Shop 100+ plants, pots, and care essentials. Get AI-powered recommendations based on your space, light, and lifestyle.
              </motion.p>

              <motion.div
                className="mt-6 flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
              >
                <Button asChild size="lg" className="group">
                  <Link to="/listing" className="flex items-center gap-2">
                    Shop Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/ask-leafy" className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Ask Leafy AI
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-primary" /> Free delivery over ₹499</span>
                <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" /> 7-day plant guarantee</span>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/20">
                <img
                  src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=85"
                  alt="Beautiful indoor plants"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />

                {/* floating badges */}
                <motion.div
                  className="absolute top-8 right-8 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-secondary-foreground shadow-lg"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-3xl">🌿</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-8 left-8 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                >
                  <span className="text-2xl">🪴</span>
                </motion.div>

                {/* new: floating review pill */}
                <motion.div
                  className="absolute bottom-10 right-6 rounded-2xl bg-background/90 backdrop-blur-md px-3 py-2 shadow-xl border border-border/40 text-xs font-semibold flex items-center gap-1.5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: [0, -6, 0] }}
                  transition={{ delay: 0.8, duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="text-amber-400">★★★★★</span> 4.8 · 12k+ reviews
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Marquee ticker */}
        <div className="bg-primary text-primary-foreground overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap py-2.5"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="mx-6 text-sm font-medium shrink-0">
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <ScrollSection className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              custom={i}
              className="rounded-2xl border border-border/50 bg-card p-4 text-center"
            >
              <p className="text-2xl font-extrabold text-primary">
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </motion.div>
          ))}
        </ScrollSection>
      </section>

      {/* ── Category chips ── */}
      <section className="mx-auto max-w-7xl px-4 lg:px-6">
        <ScrollSection className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat, i) => (
            <motion.div key={cat.name} variants={fadeUp} custom={i} className="shrink-0">
              <Link
                to={`/listing?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-2 rounded-2xl border border-border/50 bg-card p-4 transition-all hover:shadow-md hover:-translate-y-1 hover:border-primary/40 min-w-[100px]"
              >
                <motion.span
                  className="text-3xl"
                  whileHover={{ scale: 1.25, rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  {cat.icon}
                </motion.span>
                <span className="text-xs font-semibold text-center">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </ScrollSection>
      </section>

      {/* ── Product rows ── */}
      {rowConfig.map((row) => {
        const rowProducts = products.filter(row.filter).slice(0, 6);
        if (rowProducts.length === 0) return null;
        return (
          <section key={row.key} className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
            <ScrollSection>
              <motion.div variants={fadeUp} className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold sm:text-2xl">{row.title}</h2>
                <Link to="/listing" className="group flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  View all
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {rowProducts.map((p, i) => (
                  <motion.div key={p.id} variants={fadeUp} custom={i}>
                    <ProductCard product={p} index={i} />
                  </motion.div>
                ))}
              </div>
            </ScrollSection>
          </section>
        );
      })}

      {/* ── CTA banner ── */}
      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80 p-8 text-primary-foreground sm:p-12"
        >
          {/* animated bg orbs */}
          <motion.div
            className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-white/5 blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl font-bold sm:text-3xl">Not sure which plant suits you?</h2>
            <p className="mt-2 text-primary-foreground/80">
              Tell Leafy AI about your space, light, and pets. Get personalized plant recommendations in seconds.
            </p>
            <Button asChild variant="secondary" size="lg" className="mt-4 group">
              <Link to="/ask-leafy" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Try Ask Leafy
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <motion.div
            className="absolute -right-4 -bottom-4 text-[140px] opacity-10 select-none"
            animate={{ rotate: [0, 6, -6, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            🌿
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}