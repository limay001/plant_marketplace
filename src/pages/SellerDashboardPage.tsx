import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, Plus, Edit2, Trash2, Package, ShoppingBag, TrendingUp, X, DollarSign } from 'lucide-react';
import { products as seedProducts } from '@/data/seed';
import { useApp } from '@/context/AppContext';
import { formatINR, calculateDiscount } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import type { Product, Category } from '@/types';

const categories: Category[] = ['Indoor', 'Air Purifying', 'Succulents', 'Herbs', 'Flowering', 'Pots & Planters'];

export function SellerDashboardPage() {
  const { orders } = useApp();
  const [productList, setProductList] = useState<Product[]>(seedProducts.filter((p) => p.sellerId === 's1'));
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', description: '', category: 'Indoor' as Category, price: '', mrp: '', light: 'Low', petSafe: false, beginner: false, size: 'Small', stock: '', image: '',
  });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalStock = productList.reduce((sum, p) => sum + p.stock, 0);

  const handleSave = () => {
    if (!formData.name || !formData.price) {
      toast.error('Please fill name and price');
      return;
    }
    const price = Number(formData.price);
    const mrp = Number(formData.mrp) || price;
    const stock = Number(formData.stock) || 0;

    if (editingId) {
      setProductList((prev) => prev.map((p) =>
        p.id === editingId
          ? {
              ...p,
              name: formData.name,
              description: formData.description,
              category: formData.category,
              price,
              mrp,
              light: formData.light as Product['light'],
              petSafe: formData.petSafe,
              beginner: formData.beginner,
              size: formData.size as Product['size'],
              stock,
              images: formData.image ? [formData.image, ...p.images.slice(1)] : p.images,
            }
          : p
      ));
      toast.success('Product updated');
    } else {
      const newProduct: Product = {
        id: `p_${Date.now()}`,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price,
        mrp,
        images: [formData.image || 'https://images.pexels.com/photos/1084199/pexels-photo-1084199.jpeg?auto=compress&w=600'],
        light: formData.light as Product['light'],
        petSafe: formData.petSafe,
        beginner: formData.beginner,
        size: formData.size as Product['size'],
        stock,
        rating: 0,
        reviewCount: 0,
        careGuide: { water: 'Every 1-2 weeks', light: formData.light + ' indirect', humidity: 'Average' },
        sellerId: 's1',
        tags: [],
      };
      setProductList((prev) => [newProduct, ...prev]);
      toast.success('Product added');
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', description: '', category: 'Indoor', price: '', mrp: '', light: 'Low', petSafe: false, beginner: false, size: 'Small', stock: '', image: '' });
  };

  const handleEdit = (p: Product) => {
    setEditingId(p.id);
    setFormData({
      name: p.name, description: p.description, category: p.category, price: String(p.price), mrp: String(p.mrp),
      light: p.light, petSafe: p.petSafe, beginner: p.beginner, size: p.size, stock: String(p.stock), image: p.images[0],
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setProductList((prev) => prev.filter((p) => p.id !== id));
    toast.success('Product deleted');
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:px-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
            <Store className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your products and orders</p>
          </div>
        </div>
        <Button onClick={() => { setEditingId(null); setShowForm(true); setFormData({ name: '', description: '', category: 'Indoor', price: '', mrp: '', light: 'Low', petSafe: false, beginner: false, size: 'Small', stock: '', image: '' }); }}>
          <Plus className="h-4 w-4 mr-1" /> Add Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-border/50 bg-card p-4">
          <Package className="h-5 w-5 text-primary" />
          <p className="mt-1 text-2xl font-bold">{productList.length}</p>
          <p className="text-xs text-muted-foreground">Products</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-4">
          <ShoppingBag className="h-5 w-5 text-primary" />
          <p className="mt-1 text-2xl font-bold">{orders.length}</p>
          <p className="text-xs text-muted-foreground">Orders</p>
        </div>
        <div className="rounded-2xl border border-border/50 bg-card p-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <p className="mt-1 text-2xl font-bold">{formatINR(totalRevenue)}</p>
          <p className="text-xs text-muted-foreground">Revenue</p>
        </div>
      </div>

      {/* Products table */}
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/50">
                <th className="px-4 py-3 text-left font-semibold">Product</th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-left font-semibold">Price</th>
                <th className="px-4 py-3 text-left font-semibold hidden sm:table-cell">Stock</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {productList.map((p) => {
                  const discount = calculateDiscount(p.price, p.mrp);
                  return (
                    <motion.tr
                      key={p.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="border-b border-border/50 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img src={p.images[0]} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                          <span className="font-medium line-clamp-1">{p.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell"><Badge variant="outline">{p.category}</Badge></td>
                      <td className="px-4 py-3">
                        <span className="font-bold">{formatINR(p.price)}</span>
                        {discount > 0 && <span className="ml-1 text-xs text-secondary">{discount}% off</span>}
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className={p.stock < 10 ? 'text-destructive font-medium' : ''}>{p.stock}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-1">
                          <button onClick={() => handleEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-accent" aria-label="Edit">
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={() => handleDelete(p.id)} className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive" aria-label="Delete">
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent orders */}
      {orders.length > 0 && (
        <div className="mt-6 rounded-2xl border border-border/50 bg-card p-5">
          <h2 className="font-semibold mb-3">Recent Orders</h2>
          <div className="space-y-2">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between rounded-xl border border-border/50 p-3">
                <div>
                  <p className="font-semibold text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.items.length} items · {order.status}</p>
                </div>
                <span className="font-bold text-sm">{formatINR(order.total)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="p-name">Product Name</Label>
              <Input id="p-name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="mt-1" placeholder="Snake Plant" />
            </div>
            <div>
              <Label htmlFor="p-desc">Description</Label>
              <Input id="p-desc" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="mt-1" placeholder="Tough houseplant..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="p-price">Price (₹)</Label>
                <Input id="p-price" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="mt-1" placeholder="299" />
              </div>
              <div>
                <Label htmlFor="p-mrp">MRP (₹)</Label>
                <Input id="p-mrp" type="number" value={formData.mrp} onChange={(e) => setFormData({ ...formData, mrp: e.target.value })} className="mt-1" placeholder="499" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Category</Label>
                <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v as Category })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Light Need</Label>
                <Select value={formData.light} onValueChange={(v) => setFormData({ ...formData, light: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Bright">Bright</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Size</Label>
                <Select value={formData.size} onValueChange={(v) => setFormData({ ...formData, size: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Small">Small</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="p-stock">Stock</Label>
                <Input id="p-stock" type="number" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} className="mt-1" placeholder="50" />
              </div>
            </div>
            <div>
              <Label htmlFor="p-img">Image URL</Label>
              <Input id="p-img" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="mt-1" placeholder="https://..." />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.petSafe} onChange={(e) => setFormData({ ...formData, petSafe: e.target.checked })} className="rounded" />
                <span className="text-sm">Pet Safe</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={formData.beginner} onChange={(e) => setFormData({ ...formData, beginner: e.target.checked })} className="rounded" />
                <span className="text-sm">Beginner Friendly</span>
              </label>
            </div>
            <div className="flex gap-2 pt-2">
              <Button onClick={handleSave} className="flex-1">{editingId ? 'Update' : 'Add'} Product</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
