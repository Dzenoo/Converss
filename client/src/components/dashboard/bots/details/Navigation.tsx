import {
  List,
  MessageCircle,
  BookOpen,
  Sliders,
  FlaskConical,
  Rocket,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { DashboardBotDetailsTab } from "@/types";

const Navigation: React.FC<{
  botId: string;
  activeTab: DashboardBotDetailsTab | null;
}> = ({ botId, activeTab }) => {
  return (
    <div className="hide-scrollbar grid grid-cols-7 border-b border-gray-200">
      {NavigationData.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/my-bots/${botId}/${item.slug}`}
          className={cn(
            "flex w-full items-center justify-center gap-3 border-r p-3 text-sm font-medium transition-all hover:bg-blue-50",
            activeTab && item.slug === activeTab
              ? "bg-blue-100 text-[var(--primary-blue)]"
              : "",
          )}
        >
          <item.icon />
          {item.title}
        </Link>
      ))}
    </div>
  );
};

const NavigationData = [
  {
    id: 1,
    title: "Overview",
    slug: "overview",
    icon: List,
  },
  {
    id: 2,
    title: "Conversations",
    slug: "conversations",
    icon: MessageCircle,
  },
  {
    id: 3,
    title: "FAQ",
    slug: "faq",
    icon: BookOpen,
  },
  {
    id: 4,
    title: "Customize AI",
    slug: "customize-ai",
    icon: Sliders,
  },
  {
    id: 5,
    title: "Bot Testing",
    slug: "bot-testing",
    icon: FlaskConical,
  },
  {
    id: 6,
    title: "Deployment",
    slug: "deployment",
    icon: Rocket,
  },
  {
    id: 7,
    title: "Settings",
    slug: "settings",
    icon: Settings,
  },
];

export default Navigation;
