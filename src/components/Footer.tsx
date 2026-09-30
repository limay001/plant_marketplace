import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border/50 bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} custom={0}>
            <div className="flex items-center gap-2">
              <motion.div
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary"
                whileHover={{ scale: 1.1, rotate: 8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              >
                <span>🌿</span>
              </motion.div>
              <span className="text-lg font-bold">Leafloop</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              India's AI-powered nursery. Bringing greenery to every home, one plant at a time.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <Icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} custom={1}>
            <h4 className="text-sm font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/listing?category=Indoor" className="hover:text-primary transition-colors">Indoor Plants</Link></li>
              <li><Link to="/listing?category=Air Purifying" className="hover:text-primary transition-colors">Air Purifying</Link></li>
              <li><Link to="/listing?category=Succulents" className="hover:text-primary transition-colors">Succulents</Link></li>
              <li><Link to="/listing?category=Herbs" className="hover:text-primary transition-colors">Herbs</Link></li>
              <li><Link to="/listing?category=Flowering" className="hover:text-primary transition-colors">Flowering</Link></li>
              <li><Link to="/listing?category=Pots & Planters" className="hover:text-primary transition-colors">Pots & Planters</Link></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} custom={2}>
            <h4 className="text-sm font-semibold mb-3">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/orders" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link to="/ask-leafy" className="hover:text-primary transition-colors">Ask Leafy AI</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Plant Care Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp} custom={3}>
            <h4 className="text-sm font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> care@leafloop.in</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> +91 90000 00000</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> Bengaluru, India</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 border-t border-border/50 pt-6 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          © 2026 Leafloop. All rights reserved. Made with 🌱 in India.
        </motion.div>
      </div>
    </footer>
  );
}