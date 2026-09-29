import { format } from 'date-fns';

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculateDiscount(price: number, mrp: number): number {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd MMM yyyy');
}

export function generateOrderId(): string {
  const prefix = 'LL';
  const random = Math.random().toString(36).substring(2, 10).toUpperCase();
  return `${prefix}${random}`;
}

export function getEstimatedDelivery(days: number = 5): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return format(date, 'dd MMM yyyy');
}

export function getDeliveryDateRange(days: number = 5): string {
  const start = new Date();
  start.setDate(start.getDate() + days - 1);
  const end = new Date();
  end.setDate(end.getDate() + days + 1);
  return `${format(start, 'dd MMM')} – ${format(end, 'dd MMM')}`;
}
