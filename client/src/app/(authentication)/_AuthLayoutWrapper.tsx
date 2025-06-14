"use client";

import { cn } from "@/lib/utils";
import { useZoomLevel } from "@/hooks/core/useZoomLevel";
import Logo from "@/components/layout/header/Logo";

const AuthLayoutWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-10 py-10",
        isZoomedOut && "m-auto max-w-screen-2xl",
      )}
    >
      <div>
        <Logo />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default AuthLayoutWrapper;
