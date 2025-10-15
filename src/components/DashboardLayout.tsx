import { Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar";
import { useAuth } from "@context/AuthContext";

const DashboardLayout: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user?.roles?.includes("ADMIN") ? "ADMIN" : "SELLER"} isOpen={false} onClose={function (): void {
        throw new Error("Function not implemented.");
      } } />
      <main className="flex-grow bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
