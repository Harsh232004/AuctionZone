import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaClock, FaGavel } from "react-icons/fa";
import type { AuctionItem } from "../../types";

const FeaturedAuctionCard = ({ item }: { item: AuctionItem }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden group transition-shadow"
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
        <p className="text-gray-600 mb-2">
          Current Bid: <span className="font-semibold text-blue-600">${item.currentBid}</span>
        </p>
        <p className="text-red-500 font-medium mb-4 flex items-center">
          <FaClock className="mr-2" /> {item.endsIn}
        </p>
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

export default FeaturedAuctionCard;
