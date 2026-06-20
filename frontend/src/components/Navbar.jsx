import { ShoppingCart, ShieldAlert } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/UserSlice";

const Navbar = () => {
  const {user} = useSelector(store=>store.user)
  const {cartItems} = useSelector(store=>store.cart)
  const accessToken = localStorage.getItem("accessToken")
  const dispatch= useDispatch()
  const navigate = useNavigate()

  const logoutHandler= async()=>{
    try {
      const res= await axios.post(`http://localhost:8000/api/v1/user/logout`,{},{
        headers:{
          Authorization: `Bearer ${accessToken}`
        }
      })
      if(res.data.success || res.status === 200){
        dispatch(setUser(null));
        localStorage.removeItem("accessToken");
        toast.success(res.data.message || "Logged out successfully");
        navigate('/');
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "Failed to log out");
      // Fallback: clear state if request fails
      dispatch(setUser(null));
      localStorage.removeItem("accessToken");
      navigate('/');
    }
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="bg-pink-50 fixed top-0 w-full z-20 border-b border-pink-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-7">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/aura.png"
            alt="Aura Logo"
            className="w-12 rounded-full"
          />
          <span className="text-xl font-black text-pink-600 tracking-wider">AURA</span>
        </Link>

        <nav className="flex gap-10 items-center">
          <ul className="flex gap-7 items-center text-lg font-bold text-slate-700">
            <li>
              <Link to="/" className="hover:text-pink-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-pink-600 transition-colors">Products</Link>
            </li>

            {user && (
              <li>
                <Link to="/profile" className="hover:text-pink-600 transition-colors">Hello, {user.firstName}</Link>
              </li>
            )}

            {user && user.role === "admin" && (
              <li>
                <Link to="/admin" className="text-pink-700 hover:text-pink-900 transition-colors flex items-center gap-1">
                  <ShieldAlert size={16} /> Admin
                </Link>
              </li>
            )}
          </ul>

          <Link to="/cart" className="relative text-slate-700 hover:text-pink-600 transition-colors">
            <ShoppingCart />
            {cartCount > 0 && (
              <span className="bg-pink-500 rounded-full absolute text-white -top-3 -right-4 px-2 text-sm font-bold animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>
          {
            user? <Button onClick={logoutHandler} className='bg-pink-600 hover:bg-pink-700 text-white cursor-pointer rounded-xl font-bold h-9 px-4'>Log out</Button>: <Link to="/login">
              <Button className='bg-pink-600 hover:bg-pink-700 text-white cursor-pointer rounded-xl font-bold h-9 px-4'>
                Log in
              </Button>
            </Link>
          }
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
