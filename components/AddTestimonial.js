"use client";
import { useState, useEffect } from "react";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AddTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ name: "", text: "", image: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTestimonials = async () => {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const imageRef = ref(
          storage,
          `testimonials/${Date.now()}_${imageFile.name}`
        );
        await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(imageRef);
      }

      if (editingId) {
        await updateDoc(doc(db, "testimonials", editingId), {
          ...formData,
          image: imageUrl,
        });
      } else {
        await addDoc(collection(db, "testimonials"), {
          ...formData,
          image: imageUrl,
          createdAt: serverTimestamp(),
        });
      }

      setFormData({ name: "", text: "", image: "" });
      setImageFile(null);
      setEditingId(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "testimonials", id));
    fetchTestimonials();
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, text: item.text, image: item.image });
    setEditingId(item.id);
  };

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Manage Testimonials
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 mb-8 bg-gray-50 p-6 rounded-lg shadow"
      >
        <input
          type="text"
          name="name"
          placeholder="Client Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="text"
          placeholder="Client Feedback"
          value={formData.text}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-cta"
        >
          {loading ? "Saving..." : editingId ? "Update" : "Add"} Testimonial
        </button>
      </form>

      {/* Testimonials List */}
      <div className="space-y-4">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
