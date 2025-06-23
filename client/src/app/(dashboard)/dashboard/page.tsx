import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { getCurrentUser } from "@/lib/actions/user.actions";

const DashboardPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  if (token) {
    const { data: user } = await getCurrentUser({ token });
    if (user.isOnboarding) {
      redirect("/onboarding");
    }
  }

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default DashboardPage;
