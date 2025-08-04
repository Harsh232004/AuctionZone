import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiShoppingCart, FiUser, FiMenu } from "react-icons/fi";

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
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileNav, setIsMobileNav] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search accessibility
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

  // --- Handle section scrolling for nav links with a sectionId
  const handleSectionNav = (
    e: React.MouseEvent,
    href: string,
    sectionId?: string
  ) => {
    if (sectionId) {
      e.preventDefault();
      setIsMobileNav(false);
      if (location.pathname === "/") {
        // Already on Home, scroll to section
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Update URL hash for bookmark/history (optional)
        window.history.replaceState(null, "", href);
      } else {
        // Navigate to Home + hash; Home will auto-scroll (handled in Home.tsx)
        navigate(href);
      }
    } else {
      setIsMobileNav(false);
    }
  };

  // --- Render Nav Links with hash section scroll support
  const navLinks = (
    <div className="flex flex-col md:flex-row md:space-x-6">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className={`
            relative px-3 py-2 text-base font-medium transition-colors
            ${
              location.pathname + location.hash === link.to ||
              (link.sectionId &&
                location.hash === "#" + link.sectionId &&
                location.pathname === "/")
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="AuctionZone logo" className="h-9 w-auto" />
            <span className="text-xl md:text-2xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              AuctionZone
            </span>
          </Link>

          {/* Desktop nav & actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Nav Links */}
            <nav className="flex space-x-4">{navLinks}</nav>
            
            {/* Search */}
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
                <FiSearch size={20} />
              </button>
            </div>

            {/* Cart and Sign in */}
            <Link
              to="/cart"
              className="relative text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart size={22} />
            </Link>
            <Link
              to="/login"
              className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold shadow-sm hover:bg-blue-700 transition-all"
            >
              <FiUser />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Nav Button */}
          <button
            className="inline-flex md:hidden p-2 rounded-full text-blue-600 hover:bg-blue-100 focus:outline-none"
            onClick={() => setIsMobileNav((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileNav}
          >
            <FiMenu size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Nav Overlay */}
      {isMobileNav && (
        <nav className="fixed inset-0 bg-black/60 z-40 flex flex-col top-0 left-0 md:hidden transition duration-150">
          <div className="bg-white p-6 m-3 rounded-lg shadow-xl w-[90vw] max-w-xs">
            <button
              className="absolute right-5 top-5 text-gray-600 hover:text-red-600"
              aria-label="Close menu"
              onClick={() => setIsMobileNav(false)}
            >
              <FiX size={28} />
            </button>
            <div className="mt-8 flex flex-col space-y-4">
                {navLinks}
            </div>
            <Link
              to="/cart"
              className="block mt-6 text-blue-700"
              onClick={() => setIsMobileNav(false)}
            >
              Cart
            </Link>
            <Link
              to="/login"
              className="block mt-2 text-blue-700"
              onClick={() => setIsMobileNav(false)}
            >
              Sign In
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
