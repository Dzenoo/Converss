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
    <div className="hide-scrollbar flex overflow-x-auto border-b border-gray-200 lg:grid lg:grid-cols-7">
      {NavigationData.map((item) => (
        <Link
          key={item.id}
          href={`/dashboard/my-bots/${botId}/${item.slug}`}
          className={cn(
            "flex min-w-[120px] flex-shrink-0 items-center justify-center gap-2 border-r p-3 text-sm font-medium whitespace-nowrap transition-all hover:bg-blue-50",
            activeTab === item.slug
              ? "bg-blue-100 text-[var(--primary-blue)]"
              : "",
          )}
        >
          <item.icon className="h-4 w-4" />
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
