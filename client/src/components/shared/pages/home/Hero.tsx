import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CircleCheckBig } from "lucide-react";

import { Button } from "@/components/ui/buttons/button";

const Hero = () => {
  return (
    <section className="flex flex-col items-center justify-center space-y-5">
      <div className="w-fit rounded-full bg-[var(--primary-blue-muted)] px-4 py-2">
        <span className="text-sm text-[var(--primary-blue)] uppercase">
          💬 24/7 Website Assistant{" "}
        </span>
      </div>

      <div>
        <h1 className="text-center text-5xl leading-16 font-bold">
          Let AI Talk to Your Customers - <br />
          <span className="text-[var(--primary-blue)]">
            So You Dont Have To
          </span>
        </h1>
      </div>

      <div className="max-w-2xl">
        <p className="text-center text-[var(--primary-gray)]">
          Give your customers instant answers, book appointments, and more —
          with a smart chatbot that works 24/7. No technical skills needed.
        </p>
      </div>

      <div className="flex items-center gap-5 pt-5">
        <Link href="/">
          <Button size="lg">Start Free Trial</Button>
        </Link>

        <Link href="/">
          <Button variant="outline" size="lg">
            How It Works
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-10 pt-10">
        {["No credit card required", "Setup in 5 minutes", "24/7 support"].map(
          (item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CircleCheckBig className="text-[var(--primary-green)]" />
              <span className="text-sm font-light">{item}</span>
            </div>
          ),
        )}
      </div>

      <div>
        <Image
          src={"/assets/images/dashboard-pic.png"}
          alt="hero-image"
          width={1440}
          height={960}
        />
      </div>
    </section>
  );
};

export default Hero;
