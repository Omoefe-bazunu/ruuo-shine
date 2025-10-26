"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

const styles = `
  @keyframes slideIn {
    0% { opacity: 0; transform: translateX(100%); }
    100% { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideOut {
    0% { opacity: 1; transform: translateX(0); }
    100% { opacity: 0; transform: translateX(-100%); }
  }

  .slide-enter {
    animation: slideIn 0.8s ease forwards;
  }

  .slide-exit {
    animation: slideOut 0.8s ease forwards;
  }

  .half-visible {
    transform: scale(0.9);
    opacity: 0.6;
    filter: blur(1px);
  }

  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0 }
    to { opacity: 1 }
  }
`;

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTeam(members);
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (team.length === 0) return;

    const timer = setTimeout(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % team.length);
        setIsSliding(false);
      }, 800);
    }, 4000);
    return () => clearTimeout(timer);
  }, [currentIndex, team.length]);

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-20 bg-gray-50 text-center">
        <h2 className="text-primary font-bricolage font-bold text-3xl md:text-4xl mb-6">
          MEET OUR TEAM
        </h2>
        <p className="text-gray-600">Loading team members...</p>
      </section>
    );
  }

  if (team.length === 0) {
    return (
      <section className="py-16 px-4 md:px-20 bg-gray-50 text-center">
        <h2 className="text-primary font-bricolage font-bold text-3xl md:text-4xl mb-6">
          MEET OUR TEAM
        </h2>
        <p className="text-gray-600">
          No team members available at the moment.
        </p>
      </section>
    );
  }

  const current = team[currentIndex];
  const next = team[(currentIndex + 1) % team.length];

  return (
    <section
      className="py-16 px-4 md:px-20 bg-gray-50 text-center relative"
      style={{
        backgroundImage:
          "url('https://firebasestorage.googleapis.com/v0/b/penned-aae02.appspot.com/o/General%2Fteam-bg.jpg?alt=media')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <style>{styles}</style>

      <h2 className="text-primary font-bricolage font-bold text-3xl md:text-4xl mb-6 animate-fadeIn">
        MEET OUR TEAM
      </h2>
      <p
        className="text-gray-600 max-w-2xl mx-auto mb-12 animate-fadeIn"
        style={{ animationDelay: "0.2s" }}
      >
        The dedicated professionals behind RUUO SHINE, ensuring every service
        meets the highest standard of excellence.
      </p>

      <div className="relative flex justify-center items-center overflow-hidden h-[420px]">
        {/* Active Member */}
        <div
          className={`absolute transition-all duration-700 ease-in-out ${
            isSliding ? "slide-exit" : "z-20"
          } w-[85%] md:w-[50%] bg-white p-8 rounded-2xl shadow-xl mx-auto`}
        >
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-primary flex items-center justify-center bg-gray-50">
              <Image
                src={current.photoUrl}
                alt={current.name}
                width={200}
                height={200}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="text-xl font-semibold text-primary mb-1">
              {current.name}
            </h3>
            <p className="text-gray-500 mb-3">{current.role}</p>
            <p className="text-gray-600 text-sm italic max-w-md">
              "{current.bio}"
            </p>
          </div>
        </div>

        {/* Next Member (Blurred Preview) */}
        {next && team.length > 1 && (
          <div
            className={`absolute right-0 transition-transform duration-700 ${
              isSliding ? "slide-enter" : "half-visible"
            } w-[60%] md:w-[40%] bg-white p-6 rounded-2xl shadow-lg translate-x-[25%]`}
          >
            <div className="flex flex-col items-center opacity-80">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary flex items-center justify-center bg-gray-50">
                <Image
                  src={next.photoUrl}
                  alt={next.name}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>
              <p className="text-sm text-gray-600 font-medium">{next.name}</p>
              <p className="text-xs text-gray-400">{next.role}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
