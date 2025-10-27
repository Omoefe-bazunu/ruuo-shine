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
import AddTestimonials from "@/components/AddTestimonial";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ------------------- AUTH MODAL -------------------
const AuthModal = ({ isOpen, onClose }) => {
  const { user, login, signup, resetPassword } = useAuth();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true); // show login by default
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  // prevent modal render when closed
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setError("");
  };

  const switchMode = (toLogin) => {
    setIsLogin(toLogin);
    setResetMode(false);
    setError("");
    setResetSent(false);
    setFormData({
      email: "",
      password: "",
      displayName: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (resetMode) {
        if (!formData.email) {
          setError("Enter your email to receive a reset link.");
          setLoading(false);
          return;
        }
        const res = await resetPassword(formData.email);
        if (res.success) {
          setResetSent(true);
          setTimeout(() => {
            setResetSent(false);
            setResetMode(false);
          }, 3000);
        } else {
          setError(res.error || "Failed to send reset email.");
        }
        setLoading(false);
        return;
      }

      if (isLogin) {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          // close modal on successful login
          onClose();
          return;
        } else {
          setError(res.error || "Failed to sign in.");
        }
      } else {
        // signup flow
        if (!formData.displayName) {
          setError("Please enter your full name.");
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters.");
          setLoading(false);
          return;
        }
        const res = await signup(
          formData.email,
          formData.password,
          formData.displayName
        );
        if (res.success) {
          onClose();
          return;
        } else {
          setError(res.error || "Failed to sign up.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close auth modal"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-primary font-bricolage mb-2">
          {resetMode
            ? "Reset Password"
            : isLogin
            ? "Sign In"
            : "Create Account"}
        </h2>
        <p className="text-secondary text-sm mb-4">
          {resetMode
            ? "Enter the email for your account and we'll send a reset link."
            : isLogin
            ? "Sign in to access the admin panel."
            : "Create an account to manage projects."}
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {resetSent && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-sm">
            Reset email sent — check your inbox.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {!resetMode && !isLogin && (
            <div className="hidden">
              <label className="text-sm block mb-1">Full name</label>
              <input
                name="displayName"
                value={formData.displayName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="John Doe"
                required
              />
            </div>
          )}

          <div>
            <label className="text-sm block mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder="you@example.com"
              required
            />
          </div>

          {!resetMode && (
            <div>
              <label className="text-sm block mb-1">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="••••••••"
                required={isLogin || !isLogin}
              />
            </div>
          )}

          {!resetMode && !isLogin && (
            <div className="hidden">
              <label className="text-sm block mb-1">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <div className="mt-2">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cta hover:bg-primary"
              }`}
            >
              {loading
                ? "Processing..."
                : resetMode
                ? "Send Reset Link"
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </button>
          </div>
        </form>

        {/* Links & switches */}
        <div className="mt-4 text-center text-sm text-secondary">
          {!resetMode ? (
            <>
              {user ? (
                <p>
                  Already signed in?{" "}
                  <button
                    onClick={() => {
                      onClose();
                      router.push("/admin"); // optional navigation if desired
                    }}
                    className="text-primary hover:underline"
                  >
                    Continue
                  </button>
                </p>
              ) : isLogin ? (
                <>
                  {/* <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => switchMode(false)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p> */}
                  <p className="mt-2">
                    <button
                      onClick={() => {
                        setResetMode(true);
                        setError("");
                      }}
                      className="text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Already have an account?{" "}
                    <button
                      onClick={() => switchMode(true)}
                      className="text-primary font-semibold hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </>
              )}
            </>
          ) : (
            <p>
              <button
                onClick={() => {
                  setResetMode(false);
                  setError("");
                }}
                className="text-primary hover:underline"
              >
                Back to sign in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// ------------------- PROTECTED PAGE -------------------
const ProtectedAddProjectPage = () => {
  const { user, isAdmin, loading, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const router = useRouter();

  const tabs = [
    { key: "projects", label: "Projects" },
    { key: "team", label: "Team" },
    { key: "consultation", label: "Consultation" },
    { key: "messages", label: "Messages" },
    { key: "quotes", label: "Quotes" },
    { key: "services", label: "Services" },
    { key: "testimonilas", label: "Testimonials" },
  ];

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      console.log("Logged out successfully");
      router.push("/");
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

        {/* ONLY show modal when user explicitly clicked Sign In */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      </>
    );
  }

  // ✅ Render Main Admin Interface
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page Title & Breadcrumbs */}
      <div className=" bg-primary font-bricolage text-center py-8">
        <h1 className="text-3xl font-bold text-white mb-2">ADMIN DASHBOARD</h1>
        <nav className="text-white text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>{" "}
          {" > "}
          <span>Admin Dashboard</span>
        </nav>
      </div>

      <header className="flex bg-white items-center justify-between px-12 py-4 shadow-sm">
        <h1 className="text-xl font-bold text-cen text-primary font-bricolage">
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
        {activeTab === "testimonilas" && <AddTestimonials />}
      </main>
    </div>
  );
};

export default ProtectedAddProjectPage;
