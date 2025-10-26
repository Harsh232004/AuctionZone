import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import type { ReactNode } from "react";



export const CONTACT = {
  email: "support@auctionzone.com",
  phone: "+1 (555) 123-4567",
  supportHref: "/contact",
};


export const SOCIALS: { label: string; href: string; icon: ReactNode }[] = [
  { label: "Facebook", href: "https://facebook.com", icon: <FaFacebook size={20} /> },
  { label: "Twitter", href: "https://twitter.com", icon: <FaTwitter size={20} /> },
  { label: "LinkedIn", href: "https://linkedin.com", icon: <FaLinkedin size={20} /> },
  { label: "Instagram", href: "https://instagram.com", icon: <FaInstagram size={20} /> },
];





