// src/pages/PlaceBidPage.tsx

import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaGavel, FaHeart } from 'react-icons/fa';
import type { AuctionItem } from '../types';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// --- COMBINED MOCK DATA ---
const allAuctionItems: AuctionItem[] = [
  // Featured Auctions
  {
    id: 1,
    title: 'Vintage Rolex Watch',
    image:
      'https://cdn.shopify.com/s/files/1/0526/8658/6018/files/Vintage_Watch_Longines_1024x1024.jpg?v=1741170820',
    currentBid: 1500,
    endsIn: '2 days',
    description: 'A classic 1965 Rolex Submariner in pristine condition.',
    bids: 23,
    sellerName: 'TimeKeepers',
  },
  {
    id: 2,
    title: 'Antique Chinese Vase',
    image:
      'https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg',
    currentBid: 250,
    endsIn: '1 day',
    description: 'Exquisite Ming Dynasty blue and white porcelain vase.',
    bids: 12,
    sellerName: 'DynastyArts',
  },
  {
    id: 3,
    title: 'Signed Baseball Card',
    image:
      'https://mem-expert.s3.us-west-2.amazonaws.com/wp-content/uploads/2017/09/08153605/104255-bw8_01.jpg',
    currentBid: 750,
    endsIn: '5 hours',
    description: 'Rare rookie card of a legendary player, graded PSA 9.',
    bids: 31,
    sellerName: 'HallOfFame',
  },
  {
    id: 4,
    title: '19th Century Armchair',
    image:
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80',
    currentBid: 400,
    endsIn: '3 days',
    description: 'Beautifully preserved Louis XVI style armchair.',
    bids: 8,
    sellerName: 'EstateFinds',
  },
  // Upcoming Auctions
  {
    id: 5,
    title: 'Classic Muscle Car',
    image:
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    startingBid: 15000,
    endsIn: 'Starts in 1 day',
    description: 'A beautifully restored 1969 Chevrolet Camaro SS.',
    bids: 0,
    sellerName: 'VintageRides',
  },
  {
    id: 6,
    title: 'Modern Art Painting',
    image:
      'https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    startingBid: 2000,
    endsIn: 'Starts in 2 days',
    description: 'An original abstract piece by a rising star.',
    bids: 0,
    sellerName: 'ArtHouse',
  },
  {
    id: 7,
    title: 'Rare Comic Book Collection',
    image:
      'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
    startingBid: 500,
    endsIn: 'Starts in 3 days',
    description:
      'A collection of key first appearances from the Silver Age.',
    bids: 0,
    sellerName: 'ComicCave',
  },
  // Trending Items
  {
    id: 8,
    title: 'Classic Comic Collection',
    image:
      'https://images.unsplash.com/photo-1594347963363-1434f828e434?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    currentBid: 2500,
    bids: 45,
    description: 'Iconic issues from the golden age.',
    sellerName: 'CollectorVerse',
    endsIn: '1 day',
  },
  {
    id: 9,
    title: 'Leica Vintage Camera',
    image:
      'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
    currentBid: 300,
    bids: 12,
    description: 'A functional piece of photographic history.',
    sellerName: 'LensLegacy',
    endsIn: '4 hours',
  },
  {
    id: 10,
    title: 'Designer Handbag',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    currentBid: 1200,
    bids: 25,
    description: 'A luxury handbag from a world-renowned designer.',
    sellerName: 'ChicBoutique',
    endsIn: '2 days',
  },
  {
    id: 11,
    title: 'Antique Pocket Watch',
    image:
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80',
    currentBid: 450,
    bids: 18,
    description: 'An intricate gold-plated pocket watch.',
    sellerName: 'TimeKeepers',
    endsIn: '6 hours',
  },
];

const PlaceBidPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const { addItem } = useContext(CartContext);
  const { isAuthenticated } = useAuth();

  const item = allAuctionItems.find((i) => i.id === Number(id));

  const [currentBid, setCurrentBid] = useState(
    item?.currentBid || item?.startingBid || 0
  );
  const [bidAmount, setBidAmount] = useState(0);
  const [bidderCount, setBidderCount] = useState(item?.bids || 0);
  const [message, setMessage] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  useEffect(() => {
    setBidAmount(currentBid + 10);
    window.scrollTo(0, 0);
  }, [id, currentBid]);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Auction Item Not Found
        </h2>
        <p className="text-gray-700 mb-8">
          The item you are looking for might have expired or does not exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 group font-semibold"
        >
          <FaArrowLeft className="mr-2" />
          Back to Homepage
        </Link>
      </div>
    );
  }

  // Require auth for bidding; redirect to login and return back here after.
  const requireAuth = () => {
    if (!isAuthenticated) {
      const returnUrl =
        location.pathname + location.search + location.hash; // e.g., /item/1
      navigate(`/login?returnUrl=${encodeURIComponent(returnUrl)}`);
      return false;
    }
    return true;
  };

  const handlePlaceBid = async () => {
    setMessage(null);

    if (!requireAuth()) return;

    if (bidAmount <= currentBid) {
      setMessage({
        text: 'Your bid must be higher than the current bid.',
        type: 'error',
      });
      return;
    }

    // TODO: Replace mock update with real API call to POST /api/bids
    // Example:
    // const res = await apiFetch('/api/bids', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ auctionId: Number(id), amount: bidAmount }),
    // });
    // if (!res.ok) { ...handle error... }

    setCurrentBid(bidAmount);
    setBidderCount((c) => c + 1);
    setMessage({
      text: `Success! You are now the highest bidder with $${bidAmount.toLocaleString()}.`,
      type: 'success',
    });
  };

  const handleAddToWatchlist = () => {
    if (item) {
      addItem(item);
      setMessage({
        text: `"${item.title}" was added to your watchlist.`,
        type: 'success',
      });
    }
  };

  return (
    <main className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <motion.img
                src={item.image}
                alt={item.title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
              />
            </div>

            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                {item.title}
              </h1>
              <p className="text-sm text-gray-500 mb-6">
                Sold by:{' '}
                <span className="font-semibold text-blue-600">
                  {item.sellerName}
                </span>
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                {item.description}
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Current Bid</p>
                    <p className="text-3xl font-bold text-gray-900">
                      ${currentBid.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ends In</p>
                    <p className="text-lg font-semibold text-red-600">
                      {item.endsIn}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{bidderCount} bids</p>
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="bidAmount"
                  className="block font-semibold text-gray-800"
                >
                  Your bid amount
                </label>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-3 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md h-12">
                    $
                  </span>
                  <input
                    type="number"
                    id="bidAmount"
                    value={bidAmount}
                    onChange={(e) => setBidAmount(Number(e.target.value))}
                    className="flex-1 block w-full border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-lg rounded-none rounded-r-md h-12"
                    placeholder={`Enter > $${currentBid.toLocaleString()}`}
                  />
                </div>

                {message && (
                  <div
                    className={`p-3 rounded-md text-sm ${
                      message.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={handlePlaceBid}
                    disabled={!isAuthenticated}
                    className={`w-full flex items-center justify-center font-bold py-3 px-6 rounded-lg shadow-md transition-colors ${
                      isAuthenticated
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    whileHover={isAuthenticated ? { scale: 1.05 } : undefined}
                    whileTap={isAuthenticated ? { scale: 0.95 } : undefined}
                  >
                    <FaGavel className="mr-2" />
                    {isAuthenticated ? 'Place Bid' : 'Sign in to Bid'}
                  </motion.button>

                  <motion.button
                    onClick={handleAddToWatchlist}
                    className="w-full flex items-center justify-center bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHeart className="mr-2" />
                    Add to Watchlist
                  </motion.button>
                </div>

                {!isAuthenticated && (
                  <p className="text-sm text-gray-600">
                    Tip: Click “Sign in” to log in and return here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default PlaceBidPage;
