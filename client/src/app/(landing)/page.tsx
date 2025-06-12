import Hero from "@/components/shared/pages/home/Hero";
import Features from "@/components/shared/pages/home/Features";
import HowItWorks from "@/components/shared/pages/home/how-it-works/HowItWorks";
import Pricing from "@/components/shared/pages/home/Pricing";
import Faq from "@/components/shared/pages/home/Faq";

const Home = () => {
  return (
    <article className="space-y-48 px-5 py-20 lg:px-0">
      <Hero />
      <Features />
      <HowItWorks />
      <Pricing />
      <Faq />
    </article>
  );
};

export default Home;
