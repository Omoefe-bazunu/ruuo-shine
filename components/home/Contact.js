"use client";

import { useState } from "react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setSubmitting(true);

      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        createdAt: serverTimestamp(),
      });

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error submitting message:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        {/* Left Image Box */}
        <div className="relative rounded-2xl overflow-hidden shadow-md">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/phenomenalwt-65cad.appspot.com/o/ruuo%2Fcontact.jpeg?alt=media&token=1c164ec3-fe83-4c2e-8745-a6ab30387039"
            alt="Customer service representative"
            width={600}
            height={400}
            className="object-cover w-full h-[380px] md:h-[420px]"
            priority
          />

          {/* Overlay Text */}
          <div className="absolute bottom-5 left-6 text-white drop-shadow-lg">
            <h3 className="text-lg md:text-xl font-semibold mb-1">
              Clean Your Space
            </h3>
            <p className="text-sm md:text-base font-light opacity-90">
              Your comfort and productivity depend largely on it.
            </p>
          </div>
        </div>

        {/* Right Form */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bricolage font-extrabold text-[#0f9b8e] mb-3 uppercase">
            Get in Touch
          </h2>
          <p className="text-gray-600 text-base mb-6">
            Got a space that needs expert cleaning? <br /> Contact us right
            away!
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 text-gray-700"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-[#0f9b8e] outline-none p-1 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-gray-300 focus:border-[#0f9b8e] outline-none p-1 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full border-b border-gray-300 focus:border-[#0f9b8e] outline-none p-1 resize-none transition-all"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`self-start mx-auto md:mx-0 ${
                submitting ? "bg-gray-400" : "bg-[#ff8b2b] hover:bg-[#e87719]"
              } text-white font-semibold tracking-wide px-6 py-3 rounded-md transition`}
            >
              {submitting ? "SUBMITTING..." : "SUBMIT MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
