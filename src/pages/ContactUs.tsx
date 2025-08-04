import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1500);
  };
  
  const officePosition: [number, number] = [19.0760, 72.8777];

  return (
    <main className="bg-white">
      <header className="bg-gray-50 py-16 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800">Get in Touch</h1>
          <p className="mt-4 text-lg text-gray-600">
            Have a question, feedback, or a partnership inquiry? Our team is ready to help.
          </p>
        </div>
      </header>
      
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
              <p className="mt-2 text-gray-600">
                Fill out the form, and we'll get back to you within 24 business hours. For urgent matters, please use the contact details below.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <FaEnvelope className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Email Us</h3>
                  <a href="mailto:support@auctionzone.com" className="text-blue-700 hover:underline">support@auctionzone.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <FaPhone className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Call Us</h3>
                  <a href="tel:+18001234567" className="text-blue-700 hover:underline">+1-800-123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                <FaMapMarkerAlt className="text-blue-600 w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Our Office</h3>
                  <p className="text-gray-700">123 Marketplace Ave, Mumbai, India</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send a Direct Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="font-medium text-gray-700">Your Name</label>
                <input
                  id="name" type="text" placeholder="John Doe" value={form.name} required
                  className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="email" className="font-medium text-gray-700">Your Email</label>
                <input
                  id="email" type="email" placeholder="you@example.com" value={form.email} required
                  className="mt-1 w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div>
                <label htmlFor="message" className="font-medium text-gray-700">Message</label>
                <textarea
                  id="message" placeholder="How can we help you today?" value={form.message} minLength={10} required
                  className="mt-1 w-full h-32 p-3 bg-white border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none transition"
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                />
              </div>
              <button
                type="submit" disabled={status === "sending"}
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && (
                <div className="text-center p-3 bg-green-100 text-green-800 rounded-lg">Message sent successfully! We'll be in touch soon.</div>
              )}
              {status === "error" && (
                <div className="text-center p-3 bg-red-100 text-red-800 rounded-lg">Something went wrong. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="w-full h-96 bg-gray-300 rounded-xl overflow-hidden shadow-lg">
            <MapContainer center={officePosition} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={officePosition}>
                <Popup>
                  AuctionZone Head Office <br /> 123 Marketplace Ave, Mumbai.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
