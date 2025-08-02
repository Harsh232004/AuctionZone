import { useState } from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-blue-700">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Login to AuctionZone</p>
        </div>
        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center text-sm">
          <p>Don't have an account? <Link to="/register" className="text-blue-700 hover:underline">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
