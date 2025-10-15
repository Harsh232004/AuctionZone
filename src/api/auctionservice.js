// src/api/auctionService.js
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const auctionAPI = {
  // Auctions
  getAllAuctions: (page = 0, size = 10) => 
    api.get(`/auctions?page=${page}&size=${size}`),
  
  getAuctionById: (id) => 
    api.get(`/auctions/${id}`),
  
  getFeaturedAuctions: (page = 0, size = 10) => 
    api.get(`/auctions/featured?page=${page}&size=${size}`),
  
  getTrendingAuctions: (page = 0, size = 10) => 
    api.get(`/auctions/trending?page=${page}&size=${size}`),
  
  createAuction: (auctionData) => 
    api.post('/auctions', auctionData),
  
  updateAuction: (id, auctionData) => 
    api.put(`/auctions/${id}`, auctionData),
  
  deleteAuction: (id) => 
    api.delete(`/auctions/${id}`),

  // Bids
  placeBid: (auctionId, bidData) => 
    api.post(`/auctions/${auctionId}/bids`, bidData),
  
  getBids: (auctionId) => 
    api.get(`/auctions/${auctionId}/bids`),

  // Watchlist
  getWatchlist: () => 
    api.get('/watchlist'),
  
  addToWatchlist: (auctionId) => 
    api.post(`/watchlist/${auctionId}`),
  
  removeFromWatchlist: (auctionId) => 
    api.delete(`/watchlist/${auctionId}`),

  // Authentication
  login: (credentials) => 
    api.post('/auth/login', credentials),
  
  register: (userData) => 
    api.post('/auth/register', userData),
  
  logout: () => 
    api.post('/auth/logout'),
};
