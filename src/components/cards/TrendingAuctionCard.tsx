import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGavel, FaFire } from "react-icons/fa";
import type { AuctionItem } from "../../types";

const TrendingAuctionCard = ({ item }: { item: AuctionItem }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden relative transition-shadow"
      whileHover={{ y: -8, scale: 1.03 }}
    >
      <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md animate-pulse">
        <FaFire className="mr-1" /> HOT
      </div>
      <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
        <p className="text-gray-600 mb-2">
          Current Bid: <span className="font-semibold text-blue-600">${item.currentBid}</span>
        </p>
        <p className="text-gray-500 mb-4">Bids: {item.bids}</p>
        <button
          onClick={() => navigate(`/auction/${item.id}`)}
          className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <FaGavel /> Place Bid
        </button>
      </div>
    </motion.div>
  );
};

export default TrendingAuctionCard;
