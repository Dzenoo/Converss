"use client";

import { cn } from "@/lib/utils";
import { useZoomLevel } from "@/hooks/core/useZoomLevel.hook";
import Header from "@/components/layout/onboarding/header/Header";
import Sidebar from "@/components/layout/onboarding/sidebar/Sidebar";
import { Toaster } from "@/components/ui/info/sonner";

const OnboardingWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div
      className={cn(
        "flex h-screen flex-col",
        isZoomedOut && "m-auto max-w-screen-2xl",
      )}
    >
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <article className="grow basis-full overflow-hidden">
          {children}
        </article>
        <Sidebar />
        <Toaster />
      </main>
    </div>
  );
};

export default OnboardingWrapper;
