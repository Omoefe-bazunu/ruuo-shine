import AboutUs from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Project";
import Services from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import React from "react";

const Home = () => {
  return (
    <div className="text-primary">
      <Hero />
      <AboutUs />
      <Services />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default Home;
