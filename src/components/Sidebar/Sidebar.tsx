// src/components/Sidebar/Sidebar.tsx
import { NavLink } from "react-router-dom";

interface SidebarProps {
  role: "ADMIN" | "SELLER";
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const commonLinks = [
    { name: "Dashboard", path: "/dashboard/overview" },
    { name: "Profile", path: "/dashboard/profile" },
  ];

  const sellerLinks = [
    { name: "Manage Auctions", path: "/dashboard/manage-auctions" },
    { name: "Sales History", path: "/dashboard/sales-history" },
  ];

  const adminLinks = [
    { name: "User Management", path: "/dashboard/users" },
    { name: "Reports", path: "/dashboard/reports" },
    { name: "Auction Monitor", path: "/dashboard/monitor" },
  ];

  const links =
    role === "ADMIN"
      ? [...commonLinks, ...adminLinks]
      : [...commonLinks, ...sellerLinks];

  return (
    <>
      {/* Overlay (for mobile) */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-50 w-64 bg-purple-700 text-white min-h-screen p-4 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header for mobile */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-xl font-bold">MENU</h2>
          <button onClick={onClose} className="text-white text-2xl">
            ×
          </button>
        </div>

        {/* Menu Links */}
        <ul className="space-y-3">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md transition ${
                    isActive ? "bg-purple-500" : "hover:bg-purple-600"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
