"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/actions/user.actions";

import CreateBotForm from "@/components/dashboard/bots/create-bot/forms/CreateBotForm";

const OnboardingPage = () => {
  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await getCurrentUser();

      if (!user.isOnboarding) {
        return redirect("/dashboard");
      }

      return <CreateBotForm isOnboarding={true} />;
    }

    fetchUser();
  }, []);
};

export default OnboardingPage;
