import ConfirmEmail from "@/components/auth/ConfirmEmail";

// SUGGESTION:
// 1. Do NOT trust client state (Zustand/localStorage) for access control.
// 2. On mount, call a backend API (e.g., /api/me or /api/session) to check if the user is allowed to access this page (e.g., has requested a magic link, is not already confirmed).
// 3. If not allowed, redirect to login or appropriate page.
// 4. All critical checks (email confirmation, onboarding) must be enforced on the backend.
// 5. Use server-issued JWT/session for authentication and state.
//
// See backend (NestJS) for user state fields: isEmailConfirmed, onboardingCompleted, etc.
//
// Remove this comment after implementing secure flow.

const ConfirmEmailPage = () => {
  return <ConfirmEmail />;
};

export default ConfirmEmailPage;
