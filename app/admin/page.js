"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { X } from "lucide-react";
import AddProject from "@/components/add-projects-page";
import ManageTeam from "@/components/add-team-members";
import ManageConsultations from "@/components/manage-consultations";
import ManageQuoteRequests from "@/components/manage-quote-requests";
import ManageMessages from "@/components/manage-messages";
import AddServices from "@/components/add-service-data";

// ------------------- AUTH MODAL -------------------
const AuthModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-primary font-bricolage mb-4">
          Sign In Required
        </h2>
        <p className="text-secondary mb-6">
          You must sign in to access the admin panel.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-cta text-white py-3 rounded-lg font-semibold hover:bg-primary transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

// ------------------- PROTECTED PAGE -------------------
const ProtectedAddProjectPage = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");

  const tabs = [
    { key: "projects", label: "Projects" },
    { key: "team", label: "Team" },
    { key: "consultation", label: "Consultation" },
    { key: "messages", label: "Messages" },
    { key: "quotes", label: "Quotes" },
    { key: "services", label: "Services" },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log("Logged out successfully");
    } else {
      console.error(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-lg">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-4 font-bricolage">
              Admin Access Required
            </h1>
            <p className="text-secondary mb-6">
              Please sign in to access the admin panel.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-cta text-white px-8 py-3 rounded-full hover:bg-primary transition-colors font-semibold"
            >
              Sign In
            </button>
          </div>
        </div>
        <AuthModal
          isOpen={showAuthModal || (!user && !loading)}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  // ✅ Render Main Admin Interface
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-primary font-bricolage">
          Admin Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="text-white bg-red-600 font-semibold hover:bg-red-700 px-4 py-2 rounded-full transition-colors"
        >
          Sign Out
        </button>
      </header>

      {/* Tabs Navigation */}
      <div className="flex overflow-x-auto border-b bg-white">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 px-4 py-3 font-semibold transition-colors ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <main className="flex-1 bg-gray-50 p-6">
        {activeTab === "projects" && <AddProject />}
        {activeTab === "team" && <ManageTeam />}
        {activeTab === "consultation" && <ManageConsultations />}
        {activeTab === "messages" && <ManageMessages />}
        {activeTab === "quotes" && <ManageQuoteRequests />}
        {activeTab === "services" && <AddServices />}
      </main>
    </div>
  );
};

export default ProtectedAddProjectPage;
