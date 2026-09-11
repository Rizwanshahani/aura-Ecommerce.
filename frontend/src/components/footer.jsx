import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import {
  Truck,
  ShieldCheck,
  RefreshCw,
  Lock,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Sparkles,
  ArrowRight,
  Flame,
  Star
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome to the Aura VIP Circle! Use code AURA10 for 10% off your next order.");
    setEmail("");
  };

  const trustFeatures = [
    {
      icon: <Truck size={22} className="text-pink-500" />,
      title: "Free Express Shipping",
      desc: "Complimentary priority dispatch on orders over $500"
    },
    {
      icon: <ShieldCheck size={22} className="text-purple-400" />,
      title: "2-Year Comprehensive Warranty",
      desc: "100% authentic hardware with full manufacturer guarantee"
    },
    {
      icon: <RefreshCw size={22} className="text-pink-400" />,
      title: "30-Day Hassle-Free Returns",
      desc: "Full money-back satisfaction guarantee with prepaid returns"
    },
    {
      icon: <Lock size={22} className="text-emerald-400" />,
      title: "256-Bit Encrypted Checkout",
      desc: "Bank-grade SSL encryption and secure instant payments"
    }
  ];

  const shopLinks = [
    { label: "High-End Laptops", to: "/products?category=Laptops" },
    { label: "Flagship Smartphones", to: "/products?category=Smartphones" },
    { label: "Studio Headphones & ANC", to: "/products?category=Headphones" },
    { label: "Luxury Smartwatches", to: "/products?category=Smartwatches" },
    { label: "Electronics Accessories", to: "/products?category=Accessories" },
    { label: "Exclusive Daily Deals", to: "/deals", isHot: true }
  ];

  const serviceLinks = [
    { label: "Track Your Order", to: "/profile" },
    { label: "Customer Reviews & Ratings", to: "/reviews" },
    { label: "Shopping Bag / Cart", to: "/cart" },
    { label: "Fast Express Checkout", to: "/checkout" },
    { label: "Delivery & Shipping Rates", to: "/faq" },
    { label: "Returns & Refund Policy", to: "/faq" }
  ];

  const companyLinks = [
    { label: "Our Story & Vision", to: "/about" },
    { label: "Authenticity & Heritage", to: "/about" },
    { label: "Contact Tech Specialists", to: "/contact" },
    { label: "Help & Knowledge Base", to: "/faq" },
    { label: "Terms of Service", to: "/faq" },
    { label: "Privacy Policy", to: "/faq" }
  ];

  const socialLinks = [
    {
      label: "Instagram",
      to: "https://instagram.com",
      color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    },
    {
      label: "X (Twitter)",
      to: "https://twitter.com",
      color: "hover:bg-slate-900 hover:text-white hover:border-slate-700",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      label: "Facebook",
      to: "https://facebook.com",
      color: "hover:bg-blue-600 hover:text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      label: "LinkedIn",
      to: "https://linkedin.com",
      color: "hover:bg-blue-700 hover:text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
        </svg>
      )
    },
    {
      label: "YouTube",
      to: "https://youtube.com",
      color: "hover:bg-red-600 hover:text-white",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900/90 relative overflow-hidden">
      
      {/* ── Ambient Background Glows ── */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-700/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ── 1. Top Guarantees & Trust Banner ── */}
      <div className="border-b border-slate-900/80 bg-slate-900/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((f, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 hover:border-pink-500/30 transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-md group-hover:scale-110 transition-transform duration-300 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white tracking-wide">{f.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-light">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. VIP Newsletter & Club Banner ── */}
      <div className="border-b border-slate-900/80 py-12 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/80 to-purple-950/40 border border-pink-500/20 p-8 md:p-10 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left copy */}
            <div className="space-y-2 text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-[10px] font-black uppercase tracking-widest">
                <Sparkles size={11} className="animate-pulse" />
                <span>Join Aura VIP Club</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Unlock 10% Off Your First Order
              </h3>
              <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                Subscribe for private invitations to rare hardware drops, flash sales, and early access to flagships.
              </p>
            </div>

            {/* Subscription Form */}
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 w-full lg:max-w-md shrink-0">
              <div className="relative flex-grow">
                <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="Enter your VIP email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl pl-11 pr-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors shadow-inner"
                />
              </div>
              <button
                type="submit"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg shadow-pink-600/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <span>Subscribe</span>
                <Send size={13} />
              </button>
            </form>

          </div>
        </div>
      </div>

      {/* ── 3. Main Navigation Grid ── */}
      <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Info & Mission (Cols 1-2) */}
          <div className="lg:col-span-2 space-y-5 text-left pr-4">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-slate-950 p-1 border border-pink-500/40 group-hover:border-pink-400 shadow-xl shadow-pink-500/15 overflow-hidden group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                <img src="/aura.png" alt="AURA" className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-[0.22em] bg-gradient-to-r from-white via-slate-100 to-pink-400 bg-clip-text text-transparent group-hover:to-purple-400 transition-all">
                  AURA
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.32em] text-pink-500/80 -mt-1">
                  Luxury Tech & Audio
                </span>
              </div>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed font-light max-w-sm">
              Aura is the premier destination for discerning tech enthusiasts. We curate the globe's finest laptops, smartphones, precision audio monitors, and wearables — crafted for those who demand beyond ordinary.
            </p>

            {/* Rating pill */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-white">4.9 / 5 Rating</span>
              <span className="text-[10px] text-slate-500 font-semibold">(5,000+ Reviews)</span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white border-l-2 border-pink-500 pl-3">
              Catalog
            </h4>
            <ul className="space-y-2.5 pl-3">
              {shopLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                    {item.isHot && (
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-pink-500/20 text-pink-400 border border-pink-500/30">
                        <Flame size={10} className="fill-pink-400" /> Hot
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services & Orders Column */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white border-l-2 border-purple-500 pl-3">
              Client Care
            </h4>
            <ul className="space-y-2.5 pl-3">
              {serviceLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    to={item.to}
                    className="text-xs text-slate-400 hover:text-white transition-colors duration-200 inline-flex items-center gap-1.5 group"
                  >
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div className="space-y-4 text-left">
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-white border-l-2 border-pink-500 pl-3">
              Concierge
            </h4>
            <ul className="space-y-3 pl-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-pink-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-snug">100 Innovation Blvd, Suite 400, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-pink-400 shrink-0" />
                <a href="tel:+18005550199" className="text-[11px] hover:text-white transition-colors font-medium">
                  +1 (800) 555-0199
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-pink-400 shrink-0" />
                <a href="mailto:support@aura.com" className="text-[11px] hover:text-white transition-colors font-medium">
                  support@aura.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-pink-400 shrink-0" />
                <span className="text-[11px]">24/7 Dedicated Concierge</span>
              </li>
            </ul>
          </div>

        </div>

        {/* ── 4. Social Links & Payment Partners Bar ── */}
        <div className="mt-14 pt-8 border-t border-slate-900/90 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Connect:</span>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.to}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 shadow-sm ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mr-1">
              Guaranteed Safe Checkout:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {[
                { name: "Visa", icon: "VISA" },
                { name: "Mastercard", icon: "MC" },
                { name: "Apple Pay", icon: " PAY" },
                { name: "Google Pay", icon: "G PAY" },
                { name: "PayPal", icon: "PAYPAL" }
              ].map((p, i) => (
                <span
                  key={i}
                  className="bg-slate-900 border border-slate-800 text-slate-200 rounded-lg px-2.5 py-1 text-[10px] font-black tracking-wider uppercase shadow-xs"
                >
                  {p.icon}
                </span>
              ))}
              <span className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 rounded-lg px-2.5 py-1 text-[9px] font-black tracking-wider uppercase flex items-center gap-1">
                <Lock size={10} /> 256-Bit SSL
              </span>
            </div>
          </div>

        </div>

        {/* ── 5. Bottom Copyright & Legal ── */}
        <div className="mt-10 pt-8 border-t border-slate-900/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p className="text-[11px] text-center sm:text-left">
            &copy; {currentYear} <strong className="text-slate-300 font-semibold">Aura Tech Inc.</strong> All rights reserved. Curated for the exceptional.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[11px]">
            <Link to="/faq" className="hover:text-slate-300 transition-colors">Security & Compliance</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">Cookie Preferences</Link>
            <Link to="/about" className="hover:text-slate-300 transition-colors">Sustainability</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
