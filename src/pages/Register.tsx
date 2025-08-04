import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle registration logic here
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* 1. Left Column: Image and Branding */}
      <div className="relative hidden lg:block bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521790797524-22028de3aa26?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold">
              Join <span className="text-blue-400">AuctionZone</span>
            </h1>
            <p className="mt-4 text-lg max-w-md text-gray-200">
              Create your account to start bidding, selling, and discovering unique items from around the world.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 2. Right Column: Registration Form */}
      <div className="flex flex-col items-center justify-center bg-gray-50 p-6 sm:p-12">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
            <p className="mt-2 text-gray-600">Let's get you started on your auction journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <div className="relative">
                <FaUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="username" type="text" placeholder="Choose a username" value={username} required
                  className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email" type="email" placeholder="you@example.com" value={email} required
                  className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password" type="password" placeholder="Create a password" value={password} required
                  className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} required
                  className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <input type="checkbox" id="terms" required className="mt-1 h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
              <label htmlFor="terms" className="text-gray-600 text-sm">
                I agree to the <a href="#" className="font-semibold text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="font-semibold text-blue-600 hover:underline">Privacy Policy</a>.
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
            >
              Create Account
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <hr className="w-full" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="w-full" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition">
            <FaGoogle className="text-red-500" />
            <span className="font-semibold text-gray-700">Continue with Google</span>
          </button>

          <p className="mt-8 text-center text-sm">
            Already have an account? <Link to="/login" className="font-semibold text-blue-600 hover:underline">Login here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
