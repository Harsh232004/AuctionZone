import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";
import { CartContext } from "../context/CartContext";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/#upcoming", label: "Upcoming Auctions", sectionId: "upcoming" },
  { to: "/#trending", label: "Trending", sectionId: "trending" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileNav, setIsMobileNav] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchActive) searchInputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsSearchActive(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchActive]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchActive(false);
      setSearchQuery("");
    }
  };

  const handleSectionNav = (
    e: React.MouseEvent,
    href: string,
    sectionId?: string
  ) => {
    if (sectionId) {
      e.preventDefault();
      setIsMobileNav(false);
      if (location.pathname === "/") {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", href);
      } else {
        navigate(href);
      }
    } else {
      setIsMobileNav(false);
    }
  };

  const navLinks = (
    <div className="flex flex-col md:flex-row md:space-x-10">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`
            relative px-3 py-2 text-xl font-bold whitespace-nowrap transition-all duration-200
            ${
              location.pathname + location.hash === link.to ||
              (link.sectionId &&
                location.hash === "#" + link.sectionId &&
                location.pathname === "/")
                ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
                : "text-gray-700 hover:text-blue-600 hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-600"
            }
          `}
          tabIndex={isMobileNav ? 0 : undefined}
          onClick={
            link.sectionId
              ? (e) => handleSectionNav(e, link.to, link.sectionId)
              : () => setIsMobileNav(false)
          }
        >
          {link.label}
        </Link>
      ))}
    </div>
  );

  return (
    <header className="bg-white w-full sticky top-0 z-10 shadow-md">
      <div className="px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-16">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="AuctionZone logo" className="h-10 w-auto" />
              <span className="text-2xl md:text-3xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AuctionZone
              </span>
            </Link>
            <div className="hidden md:block">
              <nav>{navLinks}</nav>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div
              className={`
                relative bg-white rounded-full shadow-sm transition-all duration-300 border border-gray-200
                ${isSearchActive ? "w-64" : "w-10"}
              `}
            >
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  aria-label="Search auctions"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    w-full h-10 pl-10 pr-4 bg-transparent rounded-full outline-none text-sm
                    transition-opacity duration-300
                    ${isSearchActive ? "opacity-100" : "opacity-0 pointer-events-none"}
                  `}
                />
              </form>
              <button
                type="button"
                onClick={() => setIsSearchActive((a) => !a)}
                className="absolute left-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-blue-600"
                aria-label={isSearchActive ? "Close search" : "Open search"}
              >
                <FiSearch size={22} />
              </button>
            </div>

            <Link
              to="/cart"
              className="relative text-gray-500 hover:text-blue-600 transition-colors flex-shrink-0"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg text-base font-semibold shadow-sm hover:bg-blue-700 transition-all flex-shrink-0"
            >
              <FiUser size={20} />
              <span className="whitespace-nowrap">Sign In</span>
            </Link>
          </div>

          <button
            className="inline-flex md:hidden p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none"
            onClick={() => setIsMobileNav((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileNav}
          >
            <FiMenu size={28} />
          </button>
        </div>
      </div>

      {/* THIS IS THE FIXED MOBILE NAVIGATION */}
      {isMobileNav && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden">
          {/* Mobile Menu Panel */}
          <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <span className="text-xl font-bold text-gray-900">Menu</span>
              <button
                onClick={() => setIsMobileNav(false)}
                className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="p-6">
              <div className="space-y-4">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="block py-3 px-4 rounded-lg text-lg font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={
                      link.sectionId
                        ? (e) => handleSectionNav(e, link.to, link.sectionId)
                        : () => setIsMobileNav(false)
                    }
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Mobile Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-gray-50">
              <div className="space-y-4">
                <Link
                  to="/cart"
                  className="flex items-center justify-between py-3 px-4 bg-white rounded-lg shadow-sm"
                  onClick={() => setIsMobileNav(false)}
                >
                  <div className="flex items-center space-x-3">
                    <FiShoppingCart size={20} />
                    <span className="font-semibold">Watchlist</span>
                  </div>
                  {cartItems.length > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
                
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold shadow-sm"
                  onClick={() => setIsMobileNav(false)}
                >
                  <FiUser size={20} />
                  <span>Sign In</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
