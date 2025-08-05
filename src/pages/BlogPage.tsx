import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { BlogPost } from "../types";
import { FaArrowLeft } from "react-icons/fa";

// --- EXPANDED MOCK DATA ---
const blogPosts: BlogPost[] = [
  { id: 1, title: "How to Win Your First Auction", excerpt: "Essential tips and strategies for beginners to navigate the auction world and make their first winning bid.", link: "/blog/1" },
  { id: 2, title: "The Art of Valuing Antiques", excerpt: "Learn how experts determine the value of rare items, from provenance and condition to market trends.", link: "/blog/2" },
  { id: 3, title: "Spotlight: Top 5 Sales of 2025", excerpt: "A look back at the most incredible, record-breaking items sold on AuctionZone this year.", link: "/blog/3" },
];

// --- RICH HTML CONTENT (WITH CORRECTED IMAGE URLS) ---
const blogContents: { [id: number]: string } = {
  1: `
    <p class="text-lg text-gray-600 mb-6">Welcome to the exciting world of auctions! Whether you're an enthusiastic collector or simply a curious beginner, participating in auctions can be both thrilling and rewarding. To ensure your success, it’s essential to understand the nuances of bidding and preparation.</p>
    
    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Key Strategies for Success</h2>
    <p>Before the bidding begins, your most powerful tool is research. Familiarize yourself with the auction house’s rules, read item descriptions thoroughly, and investigate past sale prices for similar items. This knowledge will empower you to bid intelligently.</p>
    <p class="mt-4">Having a clear budget is crucial. Determine your maximum bid limit before the auction starts and stick to it, no matter how intense the bidding becomes. This discipline will prevent you from getting caught in a bidding war and overpaying.</p>

    <img src="https://images.unsplash.com/photo-1565610261389-985a1a1f4c7c?auto=format&fit=crop&w=1200&q=80" alt="An expert inspecting a rare artifact before an auction" class="my-8 rounded-lg shadow-md" />
    
    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Understanding the Process</h2>
    <p>Auctions come in many forms—live, timed online, sealed bids, and more. Each type requires a different strategy. In a live auction, for example, observing your competitors and the auctioneer’s rhythm is key. In a timed online auction, patience is paramount, as much of the action happens in the final moments.</p>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Case Study: A Smart Win</h2>
    <p>Recently, a new bidder successfully acquired a vintage Rolex by applying these principles. They studied the catalog, set a firm budget, and patiently waited for the right moment. By staying calm and focused, they won the watch for a price well below its estimated market value.</p>
  `,
  2: `
    <p class="text-lg text-gray-600 mb-6">Determining the value of an antique is a complex art that blends historical knowledge, an eye for detail, and an understanding of market dynamics. Here’s a look at what our experts consider when appraising a piece.</p>

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Core Valuation Factors</h2>
    <ul class="list-disc list-inside space-y-2">
      <li><strong>Provenance:</strong> A clear, documented history of ownership can dramatically increase an item's authenticity and value.</li>
      <li><strong>Condition:</strong> Original, well-preserved items will always fetch higher prices than those that are damaged or have been poorly restored.</li>
      <li><strong>Rarity:</strong> Unique or scarce pieces from notable periods are highly coveted by collectors.</li>
      <li><strong>Market Trends:</strong> Desirability fluctuates. Keeping an eye on current market trends can reveal what’s hot and what’s not.</li>
    </ul>

    <img src="https://images.unsplash.com/photo-1583542224754-319b7b4a283e?auto=format&fit=crop&w=1200&q=80" alt="An appraiser carefully examining an antique clock" class="my-8 rounded-lg shadow-md" />

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">Tips for Buyers and Sellers</h2>
    <p>For buyers, it's crucial to seek expert opinions and verify documentation before making a significant purchase. For sellers, obtaining a professional appraisal is the best way to set a realistic price and attract serious bidders. Both parties benefit from a transparent and well-informed process.</p>
  `,
  3: `
    <p class="text-lg text-gray-600 mb-6">2025 has been a landmark year for AuctionZone, with several high-profile items shattering records and capturing the imagination of collectors worldwide. Here are five of the most memorable sales.</p>
    
    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">1. The "Azure Dragon" Ming Vase</h2>
    <p>This exceedingly rare 15th-century vase, known for its vibrant cobalt blue and flawless condition, sparked a 20-minute bidding war between collectors on three continents. It ultimately sold for a staggering $2.3 million.</p>
    
    <img src="https://studiopot-uh-ree.in/wp-content/uploads/2022/07/IMG_0087-scaled-1.jpg" alt="The Azure Dragon Ming Vase" class="my-8 rounded-lg shadow-md" />

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">2. A 1962 Ferrari 250 GTO</h2>
    <p>Considered the holy grail of classic cars, this pristine Ferrari 250 GTO with a documented racing history sold for an incredible $48.4 million after a tense, final bid between two determined collectors.</p>

    <img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80" alt="A classic 1962 Ferrari 250 GTO" class="my-8 rounded-lg shadow-md" />

    <h2 class="text-2xl font-bold text-gray-800 mt-8 mb-4">3. The First Edition "Action Comics #1"</h2>
    <p>The comic book that introduced Superman to the world. A graded 8.5 copy, one of only a handful known to exist in such high condition, sold to a private collector for $3.2 million, reaffirming the power of pop culture artifacts.</p>
  `,
};


const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((b) => b.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 group">
          <FaArrowLeft className="mr-2" />
          Back to All Posts
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/#blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 group font-semibold">
            <FaArrowLeft className="mr-2 transform group-hover:-translate-x-1 transition-transform" />
            Back to All Posts
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 mb-12 border-b pb-8">{post.excerpt}</p>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:my-2 prose-img:rounded-xl prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: blogContents[post.id] || '<i>Content coming soon.</i>' }}
          />
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
