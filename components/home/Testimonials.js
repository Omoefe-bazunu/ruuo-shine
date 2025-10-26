"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const q = query(
          collection(db, "testimonials"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) {
    return (
      <section className="bg-[#1ba39c] py-20 px-6 text-center text-white">
        <h2 className="text-3xl font-bold">What Clients Think</h2>
        <p className="mt-4 text-gray-100">No testimonials yet.</p>
      </section>
    );
  }

  const current = testimonials[index];

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#1ba39c] py-20 px-6 md:px-12 flex flex-col items-center text-white">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bricolage font-extrabold uppercase mb-3">
          What Clients Think
        </h2>
        <p className="text-gray-100 text-base md:text-lg max-w-xl mx-auto">
          Hear what our clients think about how we catered to their needs.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-lg px-2 py-6 md:p-10 flex flex-col md:flex-row items-center gap-8 max-w-5xl w-full text-gray-800 transition-all duration-500">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-3xl overflow-hidden">
            <Image
              src={current.image}
              alt={current.name}
              width={500}
              height={500}
              unoptimized
              loading="eager"
              priority
              className="object-cover w-full h-[360px] md:h-[420px]"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h3 className="text-xl text-primary font-semibold">{current.name}</h3>

          <div className="flex justify-center md:justify-start my-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className="text-yellow-400 fill-yellow-400"
              />
            ))}
          </div>

          <p className="text-gray-700 leading-relaxed">{current.text}</p>

          {/* Navigation */}
          <div className="flex justify-center md:justify-start mt-6 gap-3">
            <button
              onClick={prevSlide}
              className="border border-gray-400 rounded-full p-3 hover:bg-gray-200 transition"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="border border-gray-400 rounded-full p-3 hover:bg-gray-200 transition"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
