"use client";

import Branding from "./Branding";
import SidebarNav from "./SidebarNav";
import UserInfo from "./UserInfo";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/utilities/sidebar";

const DashboardSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader>
        <Branding />
      </SidebarHeader>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
      <SidebarFooter>
        <UserInfo />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;
