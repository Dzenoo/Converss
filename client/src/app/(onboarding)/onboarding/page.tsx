import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import OnboardingForm from "@/components/onboarding/forms/OnboardingForm";
import FinishOnboarding from "@/components/onboarding/FinishOnboarding";

const OnboardingPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  if (token) {
    // if (!user.isOnboarding) {
    //   return redirect("/dashboard");
    // }

    // if (user.isOnboarding && user.onboardingCompleted) {
    return <FinishOnboarding token={token} />;
    // } else {
    //   return <OnboardingForm />;
    // }
  }
};

export default OnboardingPage;
