import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';

const CartPage = () => {
  const { cartItems, removeItem } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Watchlist is Empty</h2>
        <p className="text-gray-600 mb-8">You haven't added any items to your watchlist yet.</p>
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 group font-semibold">
          <FaArrowLeft className="mr-2" />
          Discover Auctions
        </Link>
      </div>
    );
  }

  const totalValue = cartItems.reduce((acc, item) => acc + (item.currentBid || item.startingBid || 0), 0);

  return (
    <main className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Watchlist ({cartItems.length})</h1>
        
        <div className="bg-white rounded-xl shadow-lg">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.id} className="p-6 flex items-center space-x-6 hover:bg-gray-50 transition-colors">
                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                <div className="flex-grow">
                  <Link to={`/item/${item.id}`} className="font-bold text-lg text-gray-800 hover:text-blue-600">{item.title}</Link>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <p className="text-lg font-semibold text-gray-900 mt-2">${(item.currentBid || item.startingBid)?.toLocaleString()}</p>
                </div>
                <div className="text-sm text-red-500 font-semibold">{item.endsIn}</div>
                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-600 transition-colors p-2 rounded-full">
                  <FaTrash size={20} />
                </button>
              </li>
            ))}
          </ul>
          <div className="p-6 bg-gray-100 rounded-b-xl border-t">
              <div className="flex justify-end items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Value of Current Bids:</span>
                  <span className="text-2xl font-bold text-blue-600 ml-4">${totalValue.toLocaleString()}</span>
              </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
