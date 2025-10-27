"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-16 h-16">
              <Image
                src="/logo/logonav.png"
                alt="RUUO SHINE Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold text-primary">
                RUUO SHINE
              </span>
              <span className="text-xs font-semibold text-secondary">
                CLEANING EXPERTS LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link
              href="/"
              className="text-secondary hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              className="text-secondary hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/projects"
              className="text-secondary hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-secondary hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-secondary hover:text-primary transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* CTA Button (Desktop) */}
          <Link
            href="/quote"
            className="hidden md:block bg-cta text-white px-4 py-2 rounded-full hover:bg-primary transition-colors"
          >
            Request a Quote
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-secondary focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Navigation - Slide from Left */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link
              href="/"
              className="flex items-center space-x-3"
              onClick={toggleMenu}
            >
              <div className="relative w-10 h-10">
                <Image
                  src="/images/logo.png" // 🔁 Replace with your logo path
                  alt="RUUO SHINE Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-primary">
                  RUUO SHINE
                </span>
                <span className="text-[10px] font-semibold text-secondary">
                  CLEANING EXPERTS LTD
                </span>
              </div>
            </Link>

            <button
              onClick={toggleMenu}
              className="text-secondary focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="flex flex-col p-6 flex-grow">
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/projects", label: "Projects" },
              { href: "/about", label: "About Us" },
              { href: "/contact", label: "Contact Us" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-secondary hover:text-white hover:bg-primary rounded-sm p-2 transition-colors text-lg font-medium"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button at Bottom */}
          <div className="p-6 border-t border-gray-200">
            <Link
              href="/quote"
              className="block bg-cta text-white px-6 py-3 rounded-full hover:bg-primary transition-colors text-center font-medium"
              onClick={toggleMenu}
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
