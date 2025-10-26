"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const projectsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(projectsData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-primary text-lg">Loading projects...</div>
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bricolage font-bold text-primary mb-2 uppercase">
            OUR PROJECTS
          </h2>
          <p className="text-secondary text-sm mb-8">
            No projects available at the moment
          </p>
        </div>
      </section>
    );
  }

  const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
  const nextIndex = (currentIndex + 1) % projects.length;

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        {/* Heading */}
        <h2 className="text-4xl font-bricolage font-bold text-primary mb-2 uppercase">
          OUR PROJECTS
        </h2>
        <p className="text-secondary text-sm mb-8">
          Cleaning projects we have done over the years
        </p>

        {/* Slider */}
        <div className="relative flex items-center justify-center gap-4 md:gap-6">
          {/* Previous Image */}
          <div className="hidden md:block w-1/4 opacity-60 rounded-[20px] overflow-hidden">
            <Image
              src={projects[prevIndex].mainImage}
              alt={`${projects[prevIndex].title} Preview`}
              width={400}
              height={300}
              className="object-cover w-full h-[200px] md:h-[250px] transition-opacity duration-300"
            />
          </div>

          {/* Current Image */}
          <div className="relative w-full md:w-2/4 rounded-[20px] overflow-hidden shadow-md">
            <Link href={`/projects/${projects[currentIndex].id}`}>
              <Image
                src={projects[currentIndex].mainImage}
                alt={projects[currentIndex].title}
                width={600}
                height={400}
                className="object-cover w-full h-[250px] md:h-[300px]"
              />
            </Link>
            {/* Overlay Info Card */}
            <div className="absolute bottom-4 right-4 bg-white rounded-xl p-3 shadow-md text-left">
              <h3 className="text-primary font-semibold text-sm md:text-base">
                {projects[currentIndex].title}
              </h3>
              <p className="text-secondary text-xs md:text-sm leading-tight">
                <span className="font-medium">Location:</span>{" "}
                {projects[currentIndex].location}
                <br />
                <span className="font-medium">Day(s) Completed:</span>{" "}
                {projects[currentIndex].daysCompleted}
              </p>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full py-2 px-3 shadow-md hover:bg-cta transition-colors"
              aria-label="Previous Project"
            >
              ←
            </button>
            <button
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full py-2 px-3 shadow-md hover:bg-cta transition-colors"
              aria-label="Next Project"
            >
              →
            </button>
          </div>

          {/* Next Image */}
          <div className="hidden md:block w-1/4 opacity-60 rounded-[20px] overflow-hidden">
            <Image
              src={projects[nextIndex].mainImage}
              alt={`${projects[nextIndex].title} Preview`}
              width={400}
              height={300}
              className="object-cover w-full h-[200px] md:h-[250px] transition-opacity duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
