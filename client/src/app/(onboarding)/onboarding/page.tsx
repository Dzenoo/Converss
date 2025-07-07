import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getCurrentUser } from "@/lib/actions/user.actions";

import CreateBotForm from "@/components/dashboard/bots/create-bot/forms/CreateBotForm";
import FinishScreen from "@/components/dashboard/bots/create-bot/FinishScreen";

const OnboardingPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  if (token) {
    const { data: user } = await getCurrentUser({ token });

    if (!user.isOnboarding) {
      return redirect("/dashboard");
    }

    if (user.isOnboarding && user.onboardingCompleted) {
      return <FinishScreen token={token} />;
    } else {
      return <CreateBotForm isOnboarding={true} />;
    }
  }
};

export default OnboardingPage;
