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
    const section = location.pathname.split("/")[1];
    console.log(section);

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
  }, [location]);
  return (
    <>
      <section ref={heroRef}>
        <Hero heroRef={heroRef} />
        <Features featuredRef={featuredRef} />
        <HowItWorks aboutRef={aboutRef} />
        <Testimonials testimonialsRef={testimonialsRef} />
        <Pricing pricingRef={pricingRef} />
      </section>
    </>
  );
}

export default LandingPage;
