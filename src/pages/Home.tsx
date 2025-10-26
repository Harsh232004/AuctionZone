  import { useState, useEffect } from 'react';
  import { Link, useLocation, useNavigate } from 'react-router-dom';
  import { motion, AnimatePresence } from 'framer-motion';
  import {
    FaArrowLeft,
    FaArrowRight,
    FaUser,
    FaBuilding,
    FaArrowCircleRight,
    FaCheckCircle,
    FaExclamationTriangle,
    FaInfoCircle,
    FaBell,
  } from 'react-icons/fa';

  import BlogPostCard from '../components/cards/BlogPostCard';
  import FeaturedAuctionCard from '../components/cards/FeaturedAuctionCard';
  import UpcomingAuctionCard from '../components/cards/UpcomingAuctionCard';
  import type { AuctionItem, BlogPost } from '../types';
  import { useAuth } from '../context/AuthContext';

  // --- MOCK DATA ---
  const featuredAuctions: AuctionItem[] = [
    { id: 1, title: 'Vintage Rolex Watch', image: 'https://cdn.shopify.com/s/files/1/0526/8658/6018/files/Vintage_Watch_Longines_1024x1024.jpg?v=1741170820', currentBid: 1500, endsIn: '2 days', description: 'A classic 1965 Rolex Submariner in pristine condition.', bids: 23, sellerName: 'TimeKeepers' },
    { id: 2, title: 'Antique Chinese Vase', image: 'https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg', currentBid: 250, endsIn: '1 day', description: 'Exquisite Ming Dynasty blue and white porcelain vase.', bids: 12, sellerName: 'DynastyArts' },
    { id: 3, title: 'Signed Baseball Card', image: 'https://mem-expert.s3.us-west-2.amazonaws.com/wp-content/uploads/2017/09/08153605/104255-bw8_01.jpg', currentBid: 750, endsIn: '5 hours', description: 'Rare rookie card of a legendary player, graded PSA 9.', bids: 31, sellerName: 'HallOfFame' },
    { id: 4, title: '19th Century Armchair', image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80', currentBid: 400, endsIn: '3 days', description: 'Beautifully preserved Louis XVI style armchair.', bids: 8, sellerName: 'EstateFinds' },
  ];

  const upcomingItems: AuctionItem[] = [
    { id: 5, title: 'Classic Muscle Car', image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', startingBid: 15000, startsIn: 'Tomorrow', description: 'A beautifully restored 1969 Chevrolet Camaro SS.', bids: 0, sellerName: 'VintageRides' },
    { id: 6, title: 'Modern Art Painting', image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80', startingBid: 2000, startsIn: 'In 2 days', description: 'An original abstract piece by a rising star.', bids: 0, sellerName: 'ArtHouse' },
    { id: 7, title: 'Rare Comic Book Collection', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80', startingBid: 500, startsIn: 'In 3 days', description: 'A collection of key first appearances from the Silver Age.', bids: 0, sellerName: 'ComicCave' },
  ];

  const trendingItems: AuctionItem[] = [
    { id: 8, title: 'Classic Comic Collection', image: 'https://images.unsplash.com/photo-1594347963363-1434f828e434?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80', currentBid: 2500, bids: 45, description: 'Iconic issues from the golden age.', sellerName: 'CollectorVerse', endsIn: '1 day' },
    { id: 9, title: 'Leica Vintage Camera', image: 'https://images.unsplash.com/photo-1519638831568-d9897f54ed69?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80', currentBid: 300, bids: 12, description: 'A functional piece of photographic history.', sellerName: 'LensLegacy', endsIn: '4 hours' },
    { id: 10, title: 'Designer Handbag', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80', currentBid: 1200, bids: 25, description: 'A luxury handbag from a world-renowned designer.', sellerName: 'ChicBoutique', endsIn: '2 days' },
    { id: 11, title: 'Antique Pocket Watch', image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=774&q=80', currentBid: 450, bids: 18, description: 'An intricate gold-plated pocket watch.', sellerName: 'TimeKeepers', endsIn: '6 hours' },
  ];

  const blogPosts: BlogPost[] = [
    { id: 1, title: 'How to Win Your First Auction', excerpt: 'Essential tips for beginners.', link: '/blog/1' },
    { id: 2, title: 'The Art of Valuing Antiques', excerpt: 'Learn how experts determine value.', link: '/blog/2' },
    { id: 3, title: 'Spotlight: Top 5 Sales of 2025', excerpt: 'A look back at incredible items sold.', link: '/blog/3' },
  ];

  const SectionHeading = ({
    children,
    color = 'bg-blue-600',
    className = '',
  }: {
    children: React.ReactNode;
    color?: string;
    className?: string;
  }) => {
    return (
      <div className="text-center mb-12">
        <motion.h2
          className={`text-3xl lg:text-4xl font-bold text-gray-900 inline-block relative pb-3 ${className}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          {children}
          <motion.div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1/2 rounded-full ${color}`}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.h2>
      </div>
    );
  };

  type SideLoginPanelProps = {
    isLoggedIn: boolean;
  };

  const SideLoginPanel: React.FC<SideLoginPanelProps> = ({ isLoggedIn }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // Auto-close panel when user logs in
    useEffect(() => {
      if (isLoggedIn) {
        setIsOpen(false);
      }
    }, [isLoggedIn]);

    // Hide panel completely if logged in
    if (isLoggedIn) {
      return null;
    }
    return (
      <div
        className={`fixed top-1/2 -translate-y-1/2 transition-transform duration-300 z-50 ${
          isOpen ? 'right-0' : '-right-64 md:-right-72'
        }`}
      >
        <div className="relative">
          <button
            onClick={() => setIsOpen((open) => !open)}
            className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-4 rounded-l-md flex items-center font-semibold shadow-lg hover:bg-blue-700 transition-colors"
          >
            <FaUser className="mr-2" /> Login
          </button>
          <div className="bg-gray-900 text-white w-64 md:w-72 p-6 shadow-lg rounded-l-lg">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-700 pb-2">Login Access</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/register" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <FaUser className="mr-3" /> Bidder Registration
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <FaBuilding className="mr-3" /> Company Login
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                  <FaArrowCircleRight className="mr-3" /> Seller Registration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const sliderContent = [
    {
      pill: 'Why Choose AuctionZone?',
      title: 'Your Trusted Partner\nin Growth',
      buttonText: 'Login',
      image:
        'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      features: null,
      link: '/login',
    },
    {
      pill: 'A Smarter Bidding Experience',
      title: 'Discover the AuctionZone App Now!',
      buttonText: 'Explore Features',
      image: null,
      features: ['Quick & Secure Login', 'Easy Document Verification', 'Profile Status Tracking', 'Real-Time Auction Access'],
      link: '/features',
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
  };

  const Home: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentTrendingSlide, setCurrentTrendingSlide] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    // Guard: call before performing any bid action
    const requireAuth = (returnTo?: string) => {
      if (!isAuthenticated) {
        navigate(`/login${returnTo ? `?returnUrl=${encodeURIComponent(returnTo)}` : ''}`);
        return false;
      }
      return true;
    };

    // Example bid handler passed to cards
    const handlePlaceBid = (auctionId: number) => {
      // Return to the same page/anchor or to a details route after login
      const returnUrl = `/`; // or `/auctions/${auctionId}`
      if (!requireAuth(returnUrl)) return;

      // If authenticated, continue to bid page or open a bid modal
      navigate(`/auctions/${auctionId}`); // adjust to your details/bid route
    };

    useEffect(() => {
      const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % sliderContent.length), 6000);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      const trendingTimer = setInterval(() => {
        setCurrentTrendingSlide((prev) => (prev + 1) % trendingItems.length);
      }, 3000);
      return () => clearInterval(trendingTimer);
    }, []);

    useEffect(() => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          setTimeout(() => elem.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
      }
    }, [location]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);
    const slide = sliderContent[currentSlide];

    return (
      <main className="bg-gray-50">
        <SideLoginPanel isLoggedIn={false} />

        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
          {/* --- UNIFIED AUCTIONS SECTION --- */}
          <section className="py-16 bg-white">
            <div className="container mx-auto">
              {/* HERO SLIDER */}
              <div className="relative w-full h-[450px] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 rounded-2xl shadow-lg mb-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    className="w-full h-full absolute top-0 left-0 flex items-center px-6 md:px-20"
                  >
                    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="w-full md:w-1/2 text-center md:text-left">
                        <motion.span
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="inline-block bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold text-xs mb-4 shadow-md"
                        >
                          {slide.pill}
                        </motion.span>
                        <motion.h1
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"
                        >
                          {slide.title.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </motion.h1>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                          <Link
                            to={slide.link}
                            className="mt-6 inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
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
                            className="max-w-full max-h-[350px]"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3, type: 'spring' }}
                          />
                        )}
                        {slide.features && (
                          <div className="text-gray-700 space-y-4">
                            {slide.features.map((feature, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                                className="flex items-center text-lg font-medium bg-white/50 p-3 rounded-lg shadow-sm"
                              >
                                <FaCheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
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
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition z-10 text-gray-800"
                >
                  <FaArrowLeft />
                </button>
                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition z-10 text-gray-800"
                >
                  <FaArrowRight />
                </button>
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {sliderContent.map((_, idx) => (
                    <button
                      key={idx}
                      aria-label={`Go to slide ${idx + 1}`}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${currentSlide === idx ? 'bg-blue-600' : 'bg-white/80'}`}
                    />
                  ))}
                </div>
              </div>

              {/* FEATURED AUCTIONS - Horizontal Scroll */}
              <div className="mb-16">
                <SectionHeading color="bg-teal-500">Featured Auctions</SectionHeading>
                <div className="flex space-x-6 overflow-x-auto py-4 -mx-6 px-6 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                  {featuredAuctions.map((item) => (
                    <div key={item.id} className="snap-center flex-shrink-0 w-80">
                      {/* Ensure your card calls onPlaceBid when its “Bid” button is clicked */}
                      <FeaturedAuctionCard item={item} onPlaceBid={() => handlePlaceBid(item.id)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* UPCOMING AUCTIONS - Timeline */}
              <div id="upcoming">
                <SectionHeading color="bg-blue-500" className="font-serif">
                  Upcoming Auctions
                </SectionHeading>
                <div className="relative">
                  <div className="absolute left-1/2 -ml-0.5 w-1 h-full bg-blue-200"></div>
                  <div className="space-y-12">
                    {upcomingItems.map((item, index) => (
                      <UpcomingAuctionCard
                        key={item.id}
                        item={item}
                        isRight={index % 2 !== 0}
                        onPlaceBid={() => handlePlaceBid(item.id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </motion.div>

        {/* --- TRENDING NOW SECTION --- */}
        <motion.section
          id="trending"
          className="py-16 bg-gray-900"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto">
            <SectionHeading color="bg-purple-500" className="text-white">
              Trending Now
            </SectionHeading>
            <div className="relative h-[450px] md:h-[550px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence>
                <motion.div
                  key={currentTrendingSlide}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${trendingItems[currentTrendingSlide].image})` }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h3 className="text-2xl font-bold">{trendingItems[currentTrendingSlide].title}</h3>
                    <p className="mt-1 text-base">
                      Current Bid:{' '}
                      <span className="font-bold">
                        ${trendingItems[currentTrendingSlide].currentBid?.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {trendingItems.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTrendingSlide(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      currentTrendingSlide === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* --- BLOG SECTION --- */}
        <motion.section
          className="py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto">
            <SectionHeading color="bg-pink-500" className="font-serif italic">
              From Our Blog
            </SectionHeading>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    );
  };

  export default Home;
