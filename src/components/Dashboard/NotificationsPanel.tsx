import { FiBell, FiAlertTriangle, FiInfo } from "react-icons/fi";

const NotificationsPanel: React.FC = () => {
  const notifications = [
    { type: "alert", message: "Your bid for ‘Vintage Car’ was outbid!" },
    { type: "info", message: "New auction: Luxury Watch starts tomorrow." },
    { type: "alert", message: "Auction ‘Antique Vase’ is closing soon." },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        <FiBell className="text-blue-600" size={20} />
      </div>

      <ul className="space-y-3">
        {notifications.map((n, idx) => (
          <li
            key={idx}
            className={`flex items-start p-3 rounded-lg ${
              n.type === "alert" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"
            }`}
          >
            {n.type === "alert" ? <FiAlertTriangle className="mr-3 mt-1" /> : <FiInfo className="mr-3 mt-1" />}
            <span className="text-sm">{n.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPanel;
