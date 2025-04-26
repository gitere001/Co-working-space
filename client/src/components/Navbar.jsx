import React, { useState, useEffect } from "react";
import { Menu, X, Building2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import coworkLogo from '../assets/cowork.png'
import scrollToTop from "../utils/scrollTop";

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="w-15 h-15 flex items-center">
            <img className=""  src={coworkLogo} alt="Logo" />
            <span className={`${isScrolled ? "text-gray-900" : "text-blue-500"} font-bold`}>Coworking</span>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
            to={"/"}
              className={`${
                isScrolled ? "text-gray-700" : "text-blue-500"
              } hover:text-blue-600 transition-colors font-medium`}
            >
              Home
            </Link>
            <Link
            to={"/about"}
              className={`${
                isScrolled ? "text-gray-700" : "text-blue-500"
              } hover:text-blue-600 transition-colors font-medium`}
            >
              About
            </Link>
            <Link
            to={"/featured"}
              className={`${
                isScrolled ? "text-gray-700" : "text-blue-500"
              } hover:text-blue-600 transition-colors font-medium`}
            >
              Featured
            </Link>
            <Link
            to={"/pricing"}
              className={`${
                isScrolled ? "text-gray-700" : "text-blue-500"
              } hover:text-blue-600 transition-colors font-medium`}
            >
              Pricing
            </Link>
            <Link
            to={"/testimonials"}
              className={`${
                isScrolled ? "text-gray-700" : "text-blue-500"
              } hover:text-blue-600 transition-colors font-medium`}
            >
              Testimonials
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => {navigate("/login"); scrollToTop()}} className={`${isScrolled ? "text-gray-700" : "text-blue-500"} hover:text-blue-600 font-medium transition-colors`}>
              Login
            </button>
            <button
            onClick={() => {navigate("/signup"); scrollToTop()}}
             className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isScrolled ? "text-gray-500" : "text-blue-500" } hover:text-gray-600 focus:outline-none`}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link
            to="/"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            About
          </Link>
          <Link
            to="/featured"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Featured
          </Link>
          <Link
            to="/pricing"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Pricing
          </Link>
          <Link
            to="/testimonials"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Testimonials
          </Link>
          <Link
            to="/login"
            className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Sign Up
          </Link>
        </div>
      </div>

      )}
    </nav>
  );
};

export default Navbar;
