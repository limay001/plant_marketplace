import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, Package, Truck, MapPin, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatINR, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/button';

export function OrderConfirmationPage() {
  const { id } = useParams();
  const { orders } = useApp();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold">Order not found</h2>
        <Button asChild className="mt-4"><Link to="/orders">View all orders</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 lg:px-6">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
      >
        <CheckCircle2 className="h-14 w-14 text-primary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 text-center"
      >
        <h1 className="text-2xl font-bold sm:text-3xl">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your plants are on their way!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 rounded-2xl border border-border/50 bg-card p-5 space-y-4"
      >
        <div className="flex items-center justify-between border-b border-border/50 pb-3">
          <div>
            <p className="text-xs text-muted-foreground">Order ID</p>
            <p className="font-bold text-lg">{order.id}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Payment</p>
            <p className="font-semibold">{order.paymentMethod}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-primary/5 p-3">
          <Calendar className="h-5 w-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground">Estimated Delivery</p>
            <p className="font-semibold text-primary">{order.estimatedDelivery}</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Items ({order.items.length})</p>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.productId} className="flex gap-3">
                <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-bold">{formatINR(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-muted p-3">
          <MapPin className="h-5 w-5 text-primary shrink-0" />
          <div>
            <p className="text-sm font-semibold">{order.address.name}</p>
            <p className="text-xs text-muted-foreground">{order.address.address}, {order.address.city}, {order.address.state} - {order.address.pincode}</p>
            <p className="text-xs text-muted-foreground">Phone: {order.address.phone}</p>
          </div>
        </div>

        <div className="flex justify-between border-t border-border/50 pt-3">
          <span className="font-bold">Total Paid</span>
          <span className="font-bold text-lg">{formatINR(order.total)}</span>
        </div>
      </motion.div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
        <Button asChild><Link to="/orders">Track Order</Link></Button>
        <Button asChild variant="outline"><Link to="/listing">Continue Shopping</Link></Button>
      </div>
    </div>
  );
}
