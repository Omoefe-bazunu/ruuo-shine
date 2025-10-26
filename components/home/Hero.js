"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-gray-50 pt-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Text Content */}
        <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
          <h1 className="text-4xl font-bricolage text-primary md:text-6xl max-w-5xl font-bold mb-4">
            <span className="text-cta">PREMIUM CLEANING SERVICES</span>
            <br />
            <span className="text-primary">AT YOUR CALL</span>
          </h1>
          <p className="text-secondary mx-auto md:mx-0 w-90 mb-8">
            RUUO SHINE: Redefining clean environments for discerning homes and
            businesses. We combine precision, purity, and perfection to
            transform every space.
          </p>
          <Link
            href="/quote"
            className="bg-cta text-white px-6 py-3 rounded-full hover:bg-primary transition-colors"
          >
            Request a Quote
          </Link>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 relative">
          <Image
            src="/HeroImage.png" // Replace with your image path in /public
            alt="Cleaner from RUUO Shine"
            width={500}
            height={700}
            className="rounded-[20px]"
          />
        </div>
      </div>
    </section>
  );
}
