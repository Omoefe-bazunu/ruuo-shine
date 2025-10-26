"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  orderBy,
  query,
  limit,
} from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { Loader2, Trash2, Edit3, Save } from "lucide-react";

export default function AddServices() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Residential",
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    const q = query(collection(db, "services"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    setServices(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      let imageUrl = "";
      if (formData.image) {
        const imageRef = ref(
          storage,
          `services/${Date.now()}_${formData.image.name}`
        );
        await uploadBytes(imageRef, formData.image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, "services"), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        image: imageUrl,
        createdAt: new Date(),
      });

      toast.success("Service added successfully!");
      setFormData({
        title: "",
        description: "",
        category: "Residential",
        image: null,
      });
      fetchServices();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add service");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    await deleteDoc(doc(db, "services", id));
    setServices(services.filter((s) => s.id !== id));
    toast.success("Service deleted.");
  };

  const handleEdit = async (id, updatedData) => {
    await updateDoc(doc(db, "services", id), updatedData);
    setEditingId(null);
    toast.success("Service updated.");
    fetchServices();
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">
          Manage Services
        </h1>

        {/* Add Service Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Service Title"
            required
            className="border rounded-lg px-3 py-2"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
          </select>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Service Description"
            required
            className="border rounded-lg px-3 py-2 md:col-span-2"
          />
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-cta transition"
          >
            {saving ? "Saving..." : "Add Service"}
          </button>
        </form>

        {/* Service List */}
        {loading ? (
          <p className="text-center text-gray-500">Loading services...</p>
        ) : (
          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id}
                className="flex items-start justify-between border-b pb-3 gap-4"
              >
                <div>
                  <h3 className="font-semibold text-lg">{s.title}</h3>
                  <p className="text-sm text-gray-600">{s.description}</p>
                  <p className="text-xs text-primary mt-1">{s.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setEditingId(editingId === s.id ? null : s.id)
                    }
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(s.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
