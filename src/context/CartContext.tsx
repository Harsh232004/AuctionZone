import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; // <-- THIS IS THE FIX
import type { AuctionItem } from '../types';

interface CartContextType {
  cartItems: AuctionItem[];
  addItem: (item: AuctionItem) => void;
  removeItem: (id: number) => void;
}

// Create the context with a default value
export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addItem: () => {},
  removeItem: () => {},
});

// Create the provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<AuctionItem[]>(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItem = (item: AuctionItem) => {
    // Prevent duplicates
    if (!cartItems.find(cartItem => cartItem.id === item.id)) {
      setCartItems(prevItems => [...prevItems, item]);
    }
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};
