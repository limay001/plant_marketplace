import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, updateQty, removeFromCart, cartTotal } = useApp();
  const FREE_SHIP_THRESHOLD = 499;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIP_THRESHOLD) * 100);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-5 pt-5">
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart ({cart.length})
          </SheetTitle>
        </SheetHeader>

        {cart.length > 0 && (
          <div className="px-5 py-3 border-b border-border/50">
            {remaining > 0 ? (
              <p className="text-xs text-muted-foreground mb-2">
                Add <span className="font-bold text-primary">{formatINR(remaining)}</span> more for free delivery!
              </p>
            ) : (
              <p className="text-xs font-semibold text-primary mb-2">You've unlocked free delivery!</p>
            )}
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">Add some plants to get started!</p>
              </div>
              <Button onClick={onClose} asChild>
                <Link to="/listing">Browse Plants</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex gap-3 rounded-xl border border-border/50 bg-card p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.size}</p>
                      <p className="mt-1 text-sm font-bold">{formatINR(item.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex items-center rounded-lg border border-border">
                          <button
                            onClick={() => updateQty(item.productId, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center hover:bg-accent rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.productId, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center hover:bg-accent rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{formatINR(item.price * item.quantity)}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-border/50 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">{formatINR(cartTotal)}</span>
            </div>
            <Button asChild className="w-full" size="lg">
              <Link to="/cart" onClick={onClose}>View Cart & Checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
