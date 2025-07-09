import { Suspense } from "react";

import Bots from "@/components/dashboard/bots/Bots";

const MyBotsPage = async () => {
  return (
    <Suspense fallback="Loading...">
      <Bots />
    </Suspense>
  );
};

export default MyBotsPage;
