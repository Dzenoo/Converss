import Link from "next/link";

import { cn } from "@/lib/utils";
import { PremiumPlanFeatures, StarterPlanFeatures } from "@/constants";

import { Button } from "@/components/ui/buttons/button";

const Pricing = () => {
  return (
    <section id="pricing" className="space-y-20 md:pt-72">
      <div className="flex flex-col items-center justify-center space-y-2">
        <div>
          <h2 className="text-center text-2xl leading-12 font-semibold lg:text-4xl">
            Choose Your <span className="text-[var(--primary-blue)]">Plan</span>
          </h2>
        </div>
        <div>
          <p className="text-center text-sm text-[var(--primary-gray)] md:text-base">
            Create Your AI Assistant Today, No Credit Card Needed
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <Plan
          title="Starter"
          price="0"
          headline="Perfect for testing"
          features={StarterPlanFeatures}
          href="/"
          popular
        />
        <Plan
          title="Proffesional"
          price="49.99"
          headline="For growing businesses"
          features={PremiumPlanFeatures}
          href="/"
        />
      </div>
    </section>
  );
};

const Plan = ({
  title,
  price,
  headline,
  features,
  href,
  popular = false,
}: {
  title: string;
  price: string;
  headline: string;
  features: {
    id: number;
    title: string;
  }[];
  href: string;
  popular?: boolean;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-[610px] w-fit flex-col items-center justify-between space-y-8 rounded-xl border p-5",
        popular && "border-[var(--primary-blue)]",
      )}
    >
      {popular && (
        <div className="absolute -top-4 rounded-md bg-[var(--primary-blue)] p-2">
          <p className="text-xs text-white uppercase">Most Popular</p>
        </div>
      )}

      <div
        className={cn(
          "flex flex-col items-center justify-center space-y-5",
          popular && "pt-5",
        )}
      >
        <div>
          <h2 className="font-semibold">{title}</h2>
        </div>
        <div>
          <h1 className="text-2xl">
            <span className="font-bold">${price}/</span>month
          </h1>
        </div>
        <div>
          <p className="text-sm text-[var(--primary-gray)]">{headline}</p>
        </div>
      </div>

      <div>
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f.id}>{f.title}</li>
          ))}
        </ul>
      </div>

      <div className="w-full">
        <Link href={href}>
          <Button className="w-full" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Pricing;
