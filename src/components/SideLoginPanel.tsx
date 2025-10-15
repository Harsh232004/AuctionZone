import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding, FaArrowCircleRight } from "react-icons/fa";

interface SideLoginPanelProps {
  isLoggedIn: boolean;
}

const SideLoginPanel = ({ isLoggedIn }: SideLoginPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // When user logs in, auto-close panel
  useEffect(() => {
    if (isLoggedIn) {
      setIsOpen(false);
    }
  }, [isLoggedIn]);

  // If user is already logged in, don’t render the panel at all
  if (isLoggedIn) {
    return null;
  }

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 transition-transform duration-300 z-50 ${
        isOpen ? "right-0" : "-right-64 md:-right-72"
      }`}
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-4 rounded-l-md flex items-center font-semibold shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaUser className="mr-2" /> Login
        </button>

        <div className="bg-gray-900 text-white w-64 md:w-72 p-6 shadow-lg rounded-l-lg">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">
            Login Access
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="/register"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaUser className="mr-3" /> Bidder Registration
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaBuilding className="mr-3" /> Company Login
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <FaArrowCircleRight className="mr-3" /> Bidder Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideLoginPanel;
