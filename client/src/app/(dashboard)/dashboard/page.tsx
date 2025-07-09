"use client";

import { Suspense, useEffect } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/actions/user.actions";

import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = () => {
  useEffect(() => {
    async function fetchUser() {
      const { data: user } = await getCurrentUser();

      if (user.isOnboarding) {
        redirect("/onboarding");
      }
    }

    fetchUser();
  }, []);

  return (
    <Suspense fallback="Loading...">
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
