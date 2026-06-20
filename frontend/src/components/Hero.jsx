import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-linear-to-r from-blue-600 to-purple-600 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Latest Electronics
              <br />
              at Best Prices
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-lg">
              Discover cutting-edge technology with unbeatable deals on
              smartphones, laptops, headphones, smartwatches and more.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 cursor-pointer"
                >
                  Shop Now
                </Button>
              </Link>

              <Link to="/products?sort=price-asc">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-pink-400 hover:bg-white hover:text-blue-600 px-8 cursor-pointer"
                >
                  View Deals
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-center">
            <img
              src="/aura-hero1.png"
              alt="Electronics"
              width={500}
              height={400}
              className="rounded-lg shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;