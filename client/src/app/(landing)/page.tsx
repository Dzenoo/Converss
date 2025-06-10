import React from "react";

import Hero from "@/components/shared/pages/home/Hero";
import Features from "@/components/shared/pages/home/Features";
import HowItWorks from "@/components/shared/pages/home/HowItWorks";
import Pricing from "@/components/shared/pages/home/Pricing";

const Home = () => {
  return (
    <article className="space-y-36 py-20">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
    </article>
  );
};

export default Home;
