import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Simulate form submission (replace with real API call in production)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1200);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700">
          Have a question? Need help with an auction or your profile? We’re here for you.
        </p>
      </header>

      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="bg-blue-50 p-6 rounded-xl shadow flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-blue-600" />
            <div>
              <h3 className="font-semibold">Email</h3>
              <a href="mailto:support@auctionzone.com" className="text-blue-700 hover:underline">
                support@auctionzone.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-600" />
            <div>
              <h3 className="font-semibold">Phone</h3>
              <a href="tel:+18001234567" className="text-blue-700 hover:underline">
                +1-800-123-4567
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-blue-600" />
            <div>
              <h3 className="font-semibold">Head Office</h3>
              <span>123 Marketplace Ave, Mumbai, India</span>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4 text-blue-600">Send us a message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="sr-only" htmlFor="name">Your Name</label>
              <div className="flex items-center bg-white rounded-lg px-3">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  required
                  className="w-full py-2 outline-none bg-transparent"
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="email">Your Email</label>
              <div className="flex items-center bg-white rounded-lg px-3">
                <FaEnvelope className="text-gray-400 mr-2" />
                <input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  required
                  className="w-full py-2 outline-none bg-transparent"
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
            </div>
            <div>
              <label className="sr-only" htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="How can we help you?"
                value={form.message}
                minLength={5}
                required
                className="w-full h-28 rounded-lg p-3 resize-none outline-none"
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {status === "sending" ? "Sending..." : "Send"}
            </button>
            {status === "success" && (
              <div className="text-green-600 text-sm mt-1">Your message was sent! We'll reply by email soon.</div>
            )}
            {status === "error" && (
              <div className="text-red-600 text-sm mt-1">Oops! Something went wrong—please try again.</div>
            )}
          </form>
        </div>
      </section>

      <section className="mt-8 p-6 bg-gray-50 rounded-xl text-gray-700 text-center">
        <h2 className="text-xl font-bold text-blue-600 mb-2">Helpdesk Hours:</h2>
        <div>Monday to Saturday: 9:00am – 9:00pm IST</div>
        <div>Sunday: 11:00am – 6:00pm IST</div>
        <div className="mt-3">
          For support with auctions, account issues, or verification, please email or fill the form above. We respond within 24 hours on business days.
        </div>
      </section>
    </main>
  );
};

export default Contact;
