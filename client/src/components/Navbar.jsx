import React, { useState, useEffect } from "react";
import { Bell, Home, LogOut, Menu, User, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import coworkLogo from "../assets/cowork.png";
import scrollToTop from "../utils/scrollTop";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/logoutUserSlice";
import { setWasLoggedOutManually } from "../features/auth/authorizationSlice";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.authorization);
   const { isLoading} = useSelector((state) => state.logout);
  const unread = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const guestLinks = [
    { path: "/about", label: "About" },
    { path: "/featured", label: "Featured" },
    { path: "/pricing", label: "Pricing" },
    { path: "/testimonials", label: "Testimonials" },
  ];

  const authLinks = [];

  const navigationLinks = isAuthenticated ? authLinks : guestLinks;

  const baseLinkClass = isScrolled
    ? "text-gray-700 hover:text-blue-600 flex items-center"
    : "text-blue-500 hover:text-blue-600 flex items-center";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="w-15 h-15 flex items-center">
            <img src={coworkLogo} alt="Logo" />
            <span
              className={`${
                isScrolled ? "text-gray-900" : "text-blue-500"
              } font-bold`}
            >
              Coworking
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              className={`font-medium transition-colors ${baseLinkClass}`}
            >
              {isAuthenticated && <Home className="w-4 h-4 mr-2" />}
              Home
            </Link>
            {isAuthenticated && (
              <>
                {/* Notifications */}
                <Link
                  to="/home/notifications"
                  onClick={() => setIsMenuOpen(false)} // for mobile, or remove if desktop
                  className={`font-medium transition-colors ${baseLinkClass}`}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="relative inline-flex items-center">
                    {/* If you have 'unread' notifications */}
                    {unread > 0 && (
                      <div className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#E32726] rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {unread}
                      </div>
                    )}
                    Notifications
                  </span>
                </Link>

                {/* Account */}
                <Link
                  to="/home/profiles"

                  className={`font-medium transition-colors ${baseLinkClass}`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {dispatch(logoutUser()); dispatch(setWasLoggedOutManually(true));}}
                  className="flex items-center w-full text-left px-3 py-2 text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoading ? "Logging out": "Logout"}
                </button>
              </>
            )}

            {navigationLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`font-medium transition-colors ${baseLinkClass}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop Login/Signup Buttons */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => {
                  navigate("/login");
                  scrollToTop();
                }}
                className={`font-medium transition-colors ${baseLinkClass}`}
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  scrollToTop();
                }}
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`focus:outline-none ${baseLinkClass}`}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link
              to={isAuthenticated ? "/home" : "/"}
              onClick={() => setIsMenuOpen(false)}
              className={`font-medium transition-colors mb-3 ${baseLinkClass}`}
            >
              {isAuthenticated && <Home className="w-4 h-4 mr-2" />}
              Home
            </Link>
            {navigationLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMenuOpen(false)}
                className={`font-medium transition-colors mb-3 ${baseLinkClass}`}
              >
                {label}
              </Link>
            ))}
            {isAuthenticated && (
              <>
                {/* Notifications */}
                <Link
                  to="/home/notifications"
                  onClick={() => setIsMenuOpen(false)} // for mobile, or remove if desktop
                  className={`font-medium mb-3 transition-colors ${baseLinkClass}`}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  <span className="relative inline-flex items-center">
                    {/* If you have 'unread' notifications */}
                    {unread > 0 && (
                      <div className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[#E32726] rounded-full transform translate-x-1/2 -translate-y-1/2">
                        {unread}
                      </div>
                    )}
                    Notifications
                  </span>
                </Link>

                {/* Account */}
                <Link
                  to="/home/profiles"
                  onClick={() => setIsMenuOpen(false)} // for mobile, or remove if desktop
                  className={`font-medium transition-colors mb-3 ${baseLinkClass}`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Link>

                {/* Logout */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    dispatch(logoutUser());
                    dispatch(setWasLoggedOutManually(true));
                  }}
                  className="flex items-center mb-3 text-red-600 hover:text-red-800 transition-colors font-medium"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  {isLoading ? "Logging out": "Logout"}
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <span
                  
                  onClick={() => {navigate("/login"); setIsMenuOpen(false); scrollToTop()}}
                  className={`font-medium transition-colors mb-3 ${baseLinkClass}`}
                >
                  Login
                </span>
                <span

                  onClick={() => {navigate("/signup"); setIsMenuOpen(false); scrollToTop()}}
                  className="block px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Sign Up
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
