import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaGavel, 
  FaUsers, 
  FaLightbulb, 
  FaLock, 
  FaUserPlus, 
  FaSearch, 
  FaHandshake 
} from "react-icons/fa";

// Data for the "Why Choose Us" section
const features = [
  {
    icon: <FaGavel className="w-8 h-8 text-blue-600" />,
    title: "Transparent Auctions",
    desc: "Experience real-time bidding with an honest countdown—see every bid as it happens.",
  },
  {
    icon: <FaUsers className="w-8 h-8 text-blue-600" />,
    title: "Verified Community",
    desc: "Our members are fully verified, so you can bid and sell confidently with people who share your passion.",
  },
  {
    icon: <FaLock className="w-8 h-8 text-blue-600" />,
    title: "Secure Platform",
    desc: "Advanced encryption and trusted payment partners keep your transactions and data safe.",
  },
  {
    icon: <FaLightbulb className="w-8 h-8 text-blue-600" />,
    title: "Innovation for Bidders",
    desc: "Get smart suggestions and seamless mobile experiences to help you win.",
  },
];

// New data for the visual "How It Works" guide
const steps = [
  {
    icon: <FaUserPlus size={32} className="text-blue-500" />,
    title: "Register & Verify",
    desc: "Sign up in minutes and complete a quick verification to join our trusted community."
  },
  {
    icon: <FaSearch size={32} className="text-blue-500" />,
    title: "Discover & Watch",
    desc: "Browse daily auctions, discover hidden gems, and add items to your watchlist."
  },
  {
    icon: <FaGavel size={32} className="text-blue-500" />,
    title: "Bid & Win",
    desc: "Join live auctions, place your bids in real-time, and experience the thrill of winning."
  },
  {
    icon: <FaHandshake size={32} className="text-blue-500" />,
    title: "Pay & Receive",
    desc: "Complete your purchase through our secure payment gateway and get ready for your item."
  },
];

const About = () => (
  <main className="bg-white">
    {/* 1. Immersive Hero Section */}
    <section className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          The Thrill of the Chase, Reimagined
        </h1>
        <p className="mt-4 text-xl max-w-3xl text-gray-200">
          We combine the excitement of live auctions with cutting-edge technology to bring you a world of unique treasures.
        </p>
      </div>
    </section>

    {/* 2. Modern Features Section */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-800">Why Choose AuctionZone?</h2>
          <p className="mt-2 text-lg text-gray-500">A platform built on trust, community, and innovation.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-start text-left"
              whileHover={{ y: -10, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. Visual "How It Works" Guide */}
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-800">Start Your Journey in 4 Steps</h2>
          <p className="mt-2 text-lg text-gray-500">From discovery to delivery, we've made the process simple and secure.</p>
        </div>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-6xl font-black text-gray-200 mb-2">0{idx + 1}</div>
              {step.icon}
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. Two-Column Mission Section */}
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-blue-900">Our Mission & Vision</h2>
          <p className="mt-4 text-lg text-gray-700">
            Our mission is to revolutionize how people buy and sell unique items online by making auctions fun, accessible, and trustworthy for all—whether you're a first-time bidder or a seasoned collector.
          </p>
          <p className="mt-4 text-lg text-gray-700">
            Founded by auction enthusiasts and tech professionals, we believe everyone should have access to a world of unique treasures.
          </p>
        </div>
        <div className="h-80 lg:h-96 rounded-2xl overflow-hidden shadow-2xl">
          <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" alt="Team working on a project" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
    
    {/* 5. Dedicated Call-to-Action (CTA) */}
    <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-extrabold">Ready to Join the Community?</h2>
        <p className="mt-4 text-lg text-blue-100">Sign up today and start your journey with thousands of collectors and enthusiasts.</p>
        <div className="flex gap-4 mt-8 justify-center flex-wrap">
          <Link to="/register" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105">Register Now</Link>
          <Link to="/upcoming" className="bg-transparent border-2 border-white font-semibold px-8 py-3 rounded-lg hover:bg-white/10 transition transform hover:scale-105">See Upcoming Auctions</Link>
        </div>
      </div>
    </section>
  </main>
);

export default About;
