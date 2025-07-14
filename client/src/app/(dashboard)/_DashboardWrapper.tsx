"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/actions/user.actions";

import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/utilities/sidebar";

const DashboardWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <article className="flex-1">{children}</article>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardWrapper;
