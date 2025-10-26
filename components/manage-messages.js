"use client";

import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "react-toastify";
import { Loader2, Trash2 } from "lucide-react";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch messages from Firestore
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, "contactMessages"),
        orderBy("createdAt", "desc")
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Delete message
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      setDeletingId(id);
      await deleteDoc(doc(db, "contactMessages", id));
      toast.success("Message deleted successfully.");
      setMessages(messages.filter((msg) => msg.id !== id));
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error("Failed to delete message.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 md:px-10">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bricolage font-bold text-primary mb-6 text-center">
          Contact Messages
        </h1>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary w-8 h-8" />
          </div>
        ) : messages.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No messages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-primary text-white text-sm md:text-base">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Message</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {msg.name}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{msg.email}</td>
                    <td className="py-3 px-4 text-gray-600 max-w-sm truncate">
                      {msg.message}
                    </td>
                    <td className="py-3 px-4 text-gray-500 text-sm">
                      {msg.createdAt?.toDate
                        ? msg.createdAt.toDate().toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleDelete(msg.id)}
                        disabled={deletingId === msg.id}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                      >
                        {deletingId === msg.id ? (
                          <Loader2 className="animate-spin w-4 h-4 mx-auto" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
