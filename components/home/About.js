"use client";

import Link from "next/link";
import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Text Content (Right Column on Desktop, Top on Mobile) */}
        <div className="p-6 text-secondary flex flex-col space-y-6 text-center md:text-left order-1 md:order-2">
          <div>
            <h2 className="text-4xl font-bricolage text-primary font-bold mb-4">
              ABOUT US
            </h2>
            <h3 className="text-xl font-semibold font-bricolage mb-4 leading-snug">
              YOUR FIRST POINT OF CONTACT FOR EXPERT CLEANING SERVICE.
            </h3>
            <p className="text-sm mb-2 leading-relaxed">
              We move beyond basic tidiness to create and maintain genuinely
              pristine and healthy environments. We don&apos;t just clean, IT
              SHINES.
            </p>
          </div>
          <div className="flex justify-center md:justify-start">
            <Link
              href="/contact"
              className="flex items-center bg-emerald-50 text-white py-4 px-4 rounded-lg hover:bg-gray-100 transition-colors w-fit"
            >
              <span className="bg-primary py-2 px-4 rounded-lg">
                Contact Us
              </span>
              <span className="ml-2 text-primary font-medium">
                +44 9043970401
              </span>
            </Link>
          </div>
        </div>

        {/* Image Gallery (Left Two Columns on Desktop, Below Text on Mobile) */}
        <div className="col-span-2 grid grid-cols-2 gap-4 order-2 md:order-1">
          {/* Image 1 */}
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/ABOUT2.jpeg"
              alt="Cleaner team window cleaning"
              width={500}
              height={600}
              className="rounded-xl object-cover border-y-4 border-primary w-full h-[380px] md:h-[420px]"
            />
          </div>

          {/* Image 2 and 3 stacked */}
          <div className="grid grid-rows-2 gap-4">
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/ABOUT3.jpeg"
                alt="Cleaner with duster"
                width={500}
                height={350}
                className="rounded-xl object-cover border-t-4 border-primary w-full h-[200px] md:h-[220px]"
              />
            </div>
            <div className="rounded-2xl overflow-hidden">
              <Image
                src="/ABOUT4.jpeg"
                alt="Cleaner team in action"
                width={500}
                height={350}
                className="rounded-xl object-cover border-t-4 border-primary w-full h-[200px] md:h-[220px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
