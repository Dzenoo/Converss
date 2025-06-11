"use client";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/buttons/button";

const HowItWorks = () => {
  const timelineData = [
    {
      id: 1,
      title: "Sign Up & Create Your Account",
      description:
        "Just your email and business name. No credit card required.",
      position: { x: 2, y: 10 },
    },
    {
      id: 2,
      title: "Tell Us About Your Business",
      description:
        "Answer a few questions — like what you do, what customers ask, and your tone.",
      position: { x: 38, y: 43 },
    },
    {
      id: 3,
      title: "Embed on Your Website",
      description: "Copy one line of code into your site. Done.",
      position: { x: 79, y: 85 },
    },
  ];

  return (
    <section id="how-it-works" className="space-y-20">
      <div className="space-y-4">
        <div className="w-fit rounded-full bg-[var(--primary-blue-muted)] px-4 py-2">
          <span className="text-sm text-[var(--primary-blue)] uppercase">
            Easy implementation
          </span>
        </div>

        <div className="max-w-[550px]">
          <h2 className="text-4xl leading-12 font-semibold">
            No Tech Skills? No Problem. Here is{" "}
            <span className="text-[var(--primary-blue)]">How It Works.</span>
          </h2>
        </div>

        <div className="max-w-xl">
          <p className="text-[var(--primary-gray)]">
            We guide you through a short setup — and your AI assistant is ready
            to help customers right away.
          </p>
        </div>

        <div>
          <Link href="/">
            <Button size="lg">Get Started</Button>
          </Link>
        </div>
      </div>

      <div className="relative mt-16 h-[600px] md:h-[700px]">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="lineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="var(--primary-blue)"
                stopOpacity="0.9"
              />
              <stop
                offset="50%"
                stopColor="var(--primary-blue)"
                stopOpacity="0.7"
              />
              <stop
                offset="100%"
                stopColor="var(--primary-blue)"
                stopOpacity="0.5"
              />
            </linearGradient>
          </defs>

          <path
            d={`
              M ${timelineData[0].position.x + 2} ${timelineData[0].position.y + 4}
              C ${timelineData[0].position.x + 12} ${timelineData[0].position.y - 8}
                ${timelineData[1].position.x - 8} ${timelineData[1].position.y - 12}
                ${timelineData[1].position.x + 2} ${timelineData[1].position.y + 4}
              C ${timelineData[1].position.x + 15} ${timelineData[1].position.y + 20}
                ${timelineData[2].position.x - 15} ${timelineData[2].position.y + 25}
                ${timelineData[2].position.x + 2} ${timelineData[2].position.y + 4}
            `}
            stroke="url(#lineGradient)"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-lg"
          />

          <circle r="0.4" fill="var(--primary-blue)" opacity="0.8">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path={`
                M ${timelineData[0].position.x + 2} ${timelineData[0].position.y + 4}
                C ${timelineData[0].position.x + 12} ${timelineData[0].position.y - 8}
                  ${timelineData[1].position.x - 8} ${timelineData[1].position.y - 12}
                  ${timelineData[1].position.x + 2} ${timelineData[1].position.y + 4}
                C ${timelineData[1].position.x + 15} ${timelineData[1].position.y + 20}
                  ${timelineData[2].position.x - 15} ${timelineData[2].position.y + 25}
                  ${timelineData[2].position.x + 2} ${timelineData[2].position.y + 4}
              `}
            />
          </circle>
          <circle r="0.3" fill="var(--primary-blue)" opacity="0.6">
            <animateMotion
              dur="6s"
              begin="1s"
              repeatCount="indefinite"
              path={`
                M ${timelineData[0].position.x + 2} ${timelineData[0].position.y + 4}
                C ${timelineData[0].position.x + 12} ${timelineData[0].position.y - 8}
                  ${timelineData[1].position.x - 8} ${timelineData[1].position.y - 12}
                  ${timelineData[1].position.x + 2} ${timelineData[1].position.y + 4}
                C ${timelineData[1].position.x + 15} ${timelineData[1].position.y + 20}
                  ${timelineData[2].position.x - 15} ${timelineData[2].position.y + 25}
                  ${timelineData[2].position.x + 2} ${timelineData[2].position.y + 4}
              `}
            />
          </circle>
        </svg>

        {timelineData.map((item, index) => (
          <div
            key={item.id}
            className="space-y-10"
            style={{
              position: "absolute",
              left: `${item.position.x}%`,
              top: `${item.position.y}%`,
            }}
          >
            <TimelineDot />

            <div className="flex flex-col items-end justify-end gap-5">
              <div
                className={`relative right-20 ${item.id === 2 && "right-72"}`}
              >
                <span className="text-9xl font-bold text-[var(--tertiary-gray)]">
                  {item.id}
                </span>
              </div>

              <div className="space-y-2">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                </div>
                <div className="max-w-sm">
                  <p className="font-light text-[var(--primary-gray)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TimelineDot = ({
  className = "",
  ...props
}: React.ComponentProps<"div"> & {
  className?: string;
}) => {
  return (
    <div
      {...props}
      className={cn(
        "relative z-20 flex h-16 w-16 items-center justify-center rounded-full bg-white drop-shadow drop-shadow-blue-100",
        "border-2 border-white/50 shadow-lg transition-all hover:scale-105",
        className,
      )}
    >
      <div className="h-5 w-5 rounded-full bg-[var(--secondary-gray)]"></div>
    </div>
  );
};

export default HowItWorks;
