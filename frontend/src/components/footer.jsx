import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Welcome aboard! Thank you for subscribing to Aura.");
    setEmail("");
  };

  const shopLinks = [
    { label: "High-End Laptops", to: "/products?category=Laptops" },
    { label: "Smartphones", to: "/products?category=Smartphones" },
    { label: "Premium Audio", to: "/products?category=Headphones" },
    { label: "Wearable Tech", to: "/products?category=Smartwatches" }
  ];

  const companyLinks = [
    { label: "About Our Story", to: "/about" },
    { label: "Contact Specialists", to: "/contact" },
    { label: "Frequently Asked Questions", to: "/faq" }
  ];

  const policyLinks = [
    { label: "Terms of Service", to: "/faq" },
    { label: "Privacy Statement", to: "/faq" },
    { label: "Refund and Return Policy", to: "/faq" }
  ];

  const socialLinks = [
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ), 
      to: "#", 
      label: "Instagram", 
      color: "hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-pink-500 hover:to-purple-600 hover:text-white" 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ), 
      to: "#", 
      label: "Twitter", 
      color: "hover:bg-black hover:text-white" 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ), 
      to: "#", 
      label: "Facebook", 
      color: "hover:bg-blue-600 hover:text-white" 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
        </svg>
      ), 
      to: "#", 
      label: "LinkedIn", 
      color: "hover:bg-blue-750 hover:text-white" 
    },
    { 
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ), 
      to: "#", 
      label: "YouTube", 
      color: "hover:bg-red-600 hover:text-white" 
    }
  ];

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">
      
      {/* Top Newsletter & Brand Bar */}
      <div className="border-b border-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-pink-500/30 overflow-hidden shadow-lg shadow-pink-500/10 p-0.5 flex items-center justify-center">
                <img src="/aura.png" alt="AURA Logo" className="w-full h-full object-cover rounded-[10px]" />
              </div>
              <span className="text-2xl font-black text-white tracking-[0.2em] bg-gradient-to-r from-white via-slate-100 to-pink-400 bg-clip-text text-transparent">
                AURA
              </span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm">
              Discover cutting-edge technology with unbeatable deals and seamless premium shopping.
            </p>
          </div>
          
          <div className="lg:col-span-2 flex flex-col sm:flex-row gap-3 items-stretch justify-end">
            <div className="text-left mb-2 sm:mb-0 sm:mr-4 self-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white">Join the Aura Club</h4>
              <p className="text-[11px] text-slate-550">Get 10% off your first purchase and stay updated on tech deals.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md w-full">
              <input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs focus:border-pink-500 outline-none text-white flex-grow"
              />
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white rounded-xl font-bold h-9 px-4.5 cursor-pointer flex items-center justify-center gap-1.5 transition-colors text-xs shrink-0"
              >
                <Send size={12} />
                <span>Subscribe</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Links Area */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Shop Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase border-l-2 border-pink-500 pl-3">
              Shop Collections
            </h3>
            <ul className="space-y-2.5 pl-3">
              {shopLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-xs hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase border-l-2 border-pink-500 pl-3">
              Our Company
            </h3>
            <ul className="space-y-2.5 pl-3">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-xs hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase border-l-2 border-pink-500 pl-3">
              Policy & Care
            </h3>
            <ul className="space-y-2.5 pl-3">
              {policyLinks.map((link, idx) => (
                <li key={idx}>
                  <Link 
                    to={link.to} 
                    className="text-xs hover:text-white transition-colors duration-200 block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4 text-left">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase border-l-2 border-pink-500 pl-3">
              Support Center
            </h3>
            <ul className="space-y-3.5 pl-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-pink-500 shrink-0 mt-0.5" />
                <span>100 Innovation Blvd, Suite 400, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="text-pink-500 shrink-0" />
                <a href="tel:+18005550199" className="hover:text-white transition-colors">+1 (800) 555-0199</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="text-pink-500 shrink-0" />
                <a href="mailto:support@aura.com" className="hover:text-white transition-colors">support@aura.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock size={14} className="text-pink-500 shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM EST</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Social & Trusted Badges Row */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-550 mr-2">Stay Connected:</span>
            {socialLinks.map((social, idx) => (
              <a 
                key={idx} 
                href={social.to}
                aria-label={social.label}
                className={`w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Payment Badges (Clean styled CSS shapes / SVG mimics) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-550 mr-2 font-bold uppercase tracking-wider">Secured Checkout:</span>
            <div className="flex gap-2">
              <span className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-[9px] font-black tracking-wider uppercase">Visa</span>
              <span className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-[9px] font-black tracking-wider uppercase">Mastercard</span>
              <span className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-[9px] font-black tracking-wider uppercase">Paypal</span>
              <span className="bg-slate-900 border border-slate-800 text-white rounded px-2.5 py-1 text-[9px] font-black tracking-wider uppercase">Apple Pay</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-650 text-xs">
          <p className="text-[11px]">
            &copy; {currentYear} Aura Tech Inc. All rights reserved. Created with modern aesthetics.
          </p>
          <div className="flex space-x-6 text-[11px]">
            <Link to="/faq" className="hover:text-slate-300 transition-colors">Security</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">Privacy</Link>
            <Link to="/faq" className="hover:text-slate-300 transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
