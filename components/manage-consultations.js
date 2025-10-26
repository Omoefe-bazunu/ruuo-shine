"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

export default function ManageConsultations() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchConsultations = async () => {
    try {
      const q = query(
        collection(db, "consultations"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConsultations(data);
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this consultation?")) {
      await deleteDoc(doc(db, "consultations", id));
      setConsultations((prev) => prev.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading consultations...
      </p>
    );

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center font-bricolage">
        All Consultation Bookings
      </h2>

      {consultations.length === 0 ? (
        <p className="text-center text-gray-500">
          No consultations booked yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {consultations.map((consult) => (
                <tr key={consult.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{consult.name}</td>
                  <td className="px-4 py-2">{consult.email}</td>
                  <td className="px-4 py-2">{consult.phone}</td>
                  <td className="px-4 py-2">{consult.date}</td>
                  <td className="px-4 py-2">{consult.time}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(consult.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
