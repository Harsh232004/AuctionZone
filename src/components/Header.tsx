import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiShoppingCart, FiUser } from "react-icons/fi";

// --- Sample Data ---
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/upcoming", label: "Upcoming Auctions" },
  { to: "/trending", label: "Trending" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
];

// --- Header Component ---
const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus the input when the search bar becomes active
  useEffect(() => {
    if (isSearchActive) {
      searchInputRef.current?.focus();
    }
  }, [isSearchActive]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchActive(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="bg-white w-full shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Top Row: Logo and Actions --- */}
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3">
              <img src="/logo.png" alt="AuctionZone Logo" className="h-12 w-auto" />
              <span className="text-5xl font-black tracking-tighter bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(96,165,250,0.3)] select-none">
                AuctionZone
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* --- Elastic Search Bar --- */}
            <div className={`
              relative bg-white rounded-full shadow-md transition-all duration-500 ease-elastic
              ${isSearchActive ? 'w-72' : 'w-12'}
            `}>
              <form onSubmit={handleSearchSubmit}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`
                    w-full h-12 pl-12 pr-4 bg-transparent rounded-full outline-none
                    transition-all duration-500 ease-elastic
                    ${isSearchActive ? 'opacity-100' : 'opacity-0'}
                  `}
                />
              </form>
              <button
                onClick={() => setIsSearchActive(!isSearchActive)}
                className="absolute left-0 top-0 h-12 w-12 flex items-center justify-center text-blue-600"
                aria-label="Toggle search"
              >
                <FiSearch size={22} />
              </button>
              {isSearchActive && (
                <button
                  onClick={() => setIsSearchActive(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Close search"
                >
                  <FiX size={22} />
                </button>
              )}
            </div>

            <Link to="/cart" className="text-gray-500 hover:text-blue-600 transition-colors">
              <FiShoppingCart size={24} />
            </Link>
            <Link to="/login" className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-all shadow-sm">
              <FiUser />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
        
        <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>

        {/* --- Bottom Row: Navigation --- */}
        <nav className="flex justify-center">
          <div className="flex space-x-8 py-3">
            {NAV_LINKS.map(link => (
              <Link
                key={link.to}
                to={link.to}
                // ✨ SYNTAX ERROR FIXED HERE ✨
                className={`relative text-base font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
