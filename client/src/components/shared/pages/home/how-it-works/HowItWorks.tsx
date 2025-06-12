"use client";

import Link from "next/link";

import MobileTimeline from "./MobileTimeline";
import DesktopTimeline from "./DesktopTimeline";

import { Button } from "@/components/ui/buttons/button";

const HowItWorks = () => {
  const timelineData = [
    {
      id: 1,
      title: "Sign Up & Create Your Account",
      description:
        "Just your email and business name. No credit card required.",
      position: {
        mobile: { x: 10, y: 15 },
        desktop: { x: 2, y: 10 },
      },
    },
    {
      id: 2,
      title: "Tell Us About Your Business",
      description:
        "Answer a few questions — like what you do, what customers ask, and your tone.",
      position: {
        mobile: { x: 25, y: 50 },
        desktop: { x: 38, y: 43 },
      },
    },
    {
      id: 3,
      title: "Embed on Your Website",
      description: "Copy one line of code into your site. Done.",
      position: {
        mobile: { x: 10, y: 85 },
        desktop: { x: 79, y: 85 },
      },
    },
  ];

  return (
    <section
      id="how-it-works"
      className="space-y-8 md:space-y-12 lg:space-y-20"
    >
      <div className="space-y-4 md:space-y-6">
        <div className="w-fit rounded-full bg-[var(--primary-blue-muted)] px-3 py-1.5 md:px-4 md:py-2">
          <span className="text-xs text-[var(--primary-blue)] uppercase md:text-sm">
            Easy implementation
          </span>
        </div>

        <div className="max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px]">
          <h2 className="text-2xl leading-tight font-semibold sm:text-3xl md:text-4xl lg:leading-12">
            No Tech Skills? No Problem. Here is{" "}
            <span className="text-[var(--primary-blue)]">How It Works.</span>
          </h2>
        </div>

        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
          <p className="text-sm leading-relaxed text-[var(--primary-gray)] md:text-base">
            We guide you through a short setup — and your AI assistant is ready
            to help customers right away.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/">
            <Button size="lg" className="text-sm md:text-base">
              Get Started
            </Button>
          </Link>
        </div>
      </div>

      <DesktopTimeline timelineData={timelineData} />
      <MobileTimeline timelineData={timelineData} />
    </section>
  );
};

export type TimelineDataTypes = {
  id: number;
  title: string;
  description: string;
  position: {
    mobile: {
      x: number;
      y: number;
    };
    desktop: {
      x: number;
      y: number;
    };
  };
}[];

export default HowItWorks;
