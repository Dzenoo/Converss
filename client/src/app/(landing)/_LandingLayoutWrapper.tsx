"use client";

import { useZoomLevel } from "@/hooks/core/useZoomLevel";

import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";

const LandingLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div className={isZoomedOut ? "m-auto max-w-screen-2xl" : ""}>
      <Header />
      <main className="base-padding flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default LandingLayoutWrapper;
