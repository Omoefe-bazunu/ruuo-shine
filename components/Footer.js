"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo and Brand */}
        <div className="mb-6 md:mb-0 flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="flex flex-col md:flex-row space-y-4 items-center space-x-3"
          >
            <div className="relative w-12 h-12">
              <Image
                src="/logo/logofooter.png" //
                alt="RUUO SHINE Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <p className="text-2xl font-bold">RUUO SHINE</p>
              <span className="text-xs font-semibold">
                CLEANING EXPERTS LTD
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row text-center space-y-2 md:space-y-0 md:space-x-6 mb-6 md:mb-0">
          <Link
            href="/"
            className="text-white hover:text-cta transition-colors"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-white hover:text-cta transition-colors"
          >
            Services
          </Link>
          <Link
            href="/projects"
            className="text-white hover:text-cta transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/about"
            className="text-white hover:text-cta transition-colors"
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-cta transition-colors"
          >
            Contact Us
          </Link>
        </div>

        {/* Contact Information */}
        <div className="text-center md:text-right text-sm leading-relaxed">
          <p className="mb-1">
            <span className="font-medium">Phone:</span> +44 7824678276
          </p>
          <p className="mb-1">
            <span className="font-medium">Email:</span> info@ruuoshine.co.uk
          </p>
          <p>
            <span className="font-medium">Address:</span> 71-75 Shelton Street,
            Covent Garden, London, WC2H 9JQ
          </p>
        </div>
      </div>

      {/* Social Media and Copyright */}
      <div className="container mx-auto px-4 mt-8 border-t border-gray-50 pt-4 flex flex-col md:flex-row justify-between items-center">
        {/* Social Media Icons */}
        <div className="flex space-x-4 mb-3 md:mb-0">
          <a href="#" className="text-white hover:text-cta transition-colors">
            <span className="sr-only">Facebook</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.196 2.238.196v2.459h-1.26c-1.241 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-cta transition-colors">
            <span className="sr-only">Twitter</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23 3a10.9 10.9 0 01-3.14 2.6 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
          </a>
          <a href="#" className="text-white hover:text-cta transition-colors">
            <span className="sr-only">Instagram</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.317 3.608 1.292.975.975 1.23 2.242 1.292 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.317 2.633-1.292 3.608-.975.975-2.242 1.23-3.608 1.292-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.317-3.608-1.292-.975-.975-1.23-2.242-1.292-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.317-2.633 1.292-3.608.975-.975 2.242-1.23 3.608-1.292 1.266-.058 1.646-.07 4.85-.07zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm6.406-1.683a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
            </svg>
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-center md:text-right">
          © {new Date().getFullYear()} RUUO SHINE CLEANING EXPERTS LTD. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
