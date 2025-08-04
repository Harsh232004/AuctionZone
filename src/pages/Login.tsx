import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle, FaEnvelope, FaLock } from 'react-icons/fa';

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden lg:block bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562620479-916758415d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold">
              Auction<span className="text-blue-400">Zone</span>
            </h1>
            <p className="mt-4 text-lg max-w-md text-gray-200">
              The premier destination for collectors and enthusiasts. Your next great find is just a login away.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-50 p-6 sm:p-12">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-gray-600">Enter your credentials to access your account.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  id="password" type="password" placeholder="Password" value={password} required
                  className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="remember" className="text-gray-600">Remember me</label>
              </div>
              <a href="#" className="font-semibold text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md"
            >
              Log In
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
            Don't have an account? <Link to="/register" className="font-semibold text-blue-600 hover:underline">Register here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
