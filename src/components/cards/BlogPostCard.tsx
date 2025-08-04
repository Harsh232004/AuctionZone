
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { BlogPost } from "../../types";

const BlogPostCard = ({ post }: { post: BlogPost }) => (
  <motion.div
    className="bg-gray-200 rounded-xl shadow-xl hover:shadow-2xl 
               transition-shadow duration-300 ease-in-out 
               overflow-hidden group flex flex-col"
    whileHover={{ y: -8, scale: 1.03 }}
  >
    <div className="p-8 flex-grow">
      <h3 className="text-xl font-bold text-gray-900 mb-3">{post.title}</h3>
      <p className="text-gray-600 mb-5 flex-grow">{post.excerpt}</p>
    </div>
    <div className="p-6 bg-gray-300">
      <Link 
        to={post.link} 
        className="font-semibold text-blue-600 hover:text-blue-800 transition-colors group-hover:underline"
      >
        Read More &rarr;
      </Link>
    </div>
  </motion.div>
);

export default BlogPostCard;
