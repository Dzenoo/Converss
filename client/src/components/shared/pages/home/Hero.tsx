"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as motion from "motion/react-client";
import { CircleCheckBig } from "lucide-react";

import { fadeIn, fadeUp, popIn, staggerContainer, zoomIn } from "@/constants";

import { Button } from "@/components/ui/buttons/button";

const MotionDiv = motion.div;

const Hero = () => {
  return (
    <section
      id="hero"
      className="flex flex-col items-center justify-center space-y-6 px-4 pt-10 text-center"
    >
      <MotionDiv
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="w-fit rounded-full bg-[var(--primary-blue-muted)] px-4 py-2">
          <span className="text-sm tracking-wide text-[var(--primary-blue)] uppercase">
            💬 24/7 Website Assistant
          </span>
        </div>
      </MotionDiv>

      <MotionDiv
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.8 }}
        variants={fadeUp}
      >
        <h1 className="text-3xl font-bold sm:text-4xl md:text-5xl md:leading-tight lg:text-6xl lg:leading-[1.2]">
          Let AI Talk to Your Customers –
          <br className="hidden sm:inline" />
          <span className="text-[var(--primary-blue)]">
            {" "}
            So You Don’t Have To
          </span>
        </h1>
      </MotionDiv>

      <MotionDiv
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-xl"
      >
        <p className="text-sm text-[var(--primary-gray)] sm:text-base">
          Give your customers instant answers, book appointments, and more —
          with a smart chatbot that works 24/7. No technical skills needed.
        </p>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col items-center gap-4 pt-6 sm:flex-row"
        variants={staggerContainer}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        <MotionDiv variants={popIn}>
          <Link href="/">
            <Button size="lg">Start Free Trial</Button>
          </Link>
        </MotionDiv>

        <MotionDiv variants={popIn}>
          <Link href="/">
            <Button variant="outline" size="lg">
              How It Works
            </Button>
          </Link>
        </MotionDiv>
      </MotionDiv>

      <MotionDiv
        className="flex flex-col items-center gap-6 pt-10 sm:flex-row"
        variants={staggerContainer}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
      >
        {["No credit card required", "Setup in 5 minutes", "24/7 support"].map(
          (item, i) => (
            <MotionDiv
              key={i}
              variants={fadeIn}
              className="flex items-center gap-2"
            >
              <CircleCheckBig className="text-[var(--primary-green)]" />
              <span className="text-sm font-light">{item}</span>
            </MotionDiv>
          ),
        )}
      </MotionDiv>

      <MotionDiv
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        variants={zoomIn}
        className="pt-12"
      >
        <Image
          src="/assets/images/dashboard-pic.png"
          alt="hero-image"
          width={1440}
          height={960}
          className="rounded-2xl shadow-lg"
        />
      </MotionDiv>
    </section>
  );
};

export default Hero;
