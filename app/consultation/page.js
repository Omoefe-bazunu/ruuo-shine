"use client";

import { useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ConsultationBooking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");

    try {
      await addDoc(collection(db, "consultations"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSuccessMsg("Consultation booked successfully!");
      setFormData({ name: "", email: "", phone: "", date: "", time: "" });
    } catch (error) {
      console.error("Error booking consultation:", error);
      setSuccessMsg("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-12 bg-white">
      {/* Page Title & Breadcrumbs */}
      <div className="bg-primary font-bricolage text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">CONSULTATION</h1>
        <nav className="text-white text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          {" > "}
          <span>Consultation</span>
        </nav>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-md mx-auto bg-gray-50 rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold font-bricolage text-primary mb-4 text-center">
            Book a Consultation
          </h2>
          <p className="text-secondary text-sm mb-6 text-center">
            Schedule a free consultation to discuss your cleaning needs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cta text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
          </form>

          {successMsg && (
            <p
              className={`mt-4 text-center font-semibold ${
                successMsg.includes("Error") ? "text-red-500" : "text-green-600"
              }`}
            >
              {successMsg}
            </p>
          )}

          <p className="text-secondary text-xs mt-4 text-center">
            Already booked?{" "}
            <Link href="/contact" className="text-primary hover:text-cta">
              Contact us
            </Link>{" "}
            for support.
          </p>
        </div>
      </div>
    </section>
  );
}
