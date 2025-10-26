import { FiActivity, FiClock, FiDollarSign, FiUsers } from "react-icons/fi";

const OverviewCards: React.FC = () => {
  const cards = [
    { label: "Active Auctions", value: 12, icon: <FiActivity size={24} />, color: "text-blue-600" },
    { label: "Ongoing Bids", value: 37, icon: <FiClock size={24} />, color: "text-indigo-600" },
    { label: "Total Earnings", value: "$4,500", icon: <FiDollarSign size={24} />, color: "text-green-600" },
    { label: "Registered Users", value: 240, icon: <FiUsers size={24} />, color: "text-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="flex items-center p-5 bg-white rounded-xl shadow hover:shadow-md transition-shadow duration-300"
        >
          <div className={`p-3 rounded-lg bg-gray-100 ${card.color}`}>{card.icon}</div>
          <div className="ml-4">
            <p className="text-gray-600 text-sm">{card.label}</p>
            <p className="text-xl font-bold text-gray-800">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
