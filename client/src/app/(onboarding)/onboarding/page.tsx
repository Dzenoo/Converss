"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/actions/user.actions";

import CreateBotForm from "@/components/dashboard/bots/create-bot/forms/CreateBotForm";
import FinishScreen from "@/components/dashboard/bots/create-bot/FinishScreen";

const OnboardingPage = () => {
  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await getCurrentUser();

      if (!user.isOnboarding) {
        return redirect("/dashboard");
      }

      if (user.isOnboarding && user.onboardingCompleted) {
        return <FinishScreen />;
      } else {
        return <CreateBotForm isOnboarding={true} />;
      }
    }

    fetchUser();
  }, []);
};

export default OnboardingPage;
