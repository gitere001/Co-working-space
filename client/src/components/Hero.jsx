import React from "react";
import { Search, Calendar, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gray-900 h-screen flex items-center">

      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-[fadeIn_1s_ease-in]">
            Find Your Perfect <span className="text-blue-400">Workspace</span>{" "}
            Today
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-200 animate-[fadeIn_1.2s_ease-in]">
            Book flexible coworking spaces, meeting rooms, and private offices
            with just a few clicks.
          </p>

          <div className="flex flex-wrap gap-4 mb-8 animate-[fadeIn_1.4s_ease-in]">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center transition-all transform hover:scale-105">
              <Search className="h-5 w-5 mr-2" />
              Browse Spaces
            </button>
            <button className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-6 rounded-lg flex items-center transition-all transform hover:scale-105">
              <Calendar className="h-5 w-5 mr-2" />
              Book Now
            </button>
          </div>

          <div className="flex items-center text-gray-300 animate-[fadeIn_1.6s_ease-in]">
            <span>Trusted by 2,000+ companies worldwide</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
