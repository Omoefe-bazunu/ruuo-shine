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

export default function ManageQuoteRequests() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuotes = async () => {
    try {
      const q = query(collection(db, "quotes"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this quote request?")) {
      await deleteDoc(doc(db, "quotes", id));
      setQuotes((prev) => prev.filter((item) => item.id !== id));
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading quotes...</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold text-primary mb-4 text-center font-bricolage">
        All Quote Requests
      </h2>

      {quotes.length === 0 ? (
        <p className="text-center text-gray-500">No quote requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 bg-white rounded-xl shadow-sm">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Service</th>
                <th className="px-4 py-2 text-left">Message</th>
                <th className="px-4 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{quote.name}</td>
                  <td className="px-4 py-2">{quote.email}</td>
                  <td className="px-4 py-2">{quote.phone}</td>
                  <td className="px-4 py-2">{quote.service}</td>
                  <td className="px-4 py-2">{quote.message}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(quote.id)}
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
