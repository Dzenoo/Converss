import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getCurrentUser } from "@/lib/actions/user.actions";

import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  if (token) {
    const { data: user } = await getCurrentUser({ token });
    if (user.isOnboarding) {
      redirect("/onboarding");
    }
  }

  return <Dashboard />;
};

export default DashboardPage;
