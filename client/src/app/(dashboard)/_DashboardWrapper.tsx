import DashboardSidebar from "@/components/dashboard/sidebar/DashboardSidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/utilities/sidebar";

const DashboardWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        Header
        <main className="flex-1 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardWrapper;
