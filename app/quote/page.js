"use client";

import { useState } from "react";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function RequestQuote() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
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
      await addDoc(collection(db, "quotes"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setSuccessMsg("Quote request submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting quote request:", error);
      setSuccessMsg("Error submitting form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-12 bg-white">
      {/* Page Title & Breadcrumbs */}
      <div className="bg-primary font-bricolage text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">REQUEST A QUOTE</h1>
        <nav className="text-white text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          {" > "}
          <span>Request a Quote</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="max-w-md mx-auto bg-gray-50 rounded-[20px] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl font-bold font-bricolage text-primary mb-4 text-center">
            Get Your Personalized Quote
          </h2>
          <p className="text-secondary text-sm mb-6 text-center">
            Let us know your cleaning requirements and we’ll provide a tailored
            quote for your home or business.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Address"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone Number"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
              required
            />

            <input
              type="text"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Type of Service (e.g. Office Cleaning)"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Additional Details or Notes"
              className="w-full px-4 py-2 h-24 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200"
            ></textarea>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cta text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors duration-200 font-semibold shadow-md hover:shadow-lg"
            >
              {loading ? "Submitting..." : "Request Quote"}
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
            Have urgent needs?{" "}
            <Link href="/contact" className="text-primary hover:text-cta">
              Contact us directly
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
