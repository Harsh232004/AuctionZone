import React from "react";

interface Props {
  searchQuery: string;
  filter: string;
}

const dummyAuctions = [
  { id: 1, title: "Vintage Car Auction", status: "active", bids: 12, price: 5400 },
  { id: 2, title: "Antique Furniture", status: "ended", bids: 8, price: 2300 },
  { id: 3, title: "Modern Art Painting", status: "upcoming", bids: 0, price: 0 },
  { id: 4, title: "Diamond Ring Auction", status: "active", bids: 21, price: 8200 },
];

const AuctionsTable: React.FC<Props> = ({ searchQuery, filter }) => {
  const filtered = dummyAuctions.filter((a) => {
    const matchSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = filter === "all" || a.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 overflow-x-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Active Auctions</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b text-gray-600">
            <th className="pb-2">Title</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Bids</th>
            <th className="pb-2">Current Price</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((auction) => (
              <tr key={auction.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 font-medium text-gray-800">{auction.title}</td>
                <td className="capitalize text-sm text-gray-600">{auction.status}</td>
                <td>{auction.bids}</td>
                <td className="font-semibold">${auction.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-gray-500 py-4">
                No auctions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionsTable;
