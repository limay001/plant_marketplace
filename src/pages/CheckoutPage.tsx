import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin, CreditCard, Wallet, Check, ArrowLeft } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatINR, generateOrderId, getEstimatedDelivery } from '@/lib/format';
import { coupons } from '@/data/seed';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Address, Order } from '@/types';

const addressSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit phone number'),
  address: z.string().min(10, 'Enter full address'),
  pincode: z.string().regex(/^\d{6}$/, 'Enter a valid 6-digit pincode'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
});

type AddressForm = z.infer<typeof addressSchema>;

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, addresses, addAddress, appliedCoupon, addOrder, clearCart } = useApp();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || null
  );
  const [showNewForm, setShowNewForm] = useState(addresses.length === 0);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [placingOrder, setPlacingOrder] = useState(false);

  const FREE_SHIP_THRESHOLD = 499;
  const shipping = cartTotal >= FREE_SHIP_THRESHOLD || appliedCoupon === 'FREESHIP' ? 0 : 49;
  let discount = 0;
  if (appliedCoupon) {
    const coupon = coupons.find((c) => c.code === appliedCoupon);
    if (coupon?.type === 'percent') discount = Math.round((cartTotal * coupon.value) / 100);
  }
  const total = cartTotal - discount + shipping;

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema),
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const onSaveAddress = (data: AddressForm) => {
    const newAddr: Address = {
      id: `addr_${Date.now()}`,
      ...data,
      isDefault: addresses.length === 0,
    };
    addAddress(newAddr);
    setSelectedAddressId(newAddr.id);
    setShowNewForm(false);
    toast.success('Address saved');
  };

  const handlePlaceOrder = () => {
    const address = addresses.find((a) => a.id === selectedAddressId);
    if (!address) {
      toast.error('Please select or add a delivery address');
      return;
    }
    setPlacingOrder(true);
    setTimeout(() => {
      const order: Order = {
        id: generateOrderId(),
        items: cart,
        total,
        subtotal: cartTotal,
        discount,
        shipping,
        status: 'Placed',
        address,
        paymentMethod,
        placedAt: new Date().toISOString(),
        estimatedDelivery: getEstimatedDelivery(5),
        couponCode: appliedCoupon || undefined,
      };
      addOrder(order);
      clearCart();
      navigate(`/order-confirmation/${order.id}`);
    }, 1500);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => navigate('/cart')} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-accent">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold sm:text-3xl">Checkout</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Address section */}
          <section className="rounded-2xl border border-border/50 bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold mb-4">
              <MapPin className="h-5 w-5 text-primary" />
              Delivery Address
            </h2>

            {addresses.length > 0 && !showNewForm && (
              <div className="space-y-3">
                {addresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={cn(
                      'flex gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all',
                      selectedAddressId === addr.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                    )}
                  >
                    <RadioGroup value={selectedAddressId || undefined} onValueChange={setSelectedAddressId} className="flex">
                      <RadioGroupItem value={addr.id} id={addr.id} />
                    </RadioGroup>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{addr.name}</p>
                      <p className="text-sm text-muted-foreground">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                    </div>
                  </label>
                ))}
                <Button variant="outline" size="sm" onClick={() => setShowNewForm(true)}>
                  + Add new address
                </Button>
              </div>
            )}

            {showNewForm && (
              <form onSubmit={handleSubmit(onSaveAddress)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...register('name')} placeholder="John Doe" className="mt-1" />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" {...register('phone')} placeholder="9876543210" maxLength={10} className="mt-1" />
                    {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Full Address</Label>
                  <Input id="address" {...register('address')} placeholder="House no, Street, Area" className="mt-1" />
                  {errors.address && <p className="mt-1 text-xs text-destructive">{errors.address.message}</p>}
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input id="pincode" {...register('pincode')} placeholder="560001" maxLength={6} className="mt-1" />
                    {errors.pincode && <p className="mt-1 text-xs text-destructive">{errors.pincode.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" {...register('city')} placeholder="Bengaluru" className="mt-1" />
                    {errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" {...register('state')} placeholder="Karnataka" className="mt-1" />
                    {errors.state && <p className="mt-1 text-xs text-destructive">{errors.state.message}</p>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button type="submit">Save Address</Button>
                  {addresses.length > 0 && (
                    <Button type="button" variant="outline" onClick={() => setShowNewForm(false)}>Cancel</Button>
                  )}
                </div>
              </form>
            )}
          </section>

          {/* Payment section */}
          <section className="rounded-2xl border border-border/50 bg-card p-5">
            <h2 className="flex items-center gap-2 font-semibold mb-4">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Method
            </h2>
            <div className="space-y-3">
              <label className={cn('flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all', paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30')}>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'COD' | 'UPI')} className="flex">
                  <RadioGroupItem value="COD" id="cod" />
                </RadioGroup>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when your plants arrive</p>
                </div>
                <Wallet className="h-6 w-6 text-muted-foreground" />
              </label>
              <label className={cn('flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all', paymentMethod === 'UPI' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30')}>
                <RadioGroup value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'COD' | 'UPI')} className="flex">
                  <RadioGroupItem value="UPI" id="upi" />
                </RadioGroup>
                <div className="flex-1">
                  <p className="font-semibold text-sm">UPI Payment</p>
                  <p className="text-xs text-muted-foreground">Pay via UPI (simulated)</p>
                </div>
                <CreditCard className="h-6 w-6 text-muted-foreground" />
              </label>
            </div>
          </section>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-border/50 bg-card p-5 space-y-4">
            <h3 className="font-semibold text-lg">Order Summary</h3>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity} · {item.size}</p>
                    <p className="text-sm font-bold">{formatINR(item.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-2 border-t border-border/50 pt-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(cartTotal)}</span></div>
              {discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-{formatINR(discount)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{shipping === 0 ? <span className="text-primary font-semibold">FREE</span> : formatINR(shipping)}</span></div>
            </div>
            <div className="flex justify-between border-t border-border/50 pt-3">
              <span className="font-bold">Total</span><span className="font-bold text-lg">{formatINR(total)}</span>
            </div>
            <Button className="w-full" size="lg" onClick={handlePlaceOrder} disabled={placingOrder || !selectedAddressId}>
              {placingOrder ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full" />
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
