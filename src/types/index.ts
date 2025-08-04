// src/types/index.ts

// The updated type definition for an auction item
export interface AuctionItem {
  id: number;
  title: string;
  image: string;
  currentBid?: number;
  startingBid?: number;
  endsIn?: string;
  startsIn?: string;
  bids?: number;
}

// The updated type definition for a blog post
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  link: string;
}
