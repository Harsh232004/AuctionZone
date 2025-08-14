export interface AuctionItem {
  id: number;
  title: string;
  image: string;
  currentBid?: number;
  startingBid?: number;
  endsIn?: string;
  startsIn?: string;
  bids?: number;
  description?: string; 
  sellerName?: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  link: string;
}
