"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Projects from "@/components/home/Project";
import Testimonials from "@/components/home/Testimonials";

export default function Services() {
  const [activeTab, setActiveTab] = useState("Residential");

  const serviceCategories = {
    Residential: [
      {
        id: 1,
        title: "Deep Cleaning",
        description: "Thorough cleaning of all areas for a spotless home.",
        image: "/project1.jpeg",
      },
      {
        id: 2,
        title: "Regular Maintenance",
        description: "Weekly or bi-weekly cleaning to keep your home pristine.",
        image: "/project1.jpeg",
      },
      {
        id: 3,
        title: "Move-In/Move-Out",
        description: "Comprehensive cleaning for moving transitions.",
        image: "/project1.jpeg",
      },
      {
        id: 4,
        title: "Carpet Cleaning",
        description: "Deep carpet cleaning to remove stains and allergens.",
        image: "/project1.jpeg",
      },
      {
        id: 5,
        title: "Window Cleaning",
        description: "Crystal-clear windows for a brighter home.",
        image: "/project1.jpeg",
      },
      {
        id: 6,
        title: "Kitchen Deep Clean",
        description: "Specialized cleaning for kitchens and appliances.",
        image: "/project1.jpeg",
      },
    ],
    Commercial: [
      {
        id: 1,
        title: "Office Cleaning",
        description: "Daily or scheduled office space cleaning.",
        image: "/project1.jpeg",
      },
      {
        id: 2,
        title: "Retail Space Cleaning",
        description: "Maintaining clean and inviting retail environments.",
        image: "/project1.jpeg",
      },
      {
        id: 3,
        title: "Industrial Cleaning",
        description: "Heavy-duty cleaning for industrial facilities.",
        image: "/project1.jpeg",
      },
      {
        id: 4,
        title: "Post-Construction Cleaning",
        description: "Cleanup after construction or renovation projects.",
        image: "/project1.jpeg",
      },
      {
        id: 5,
        title: "Healthcare Cleaning",
        description: "Sterile cleaning for medical and healthcare spaces.",
        image: "/project1.jpeg",
      },
      {
        id: 6,
        title: "Event Venue Cleaning",
        description: "Pre- and post-event cleaning services.",
        image: "/project1.jpeg",
      },
    ],
  };

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
