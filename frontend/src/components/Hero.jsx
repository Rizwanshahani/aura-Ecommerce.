import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-slate-950 text-white min-h-[92vh] flex items-center overflow-hidden">

      {/* ── Ambient Glow Orbs ── */}
      <div className="absolute top-[-15%] left-[-8%] w-[55%] h-[55%] bg-pink-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-8%] w-[50%] h-[50%] bg-violet-700/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-[35%] left-[45%] w-[35%] h-[35%] bg-blue-500/8 rounded-full blur-[110px] pointer-events-none" />

      {/* ── Subtle Grid Texture ── */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16 w-full z-10">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          {/* ─── Left Content ─── */}
          <div className="space-y-8 text-left">

            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 text-pink-400 text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-inner">
              <Sparkles size={13} className="animate-pulse" />
              Premium Tech · 100% Authentic
            </div>

            {/* Headline with gold accent rule */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="block w-8 h-[2px] bg-gradient-to-r from-amber-400 to-pink-500 rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">New Collection 2025</span>
              </div>
              <h1 className="text-5xl md:text-[4.5rem] font-extrabold leading-[1.08] tracking-[-0.02em]">
                Elevate Your <br />
                <span className="bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Digital Aura
                </span>
              </h1>
              <p className="text-base md:text-lg text-slate-400 max-w-lg leading-relaxed font-light">
                The world's finest smartphones, laptops, and audio gear — curated for those who demand more than ordinary.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-pink-600 hover:bg-pink-500 text-white px-9 cursor-pointer h-12 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-pink-600/30 flex items-center gap-2 font-bold tracking-wide"
                >
                  Shop Catalog <ArrowRight size={17} />
                </Button>
              </Link>
              <Link to="/products?sort=price-asc">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-700 hover:border-pink-500/60 hover:bg-slate-900/70 text-slate-300 px-9 cursor-pointer h-12 rounded-xl transition-all duration-300 font-semibold tracking-wide"
                >
                  View Deals
                </Button>
              </Link>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              {[
                { icon: <ShieldCheck size={14} className="text-teal-400" />, label: "2-Year Warranty" },
                { icon: <Zap size={14} className="text-amber-400" />, label: "Same-Day Dispatch" },
                { icon: <Star size={14} className="text-pink-400 fill-pink-400" />, label: "4.9 / 5 Rating" },
              ].map((b) => (
                <div key={b.label} className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  {b.icon} {b.label}
                </div>
              ))}
            </div>

            {/* Metric bar */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-800/80 max-w-sm">
              {[
                { val: "5k+", label: "Customers" },
                { val: "99%", label: "Satisfaction" },
                { val: "24h", label: "Fast Dispatch" },
              ].map((m) => (
                <div key={m.label}>
                  <h4 className="text-2xl font-black text-white tracking-tight">{m.val}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ─── Right — Cinematic Image Frame ─── */}
          <div className="flex justify-center relative">
            {/* Glow halo behind frame */}
            <div className="absolute inset-4 bg-gradient-to-tr from-pink-500/20 via-purple-500/15 to-indigo-500/10 rounded-3xl blur-[40px] opacity-60 pointer-events-none" />

            <div className="relative group">
              {/* Decorative corner lines */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-2 border-l-2 border-pink-500/60 rounded-tl-xl pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-2 border-r-2 border-purple-500/60 rounded-br-xl pointer-events-none" />

              {/* Main image frame */}
              <div className="relative p-2 bg-gradient-to-br from-slate-800/80 to-slate-900/60 border border-slate-700/50 rounded-3xl backdrop-blur-md shadow-2xl transition-all duration-500 hover:scale-[1.015] hover:border-slate-600/60">
                <img
                  src="/aura-hero1.png"
                  alt="Latest Electronics Showcase"
                  width={520}
                  height={420}
                  className="rounded-2xl object-cover w-full"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=640&auto=format&fit=crop&q=85";
                  }}
                />

                {/* Floating offer card */}
                <div className="absolute bottom-7 left-6 bg-slate-950/95 border border-slate-800 text-white rounded-2xl px-4 py-3 shadow-2xl backdrop-blur-lg flex items-center gap-3 animate-bounce">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
                  <div>
                    <p className="text-[10px] font-semibold text-slate-400 leading-none uppercase tracking-wider">Flash Sale</p>
                    <p className="text-sm font-extrabold text-pink-400 mt-0.5">Up to 40% Off</p>
                  </div>
                </div>

                {/* Floating rating card */}
                <div className="absolute top-6 right-6 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2 shadow-xl backdrop-blur-lg">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">5,000+ reviews</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;