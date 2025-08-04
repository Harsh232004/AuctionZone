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
import UpcomingAuctionCard from "../components/cards/UpcomingAuctionCard";
import type { AuctionItem, BlogPost } from "../types";

const featuredAuctions: AuctionItem[] = [
    { id: 1, title: "Vintage Rolex Watch", image: "https://cdn.shopify.com/s/files/1/0526/8658/6018/files/Vintage_Watch_Longines_1024x1024.jpg?v=1741170820", currentBid: 1500, endsIn: "2 days" },
    { id: 2, title: "Antique Chinese Vase", image: "https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg", currentBid: 250, endsIn: "1 day" },
    { id: 3, title: "Signed Baseball Card", image: "https://mem-expert.s3.us-west-2.amazonaws.com/wp-content/uploads/2017/09/08153605/104255-bw8_01.jpg", currentBid: 750, endsIn: "5 hours" },
    { id: 4, title: "19th Century Armchair", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80", currentBid: 400, endsIn: "3 days" },
];
const upcomingItems: AuctionItem[] = [
  { id: 5, title: "Classic Muscle Car", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", startingBid: 15000, startsIn: "Tomorrow" },
  { id: 6, title: "Modern Art Painting", image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", startingBid: 2000, startsIn: "In 2 days" },
  { id: 7, title: "Rare Comic Book Collection", image: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80", startingBid: 500, startsIn: "In 3 days" },
];
const trendingItems: AuctionItem[] = [
 {
    id: 8,
    title: "Classic Comic Collection", 
    image: "https://images.unsplash.com/photo-1594347963363-1434f828e434?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80", // <-- New, Stable Link
    currentBid: 2500,
    bids: 45
  },
  {
    id: 9,
    title: "Leica Vintage Camera",
    image: "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80", // <-- New, stable link
    currentBid: 300,
    bids: 12
  },
  {
    id: 10,
    title: "Designer Handbag",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    currentBid: 1200,
    bids: 25
  },
  {
    id: 11,
    title: "Antique Pocket Watch",
    image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80",
    currentBid: 450,
    bids: 18
  },
];


const blogPosts: BlogPost[] = [
    { id: 1, title: "How to Win Your First Auction", excerpt: "Essential tips and strategies for beginners.", link: "/blog/1" },
    { id: 2, title: "The Art of Valuing Antiques", excerpt: "Learn how experts determine the value of rare items.", link: "/blog/2" },
    { id: 3, title: "Spotlight: Top 5 Sales of 2025", excerpt: "A look back at the most incredible items sold this year.", link: "/blog/3" },
];

const SideLoginPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`fixed top-1/2 -translate-y-1/2 transition-transform duration-300 z-50 ${isOpen ? "right-0" : "-right-64 md:-right-72"}`}>
      <div className="relative">
        <button onClick={() => setIsOpen((open) => !open)} className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-4 rounded-l-md flex items-center font-semibold shadow-lg hover:bg-blue-700 transition-colors"><FaUser className="mr-2" /> Login</button>
        <div className="bg-gray-800 text-white w-64 md:w-72 p-6 shadow-lg rounded-l-lg">
          <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Login Access</h3>
          <ul className="space-y-4">
            <li><Link to="/register" className="flex items-center hover:text-blue-400 transition-colors"><FaUser className="mr-3" /> Bidder Registration</Link></li>
            <li><Link to="/login" className="flex items-center hover:text-blue-400 transition-colors"><FaBuilding className="mr-3" /> Company Login</Link></li>
            <li><Link to="/login" className="flex items-center hover:text-blue-400 transition-colors"><FaArrowCircleRight className="mr-3" /> Bidder Login</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const sliderContent = [
  { pill: "Why Choose AuctionZone?", title: "Your Trusted Partner\nin Growth", buttonText: "Login", image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80", features: null, link: "/login" },
  { pill: "A Smarter Bidding Experience", title: "Discover the AuctionZone App Now!", buttonText: "Explore Features", image: null, features: ["Quick & Secure Login", "Easy Document Verification", "Profile Status Tracking", "Real-Time Auction Access"], link: "/features" },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTrendingSlide, setCurrentTrendingSlide] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % sliderContent.length), 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const trendingTimer = setInterval(() => {
      setCurrentTrendingSlide(prev => (prev + 1) % trendingItems.length);
    }, 3000);
    return () => clearInterval(trendingTimer);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const elem = document.getElementById(id);
      if (elem) {
        setTimeout(() => elem.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      }
    }
  }, [location]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
  const slide = sliderContent[currentSlide];

  return (
    <main className="bg-gray-50">
      <section className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
        <AnimatePresence mode="wait">
          <motion.div key={currentSlide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.7, ease: "easeInOut" as const }} className="w-full h-full absolute top-0 left-0 flex items-center px-6 md:px-20">
            <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="w-full md:w-1/2 text-center md:text-left">
                <motion.span initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm mb-5 shadow-lg">{slide.pill}</motion.span>
                <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight">{slide.title.split("\n").map((line, i) => (<span key={i}>{line}<br /></span>))}</motion.h1>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}><Link to={slide.link} className="mt-8 inline-block bg-blue-600 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">{slide.buttonText}</Link></motion.div>
              </div>
              <div className="hidden md:flex w-1/2 justify-center items-center">
                {slide.image && <motion.img src={slide.image} alt="AuctionZone App" className="max-w-full max-h-[500px]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 0.8, type: "spring" }} />}
                {slide.features && <div className="text-gray-700 space-y-5">{slide.features.map((feature, i) => (<motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }} className="flex items-center text-xl font-medium bg-white/50 p-3 rounded-lg shadow-sm"><FaCheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0" />{feature}</motion.div>))}</div>}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <button onClick={prevSlide} aria-label="Previous Slide" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-lg hover:bg-white transition z-10"><FaArrowLeft className="text-gray-800" /></button>
        <button onClick={nextSlide} aria-label="Next Slide" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-lg hover:bg-white transition z-10"><FaArrowRight className="text-gray-800" /></button>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2 z-10">{sliderContent.map((_, idx) => (<button key={idx} aria-label={`Go to slide ${idx + 1}`} onClick={() => setCurrentSlide(idx)} className={`w-3 h-3 rounded-full border-2 border-blue-400 mx-1 ${currentSlide === idx ? "bg-blue-600" : "bg-blue-200"}`} />))}</div>
      </section>

      <SideLoginPanel />

      <motion.section className="py-16 px-6 container mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Featured Auctions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredAuctions.map((item) => <FeaturedAuctionCard key={item.id} item={item} />)}
        </div>
      </motion.section>

      <motion.section id="upcoming" className="py-16 px-6 bg-blue-50" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Auction Timeline</h2>
          <div className="relative">
            <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-blue-200"></div>
            <div className="space-y-12">
              {upcomingItems.map((item, index) => (
                <UpcomingAuctionCard key={item.id} item={item} isRight={index % 2 !== 0} />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section id="trending" className="py-16 px-6" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Trending Now</h2>
          <div className="relative h-[500px] md:h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence>
              <motion.div
                key={currentTrendingSlide}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${trendingItems[currentTrendingSlide].image})` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h3 className="text-3xl font-bold">{trendingItems[currentTrendingSlide].title}</h3>
                  <p className="mt-2 text-lg">Current Bid: <span className="font-bold">${trendingItems[currentTrendingSlide].currentBid?.toLocaleString()}</span></p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {trendingItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTrendingSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentTrendingSlide === index ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>
      
      <motion.section className="py-16 px-6 bg-white" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}>
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">From Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => <BlogPostCard key={post.id} post={post} />)}
          </div>
        </div>
      </motion.section>
    </main>
  );
};

export default Home;
