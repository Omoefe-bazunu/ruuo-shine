"use client";

import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { X, Upload, Edit, Trash2, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";

export default function ManageTeam() {
  const { user, isAdmin } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const q = query(collection(db, "team"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const members = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTeamMembers(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const uploadPhoto = async (file) => {
    const storageRef = ref(storage, `team/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      let photoUrl = editingMember?.photoUrl || "";

      // Upload new photo if provided
      if (photoFile) {
        photoUrl = await uploadPhoto(photoFile);
      }

      if (!photoUrl) {
        setMessage({ type: "error", text: "Please upload a photo" });
        setSubmitting(false);
        return;
      }

      const memberData = {
        name: formData.name,
        role: formData.role,
        bio: formData.bio,
        photoUrl: photoUrl,
      };

      if (editingMember) {
        // Update existing member
        await updateDoc(doc(db, "team", editingMember.id), {
          ...memberData,
          updatedAt: serverTimestamp(),
        });
        setMessage({
          type: "success",
          text: "Team member updated successfully!",
        });
      } else {
        // Add new member
        await addDoc(collection(db, "team"), {
          ...memberData,
          createdAt: serverTimestamp(),
        });
        setMessage({
          type: "success",
          text: "Team member added successfully!",
        });
      }

      // Refresh list and reset form
      await fetchTeamMembers();
      resetForm();
      setTimeout(() => setShowModal(false), 1500);
    } catch (error) {
      console.error("Error saving team member:", error);
      setMessage({ type: "error", text: "Failed to save team member" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio,
    });
    setPhotoPreview(member.photoUrl);
    setShowModal(true);
  };

  const handleDelete = async (memberId) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      await deleteDoc(doc(db, "team", memberId));
      setMessage({
        type: "success",
        text: "Team member deleted successfully!",
      });
      await fetchTeamMembers();
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
    } catch (error) {
      console.error("Error deleting team member:", error);
      setMessage({ type: "error", text: "Failed to delete team member" });
    }
  };

  const resetForm = () => {
    setFormData({ name: "", role: "", bio: "" });
    setPhotoFile(null);
    setPhotoPreview(null);
    setEditingMember(null);
    setMessage({ type: "", text: "" });
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Access denied. Admin only.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary">Loading team members...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between flex-col md:flex-row items-center mb-8">
          <h1 className="text-3xl font-bold text-primary font-bricolage">
            MANAGE TEAM MEMBERS
          </h1>
          <button
            onClick={openAddModal}
            className="bg-cta text-white mt-4 md:mt-0 px-6 py-3 rounded-full hover:bg-primary transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Team Member
          </button>
        </div>

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

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-primary">
                  <Image
                    src={member.photoUrl}
                    alt={member.name}
                    width={450}
                    height={450}
                    className="object-cover w-full h-full md:h-full"
                  />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-500 mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm italic text-center mb-4">
                  "{member.bio}"
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {teamMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No team members yet</p>
            <button
              onClick={openAddModal}
              className="bg-cta text-white px-6 py-3 rounded-full hover:bg-primary transition-colors"
            >
              Add Your First Team Member
            </button>
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-primary">
                  {editingMember ? "Edit Team Member" : "Add Team Member"}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                {message.text && (
                  <div
                    className={`mb-4 p-3 rounded-lg ${
                      message.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Photo *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                      {photoPreview ? (
                        <div className="relative">
                          <Image
                            src={photoPreview}
                            alt="preview"
                            width={128}
                            height={128}
                            className="object-cover w-full h-[250px] md:h-[300px]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoFile(null);
                              setPhotoPreview(null);
                            }}
                            className="absolute top-0 right-1/2 translate-x-16 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer flex flex-col items-center">
                          <Upload className="w-12 h-12 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Click to upload photo
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Sarah Johnson"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Role/Position *
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Operations Manager"
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Bio *
                    </label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Brief description about the team member..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="px-6 py-3 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={submitting}
                      className={`px-8 py-3 rounded-full text-white font-semibold transition-colors ${
                        submitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-cta hover:bg-primary"
                      }`}
                    >
                      {submitting
                        ? "Saving..."
                        : editingMember
                        ? "Update Member"
                        : "Add Member"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
