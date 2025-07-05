"use client";

import { useAuthInterceptor } from "@/hooks/core/useAuthInterceptor.hook";
import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/utilities/sidebar";

const DashboardWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  useAuthInterceptor();

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <article className="flex-1 p-5">{children}</article>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardWrapper;
