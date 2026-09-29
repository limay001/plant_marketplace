import { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products } from '@/data/seed';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import type { Category, LightNeed, PlantSize } from '@/types';

const allCategories: Category[] = ['Indoor', 'Air Purifying', 'Succulents', 'Herbs', 'Flowering', 'Pots & Planters'];
const lightNeeds: LightNeed[] = ['Low', 'Medium', 'Bright'];
const sizes: PlantSize[] = ['Small', 'Medium', 'Large'];

const sortOptions = [
  { value: 'popularity', label: 'Popularity' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating' },
  { value: 'newest', label: 'Newest' },
];

export function ListingPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : []);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedLight, setSelectedLight] = useState<string[]>([]);
  const [petSafeOnly, setPetSafeOnly] = useState(false);
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [rating4Plus, setRating4Plus] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategories, priceRange, selectedLight, petSafeOnly, beginnerOnly, rating4Plus, selectedSizes, discountOnly, sortBy, query]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (query) {
        const q = query.toLowerCase();
        const match = p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) || p.tags.some(t => t.includes(q));
        if (!match) return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      if (selectedLight.length > 0 && !selectedLight.includes(p.light)) return false;
      if (petSafeOnly && !p.petSafe) return false;
      if (beginnerOnly && !p.beginner) return false;
      if (rating4Plus && p.rating < 4) return false;
      if (selectedSizes.length > 0 && !selectedSizes.includes(p.size)) return false;
      if (discountOnly && p.mrp <= p.price) return false;
      return true;
    });

    switch (sortBy) {
      case 'price-low': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-high': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'newest': result = [...result].reverse(); break;
      default: result = [...result].sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [query, selectedCategories, priceRange, selectedLight, petSafeOnly, beginnerOnly, rating4Plus, selectedSizes, discountOnly, sortBy]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400 && hasMore) {
      setVisibleCount((c) => c + 8);
    }
  }, [hasMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const activeFilters: { label: string; onRemove: () => void }[] = [];
  selectedCategories.forEach((c) => activeFilters.push({ label: c, onRemove: () => setSelectedCategories((prev) => prev.filter((x) => x !== c)) }));
  selectedLight.forEach((l) => activeFilters.push({ label: l, onRemove: () => setSelectedLight((prev) => prev.filter((x) => x !== l)) }));
  selectedSizes.forEach((s) => activeFilters.push({ label: s, onRemove: () => setSelectedSizes((prev) => prev.filter((x) => x !== s)) }));
  if (petSafeOnly) activeFilters.push({ label: 'Pet Safe', onRemove: () => setPetSafeOnly(false) });
  if (beginnerOnly) activeFilters.push({ label: 'Beginner Friendly', onRemove: () => setBeginnerOnly(false) });
  if (rating4Plus) activeFilters.push({ label: '4★ & above', onRemove: () => setRating4Plus(false) });
  if (discountOnly) activeFilters.push({ label: 'On Discount', onRemove: () => setDiscountOnly(false) });

  const toggleArray = (arr: string[], val: string, setter: (v: string[]) => void) => {
    setter(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val]);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-sm font-semibold">Category</h3>
        <div className="space-y-2">
          {allCategories.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedCategories.includes(cat)}
                onCheckedChange={() => toggleArray(selectedCategories, cat, setSelectedCategories)}
              />
              <span className="text-sm">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
        <div className="px-1">
          <Slider
            min={0}
            max={2000}
            step={50}
            value={priceRange}
            onValueChange={(v) => setPriceRange([v[0], v[1]] as [number, number])}
            className="mb-3"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Light Need</h3>
        <div className="space-y-2">
          {lightNeeds.map((light) => (
            <label key={light} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedLight.includes(light)}
                onCheckedChange={() => toggleArray(selectedLight, light, setSelectedLight)}
              />
              <span className="text-sm">{light}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Size</h3>
        <div className="space-y-2">
          {sizes.map((size) => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => toggleArray(selectedSizes, size, setSelectedSizes)}
              />
              <span className="text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold">Quick Filters</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={petSafeOnly} onCheckedChange={(v) => setPetSafeOnly(!!v)} />
            <span className="text-sm">Pet Safe</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={beginnerOnly} onCheckedChange={(v) => setBeginnerOnly(!!v)} />
            <span className="text-sm">Beginner Friendly</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={rating4Plus} onCheckedChange={(v) => setRating4Plus(!!v)} />
            <span className="text-sm">4★ & above</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox checked={discountOnly} onCheckedChange={(v) => setDiscountOnly(!!v)} />
            <span className="text-sm">On Discount</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold sm:text-3xl">
          {query ? `Results for "${query}"` : 'All Plants'}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products found</p>
      </div>

      {activeFilters.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <AnimatePresence>
            {activeFilters.map((f, i) => (
              <motion.button
                key={`${f.label}-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={f.onRemove}
                className="flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground hover:bg-accent/80"
              >
                {f.label}
                <X className="h-3 w-3" />
              </motion.button>
            ))}
          </AnimatePresence>
          <button
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange([0, 2000]);
              setSelectedLight([]);
              setPetSafeOnly(false);
              setBeginnerOnly(false);
              setRating4Plus(false);
              setSelectedSizes([]);
              setDiscountOnly(false);
            }}
            className="text-xs font-semibold text-primary hover:underline"
          >
            Clear all
          </button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-5">
            <FilterContent />
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          <div className="mb-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-1.5" />
              Filters
            </Button>

            <div className="relative ml-auto">
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium hover:bg-accent"
              >
                Sort: {sortOptions.find((s) => s.value === sortBy)?.label}
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-border bg-popover shadow-lg p-1 z-30"
                  >
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        className={cn(
                          'flex w-full items-center rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors',
                          sortBy === opt.value && 'font-bold text-primary'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {visibleProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <span className="text-4xl">🌱</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">No plants found</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 2000]);
                  setSelectedLight([]);
                  setPetSafeOnly(false);
                  setBeginnerOnly(false);
                  setRating4Plus(false);
                  setSelectedSizes([]);
                  setDiscountOnly(false);
                }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
            >
              <AnimatePresence>
                {visibleProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {hasMore && (
            <div className="mt-6 flex justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
                </div>
                <p className="text-xs text-muted-foreground">Loading more...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile filters */}
      <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
        <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <FilterContent />
            <Button className="w-full mt-6" onClick={() => setMobileFiltersOpen(false)}>
              Show {filtered.length} results
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
