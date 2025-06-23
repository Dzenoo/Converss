import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const DashboardPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  // if (token) {
  //   if (user.isOnboarding) {
  //     redirect("/onboarding");
  //   }
  // }

  return (
    <div>
      <UserButton />
    </div>
  );
};

export default DashboardPage;
