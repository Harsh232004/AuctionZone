import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

type LoginResponse = {
  success: boolean;
  message: string;
  data: {
    accessToken?: string;
    tokenType?: string;
    user?: { id: number; username: string; email: string };
  } | null;
};

interface LoginProps {
  onSuccess?: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { setSession } = useAuth();

  // ✅ Standard email/password login
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg = body?.message || `HTTP ${res.status}`;
        throw new Error(msg);
      }

      const body = (await res.json()) as LoginResponse;
      const token = body?.data?.accessToken;
      if (!token) throw new Error('No token returned by server');

      setSession(token);
      onSuccess?.();
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err?.message ?? 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  }

  // ✅ Redirect to Spring Boot Google OAuth2 login
  const handleGoogleRedirect = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Left panel */}
      <div
        className="relative hidden lg:block bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1562620479-916758415d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=987&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl font-bold">
              Auction<span className="text-blue-400">Zone</span>
            </h1>
            <p className="mt-4 text-lg max-w-md text-gray-200">
              The premier destination for collectors and enthusiasts. Your next
              great find is just a login away.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-center justify-center bg-gray-50 p-6 sm:p-12">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="text-left mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back!</h2>
            <p className="mt-2 text-gray-600">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* Email/password login */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  required
                  className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <FaLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  required
                  className="w-full py-3 pl-12 pr-12 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-600"
                  aria-label={showPwd ? 'Hide password' : 'Show password'}
                >
                  {showPwd ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="remember" className="text-gray-600">Remember me</label>
              </div>
              <a href="#" className="font-semibold text-blue-600 hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md disabled:opacity-60"
            >
              {submitting ? 'Signing in…' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <hr className="w-full" />
            <span className="text-gray-500 text-sm">OR</span>
            <hr className="w-full" />
          </div>

          {/* ✅ Google OAuth2 Redirect Button */}
          <button
            onClick={handleGoogleRedirect}
            className="w-full bg-white border border-gray-300 rounded-lg py-3 flex items-center justify-center gap-3 shadow-sm hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          <p className="mt-8 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
