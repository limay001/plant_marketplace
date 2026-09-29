import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, MapPin, Package, Heart, LogOut, Plus, Trash2, Check, Store } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import type { Address } from '@/types';

export function ProfilePage() {
  const { addresses, addAddress, deleteAddress, orders, wishlist } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', phone: '', address: '', pincode: '', city: '', state: '' });

  const handleSave = () => {
    if (!newAddr.name || !newAddr.phone || !newAddr.address || !newAddr.pincode || !newAddr.city || !newAddr.state) {
      toast.error('Please fill all fields');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(newAddr.phone)) {
      toast.error('Enter a valid 10-digit phone');
      return;
    }
    if (!/^\d{6}$/.test(newAddr.pincode)) {
      toast.error('Enter a valid 6-digit pincode');
      return;
    }
    const addr: Address = { id: `addr_${Date.now()}`, ...newAddr, isDefault: addresses.length === 0 };
    addAddress(addr);
    setNewAddr({ name: '', phone: '', address: '', pincode: '', city: '', state: '' });
    setShowForm(false);
    toast.success('Address added');
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-6">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
          G
        </div>
        <div>
          <h1 className="text-2xl font-bold">Guest User</h1>
          <p className="text-sm text-muted-foreground">guest@leafloop.in</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <Link to="/orders" className="rounded-2xl border border-border/50 bg-card p-4 text-center hover:shadow-md transition-all">
          <Package className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-1 text-2xl font-bold">{orders.length}</p>
          <p className="text-xs text-muted-foreground">Orders</p>
        </Link>
        <Link to="/wishlist" className="rounded-2xl border border-border/50 bg-card p-4 text-center hover:shadow-md transition-all">
          <Heart className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-1 text-2xl font-bold">{wishlist.length}</p>
          <p className="text-xs text-muted-foreground">Wishlist</p>
        </Link>
        <Link to="/seller" className="rounded-2xl border border-border/50 bg-card p-4 text-center hover:shadow-md transition-all">
          <Store className="mx-auto h-6 w-6 text-primary" />
          <p className="mt-1 text-2xl font-bold">Sell</p>
          <p className="text-xs text-muted-foreground">Dashboard</p>
        </Link>
      </div>

      {/* Addresses */}
      <section className="rounded-2xl border border-border/50 bg-card p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 font-semibold">
            <MapPin className="h-5 w-5 text-primary" />
            Saved Addresses
          </h2>
          {!showForm && (
            <Button size="sm" variant="outline" onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          )}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3 mb-4 overflow-hidden"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="na-name">Name</Label>
                  <Input id="na-name" value={newAddr.name} onChange={(e) => setNewAddr({ ...newAddr, name: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="na-phone">Phone</Label>
                  <Input id="na-phone" value={newAddr.phone} onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })} className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="na-addr">Address</Label>
                <Input id="na-addr" value={newAddr.address} onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })} className="mt-1" />
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <Label htmlFor="na-pin">Pincode</Label>
                  <Input id="na-pin" value={newAddr.pincode} onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value.replace(/\D/g, '').slice(0, 6) })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="na-city">City</Label>
                  <Input id="na-city" value={newAddr.city} onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="na-state">State</Label>
                  <Input id="na-state" value={newAddr.state} onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>Save Address</Button>
                <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {addresses.length === 0 && !showForm ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No saved addresses yet. Add one to get started.</p>
        ) : (
          <div className="space-y-3">
            {addresses.map((addr) => (
              <div key={addr.id} className="flex items-start justify-between rounded-xl border border-border/50 p-3">
                <div>
                  <p className="font-semibold text-sm">{addr.name} {addr.isDefault && <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Default</span>}</p>
                  <p className="text-sm text-muted-foreground">{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                  <p className="text-sm text-muted-foreground">Phone: {addr.phone}</p>
                </div>
                <button onClick={() => { deleteAddress(addr.id); toast.success('Address removed'); }} className="text-muted-foreground hover:text-destructive" aria-label="Delete address">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recent orders */}
      {orders.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="flex items-center gap-2 font-semibold mb-4">
            <Package className="h-5 w-5 text-primary" />
            Recent Orders
          </h2>
          <div className="space-y-2">
            {orders.slice(0, 3).map((order) => (
              <Link key={order.id} to={`/order-confirmation/${order.id}`} className="flex items-center justify-between rounded-xl border border-border/50 p-3 hover:bg-accent transition-colors">
                <div>
                  <p className="font-semibold text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} items · {order.status}</p>
                </div>
                <span className="font-bold text-sm">{formatINR(order.total)}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6">
        <Link to="/auth">
          <Button variant="outline" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </Link>
      </div>
    </div>
  );
}
