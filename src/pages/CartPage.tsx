import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, Tag, X, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/format';
import { coupons } from '@/data/seed';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, appliedCoupon, applyCoupon } = useApp();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState(appliedCoupon || '');
  const [couponError, setCouponError] = useState('');

  const FREE_SHIP_THRESHOLD = 499;
  const shipping = cartTotal >= FREE_SHIP_THRESHOLD ? 0 : 49;

  let discount = 0;
  if (appliedCoupon) {
    const coupon = coupons.find((c) => c.code === appliedCoupon);
    if (coupon) {
      if (coupon.type === 'percent') {
        discount = Math.round((cartTotal * coupon.value) / 100);
      } else if (coupon.type === 'shipping') {
        // free shipping handled by zeroing shipping
      }
    }
  }

  const total = cartTotal - discount + (appliedCoupon === 'FREESHIP' ? 0 : shipping);
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - cartTotal);
  const progress = Math.min(100, (cartTotal / FREE_SHIP_THRESHOLD) * 100);

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code === code);
    if (!coupon) {
      setCouponError('Invalid coupon code');
      applyCoupon(null);
      return;
    }
    setCouponError('');
    applyCoupon(code);
    toast.success(`Coupon ${code} applied!`);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">Your cart is empty</h2>
        <p className="mt-1 text-sm text-muted-foreground">Browse our collection and add some plants!</p>
        <Button asChild className="mt-4"><Link to="/listing">Shop Plants</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl mb-6">Your Cart</h1>

      {/* Free delivery progress */}
      <div className="mb-6 rounded-2xl border border-border/50 bg-card p-4">
        {remaining > 0 ? (
          <p className="text-sm mb-2">
            Add <span className="font-bold text-primary">{formatINR(remaining)}</span> more for <span className="font-bold">FREE delivery</span>
          </p>
        ) : (
          <p className="text-sm font-semibold text-primary mb-2">You've unlocked FREE delivery!</p>
        )}
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 rounded-2xl border border-border/50 bg-card p-4"
              >
                <Link to={`/product/${item.productId}`}>
                  <img src={item.image} alt={item.name} className="h-24 w-24 rounded-xl object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/product/${item.productId}`}>
                    <h3 className="font-semibold line-clamp-1 hover:text-primary">{item.name}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                  <p className="mt-1 text-lg font-bold">{formatINR(item.price)}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center rounded-lg border border-border">
                      <button onClick={() => updateQty(item.productId, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center hover:bg-accent rounded-l-lg" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center hover:bg-accent rounded-r-lg" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => { removeFromCart(item.productId); toast.success('Item removed'); }} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive" aria-label="Remove">
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">{formatINR(item.price * item.quantity)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-5 space-y-4">
            <h3 className="font-semibold text-lg">Price Details</h3>

            {/* Coupon */}
            <div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    placeholder="Coupon code"
                    className="w-full rounded-lg border border-input bg-transparent pl-9 pr-3 py-2 text-sm outline-none focus:border-primary"
                  />
                </div>
                <Button size="sm" onClick={handleApplyCoupon}>Apply</Button>
              </div>
              {couponError && <p className="mt-1 text-xs text-destructive">{couponError}</p>}
              {appliedCoupon && !couponError && (
                <div className="mt-2 flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2">
                  <span className="text-xs font-semibold text-primary">{appliedCoupon} applied</span>
                  <button onClick={() => { applyCoupon(null); setCouponInput(''); }} className="text-xs text-muted-foreground hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {coupons.map((c) => (
                  <button key={c.code} onClick={() => { setCouponInput(c.code); }} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground hover:bg-accent/80">
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 border-t border-border/50 pt-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                <span>{formatINR(cartTotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-primary">
                  <span>Coupon discount</span>
                  <span>-{formatINR(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>{shipping === 0 || appliedCoupon === 'FREESHIP' ? <span className="text-primary font-semibold">FREE</span> : formatINR(shipping)}</span>
              </div>
            </div>

            <div className="flex justify-between border-t border-border/50 pt-3">
              <span className="font-bold">Total</span>
              <span className="font-bold text-lg">{formatINR(total)}</span>
            </div>

            <Button className="w-full" size="lg" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
