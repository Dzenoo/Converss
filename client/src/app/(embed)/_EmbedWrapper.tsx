"use client";

import { cn } from "@/lib/utils";
import { useZoomLevel } from "@/hooks/core/useZoomLevel.hook";

const EmbedWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isZoomedOut = useZoomLevel();

  return (
    <div className={cn("", isZoomedOut && "m-auto max-w-screen-2xl")}>
      <main className="h-screen">{children}</main>
    </div>
  );
};

export default EmbedWrapper;
