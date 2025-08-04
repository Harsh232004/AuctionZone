import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import type { AuctionItem } from "../../types";

const UpcomingAuctionCard = ({ item, isRight = false }: { item: AuctionItem; isRight?: boolean }) => {
  return (
    <div className={`flex items-center w-full ${isRight ? "justify-start" : "justify-end"}`}>
      <div className={`w-1/2 ${isRight ? "pr-8" : "pl-8"}`}>
        <motion.div
          className="bg-white rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl"
          initial={{ opacity: 0, x: isRight ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <img src={item.image} alt={item.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
          <div className="p-5">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="font-bold text-lg text-blue-600">${item.startingBid?.toLocaleString()}</p>
          </div>
          <div className="px-5 pb-5 flex justify-between items-center text-sm text-red-500 font-semibold">
            <div className="flex items-center gap-2">
              <FaClock />
              <span>Starts: {item.startsIn}</span>
            </div>
            <Link to={`/auction/${item.id}`} className="text-blue-600 hover:underline">Details &rarr;</Link>
          </div>
        </motion.div>
      </div>
      <div className="absolute left-1/2 -ml-3 z-10 w-6 h-6 bg-blue-500 rounded-full border-4 border-white"></div>
    </div>
  );
};

export default UpcomingAuctionCard;
