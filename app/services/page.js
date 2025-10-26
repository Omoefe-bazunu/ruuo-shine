"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Services() {
  const [activeTab, setActiveTab] = useState("Residential");
  const [services, setServices] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const fetchServices = async (category, reset = true) => {
    setLoading(true);
    const baseQuery = query(
      collection(db, "services"),
      where("category", "==", category),
      orderBy("createdAt", "desc"),
      limit(6)
    );

    const finalQuery = reset
      ? baseQuery
      : query(baseQuery, startAfter(lastDoc));

    const snapshot = await getDocs(finalQuery);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setServices((prev) => (reset ? data : [...prev, ...data]));
    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setNoMore(snapshot.empty);
    setLoading(false);
  };

  useEffect(() => {
    fetchServices(activeTab);
  }, [activeTab]);

  return (
    <section className="pb-12 bg-white">
      <div className="mb-8 bg-primary font-bricolage text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">OUR SERVICES</h1>
        <nav className="text-white text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          {" > "}
          <span>Services</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-0">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 border-b border-gray-200 mb-8">
          {["Residential", "Commercial"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold ${
                activeTab === tab
                  ? "text-primary border-b-2 border-primary"
                  : "text-secondary hover:text-primary"
              }`}
              onClick={() => {
                setActiveTab(tab);
                fetchServices(tab);
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {services.map((s) => (
            <div
              key={s.id}
              className="relative bg-gray-800 rounded-xl overflow-hidden"
            >
              <Image
                src={s.image || "/default-service.jpg"}
                alt={s.title}
                width={600}
                height={400}
                unoptimized
                loading="eager"
                priority
                className="object-cover opacity-70"
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
                <div className="text-white text-center">
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm">{s.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {!noMore && (
          <div className="text-center">
            <button
              onClick={() => fetchServices(activeTab, false)}
              disabled={loading}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-cta transition-colors"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {/* Can't Find Your Need */}
        <div className="text-center p-6">
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
