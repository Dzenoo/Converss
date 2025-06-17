import FinishOnboarding from "@/components/onboarding/FinishOnboarding";
import OnboardingForm from "@/components/onboarding/forms/OnboardingForm";

// SUGGESTION:
// 1. Do NOT trust client state (Zustand/localStorage) for onboarding access control.
// 2. On mount, call a backend API (e.g., /api/me or /api/session) to check if the user is authenticated and needs onboarding.
// 3. If onboarding is already completed, redirect to dashboard or appropriate page.
// 4. All critical checks (onboarding, auth) must be enforced on the backend.
// 5. Use server-issued JWT/session for authentication and state.
//
// See backend (NestJS) for user state fields: onboardingCompleted, etc.
//
// Remove this comment after implementing secure flow.

// SUGGESTION: Persisting onboarding completion state securely
//
// Best practice: Always check onboarding completion from the backend, not just local state.
//
// Example implementation:
//
// import { useEffect, useState } from "react";
// import FinishOnboarding from "@/components/onboarding/FinishOnboarding";
// import OnboardingForm from "@/components/onboarding/forms/OnboardingForm";
//
// const OnboardingPage = () => {
//   const [onboardingFinished, setOnboardingFinished] = useState<boolean | null>(null);
//
//   // Fetch user state on mount
//   useEffect(() => {
//     const fetchUserState = async () => {
//       const res = await fetch("/api/me", { credentials: "include" });
//       if (res.ok) {
//         const user = await res.json();
//         setOnboardingFinished(user.onboardingCompleted);
//       } else {
//         // Handle error or redirect to login
//         setOnboardingFinished(false);
//       }
//     };
//     fetchUserState();
//   }, []);
//
//   // Show nothing until we know the state
//   if (onboardingFinished === null) return null;
//
//   return onboardingFinished ? (
//     <FinishOnboarding />
//   ) : (
//     <OnboardingForm onFinish={() => setOnboardingFinished(true)} />
//   );
// };
//
// export default OnboardingPage;
//
// Backend endpoint (/api/me) should return onboardingCompleted field for the user.
//
// Remove this comment after implementing the persistent onboarding check.

const OnboardingPage = () => {
  return <FinishOnboarding />;
};

export default OnboardingPage;
