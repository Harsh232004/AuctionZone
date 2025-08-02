import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import type { AuctionItem } from "../../types";

const UpcomingAuctionCard = ({ item }: { item: AuctionItem }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-gray-100 rounded-xl shadow-md overflow-hidden transition-shadow"
      whileHover={{ y: -8, scale: 1.03 }}
    >
      <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
        <p className="text-gray-600 mb-2">
          Starting Bid:{" "}
          <span className="font-semibold text-green-600">${item.startingBid}</span>
        </p>
        <p className="text-gray-500 mb-4 flex items-center">
          <FaClock className="mr-2" /> Starts: {item.startsIn}
        </p>
        <button
          onClick={() => navigate(`/auction/${item.id}`)}
          className="w-full bg-gray-700 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
        >
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default UpcomingAuctionCard;
