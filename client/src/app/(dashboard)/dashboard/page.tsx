import { Suspense } from "react";

import Dashboard from "@/components/dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <Suspense fallback="Loading...">
      <Dashboard />
    </Suspense>
  );
};

export default DashboardPage;
