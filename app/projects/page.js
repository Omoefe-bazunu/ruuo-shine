"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Projects from "@/components/home/Project";
import Testimonials from "@/components/home/Testimonials";

export default function Services() {
  const [activeTab, setActiveTab] = useState("Residential");

  return (
    <section className="pb-12 bg-white">
      <div className=" w-full">
        {/* Page Title & Breadcrumbs */}
        <div className=" bg-primary font-bricolage text-center py-8">
          <h1 className="text-3xl font-bold text-white mb-2">OUR PROJECTS</h1>
          <nav className="text-white text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{" "}
            {" > "}
            <span>Projects</span>
          </nav>
        </div>
        <Projects />
        <Testimonials />

        {/* Can't Find Your Need? Section */}
        <div className="text-center p-6 mt-8 ">
          <h3 className="text-4xl font-bricolage text-primary font-semibold mb-2">
            Can't Find Your Need?
          </h3>
          <p className="text-secondary mb-4 text-sm">
            Let us tailor a cleaning solution for you. Contact us for a free
            consultation.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-cta text-white px-6 py-2 rounded-full hover:bg-primary transition-colors"
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
