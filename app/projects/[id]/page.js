"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { MdPerson } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosTime } from "react-icons/io";

export default function ProjectDetails() {
  const params = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchProject(params.id);
    }
  }, [params.id]);

  const fetchProject = async (projectId) => {
    try {
      const docRef = doc(db, "projects", projectId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such project!");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  if (loading) {
    return (
      <section className="pb-12 bg-white">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-primary text-lg">Loading project details...</div>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="pb-12 bg-white">
        <div className="w-full">
          <div className="bg-primary font-bricolage text-center py-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              PROJECT NOT FOUND
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <p className="text-secondary mb-6">
              The project you're looking for doesn't exist.
            </p>
            <Link
              href="/projects"
              className="text-primary font-semibold hover:text-cta transition-colors"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pb-12 bg-white">
      <div className="w-full">
        {/* Page Title & Breadcrumbs */}
        <div className="bg-primary font-bricolage text-center py-8">
          <h1 className="text-3xl font-bold text-white mb-2">OUR PROJECTS</h1>
          <nav className="text-white text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>{" "}
            {" > "}
            <Link
              href="/projects"
              className="hover:text-white transition-colors"
            >
              Projects
            </Link>
            {" > "}
            <span>{project.title}</span>
          </nav>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          {/* Back to Projects and Title */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="text-primary text-center w-full mx-auto font-semibold hover:text-cta transition-colors py-6 inline-block"
            >
              ← Back to Projects
            </Link>
            <h1 className="text-3xl font-bold text-primary text-center mb-2">
              {project.title}
            </h1>
          </div>

          {/* Main Image and Project Details */}
          <div className="mb-8 flex flex-col md:flex-row gap-8 justify-center w-full">
            <div className="relative w-full md:w-1/2 overflow-hidden rounded-[20px] h-96">
              <Image
                src={project.mainImage}
                alt={`${project.title} Main Image`}
                fill
                className="object-cover"
              />
            </div>
            {/* Project Details */}
            <div className="mb-8 h-fit pb-8 bg-gray-50 rounded-xl shadow-md w-full md:w-1/2 text-center">
              <h2 className="text-xl font-semibold border-b text-white bg-primary py-2 w-full mb-2">
                Project Details
              </h2>
              <div className="content p-6">
                {/* Client Name */}
                <div className="flex flex-row items-center">
                  <div className="bg-primary text-white p-2 w-fit rounded-full flex items-center justify-center">
                    <MdPerson />
                  </div>
                  <div className="flex gap-4 text-xs md:text-lg">
                    <p className="font-semibold ml-4">Client Name:</p>
                    <p>{project.clientName}</p>
                  </div>
                </div>
                {/* Category */}
                <div className="flex flex-row items-center border-t-2 border-secondary pt-4 mt-4">
                  <div className="bg-primary text-white p-2 w-fit rounded-full flex items-center justify-center">
                    <BiSolidCategory />
                  </div>
                  <div className="flex gap-4 text-xs md:text-lg">
                    <p className="font-semibold ml-4">Category:</p>
                    <p>{project.category}</p>
                  </div>
                </div>
                {/* Location */}
                <div className="flex flex-row items-center border-t-2 border-secondary pt-4 mt-4">
                  <div className="bg-primary text-white p-2 w-fit rounded-full flex items-center justify-center">
                    <FaLocationDot />
                  </div>
                  <div className="flex gap-4 text-xs md:text-lg">
                    <p className="font-semibold ml-4">Location:</p>
                    <p>{project.location}</p>
                  </div>
                </div>
                {/* Timeline */}
                <div className="flex flex-row items-center border-t-2 border-secondary pt-4 mt-4">
                  <div className="bg-primary text-white p-2 w-fit rounded-full flex items-center justify-center">
                    <IoIosTime />
                  </div>
                  <div className="flex gap-4 text-xs md:text-lg">
                    <p className="font-semibold ml-4 ">Timeline:</p>
                    <p>
                      {formatDate(project.startDate)} -{" "}
                      {formatDate(project.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description (if available) */}
          {project.description && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-center text-primary mb-4">
                Project Description
              </h2>
              <p className="text-secondary text-center max-w-3xl mx-auto">
                {project.description}
              </p>
            </div>
          )}

          {/* Additional Images Grid */}
          {project.additionalImages && project.additionalImages.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-center text-primary mb-4">
                More Images
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {project.additionalImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative overflow-hidden rounded-[20px] h-48"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
