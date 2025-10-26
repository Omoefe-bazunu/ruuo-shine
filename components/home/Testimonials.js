"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Caroline Jannes",
    image: "/team1.png",
    text: "I really loved the professionalism with which the RUUO Shine team handled my job. They demonstrated an attitude of strong attention to details and did a very excellent job.",
  },
  {
    id: 2,
    name: "Michael Adams",
    image: "/team2.png",
    text: "Their service exceeded my expectations. They were prompt, reliable, and courteous throughout the process.",
  },
  {
    id: 3,
    name: "Sarah Williams",
    image: "/team3.png",
    text: "Working with the RUUO Shine team was an absolute delight. They brought excellence and care into everything they did.",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#1ba39c] py-20 px-6 md:px-12 flex flex-col items-center text-white">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bricolage font-extrabold tracking-wide uppercase mb-3">
          What Clients Think
        </h2>
        <p className="text-gray-100 text-base md:text-lg max-w-xl mx-auto">
          Hear what our clients think about how we catered to their needs.
        </p>
      </div>

      {/* Testimonial Box */}
      <div className="bg-white rounded-3xl shadow-lg px-2 py-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 max-w-5xl w-full text-gray-800 transition-all duration-500">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="rounded-3xl overflow-hidden">
            <Image
              src={current.image}
              alt={current.name}
              width={500}
              height={500}
              className="object-cover w-full h-[360px] md:h-[420px]"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left">
          <h3 className="text-xl text-primary font-semibold ">
            {current.name}
          </h3>

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
