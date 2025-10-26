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

export default function ManageMessages() {
  const [contactMessages, setcontactMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchcontactMessages = async () => {
    try {
      const q = query(
        collection(db, "contactMessages"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setcontactMessages(data);
    } catch (error) {
      console.error("Error fetching contactMessages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this consultation?")) {
      await deleteDoc(doc(db, "contactMessages", id));
      setcontactMessages((prev) => prev.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    fetchcontactMessages();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-600">
        Loading contactMessages...
      </p>
    );

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center font-bricolage">
        All Messages
      </h2>

      {contactMessages.length === 0 ? (
        <p className="text-center text-gray-500">No Messages received yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contactMessages.map((msg) => (
                <tr key={msg.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{msg.name}</td>
                  <td className="px-4 py-2">{msg.email}</td>
                  <td className="px-4 py-2">{msg.message}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(msg.id)}
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
