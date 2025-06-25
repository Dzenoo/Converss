import Link from "next/link";

import { DashboardSidebarActions } from "@/constants/nav.constants";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/utilities/sidebar";

const SidebarNav = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {DashboardSidebarActions.map((item) => {
            const hasSubActions = item.subActions.length === 0;

            const Button = (
              <SidebarMenuButton asChild>
                {hasSubActions ? (
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.text}</span>
                  </Link>
                ) : (
                  <div>
                    <item.icon />
                    <span>{item.text}</span>
                  </div>
                )}
              </SidebarMenuButton>
            );

            if (!hasSubActions) {
              return (
                <SidebarMenuItem key={item.id}>
                  {Button}
                  <SidebarMenuSub>
                    {item.subActions.map((subAction) => (
                      <SidebarMenuSubItem key={subAction.id}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subAction.href}>
                            <subAction.icon />
                            <span>{subAction.text}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              );
            }

            return <SidebarMenuItem key={item.id}>{Button}</SidebarMenuItem>;
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarNav;
