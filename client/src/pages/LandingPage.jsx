import React, { useEffect, useRef } from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import { useLocation } from "react-router-dom";

function LandingPage() {
  const location = useLocation();
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const featuredRef = useRef(null);
  const pricingRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    
    const timeoutId = setTimeout(() => {
      const section = location.pathname.split("/")[1];

      if (section === "about" && aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "featured" && featuredRef.current) {
        featuredRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "pricing" && pricingRef.current) {
        pricingRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "testimonials" && testimonialsRef.current) {
        testimonialsRef.current.scrollIntoView({ behavior: "smooth" });
      } else if (section === "" && heroRef.current) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [location]);

  return (
    <div className="landing-page-container">
      <div ref={heroRef}>
        <Hero />
      </div>
      <div ref={featuredRef}>
        <Features />
      </div>
      <div ref={aboutRef}>
        <HowItWorks />
      </div>
      <div ref={testimonialsRef}>
        <Testimonials />
      </div>
      <div ref={pricingRef}>
        <Pricing />
      </div>
    </div>
  );
}

export default LandingPage;