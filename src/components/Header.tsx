import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiMenu,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const SERVICE_DROPDOWN = [
  { to: '/services/live-auctions', label: 'Live Auctions' },
  { to: '/services/private-bids', label: 'Private Bids' },
  { to: '/services/upcoming-events', label: 'Upcoming Events' },
  { to: '/services/auction-management', label: 'Auction Management' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, user, hasRole, logout } = useAuth();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileNav, setIsMobileNav] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search bar when opened
  useEffect(() => {
    if (isSearchActive) searchInputRef.current?.focus();
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setIsSearchActive(false);
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchActive]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchActive(false);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/', { replace: true });
  };

  const handleSectionNav = (e: React.MouseEvent, href: string, sectionId?: string) => {
    if (sectionId) {
      e.preventDefault();
      setIsMobileNav(false);
      if (location.pathname === '/') {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', href);
      } else {
        navigate(href);
      }
    } else {
      setIsMobileNav(false);
    }
  };

  // ✅ Base Navigation Links
  const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/#upcoming', label: 'Upcoming Auctions', sectionId: 'upcoming' },
    { to: '/services', label: 'Services' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ];

  // ✅ Role-based Links
  if (hasRole('SELLER')) {
    NAV_LINKS.push(
      { to: '/seller/dashboard', label: 'Seller Dashboard' },
      { to: '/seller/auctions', label: 'Manage Auctions' },
      { to: '/seller/sales', label: 'Sales History' }
    );
  }

  if (hasRole('ADMIN')) {
    NAV_LINKS.push(
      { to: '/admin/dashboard', label: 'Admin Dashboard' },
      { to: '/admin/users', label: 'User Management' },
      { to: '/admin/reports', label: 'Reports' },
      { to: '/admin/monitoring', label: 'Auction Monitoring' }
    );
  }

  const DesktopNav = (
    <div className="flex items-center space-x-10">
      {NAV_LINKS.map((link) =>
        link.label === 'Services' ? (
          <div
            key={link.to}
            className="relative group"
            onMouseEnter={() => setShowServicesDropdown(true)}
            onMouseLeave={() => setShowServicesDropdown(false)}
          >
            <button
              className={`flex items-center space-x-1 font-bold text-lg transition-all ${
                showServicesDropdown ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <span>{link.label}</span>
              <FiChevronDown
                className={`transition-transform duration-200 ${
                  showServicesDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showServicesDropdown && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
                {SERVICE_DROPDOWN.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => setShowServicesDropdown(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={link.to}
            to={link.to}
            onClick={
              link.sectionId
                ? (e) => handleSectionNav(e, link.to, link.sectionId)
                : () => setIsMobileNav(false)
            }
            className={`font-bold text-lg transition-all ${
              location.pathname + location.hash === link.to
                ? 'text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );

  const UserMenu = (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu((prev) => !prev)}
        className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition"
      >
        <FiUser className="text-blue-600" />
        <span className="font-semibold text-gray-800">
          {user?.username || user?.email}
        </span>
        <FiChevronDown
          className={`text-gray-600 transition-transform duration-200 ${
            showUserMenu ? 'rotate-180' : ''
          }`}
        />
      </button>

      {showUserMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-2 z-50">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setShowUserMenu(false)}
          >
            Profile
          </Link>
          <Link
            to="/my-bids"
            className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            onClick={() => setShowUserMenu(false)}
          >
            My Bids
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <FiLogOut className="inline mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.png" alt="AuctionZone" className="h-10" />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            AuctionZone
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:block">{DesktopNav}</nav>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center space-x-5">
          {/* Search */}
          <div
            className={`relative flex items-center transition-all duration-300 ${
              isSearchActive ? 'w-52 border border-gray-200 rounded-full px-3 py-1' : 'w-10'
            }`}
          >
            <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center">
              {isSearchActive && (
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search auctions..."
                  className="flex-1 outline-none bg-transparent text-sm px-2"
                />
              )}
            </form>
            <button
              onClick={() => setIsSearchActive((prev) => !prev)}
              className="p-2 text-gray-500 hover:text-blue-600"
            >
              <FiSearch size={20} />
            </button>
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-600 hover:text-blue-600"
            aria-label="Shopping Cart"
          >
            <FiShoppingCart size={22} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Auth */}
          {!isAuthenticated ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
          ) : (
            UserMenu
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-blue-600 hover:bg-blue-100 rounded-full"
          onClick={() => setIsMobileNav((v) => !v)}
        >
          <FiMenu size={26} />
        </button>
      </div>
    </header>
  );
};

export default Header;
  