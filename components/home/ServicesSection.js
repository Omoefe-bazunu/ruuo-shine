"use client";

import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl font-bricolage font-bold mb-4">OUR SERVICES</h2>
        <p className="text-sm mb-8">
          RUUO SHINE CLEANING EXPERTS LTD is poised to give you the best
          cleaning service you can get for your space.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Residential Cleaning */}
          <div className="bg-white rounded-[20px] p-4 flex flex-col items-center text-center">
            <div className="relative overflow-hidden rounded-[16px] w-full h-[40rem]">
              <Image
                src="/serv.jpeg"
                alt="Residential Cleaning"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-primary mt-4">
              Residential Cleaning
            </h3>
            <Link
              href="/services"
              className="text-teal-400 mt-2 flex items-center"
            >
              Learn More <span className="ml-2">→</span>
            </Link>
          </div>

          {/* Commercial Cleaning */}
          <div className="bg-white rounded-[20px] p-4 flex flex-col items-center text-center">
            <div className="relative overflow-hidden rounded-[16px] w-full h-[40rem]">
              <Image
                src="/serv1.jpeg"
                alt="Commercial Cleaning"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-2xl font-semibold text-primary mt-4">
              Commercial Cleaning
            </h3>
            <Link
              href="/services"
              className="text-teal-400 mt-2 flex items-center"
            >
              Learn More <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
