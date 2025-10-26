"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Contact from "@/components/home/Contact";

export default function Services() {
  return (
    <section className="pb-12 bg-white">
      <div className=" w-full">
        {/* Page Title & Breadcrumbs */}
        <div className=" bg-primary font-bricolage text-center py-8">
          <h1 className="text-3xl font-bold text-white mb-2">CONTACT US</h1>
          <nav className="text-white text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{" "}
            {" > "}
            <span>Contact</span>
          </nav>
        </div>
        <h2 className="text-4xl text-center  font-bricolage font-bold text-primary mt-8 mb-2 uppercase">
          GET IN TOUCH
        </h2>
        <p className="text-secondary text-center text-sm mb-8">
          We are more than welcome to hear from you and serve you better. Get in
          touch with us today
        </p>
        <Contact />
      </div>
    </section>
  );
}
