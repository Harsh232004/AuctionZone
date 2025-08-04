import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CONTACT, SOCIALS } from "../config";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Subscribing with email:", email);
      setEmail("");
      alert("Thank you for subscribing!");
    }
  };

  return (
    <footer className="bg-gray-900 py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-3">AuctionZone</h4>
            <p className="text-sm text-gray-400">
              Your trusted online platform for discovering, bidding on, and
              winning rare collectibles and more.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/auctions"
                  className="text-gray-400 hover:text-white"
                >
                  Auctions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

         
          <div>
            <h4 className="font-semibold text-lg mb-3">Follow Us</h4>
          
            <div className="flex items-center gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label} 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <h4 className="font-semibold text-lg mb-3">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Get the latest auction news and exclusive offers.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 text-white bg-gray-800 border border-gray-600 rounded-l-md focus:outline-none focus:border-blue-500"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white p-2.5 rounded-r-md hover:bg-blue-700"
                aria-label="Subscribe"
              >
                <FaArrowRight />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p className="mb-2">
            Helpdesk:{" "}
            <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
              {CONTACT.email}
            </a>{" "}
            |{" "}
            <a
              href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`}
              className="hover:text-white"
            >
              {CONTACT.phone}
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} AuctionZone. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
