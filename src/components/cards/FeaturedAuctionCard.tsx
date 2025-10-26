// src/components/cards/FeaturedAuctionCard.tsx
import { Link } from 'react-router-dom';
import { FaUser, FaRegClock, FaGavel } from 'react-icons/fa';
import type { AuctionItem } from '../../types';
import { useAuth } from '../../context/AuthContext'; // NEW

type Props = {
  item: AuctionItem;
  onPlaceBid?: () => void;
};

const FeaturedAuctionCard: React.FC<Props> = ({ item, onPlaceBid }) => {
  const { isAuthenticated } = useAuth(); // NEW

  // Prevent the outer Link from navigating when clicking the button
  const handleBidClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onPlaceBid?.();
  };

  return (
    <Link to={`/item/${item.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <div className="relative">
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
            <FaRegClock className="inline-block mr-1" />
            {item.endsIn}
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 truncate">{item.description}</p>

          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Current Bid</p>
              <p className="text-xl font-bold text-gray-800">
                ${item.currentBid?.toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <div className="flex items-center text-sm text-gray-500">
                <FaGavel className="mr-1" />
                <span>{item.bids} Bids</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <FaUser className="mr-1" />
                <span>{item.sellerName}</span>
              </div>
            </div>
          </div>

          {/* Action row: show only if NOT authenticated */}
          {!isAuthenticated && (
            <div className="mt-4 flex items-center justify-end">
              <button
                type="button"
                onClick={handleBidClick}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Place Bid
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default FeaturedAuctionCard;
