import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Package, Truck, Home, CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatINR, formatDate } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { Order } from '@/types';

const statusSteps: { status: Order['status']; label: string; icon: typeof Package }[] = [
  { status: 'Placed', label: 'Placed', icon: CheckCircle2 },
  { status: 'Packed', label: 'Packed', icon: Package },
  { status: 'Shipped', label: 'Shipped', icon: Truck },
  { status: 'Out for delivery', label: 'Out for Delivery', icon: Home },
  { status: 'Delivered', label: 'Delivered', icon: CheckCircle2 },
];

function getStatusIndex(status: Order['status']): number {
  if (status === 'Cancelled') return -1;
  return statusSteps.findIndex((s) => s.status === status);
}

export function OrdersPage() {
  const { orders, cancelOrder, addToCart } = useApp();

  const handleReorder = (order: Order) => {
    order.items.forEach((item) => addToCart(item));
    toast.success('Items added to cart');
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
          <Package className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="mt-4 text-xl font-semibold">No orders yet</h2>
        <p className="mt-1 text-sm text-muted-foreground">When you place an order, it will appear here.</p>
        <Button asChild className="mt-4"><Link to="/listing">Start Shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 lg:px-6">
      <h1 className="text-2xl font-bold sm:text-3xl mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order, idx) => {
          const statusIdx = getStatusIndex(order.status);
          const isCancelled = order.status === 'Cancelled';

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-border/50 bg-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-bold">{order.id}</p>
                  <p className="text-xs text-muted-foreground">Placed on {formatDate(order.placedAt)}</p>
                </div>
                {isCancelled ? (
                  <span className="flex items-center gap-1 rounded-full bg-destructive/10 px-3 py-1 text-xs font-semibold text-destructive">
                    <XCircle className="h-3.5 w-3.5" /> Cancelled
                  </span>
                ) : (
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    Est. delivery: {order.estimatedDelivery}
                  </span>
                )}
              </div>

              {/* Status timeline */}
              {!isCancelled && (
                <div className="mb-4">
                  <div className="flex items-center justify-between">
                    {statusSteps.map((step, i) => {
                      const Icon = step.icon;
                      const isCompleted = i <= statusIdx;
                      const isCurrent = i === statusIdx;
                      return (
                        <div key={step.status} className="flex flex-1 flex-col items-center relative">
                          {i < statusSteps.length - 1 && (
                            <div className={cn('absolute top-4 left-1/2 w-full h-0.5', i < statusIdx ? 'bg-primary' : 'bg-border')} />
                          )}
                          <div className={cn(
                            'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                            isCompleted ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground',
                            isCurrent && 'ring-4 ring-primary/20 scale-110'
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className={cn('mt-1.5 text-[10px] text-center hidden sm:block', isCompleted ? 'font-semibold text-primary' : 'text-muted-foreground')}>
                            {step.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Items */}
              <div className="space-y-2 mb-4">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <img src={item.image} alt={item.name} className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold">{formatINR(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between border-t border-border/50 pt-3">
                <span className="text-sm text-muted-foreground">Total: <span className="font-bold text-foreground">{formatINR(order.total)}</span></span>
                <div className="flex gap-2">
                  {!isCancelled && order.status === 'Placed' && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => { cancelOrder(order.id); toast.success('Order cancelled'); }}
                    >
                      Cancel
                    </Button>
                  )}
                  {!isCancelled && (
                    <Button size="sm" onClick={() => handleReorder(order)}>
                      <RotateCcw className="h-3.5 w-3.5 mr-1" />
                      Reorder
                    </Button>
                  )}
                  <Link to={`/order-confirmation/${order.id}`}>
                    <Button variant="ghost" size="sm">
                      Details <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
