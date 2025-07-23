import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";

// Wrapper component to normalize paths to lowercase (handles case-insensitivity)
const NormalizePath: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const lowercasePath = location.pathname.toLowerCase();

  if (location.pathname !== lowercasePath) {
    return <Navigate to={{ ...location, pathname: lowercasePath }} replace />;
  }

  return <>{children}</>;
};

const App: React.FC = () => (
  <Router>
    <NormalizePath>
      <div className="flex flex-col h-screen">
        <Header />
        <main className="flex-grow container mx-auto py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            {/* Add other routes here */}
          </Routes>
        </main>
        <Footer />
      </div>
    </NormalizePath>
  </Router>
);

export default App;
