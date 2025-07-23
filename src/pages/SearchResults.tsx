import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const SearchResults: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || ""; // Safely get query

  // Sample products (replace with API fetch later)
  const allProducts = [
    { id: 1, title: "Vintage Watch", image: "https://cdn.shopify.com/s/files/1/0526/8658/6018/files/Vintage_Watch_Longines_1024x1024.jpg?v=1741170820", currentBid: 150, endsIn: "2 days" },
    { id: 2, title: "Antique Vase", image: "https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg", currentBid: 250, endsIn: "1 day" },
    { id: 3, title: "Rare Coin Collection", image: "https://media.gettyimages.com/id/184354619/photo/coin-collection-rare-u-s-coins.jpg?s=612x612&w=gi&k=20&c=5DumbmHix8-Ll-MQINsiSmY-dIoaHkWbJZ_K8RSP-X0=", currentBid: 500, endsIn: "3 hours" },
    { id: 4, title: "Antique Telephone", image: "https://cdn.shopify.com/s/files/1/0632/2526/6422/files/2lkze15mf7t1ovxhv3n3tbv8winn.jpg?v=1740998830", currentBid: 1200, endsIn: "5 days" },
  ];

  const [results, setResults] = useState<typeof allProducts>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let filtered = allProducts;
    if (query) {
      filtered = allProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    setResults(filtered);
    setLoading(false);
  }, [query]);

  if (loading) {
    return <div className="text-center py-8">Loading results...</div>;
  }

  return (
    <div className="space-y-8">
      {results.length === 0 ? (
        <p className="text-gray-600">No products found. Try another search.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2">Current Bid: ${product.currentBid}</p>
                <p className="text-gray-500 mb-4">Ends in: {product.endsIn}</p>
                <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition duration-300">
                  Place Bid
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
