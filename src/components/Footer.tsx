import { SOCIALS, CONTACT } from "../config";

const Footer: React.FC = () => (
  <footer className="bg-black py-8 text-center text-sm text-white">
    <div className="max-w-xl mx-auto px-4">
      <h4 className="font-semibold mb-2">Helpdesk</h4>
      <p>
        Email: <a href={`mailto:${CONTACT.email}`} className="hover:text-blue-400">{CONTACT.email}</a> |{" "}
        Phone: <a href={`tel:${CONTACT.phone.replace(/[^+\d]/g, "")}`} className="hover:text-blue-400">{CONTACT.phone}</a>
      </p>
      <a href={CONTACT.supportHref} className="hover:text-blue-400 block mt-2">Contact Support</a>
      <div className="flex justify-center gap-4 mt-4">
        {SOCIALS.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="mx-2 hover:text-blue-400"
          >
            {s.label}
          </a>
        ))}
      </div>
      <p className="mt-6 text-xs text-gray-400">&copy; {new Date().getFullYear()} AuctionZone. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
