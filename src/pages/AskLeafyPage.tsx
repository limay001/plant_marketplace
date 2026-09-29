import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, ShoppingCart, Lightbulb, Droplets, Sun } from 'lucide-react';
import { products } from '@/data/seed';
import { useApp } from '@/context/AppContext';
import { formatINR } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { ChatMessage } from '@/types';

const quickPrompts = [
  'I have a low-light bedroom, what plants do you recommend?',
  'I have cats at home, which plants are safe?',
  'I want easy plants for a beginner',
  'Suggest air-purifying plants for my office',
];

function generateResponse(query: string): { content: string; recommendations: string[] } {
  const q = query.toLowerCase();
  let filtered = products.filter((p) => p.category !== 'Pots & Planters');

  if (q.includes('cat') || q.includes('pet') || q.includes('dog')) {
    filtered = filtered.filter((p) => p.petSafe);
  }
  if (q.includes('low light') || q.includes('low-light') || q.includes('dark') || q.includes('shade')) {
    filtered = filtered.filter((p) => p.light === 'Low' || p.light === 'Medium');
  }
  if (q.includes('beginner') || q.includes('easy') || q.includes('starter')) {
    filtered = filtered.filter((p) => p.beginner);
  }
  if (q.includes('air') || q.includes('purif')) {
    filtered = filtered.filter((p) => p.category === 'Air Purifying' || p.tags.includes('air-purifying'));
  }
  if (q.includes('herb') || q.includes('edible') || q.includes('cooking')) {
    filtered = filtered.filter((p) => p.category === 'Herbs');
  }
  if (q.includes('flower') || q.includes('bloom')) {
    filtered = filtered.filter((p) => p.category === 'Flowering');
  }
  if (q.includes('succulent') || q.includes('cactus')) {
    filtered = filtered.filter((p) => p.category === 'Succulents');
  }
  if (q.includes('office') || q.includes('desk') || q.includes('table')) {
    filtered = filtered.filter((p) => p.size === 'Small' || p.size === 'Medium');
  }
  if (q.includes('bathroom') || q.includes('humid')) {
    filtered = filtered.filter((p) => p.careGuide.humidity === 'High');
  }

  const recs = filtered.slice(0, 4);
  if (recs.length === 0) {
    return {
      content: "I couldn't find exact matches for your space. Here are some universally great plants that work almost anywhere!",
      recommendations: products.filter((p) => p.beginner && p.category !== 'Pots & Planters').slice(0, 3).map((p) => p.id),
    };
  }

  const tips = recs.map((p) => `${p.name}: ${p.careGuide.light.toLowerCase()} light, water ${p.careGuide.water.toLowerCase()}.`).join(' ');
  return {
    content: `Based on your description, here are ${recs.length} plants that would be perfect for your space. ${tips}`,
    recommendations: recs.map((p) => p.id),
  };
}

export function AskLeafyPage() {
  const { addToCart } = useApp();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Leafy, your AI plant assistant. Tell me about your space — how much light it gets, whether you have pets, and how often you'd like to water. I'll recommend the perfect plants for you!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (text?: string) => {
    const query = text || input.trim();
    if (!query) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: query }]);
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(query);
      setMessages((prev) => [...prev, { role: 'assistant', content: response.content, recommendations: response.recommendations }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 lg:px-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary">
          <Sparkles className="h-6 w-6 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Ask Leafy</h1>
          <p className="text-sm text-muted-foreground">Your AI plant consultant</p>
        </div>
      </div>

      <div className="rounded-3xl border border-border/50 bg-card overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 220px)', minHeight: '400px' }}>
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn('flex gap-3', msg.role === 'user' && 'flex-row-reverse')}
            >
              <div className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
              )}>
                {msg.role === 'assistant' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div className={cn('max-w-[75%]', msg.role === 'user' && 'text-right')}>
                <div className={cn(
                  'inline-block rounded-2xl px-4 py-2.5 text-sm',
                  msg.role === 'assistant' ? 'bg-muted text-foreground' : 'bg-primary text-primary-foreground'
                )}>
                  {msg.content}
                </div>

                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {msg.recommendations.map((pid) => {
                      const product = products.find((p) => p.id === pid);
                      if (!product) return null;
                      return (
                        <div key={pid} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background p-2.5">
                          <img src={product.images[0]} alt={product.name} className="h-14 w-14 rounded-lg object-cover" />
                          <div className="flex-1 min-w-0">
                            <Link to={`/product/${product.id}`}>
                              <p className="text-sm font-semibold line-clamp-1 hover:text-primary">{product.name}</p>
                            </Link>
                            <p className="text-xs text-muted-foreground">{product.light} light · {product.careGuide.water}</p>
                            <p className="text-sm font-bold">{formatINR(product.price)}</p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              addToCart({ productId: product.id, name: product.name, price: product.price, image: product.images[0], quantity: 1, size: product.size });
                              toast.success(`${product.name} added to cart`);
                            }}
                          >
                            <ShoppingCart className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-2 rounded-full bg-muted-foreground"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div className="px-4 pb-2 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:bg-accent transition-colors"
              >
                <Lightbulb className="h-3 w-3 text-primary" />
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border/50 p-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Describe your space, light, pets..."
              className="flex-1 rounded-full border border-input bg-transparent px-4 py-2.5 text-sm outline-none focus:border-primary"
            />
            <Button onClick={() => handleSend()} size="icon" className="rounded-full h-10 w-10">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
