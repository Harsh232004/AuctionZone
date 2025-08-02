import { FaGavel, FaUsers, FaLightbulb, FaMedal, FaLock } from "react-icons/fa";

const features = [
  {
    icon: <FaGavel className="w-8 h-8 text-blue-600 mb-2" />,
    title: "Transparent Real-Time Auctions",
    desc: "Join live events with real-time bidding, instant notifications, and an honest countdown—see every bid as it happens.",
  },
  {
    icon: <FaUsers className="w-8 h-8 text-blue-600 mb-2" />,
    title: "Verified Buyers and Sellers",
    desc: "Our community is fully verified and continuously monitored, so you can bid and sell confidently with people who share your passion.",
  },
  {
    icon: <FaLock className="w-8 h-8 text-blue-600 mb-2" />,
    title: "Trusted, Secure Platform",
    desc: "Advanced encryption, trusted payment partners, and an active support team keep your transactions and data safe.",
  },
  {
    icon: <FaLightbulb className="w-8 h-8 text-blue-600 mb-2" />,
    title: "Innovation for Bidders",
    desc: "Get smart suggestions, bid reminders, and seamless mobile experiences—AuctionZone is always evolving to help you win.",
  },
];

const About = () => (
  <main className="max-w-3xl mx-auto px-6 py-12">
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-clip-text text-transparent mb-2 drop-shadow">
        About AuctionZone
      </h1>
      <p className="text-xl text-gray-700 mt-4 max-w-2xl mx-auto">
        AuctionZone is your secure online destination for discovering, bidding on, and winning rare collectibles, antiques, art, vehicles, and more. We combine the excitement of live auctions with cutting-edge technology, transparency, and a thriving community—so everyone can experience the thrill of the chase from anywhere in the world.
      </p>
    </header>

    <section className="mb-12">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Our Mission
      </h2>
      <p className="text-lg text-gray-800">
        To revolutionize how people buy and sell unique items online by making auctions fun, accessible, and trustworthy for all—whether you're a first-time bidder or a seasoned collector.
      </p>
    </section>

    <section className="mb-12">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">
        Why Choose AuctionZone?
      </h2>
      <ul className="grid gap-6 md:grid-cols-2">
        {features.map((f, idx) => (
          <li key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center">
            {f.icon}
            <span className="text-lg font-bold text-gray-900 mb-2">{f.title}</span>
            <span className="text-gray-700">{f.desc}</span>
          </li>
        ))}
      </ul>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">How It Works</h2>
      <ol className="list-decimal list-inside space-y-2 text-gray-800 text-lg">
        <li>Sign up as a bidder or seller and verify your profile in minutes.</li>
        <li>Browse upcoming, trending, or featured auctions and discover hidden gems daily.</li>
        <li>Bid in real time—use auto-bid, instant alerts, and track your items easily from your dashboard.</li>
        <li>Win, pay securely, and receive fast support for any questions or delivery needs.</li>
      </ol>
    </section>

    <section className="mb-10">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Our Team & Vision</h2>
      <div className="bg-blue-50 p-6 rounded-xl shadow">
        <p className="text-lg text-gray-800">
          Founded by auction enthusiasts and tech professionals, AuctionZone's team is passionate about bringing collectors together, ensuring fair play, and constantly improving your auction journey. We believe everyone should have access to a world of unique treasures—and that every bid should be as exciting as the last!
        </p>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Contact & Join the Community</h2>
      <p className="text-lg">
        Have questions? Need help or feedback? Our helpdesk answers within hours.<br />
        Email: <a href="mailto:support@auctionzone.com" className="text-blue-600 hover:underline">support@auctionzone.com</a>
      </p>
      <div className="flex gap-4 mt-6 flex-wrap">
        <a href="/register" className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-blue-700 shadow transition">Register Now</a>
        <a href="/upcoming" className="bg-white text-blue-700 border border-blue-600 font-semibold px-6 py-2 rounded-full hover:bg-blue-50 shadow transition">See Upcoming Auctions</a>
      </div>
    </section>
  </main>
);

export default About;
