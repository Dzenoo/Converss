import { Bot, LayoutDashboard, List, Plus } from "lucide-react";

export const DashboardSidebarActions = [
  {
    id: 1,
    icon: LayoutDashboard,
    text: "Dashboard",
    href: "/dashboard",
    subActions: [],
  },
  {
    id: 2,
    icon: Bot,
    text: "Bots",
    subActions: [
      {
        id: 2.1,
        icon: List,
        text: "My bots",
        href: "/dashboard/my-bots",
      },
      {
        id: 2.2,
        icon: Plus,
        text: "Create bot",
        href: "/dashboard/create-bot",
      },
    ],
  },
];
