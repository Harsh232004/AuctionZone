import { useState } from "react";
import OverviewCards from "./OverviewCards";
import AuctionsTable from "./AuctionsTable";
import NotificationsPanel from "./NotificationsPanel";
import { FiSearch, FiFilter } from "react-icons/fi";

const Dashboard: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="relative">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg py-2 pl-3 pr-8 shadow-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="ended">Ended</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <FiFilter className="absolute right-2 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <OverviewCards />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Auctions Table */}
          <div className="lg:col-span-2">
            <AuctionsTable searchQuery={searchQuery} filter={filter} />
          </div>

          {/* Notifications */}
          <NotificationsPanel />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
