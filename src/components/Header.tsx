import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Moon, Search, ShoppingBag, Sun, User, X, Sparkles } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { useTheme } from '@/context/ThemeContext';
import { products } from '@/data/seed';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const suggestions = [
  'Low light plants',
  'Pet safe plants',
  'Air purifying',
  'Beginner friendly',
  'Indoor plants',
  'Succulents',
  'Herbs',
];

export function Header({ onOpenCart }: { onOpenCart: () => void }) {
  const { cartCount, wishlist } = useApp();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/listing?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleSuggestionClick = (s: string) => {
    setSearchQuery(s);
    navigate(`/listing?q=${encodeURIComponent(s)}`);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 lg:px-6">
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
            <span className="text-lg">🌿</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Leafloop</span>
        </Link>

        <div ref={searchRef} className="relative flex-1 max-w-xl mx-auto hidden md:block">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchOpen(true);
                  const q = e.target.value.toLowerCase();
                  setFilteredSuggestions(
                    suggestions.filter((s) => s.toLowerCase().includes(q)).slice(0, 5)
                  );
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search for plants, pots, herbs..."
                className="w-full rounded-full border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </form>
          <AnimatePresence>
            {searchOpen && (searchQuery === '' ? suggestions : filteredSuggestions).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute top-full mt-2 w-full rounded-xl border border-border bg-popover shadow-lg p-2 z-50"
              >
                {(searchQuery === '' ? suggestions : filteredSuggestions).map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestionClick(s)}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                  >
                    <Search className="h-3.5 w-3.5 text-muted-foreground" />
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-1 ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/ask-leafy')}
            className="hidden sm:flex gap-1.5 text-primary font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Ask Leafy
          </Button>
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <Link
            to="/wishlist"
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <button
            onClick={onOpenCart}
            className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Cart"
          >
            <ShoppingBag className="h-5 w-5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <Link
            to="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Profile"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plants..."
              className="w-full rounded-full border border-border bg-card py-2 pl-10 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
        </form>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <span className="text-lg">🌿</span> Leafloop
            </SheetTitle>
          </SheetHeader>
          <nav className="mt-6 flex flex-col gap-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'All Plants', path: '/listing' },
              { label: 'Indoor', path: '/listing?category=Indoor' },
              { label: 'Air Purifying', path: '/listing?category=Air Purifying' },
              { label: 'Succulents', path: '/listing?category=Succulents' },
              { label: 'Herbs', path: '/listing?category=Herbs' },
              { label: 'Flowering', path: '/listing?category=Flowering' },
              { label: 'Pots & Planters', path: '/listing?category=Pots & Planters' },
              { label: 'Ask Leafy', path: '/ask-leafy' },
              { label: 'Wishlist', path: '/wishlist' },
              { label: 'My Orders', path: '/orders' },
              { label: 'Profile', path: '/profile' },
              { label: 'Seller Dashboard', path: '/seller' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
