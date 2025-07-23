const Footer: React.FC = () => (
  <footer className="bg-black py-4 text-center text-sm text-white">
    <div className="mt-4 pt-4"> {/* Removed border-t for no break line */}
      <h4 className="font-semibold mb-2">Helpdesk</h4>
      <p>Email: support@auctionzone.com | Phone: +1-800-123-4567</p>
      <a href="/support" className="hover:text-blue-700">Contact Support</a>
    </div>
    <div className="mt-2">
      <a href="#" className="mx-2 hover:text-blue-700">Facebook</a>
      <a href="#" className="mx-2 hover:text-blue-700">Twitter</a>
      <a href="#" className="mx-2 hover:text-blue-700">Instagram</a>
    </div>
  </footer>
);

export default Footer;
