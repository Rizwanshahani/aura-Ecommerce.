import { ShoppingCart, ShieldAlert, LogOut, User, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import api from "@/lib/api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/UserSlice";
import { useState, useEffect } from "react";

const Navbar = () => {
  const { user } = useSelector(store => store.user);
  const { cartItems } = useSelector(store => store.cart);
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await api.post(`/user/logout`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (res.data.success || res.status === 200) {
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        toast.success(res.data.message || "Logged out successfully");
        navigate('/');
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to log out");
      dispatch(setUser(null));
      localStorage.removeItem("accessToken");
      navigate('/');
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-xs border-b border-slate-100 dark:border-slate-900 py-3" 
          : "bg-white/95 dark:bg-slate-950/95 border-b border-slate-50 dark:border-slate-900/50 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-violet-600 shadow-sm overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <img
              src="/aura.png"
              alt="Aura Logo"
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) => {
                // simple fallback if aura.png is not found
                e.target.style.display = 'none';
              }}
            />
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
            AURA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center">
          <ul className="flex gap-6 items-center text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name} className="relative py-1">
                  <Link 
                    to={link.path} 
                    className={`hover:text-pink-600 transition-colors duration-250 ${
                      isActive ? "text-pink-600 font-bold" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                  {/* Subtle underline for active link */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
                  )}
                </li>
              );
            })}

            {user && (
              <li className="relative py-1">
                <Link 
                  to="/profile" 
                  className={`hover:text-pink-600 transition-colors duration-250 flex items-center gap-1.5 ${
                    location.pathname === "/profile" ? "text-pink-600 font-bold" : ""
                  }`}
                >
                  <User size={15} />
                  <span>Hello, {user.firstName}</span>
                </Link>
                {location.pathname === "/profile" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></span>
                )}
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link 
                  to="/admin" 
                  className="text-purple-600 hover:text-purple-700 transition-colors flex items-center gap-1 bg-purple-50 dark:bg-purple-950/30 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  <ShieldAlert size={14} /> Admin Panel
                </Link>
              </li>
            )}
          </ul>

          <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800"></div>

          {/* Cart Icon & Auth Buttons */}
          <div className="flex items-center gap-6">
            <Link 
              to="/cart" 
              className="relative text-slate-700 dark:text-slate-350 hover:text-pink-600 transition-colors p-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl"
            >
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full absolute -top-1.5 -right-1.5 min-w-5 h-5 flex items-center justify-center px-1 text-[10px] font-black border-2 border-white dark:border-slate-950">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <Button 
                onClick={logoutHandler} 
                variant="ghost"
                className="hover:text-red-600 text-slate-700 hover:bg-red-50 dark:hover:bg-red-950/30 font-semibold cursor-pointer rounded-xl text-xs gap-1.5 h-9"
              >
                <LogOut size={14} />
                Log out
              </Button>
            ) : (
              <Link to="/login">
                <Button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white cursor-pointer rounded-xl font-bold text-xs h-9 px-4.5 shadow-xs shadow-pink-500/10">
                  Log in
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle & Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <Link 
            to="/cart" 
            className="relative text-slate-700 dark:text-slate-300 p-1.5 hover:bg-slate-50 rounded-xl"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="bg-pink-500 text-white rounded-full absolute -top-1 -right-1 min-w-4.5 h-4.5 flex items-center justify-center text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-750 p-1 hover:bg-slate-50 rounded-lg outline-none"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-900 shadow-md py-4 px-6 animate-in slide-in-from-top-5 duration-200">
          <ul className="flex flex-col gap-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 hover:text-pink-600 ${
                    location.pathname === link.path ? "text-pink-600 font-bold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {user && (
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block py-1 hover:text-pink-600 flex items-center gap-2 ${
                    location.pathname === "/profile" ? "text-pink-600 font-bold" : ""
                  }`}
                >
                  <User size={16} />
                  Profile ({user.firstName})
                </Link>
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-purple-600 py-1 flex items-center gap-1.5 font-bold"
                >
                  <ShieldAlert size={16} /> Admin Panel
                </Link>
              </li>
            )}

            <li className="pt-2 border-t border-slate-100 dark:border-slate-900">
              {user ? (
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutHandler();
                  }}
                  className="w-full bg-red-50 text-red-600 hover:bg-red-100 font-bold h-10 rounded-xl"
                >
                  Log out
                </Button>
              ) : (
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold h-10 rounded-xl">
                    Log in
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
