import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import Bots from "@/components/dashboard/bots/Bots";

const MyBotsPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    redirect("/sign-in");
  }

  return <Bots token={token} />;
};

export default MyBotsPage;
