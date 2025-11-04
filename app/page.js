import AboutUs from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Project";
import Services from "@/components/home/ServicesSection";
import Testimonials from "@/components/home/Testimonials";
import NotAvailable from "@/components/NotAvailable";
import React from "react";

const Home = () => {
  return (
    <div className="text-primary ">
      <NotAvailable />
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
