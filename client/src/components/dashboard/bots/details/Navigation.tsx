import Link from "next/link";

import { Button } from "@/components/ui/buttons/button";

const Navigation: React.FC<{ botId: string; activeTab: string }> = ({
  botId,
  activeTab,
}) => {
  return (
    <div className="hide-scrollbar flex items-center gap-5 overflow-x-scroll">
      {NavigationData.map((item) => (
        <Link key={item.id} href={`/dashboard/my-bots/${botId}/${item.slug}`}>
          <Button variant={item.slug === activeTab ? "default" : "ghost"}>
            {item.title}
          </Button>
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
  },
  {
    id: 2,
    title: "Conversations",
    slug: "conversations",
  },
  {
    id: 3,
    title: "FAQ",
    slug: "faq",
  },
  {
    id: 4,
    title: "Customize AI",
    slug: "customize-ai",
  },
  {
    id: 5,
    title: "Bot Testing",
    slug: "bot-testing",
  },
  {
    id: 6,
    title: "Deployment",
    slug: "deployment",
  },
  {
    id: 7,
    title: "Settings",
    slug: "settings",
  },
];

export default Navigation;
