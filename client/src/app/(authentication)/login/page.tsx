import Auth from "@/components/auth/Auth";

// SUGGESTION:
// 1. Do NOT trust client state (Zustand/localStorage) for login/auth access control.
// 2. On mount or after login, call a backend API (e.g., /api/me or /api/session) to check user state (e.g., isEmailConfirmed, onboardingCompleted).
// 3. If user needs to confirm email, redirect to confirm-email. If onboarding is required, redirect to onboarding.
// 4. All critical checks (auth, onboarding, email confirmation) must be enforced on the backend.
// 5. Use server-issued JWT/session for authentication and state.
//
// See backend (NestJS) for user state fields: isEmailConfirmed, onboardingCompleted, etc.
//
// Remove this comment after implementing secure flow.

const LoginPage = () => {
  return <Auth isLogin={true} />;
};

export default LoginPage;
