import React, { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { toast } from "sonner";
import {
  Laptop, Smartphone, Headphones, Watch,
  Check, Star, ArrowRight, ShoppingCart,
  Percent, Flame, Clock, Quote
} from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 6, minutes: 42, seconds: 18 });

  const categories = [
    { name: "Laptops",      icon: <Laptop size={26} />,      count: "Premium Devices",  bg: "from-blue-500/10 to-indigo-500/10",  border: "hover:border-blue-400/40",   text: "text-blue-500",   num: "01" },
    { name: "Smartphones",  icon: <Smartphone size={26} />,  count: "Next-Gen Mobile",  bg: "from-pink-500/10 to-rose-500/10",    border: "hover:border-pink-400/40",   text: "text-pink-500",   num: "02" },
    { name: "Headphones",   icon: <Headphones size={26} />,  count: "Immersive Audio",  bg: "from-purple-500/10 to-violet-500/10",border: "hover:border-purple-400/40", text: "text-purple-500", num: "03" },
    { name: "Smartwatches", icon: <Watch size={26} />,       count: "Wearable Tech",    bg: "from-amber-500/10 to-orange-500/10", border: "hover:border-amber-400/40",  text: "text-amber-500",  num: "04" },
  ];

  const testimonials = [
    { name: "Alice Henderson", role: "UI Designer",       text: "The MacBook Pro M3 I bought is flawless. Shipping was incredibly fast, and customer support was super helpful throughout!", rating: 5, avatar: "AH", verified: true },
    { name: "Marcus Brody",    role: "Software Engineer", text: "Sony WH-1000XM5 headphones are outstanding. Excellent noise cancelling and authentic product. Will buy again!",           rating: 5, avatar: "MB", verified: true },
    { name: "Clara Vance",     role: "Tech Blogger",      text: "Best tech shopping experience. The layout is clean, checkout was seamless, and the product quality is top-notch.",         rating: 4, avatar: "CV", verified: true },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)   return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:8000/api/v1/product");
        if (res.data.success) setFeaturedProducts(res.data.products.slice(0, 8));
      } catch {
        setFeaturedProducts([
          { _id: "1", name: "MacBook Pro M3",       price: 1599, category: "Laptops",      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60", rating: 4.8, numReviews: 12, stock: 5  },
          { _id: "2", name: "iPhone 15 Pro",        price: 999,  category: "Smartphones",  image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&auto=format&fit=crop&q=60", rating: 4.6, numReviews: 18, stock: 10 },
          { _id: "3", name: "Sony WH-1000XM5",      price: 349,  category: "Headphones",   image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60", rating: 4.7, numReviews: 24, stock: 8  },
          { _id: "4", name: "Apple Watch Series 9", price: 399,  category: "Smartwatches", image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&auto=format&fit=crop&q=60", rating: 4.5, numReviews: 6,  stock: 4  },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    dispatch(addToCart({ product: product._id, name: product.name, price: product.price, image: product.image, qty: 1, stock: product.stock }));
    toast.success(`${product.name} added to cart!`);
  };

  const dealProducts = featuredProducts.slice(0, 3).map((p, idx) => {
    const discountRates  = [20, 15, 30];
    const itemsLeft      = [3, 6, 2];
    const totalClaimed   = [75, 45, 85];
    return {
      ...p,
      discount:      discountRates[idx % 3],
      originalPrice: Math.round(p.price / (1 - discountRates[idx % 3] / 100)),
      stockLeft:     itemsLeft[idx % 3],
      claimedPercent:totalClaimed[idx % 3],
    };
  });

  return (
    <div className="pt-20 bg-slate-50/60 dark:bg-slate-950 min-h-screen">

      {/* ─────────── 1. Hero ─────────── */}
      <Hero />

      {/* ─────────── 2. Categories ─────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="block w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Curated Collections</span>
            </div>
            <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Shop by Category
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
            Premium tech gear precisely curated by category — find exactly what elevates your life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`group relative bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/70 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden ${cat.border}`}
            >
              {/* Decorative number */}
              <span className="absolute top-4 right-5 text-[11px] font-black text-slate-200 dark:text-slate-800 tracking-widest select-none">
                {cat.num}
              </span>
              {/* Shine sweep on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.bg} flex items-center justify-center ${cat.text} mb-5 group-hover:scale-110 transition-transform duration-300`}>
                {cat.icon}
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-pink-600 transition-colors tracking-tight">
                {cat.name}
              </h4>
              <span className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 font-medium">{cat.count}</span>
              <div className={`mt-4 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${cat.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                Explore <ArrowRight size={10} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────── 3. Deals of the Day ─────────── */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-[15%]  w-[35%] h-[40%] bg-pink-500/8   rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-[20%] w-[45%] h-[50%] bg-purple-500/8 rounded-full blur-[140px] pointer-events-none" />
        {/* Horizontal rule accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Section header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-400 flex items-center gap-1.5">
                  <Flame size={12} className="fill-pink-400" /> Limited Time Offers
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-none">Deals of the Day</h2>
              <p className="text-slate-400 text-sm max-w-sm">Hurry — offers valid only while stock lasts.</p>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800 rounded-2xl px-6 py-4 backdrop-blur-sm">
              <Clock size={18} className="text-pink-400" />
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Ends in</p>
                <div className="flex items-center gap-1.5 font-mono font-black text-white">
                  {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center">
                        <span className="bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg text-sm tabular-nums">
                          {String(val).padStart(2, "0")}
                        </span>
                      </div>
                      {i < 2 && <span className="text-pink-500 text-base">:</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Deals grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-800/50 border border-slate-800 rounded-3xl h-[440px]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dealProducts.map((p) => (
                <div
                  key={p._id}
                  className="group bg-slate-950/60 border border-slate-800 rounded-3xl overflow-hidden hover:border-pink-500/40 shadow-xl hover:shadow-pink-500/10 transition-all duration-500 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative bg-slate-900 overflow-hidden h-56">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                    <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                      -{p.discount}% OFF
                    </span>
                    {p.stock === 0 && (
                      <span className="absolute inset-0 bg-slate-950/75 flex items-center justify-center text-white text-xs font-black uppercase tracking-widest">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.18em] text-pink-400">{p.category}</span>
                      <Link to={`/product/${p._id}`} className="hover:text-pink-400 transition-colors block mt-1">
                        <h4 className="font-extrabold text-base text-white truncate leading-snug">{p.name}</h4>
                      </Link>
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={11} className={idx < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-700"} />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">({p.numReviews})</span>
                    </div>

                    {/* Claim bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">Claimed <strong className="text-white">{p.claimedPercent}%</strong></span>
                        <span className="text-pink-400">Only {p.stockLeft} left!</span>
                      </div>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-pink-500 to-purple-600 h-full rounded-full"
                          style={{ width: `${p.claimedPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">${p.price}</span>
                        <span className="text-xs text-slate-600 line-through font-semibold">${p.originalPrice}</span>
                      </div>
                      <Button
                        disabled={p.stock === 0}
                        onClick={(e) => handleAddToCart(p, e)}
                        className="bg-pink-600 hover:bg-pink-500 text-white h-9 rounded-xl px-4 cursor-pointer text-xs gap-1.5 font-bold shadow-lg shadow-pink-600/20 hover:scale-[1.04] transition-all"
                      >
                        <ShoppingCart size={13} /> Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────── 4. Featured Products ─────────── */}
      <section className="py-24 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-14">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="block w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Trending Now</span>
              </div>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-none">Featured Tech</h2>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-widest text-pink-600 hover:text-pink-500 transition-colors"
            >
              Explore All <ArrowRight size={14} />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl h-96" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((p) => (
                <div
                  key={p._id}
                  className="group bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/70 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 flex flex-col"
                >
                  {/* Image */}
                  <Link to={`/product/${p._id}`} className="relative block bg-slate-50 dark:bg-slate-950 overflow-hidden h-52">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/15 transition-colors duration-300" />
                    {p.stock === 0 && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                        Sold Out
                      </span>
                    )}
                    {/* Quick-view pill on hover */}
                    <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="bg-white/90 text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                        View Details
                      </span>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-pink-600 mb-1">{p.category}</span>
                    <Link to={`/product/${p._id}`} className="hover:text-pink-600 transition-colors">
                      <h4 className="font-extrabold text-slate-850 dark:text-white text-sm truncate leading-snug mb-2">{p.name}</h4>
                    </Link>
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} size={10} className={idx < Math.round(p.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-800"} />
                        ))}
                      </div>
                      <span className="text-[9px] text-slate-400 font-bold ml-0.5">({p.numReviews})</span>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
                      <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight">${p.price}</span>
                      <Button
                        disabled={p.stock === 0}
                        onClick={(e) => handleAddToCart(p, e)}
                        className="bg-pink-600 hover:bg-pink-500 text-white h-8 rounded-lg px-3.5 cursor-pointer text-xs gap-1.5 font-bold transition-all hover:scale-[1.04]"
                      >
                        <ShoppingCart size={12} /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─────────── 5. Promo Banner ─────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden bg-slate-950 text-white p-10 md:p-16 shadow-2xl border border-slate-900">
          {/* Accent orb */}
          <div className="absolute top-0 right-0 w-[45%] h-full bg-pink-600/12 rounded-full blur-[110px] pointer-events-none" />
          <div className="absolute bottom-0 left-[10%] w-[30%] h-[60%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
          {/* Decorative corner */}
          <div className="absolute bottom-8 right-8 w-24 h-24 border border-slate-800 rounded-full opacity-40 pointer-events-none" />
          <div className="absolute bottom-14 right-14 w-12 h-12 border border-slate-700 rounded-full opacity-30 pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/25 text-pink-400 text-[10px] font-black uppercase tracking-widest">
                  <Percent size={11} /> Flash Offer
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="block w-8 h-[2px] bg-gradient-to-r from-amber-400 to-pink-500 rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Limited Time Only</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold leading-[1.08] tracking-tight">
                  Unleash Next-Gen Power.<br />
                  <span className="text-pink-400">Up to 40% Off</span> Laptops.
                </h2>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Upgrade your workflow with our premium selection of MacBook Pro and Dell XPS. Discount auto-applied at checkout.
              </p>
              <Link to="/products?category=Laptops">
                <Button className="bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold h-12 px-8 cursor-pointer tracking-wide transition-all hover:scale-[1.02]">
                  Claim Discount <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-tr from-pink-500/20 to-purple-500/10 rounded-3xl blur-[20px] opacity-60" />
                {/* Corner deco */}
                <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-pink-500/50 rounded-tl-xl" />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-purple-500/50 rounded-br-xl" />
                <div className="p-2 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-md relative">
                  <img
                    src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&auto=format&fit=crop&q=85"
                    alt="Promo laptop"
                    className="w-80 h-52 object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── 6. Features ─────────── */}
      <Features />

      {/* ─────────── 7. Testimonials ─────────── */}
      <section className="py-24 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 mb-16">
            <div className="flex items-center justify-center gap-3">
              <span className="block w-6 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Client Reviews</span>
              <span className="block w-6 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">What Our Buyers Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="relative bg-slate-50/60 dark:bg-slate-900/40 p-8 rounded-3xl border border-slate-100 dark:border-slate-800/70 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Decorative quote mark */}
                <Quote size={36} className="absolute top-6 right-6 text-pink-100 dark:text-slate-800 rotate-180" />

                <div className="flex text-amber-400 mb-5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-4 mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-200/50 dark:border-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400 font-black text-xs shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <h5 className="font-extrabold text-slate-800 dark:text-white text-sm flex items-center gap-1.5">
                      {t.name}
                      {t.verified && (
                        <span className="inline-flex items-center justify-center w-4 h-4 bg-teal-500 rounded-full">
                          <Check size={8} className="text-white" />
                        </span>
                      )}
                    </h5>
                    <span className="text-[11px] text-slate-400 font-medium">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── 8. Newsletter ─────────── */}
      <section className="py-0">
        <div className="bg-slate-950 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }} />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
          <div className="absolute top-[-30%] left-[30%] w-[40%] h-[80%] bg-purple-600/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-2xl mx-auto px-6 py-24 text-center relative z-10 space-y-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <span className="block w-8 h-[1px] bg-gradient-to-r from-transparent to-pink-500 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Newsletter</span>
              <span className="block w-8 h-[1px] bg-gradient-to-l from-transparent to-pink-500 rounded-full" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.1]">
              Stay Ahead of the <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Tech Curve</span>
            </h2>
            <p className="text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
              Get early-bird deals, exclusive coupon codes, and curated tech reviews — straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-2.5 pt-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-slate-900 border border-slate-800 focus:border-pink-500/60 rounded-xl px-4 py-3 text-sm outline-none flex-grow text-slate-200 placeholder:text-slate-600 transition-colors"
              />
              <Button
                onClick={() => toast.success("Thank you for subscribing to Aura!")}
                className="bg-pink-600 hover:bg-pink-500 text-white rounded-xl font-bold h-12 px-7 cursor-pointer hover:shadow-lg hover:shadow-pink-600/25 transition-all shrink-0"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-[10px] text-slate-600 font-medium">No spam, ever. Unsubscribe anytime.</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
