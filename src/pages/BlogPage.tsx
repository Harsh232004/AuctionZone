import { useParams } from "react-router-dom";
import type { BlogPost } from "../types";

const blogPosts: BlogPost[] = [
  { id: 1, title: "How to Win Your First Auction", excerpt: "Essential tips...", link: "/blog/1" },
  { id: 2, title: "The Art of Valuing Antiques", excerpt: "Learn how experts...", link: "/blog/2" },
  { id: 3, title: "Spotlight: Top 5 Sales of 2025", excerpt: "A look back at...", link: "/blog/3" },
];

const blogContents: { [id: number]: string } = {
  1: `Full article for blog 1 goes here. Provide all sections, images, formatting, etc.`,
  2: `Detailed expert advice on valuing antiques...`,
  3: `Incredible stories from our top five AuctionZone sales...`,
};

const BlogPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((b) => b.id === Number(id));

  if (!post) {
    return <div className="p-8 text-center text-xl text-red-500">Blog post not found.</div>;
  }

  return (
    <main className="max-w-3xl mx-auto p-6 py-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-md text-gray-600 mb-12">{post.excerpt}</p>
      <article className="prose prose-lg">
        {blogContents[post.id] || <i>Content coming soon.</i>}
      </article>
    </main>
  );
};

export default BlogPage;
