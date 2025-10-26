"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { X, Upload, Trash2 } from "lucide-react";

export default function AddProject() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    category: "Residential Cleaning",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const fetchedProjects = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProjects(fetchedProjects);
    };

    fetchProjects();
  }, []);

  // Handle field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image uploads
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setMainImagePreview(URL.createObjectURL(file));
    }
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setAdditionalImages((prev) => [...prev, ...newImages]);
  };

  const removeAdditionalImage = (index) => {
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImage = async (file, path) => {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  const calculateDaysCompleted = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  // Submit or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      let mainImageUrl = formData.mainImage || null;

      // Upload main image if new
      if (mainImage) {
        mainImageUrl = await uploadImage(
          mainImage,
          `projects/${Date.now()}_main_${mainImage.name}`
        );
      }

      // Upload new additional images
      const additionalImageUrls = await Promise.all(
        additionalImages.map((img, index) =>
          uploadImage(
            img.file,
            `projects/${Date.now()}_additional_${index}_${img.file.name}`
          )
        )
      );

      const daysCompleted = calculateDaysCompleted(
        formData.startDate,
        formData.endDate
      );

      const projectData = {
        ...formData,
        daysCompleted: daysCompleted.toString(),
        mainImage: mainImageUrl,
        additionalImages:
          selectedProject?.additionalImages?.concat(additionalImageUrls) ||
          additionalImageUrls,
        updatedAt: serverTimestamp(),
      };

      if (selectedProject) {
        // UPDATE
        await updateDoc(doc(db, "projects", selectedProject.id), projectData);
        setMessage({ type: "success", text: "Project updated successfully!" });
      } else {
        // ADD NEW
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
        setMessage({ type: "success", text: "Project added successfully!" });
      }

      // Reset form
      setFormData({
        title: "",
        clientName: "",
        category: "Residential Cleaning",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      });
      setMainImage(null);
      setMainImagePreview(null);
      setAdditionalImages([]);
      setSelectedProject(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "Failed to save project. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setFormData(project);
    setMainImagePreview(project.mainImage);
    setMessage({ type: "", text: "" });
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteDoc(doc(db, "projects", id));
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setMessage({ type: "success", text: "Project deleted successfully!" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-primary mb-6 font-bricolage">
            {selectedProject ? "EDIT PROJECT" : "ADD NEW PROJECT"}
          </h1>

          {message.text && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          {/* --- FORM --- */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Project Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
                required
                placeholder="Client Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option>Residential Cleaning</option>
                <option>Commercial Cleaning</option>
              </select>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="Location"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Brief description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />

            {/* Main Image */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Main Project Image *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {mainImagePreview ? (
                  <div className="relative w-full h-64">
                    <Image
                      src={mainImagePreview}
                      alt="Main preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setMainImage(null);
                        setMainImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Additional Images
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <label className="cursor-pointer flex flex-col items-center mb-4">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-600">
                    Upload additional images
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleAdditionalImagesChange}
                    className="hidden"
                  />
                </label>

                {additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {additionalImages.map((img, index) => (
                      <div key={index} className="relative w-full h-32">
                        <Image
                          src={img.preview}
                          alt={`Additional ${index + 1}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
              {selectedProject && (
                <button
                  type="button"
                  onClick={() => handleDelete(selectedProject.id)}
                  className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600"
                >
                  Delete
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-full text-white font-semibold transition-colors ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-cta hover:bg-primary"
                }`}
              >
                {loading
                  ? selectedProject
                    ? "Updating..."
                    : "Adding..."
                  : selectedProject
                  ? "Update Project"
                  : "Add Project"}
              </button>
            </div>
          </form>

          {/* --- Project List --- */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Existing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
                >
                  <Image
                    src={project.mainImage}
                    alt={project.title}
                    width={500}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-600">{project.location}</p>
                  <button
                    onClick={() => handleEdit(project)}
                    className="my-4 bg-primary text-white px-4 py-2 rounded-lg hover:bg-cta transition-colors flex items-center gap-2 font-semibold "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
