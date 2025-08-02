import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaBuilding,
  FaArrowCircleRight,
  FaCheckCircle,
} from "react-icons/fa";

import BlogPostCard from "../components/cards/BlogPostCard";
import FeaturedAuctionCard from "../components/cards/FeaturedAuctionCard";
import TrendingAuctionCard from "../components/cards/TrendingAuctionCard";
import UpcomingAuctionCard from "../components/cards/UpcomingAuctionCard";
import type { AuctionItem, BlogPost } from "../types";

// ------- Demo data --------
const featuredAuctions: AuctionItem[] = [
  {
    id: 1,
    title: "Vintage Rolex Watch",
    image:
      "https://cdn.shopify.com/s/files/1/0526/8658/6018/files/Vintage_Watch_Longines_1024x1024.jpg?v=1741170820",
    currentBid: 1500,
    endsIn: "2 days",
  },
  {
    id: 2,
    title: "Antique Chinese Vase",
    image:
      "https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg",
    currentBid: 250,
    endsIn: "1 day",
  },
  {
    id: 3,
    title: "Signed Baseball Card",
    image:
      "https://images.unsplash.com/photo-1612423284934-59074b33b0e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    currentBid: 750,
    endsIn: "5 hours",
  },
  {
    id: 4,
    title: "19th Century Armchair",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    currentBid: 400,
    endsIn: "3 days",
  },
];
const upcomingItems: AuctionItem[] = [
  {
    id: 5,
    title: "Classic Muscle Car",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    startingBid: 15000,
    startsIn: "Tomorrow",
  },
  {
    id: 6,
    title: "Modern Art Painting",
    image:
      "https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    startingBid: 2000,
    startsIn: "In 2 days",
  },
];
const trendingItems: AuctionItem[] = [
  {
    id: 7,
    title: "Solid Gold Necklace",
    image:
      "https://images.unsplash.com/photo-1611652033959-8a5628174083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    currentBid: 800,
    bids: 15,
  },
  {
    id: 8,
    title: "Leica Vintage Camera",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    currentBid: 300,
    bids: 12,
  },
];
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Win Your First Auction",
    excerpt:
      "Essential tips and strategies for beginners in the world of online bidding.",
    link: "/blog/1",
  },
  {
    id: 2,
    title: "The Art of Valuing Antiques",
    excerpt: "Learn how experts determine the value of rare and antique items.",
    link: "/blog/2",
  },
  {
    id: 3,
    title: "Spotlight: Top 5 Sales of 2025",
    excerpt:
      "A look back at the most incredible items sold on AuctionZone this year.",
    link: "/blog/3",
  },
];

// Side Login Panel Component (for brevity, kept in file here)
const SideLoginPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 transition-transform duration-300 z-50 ${
        isOpen ? "right-0" : "-right-64 md:-right-72"
      }`}
    >
      <div className="relative">
        <button
          onClick={() => setIsOpen((open) => !open)}
          className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-4 rounded-l-md flex items-center font-semibold shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaUser className="mr-2" /> Login
        </button>
        <div className="bg-gray-800 text-white w-64 md:w-72 p-6 shadow-lg rounded-l-lg">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">
            Login Access
          </h3>
          <ul className="space-y-4">
            <li>
              <Link
                to="/register"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <FaUser className="mr-3" /> Bidder Registration
              </Link>
            </li>
            <li>
              <Link
                to="/login/company"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <FaBuilding className="mr-3" /> Company Login
              </Link>
            </li>
            <li>
              <Link
                to="/login/bidder"
                className="flex items-center hover:text-blue-400 transition-colors"
              >
                <FaArrowCircleRight className="mr-3" /> Bidder Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Slider content and animations
const sliderContent = [
  {
    pill: "Why Choose AuctionZone?",
    title: "Your Trusted Partner\nin Growth",
    buttonText: "Login",
    image:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    features: null,
    link: "/login",
  },
  {
    pill: "A Smarter Bidding Experience",
    title: "Discover the AuctionZone App Now!",
    buttonText: "Explore Features",
    image: null,
    features: [
      "Quick & Secure Login",
      "Easy Document Verification",
      "Profile Status Tracking",
      "Real-Time Auction Access",
    ],
    link: "/features",
  },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % sliderContent.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  // --- Scroll to section for #upcoming or #trending on URL hash change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // short delay for rendering
      }
    }
  }, [location]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + sliderContent.length) % sliderContent.length
    );

  const slide = sliderContent[currentSlide];

  return (
      <main className="bg-gray-50" style={{ marginTop: '-2rem' }}>
      {/* SLIDER/HERO SECTION - changed */}
      <section className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.7, ease: "easeInOut" as const }}
            className="w-full h-full absolute top-0 left-0 flex items-center px-6 md:px-20"
          >
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm mb-5 shadow-lg"
                >
                  {slide.pill}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight"
                >
                  {slide.title.split("\n").map((line: string, i: number) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <Link
                    to={slide.link}
                    className="mt-8 inline-block bg-blue-600 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                  >
                    {slide.buttonText}
                  </Link>
                </motion.div>
              </div>
              <div className="hidden md:flex w-1/2 justify-center items-center">
                {slide.image && (
                  <motion.img
                    src={slide.image}
                    alt="AuctionZone App"
                    className="max-w-full max-h-[500px]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
                  />
                )}
                {slide.features && (
                  <div className="text-gray-700 space-y-5">
                    {slide.features.map((feature: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.5 + i * 0.2,
                          duration: 0.5,
                        }}
                        className="flex items-center text-xl font-medium bg-white/50 p-3 rounded-lg shadow-sm"
                      >
                        <FaCheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button
          onClick={prevSlide}
          aria-label="Previous Slide"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-lg hover:bg-white transition z-10"
        >
          <FaArrowLeft className="text-gray-800" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next Slide"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-lg hover:bg-white transition z-10"
        >
          <FaArrowRight className="text-gray-800" />
        </button>
        {/* Slider Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {sliderContent.map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full border-2 border-blue-400 mx-1 ${
                currentSlide === idx ? "bg-blue-600" : "bg-blue-200"
              }`}
            />
          ))}
        </div>
      </section>

      <SideLoginPanel />

      {/* FEATURED AUCTIONS */}
      <motion.section
        className="py-16 px-6 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Featured Auctions
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredAuctions.map((item) => (
            <FeaturedAuctionCard key={item.id} item={item} />
          ))}
        </motion.div>
      </motion.section>

      {/* UPCOMING ITEMS */}
      <motion.section
        id="upcoming" // <-- ADD THIS ID!
        className="py-16 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
            Upcoming Items
          </h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {upcomingItems.map((item) => (
              <UpcomingAuctionCard key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* TRENDING NOW */}
      <motion.section
        id="trending" // <-- ADD THIS ID!
        className="py-16 px-6 container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          Trending Now
        </h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {trendingItems.map((item) => (
            <TrendingAuctionCard key={item.id} item={item} />
          ))}
        </motion.div>
      </motion.section>

      {/* FROM OUR BLOG */}
      <motion.section
        className="py-16 px-6 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
            From Our Blog
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={cardContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {blogPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;
