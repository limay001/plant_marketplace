import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span>🌿</span>
              </div>
              <span className="text-lg font-bold">Leafloop</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              India's AI-powered nursery. Bringing greenery to every home, one plant at a time.
            </p>
            <div className="mt-4 flex gap-3">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-accent transition-colors" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/listing?category=Indoor" className="hover:text-primary transition-colors">Indoor Plants</Link></li>
              <li><Link to="/listing?category=Air Purifying" className="hover:text-primary transition-colors">Air Purifying</Link></li>
              <li><Link to="/listing?category=Succulents" className="hover:text-primary transition-colors">Succulents</Link></li>
              <li><Link to="/listing?category=Herbs" className="hover:text-primary transition-colors">Herbs</Link></li>
              <li><Link to="/listing?category=Flowering" className="hover:text-primary transition-colors">Flowering</Link></li>
              <li><Link to="/listing?category=Pots & Planters" className="hover:text-primary transition-colors">Pots & Planters</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/orders" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/ask-leafy" className="hover:text-primary transition-colors">Ask Leafy AI</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Plant Care Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> care@leafloop.in</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 90000 00000</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Bengaluru, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground">
          © 2026 Leafloop. All rights reserved. Made with 🌱 in India.
        </div>
      </div>
    </footer>
  );
}
