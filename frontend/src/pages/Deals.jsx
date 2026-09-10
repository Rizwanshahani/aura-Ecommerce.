import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toast } from "sonner";
import {
  Flame, Clock, Star, ShoppingCart, ArrowRight,
  Sparkles, Tag, ShieldCheck, Zap
} from "lucide-react";

const Deals = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Synchronized countdown timer
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await api.get("/product");
        if (res.data.success && res.data.products) {
          setProducts(res.data.products);
        }
      } catch {
        toast.error("Failed to load deals");
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: 1,
        stock: product.stock,
      })
    );
    toast.success(`${product.name} added to cart!`);
  };

  const discountRates = [25, 20, 30, 15, 35, 18, 22, 28, 15, 30, 20, 25];
  const dealProducts = products.map((p, idx) => {
    const discount = discountRates[idx % discountRates.length];
    const originalPrice = Math.round(p.price / (1 - discount / 100));
    const claimedPercent = 45 + ((idx * 13) % 46);
    const stockLeft = Math.max(1, p.stock || 5);
    return {
      ...p,
      discount,
      originalPrice,
      claimedPercent,
      stockLeft,
    };
  });

  return (
    <div className="pt-28 pb-24 bg-slate-950 text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        {/* Hero Banner Header */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-pink-950/40 via-purple-950/30 to-slate-900/50 border border-pink-500/20 p-8 md:p-14">
          <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-400 text-xs font-black uppercase tracking-wider">
                <Flame size={14} className="fill-pink-400" /> Exclusive Daily Flash Sales
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Deals of the <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Product</span>
              </h1>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                Save up to 35% on top-tier premium laptops, smartphones, headphones, and electronics. All offers include authentic warranty and complimentary express shipping.
              </p>
            </div>

            {/* Countdown Box */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 backdrop-blur-md shrink-0 space-y-2">
              <div className="flex items-center gap-2 text-pink-400 text-xs font-bold uppercase tracking-widest">
                <Clock size={15} /> Flash Sale Ends In:
              </div>
              <div className="flex items-center gap-2 font-mono text-2xl font-black">
                <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                  {String(timeLeft.hours).padStart(2, "0")}
                  <span className="block text-[9px] font-sans font-medium text-slate-400 uppercase">Hours</span>
                </div>
                <span>:</span>
                <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                  {String(timeLeft.minutes).padStart(2, "0")}
                  <span className="block text-[9px] font-sans font-medium text-slate-400 uppercase">Mins</span>
                </div>
                <span>:</span>
                <div className="bg-slate-800 px-3 py-2 rounded-xl border border-slate-700 text-pink-400">
                  {String(timeLeft.seconds).padStart(2, "0")}
                  <span className="block text-[9px] font-sans font-medium text-slate-400 uppercase">Secs</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Zap size={18} className="text-pink-400" />, title: "Instant Savings", desc: "Auto-applied at checkout" },
            { icon: <ShieldCheck size={18} className="text-teal-400" />, title: "100% Genuine", desc: "Full manufacturer warranty" },
            { icon: <Tag size={18} className="text-amber-400" />, title: "Best Price Guarantee", desc: "Price-match on all deals" },
            { icon: <Sparkles size={18} className="text-purple-400" />, title: "Free Express Shipping", desc: "2-3 business days" },
          ].map((b, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-slate-800/60 shrink-0">{b.icon}</div>
              <div>
                <h5 className="font-bold text-xs text-white">{b.title}</h5>
                <p className="text-[10px] text-slate-400">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-slate-900 border border-slate-800 rounded-3xl h-96" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {dealProducts.map((p) => (
              <div
                key={p._id}
                className="group bg-slate-900/60 border border-slate-800/80 rounded-3xl overflow-hidden hover:border-pink-500/40 shadow-xl hover:shadow-pink-500/10 transition-all duration-400 flex flex-col"
              >
                {/* Image */}
                <div className="relative bg-slate-950 overflow-hidden h-60">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    -{p.discount}% OFF
                  </span>
                  <span className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 text-[10px] text-slate-300 font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {p.category}
                  </span>
                  {p.stock === 0 && (
                    <span className="absolute inset-0 bg-slate-950/80 flex items-center justify-center text-white text-xs font-black uppercase tracking-widest">
                      Sold Out
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div>
                    <Link to={`/product/${p._id}`} className="hover:text-pink-400 transition-colors block">
                      <h4 className="font-extrabold text-lg text-white truncate leading-snug">{p.name}</h4>
                    </Link>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={12}
                          className={idx < Math.round(p.rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-700"}
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-slate-400 font-bold">
                      {p.rating ? p.rating.toFixed(1) : "5.0"}
                    </span>
                  </div>

                  {/* Claimed progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-slate-400">Claimed <strong className="text-white">{p.claimedPercent}%</strong></span>
                      <span className="text-pink-400">Only {p.stockLeft} left</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full"
                        style={{ width: `${p.claimedPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">${p.price}</span>
                        <span className="text-xs text-slate-500 line-through font-bold">${p.originalPrice}</span>
                      </div>
                      <span className="text-[10px] font-bold text-teal-400">Save ${p.originalPrice - p.price}</span>
                    </div>
                    <Button
                      disabled={p.stock === 0}
                      onClick={(e) => handleAddToCart(p, e)}
                      className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white h-10 rounded-xl px-4 cursor-pointer text-xs gap-1.5 font-bold shadow-md hover:scale-105 transition-all"
                    >
                      <ShoppingCart size={14} /> Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;
