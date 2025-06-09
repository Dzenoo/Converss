import React from "react";
import Header from "@/components/layout/header/Header";

const LandingLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <main className="base-padding flex-1">{children}</main>
    </div>
  );
};

export default LandingLayoutWrapper;
