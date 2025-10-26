import * as React from "react";
import { Suspense, lazy, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "@components/Header";
import Footer from "@components/Footer";
import SideLoginPanel from "@components/SideLoginPanel";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DashboardLayout from "@components/DashboardLayout";
import Sidebar from "@components/Sidebar/Sidebar";
import { SidebarProvider } from "@components/Sidebar/SidebarContext";

// ---------- Lazy Loaded Pages ----------
const Home = lazy(() => import("@pages/Home"));
const BlogPage = lazy(() => import("@pages/BlogPage"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const SearchResults = lazy(() => import("@pages/SearchResults"));
const About = lazy(() => import("@pages/About"));
const Contact = lazy(() => import("@pages/ContactUs"));
const PlaceBidPage = lazy(() => import("@pages/PlaceBidPage"));
const CartPage = lazy(() => import("@pages/CartPage"));
const AuctionsPage = lazy(() => import("@pages/AuctionsPage"));
const Pricing = lazy(() => import("@pages/Pricing"));

// ---------- Lazy Loaded Role Routes ----------
const SellerRoutes = lazy(() => import("@pages/seller/sellerRoutes"));
const AdminRoutes = lazy(() => import("@pages/admin/adminRoutes"));

// ---------- Normalize Path ----------
const NormalizePath: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lowercasePath = location.pathname.toLowerCase();

  if (location.pathname !== lowercasePath) {
    return <Navigate to={lowercasePath} replace />;
  }
  return <>{children}</>;
};

// ---------- Protected Route ----------
interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (roles && !(Array.isArray(user?.roles) && user.roles.some((role: string) => roles.includes(role)))) return <Navigate to="/" replace />;

  return <>{children}</>;
};

// ---------- Main AppContent ----------
// inside App.tsx (replace existing AppContent)
const AppContent: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const role: "ADMIN" | "SELLER" = user?.roles?.includes("ADMIN")
    ? "ADMIN"
    : "SELLER";

  function openSidebar(event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header always visible */}
      <Header />
      {/* Add this button only when logged in */}
      {isAuthenticated && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden text-gray-800 text-2xl ml-2"
        >
          ☰
        </button>
      )}

      {/* Main area: if logged in show sidebar + page content; if not, just page content */}
      <div className="flex flex-1">
        {/* Sidebar only when logged in */}
      {isAuthenticated && (
  <button
    onClick={openSidebar}
    className="md:hidden text-gray-800 text-2xl ml-2"
  >
    ☰
  </button>
        )}

        {/* Main content (routes) */}
        <main className="flex-grow bg-gray-50 p-6">
          <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog/:id" element={<BlogPage />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/item/:id" element={<PlaceBidPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/auctions" element={<AuctionsPage />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Dashboard routes (protected) */}
              <Route
                path="/dashboard/overview"
                element={
                  <ProtectedRoute>
                    <div>Overview Page</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/profile"
                element={
                  <ProtectedRoute>
                    <div>Profile</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/manage-auctions"
                element={
                  <ProtectedRoute roles={["SELLER", "USER"]}>
                    <div>Manage Auctions</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/sales-history"
                element={
                  <ProtectedRoute roles={["SELLER", "USER"]}>
                    <div>Sales History</div>
                  </ProtectedRoute>
                }
              />

              {/* Admin-specific */}
              <Route
                path="/dashboard/users"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <div>Admin Users</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/reports"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <div>Reports</div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/monitor"
                element={
                  <ProtectedRoute roles={["ADMIN"]}>
                    <div>Auction Monitor</div>
                  </ProtectedRoute>
                }
              />

              {/* fallback - optional */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </Suspense>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

// ---------- Root Wrapper ----------
const App: React.FC = () => {
  return (
    <GoogleOAuthProvider clientId="1013222440657-job58a29i85q98fr0bh8gtu296nc7a6h.apps.googleusercontent.com">
      <AuthProvider>
  <SidebarProvider>
    <Router>
      <NormalizePath>
        <AppContent />
      </NormalizePath>
    </Router>
  </SidebarProvider>
</AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
