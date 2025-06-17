"use client";

import { cn } from "@/lib/utils";
import { useZoomLevel } from "@/hooks/core/useZoomLevel";
import Logo from "@/components/shared/Logo";

// SUGGESTION:
// 1. Do NOT trust client state (Zustand/localStorage) for access control in layouts.
// 2. Use backend API (e.g., /api/me or /api/session) to check user state and enforce redirects in layout if needed.
// 3. All critical checks (auth, onboarding, email confirmation) must be enforced on the backend.
// 4. Use server-issued JWT/session for authentication and state.
//
// See backend (NestJS) for user state fields: isEmailConfirmed, onboardingCompleted, etc.
//
// Remove this comment after implementing secure flow.

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
