import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
    FaArrowLeft, FaArrowRight, FaUser, FaBuilding, FaArrowCircleRight, 
    FaCheckCircle, FaFire, FaClock, FaGavel 
} from 'react-icons/fa';

// --- Data for each slide in the hero section ---
const sliderContent = [
     {
        pill: 'Why Choose AuctionZone?',
        title: 'Your Trusted Partner\nin Growth',
        buttonText: 'Login',
        image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
        features: null,
    },
    {
        pill: 'A Smarter Bidding Experience',
        title: 'Discover the AuctionZone App Now!',
        buttonText: 'Explore Features',
        image: null,
        features: [
            'Quick & Secure Login',
            'Easy Document Verification',
            'Profile Status Tracking',
            'Real-Time Auction Access',
        ],
    },
];

// --- Slide-Out Login Panel Component ---
const SideLoginPanel = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`fixed top-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'right-0' : '-right-64 md:-right-72'}`}>
            <div className="relative">
                <button onClick={() => setIsOpen(!isOpen)} className="absolute left-0 -translate-x-full top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-4 rounded-l-md flex items-center font-semibold shadow-lg hover:bg-blue-700 transition-colors">
                    <FaUser className="mr-2" /> Login
                </button>
                <div className="bg-gray-800 text-white w-64 md:w-72 p-6 shadow-lg rounded-l-lg">
                    <h3 className="text-xl font-bold mb-4 border-b border-gray-600 pb-2">Login Access</h3>
                    <ul className="space-y-4">
                        <li><Link to="/register" className="flex items-center hover:text-blue-400 transition-colors"><FaUser className="mr-3"/> Bidder Registration</Link></li>
                        <li><Link to="/login/company" className="flex items-center hover:text-blue-400 transition-colors"><FaBuilding className="mr-3"/> Company Login</Link></li>
                        <li><Link to="/login/bidder" className="flex items-center hover:text-blue-400 transition-colors"><FaArrowCircleRight className="mr-3"/> Bidder Login</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

// --- Framer Motion Variants for Animations ---
const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    },
};

const cardContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// --- Main Home Component ---
const Home: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const featuredAuctions = [
        { id: 1, title: "Vintage Rolex Watch", image: "https://cdn.shopify.com/s/files/1/0526/8658/6018/files/Vintage_Watch_Longines_1024x1024.jpg?v=1741170820", currentBid: 1500, endsIn: "2 days" },
        { id: 2, title: "Antique Chinese Vase", image: "https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg", currentBid: 250, endsIn: "1 day" },
        { id: 3, title: "Signed Baseball Card", image: "https://images.unsplash.com/photo-1612423284934-59074b33b0e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", currentBid: 750, endsIn: "5 hours" },
        { id: 4, title: "19th Century Armchair", image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80", currentBid: 400, endsIn: "3 days" },
    ];
    const upcomingItems = [
        { id: 5, title: "Classic Muscle Car", image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80", startingBid: 15000, startsIn: "Tomorrow" },
        { id: 6, title: "Modern Art Painting", image: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", startingBid: 2000, startsIn: "In 2 days" },
    ];
    const trendingItems = [
        { id: 7, title: "Solid Gold Necklace", image: "https://images.unsplash.com/photo-1611652033959-8a5628174083?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80", currentBid: 800, bids: 15 },
        { id: 8, title: "Leica Vintage Camera", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80", currentBid: 300, bids: 12 },
    ];
     const blogPosts = [
        { id: 1, title: "How to Win Your First Auction", excerpt: "Essential tips and strategies for beginners in the world of online bidding.", link: "/blog/1" },
        { id: 2, title: "The Art of Valuing Antiques", excerpt: "Learn how experts determine the value of rare and antique items.", link: "/blog/2" },
        { id: 3, title: "Spotlight: Top 5 Sales of 2025", excerpt: "A look back at the most incredible items sold on AuctionZone this year.", link: "/blog/3" },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderContent.length) % sliderContent.length);

    const slide = sliderContent[currentSlide];

    return (
        <main className="bg-gray-50">
            <section className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200">
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
                            {/* Left Column (Text) */}
                            <div className="w-full md:w-1/2 text-center md:text-left">
                                <motion.span
                                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                                    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-full font-semibold text-sm mb-5 shadow-lg"
                                >
                                    {slide.pill}
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-4xl lg:text-6xl font-extrabold text-gray-800 leading-tight"
                                >
                                    {slide.title.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                                </motion.h1>
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
                                    <Link
                                        to="/login"
                                        className="mt-8 inline-block bg-blue-600 text-white font-bold py-4 px-12 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                                    >
                                        {slide.buttonText}
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Right Column (Image or Features) */}
                            <div className="hidden md:flex w-1/2 justify-center items-center">
                                {slide.image && (
                                    <motion.img
                                        src={slide.image} alt="AuctionZone App"
                                        className="max-w-full max-h-[500px]"
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
                                    />
                                )}
                                {slide.features && (
                                    <div className="text-gray-700 space-y-5">
                                        {slide.features.map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + i * 0.2, duration: 0.5 }}
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
                
                <button onClick={prevSlide} aria-label="Previous Slide" className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-lg hover:bg-white transition z-10"><FaArrowLeft className="text-gray-800" /></button>
                <button onClick={nextSlide} aria-label="Next Slide" className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-3 shadow-lg hover:bg-white transition z-10"><FaArrowRight className="text-gray-800" /></button>
            </section>
            
            <SideLoginPanel />
            
            <motion.section 
                className="py-16 px-6 container mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Featured Auctions</h2>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={cardContainerVariants}
                >
                    {featuredAuctions.map((item) => (
                        <motion.div 
                            key={item.id} 
                            className="bg-white rounded-xl shadow-lg overflow-hidden group"
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.03, boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                        >
                            <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                            <div className="p-5">
                                <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
                                <p className="text-gray-600 mb-2">Current Bid: <span className="font-semibold text-blue-600">${item.currentBid}</span></p>
                                <p className="text-red-500 font-medium mb-4 flex items-center"><FaClock className="mr-2" /> {item.endsIn}</p>
                                <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                    <FaGavel /> Place Bid
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </motion.section>
            
            <motion.section 
                className="py-16 px-6 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Upcoming Items</h2>
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={cardContainerVariants}
                    >
                        {upcomingItems.map((item) => (
                             <motion.div 
                                key={item.id} 
                                className="bg-gray-100 rounded-xl shadow-md overflow-hidden" 
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.03 }}
                             >
                                 <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                                 <div className="p-5">
                                     <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
                                     <p className="text-gray-600 mb-2">Starting Bid: <span className="font-semibold text-green-600">${item.startingBid}</span></p>
                                     <p className="text-gray-500 mb-4 flex items-center"><FaClock className="mr-2" /> Starts: {item.startsIn}</p>
                                     <button className="w-full bg-gray-700 text-white font-semibold py-2.5 rounded-lg hover:bg-gray-800 transition-colors">View Details</button>
                                 </div>
                             </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <motion.section 
                className="py-16 px-6 container mx-auto"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
            >
                <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">Trending Now</h2>
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={cardContainerVariants}
                >
                     {trendingItems.map((item) => (
                         <motion.div 
                            key={item.id} 
                            className="bg-white rounded-xl shadow-lg overflow-hidden relative" 
                            variants={cardVariants} 
                            whileHover={{ y: -8, scale: 1.03 }}
                         >
                             <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md animate-pulse">
                                 <FaFire className="mr-1" /> HOT
                             </div>
                             <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
                             <div className="p-5">
                                 <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">{item.title}</h3>
                                 <p className="text-gray-600 mb-2">Current Bid: <span className="font-semibold text-blue-600">${item.currentBid}</span></p>
                                 <p className="text-gray-500 mb-4">Bids: {item.bids}</p>
                                 <button className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"><FaGavel /> Place Bid</button>
                             </div>
                         </motion.div>
                     ))}
                </motion.div>
            </motion.section>

             <motion.section 
                className="py-16 px-6 bg-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={sectionVariants}
             >
                <div className="container mx-auto">
                    <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">From Our Blog</h2>
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={cardContainerVariants}
                    >
                        {blogPosts.map((post) => (
                            <motion.div 
                                key={post.id} 
                                className="bg-gray-50 rounded-xl shadow-lg overflow-hidden group flex flex-col"
                                variants={cardVariants}
                                whileHover={{ y: -8, scale: 1.03 }}
                            >
                                <div className="p-8 flex-grow">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
                                    <p className="text-gray-600 mb-5 flex-grow">{post.excerpt}</p>
                                </div>
                                <div className="p-6 bg-gray-100">
                                  <Link to={post.link} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors group-hover:underline">
                                    Read More &rarr;
                                  </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
             </motion.section>
        </main>
    );
};

export default Home;
