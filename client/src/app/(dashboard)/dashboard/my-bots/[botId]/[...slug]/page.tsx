import { DashboardBotDetailsTab } from "@/types";

import BotDetails from "@/components/dashboard/bots/details/BotDetails";

const VALID_TABS: DashboardBotDetailsTab[] = [
  "overview",
  "conversations",
  "faq",
  "customize-ai",
  "bot-testing",
  "deployment",
  "settings",
];

const BotDetailsPage = async ({
  params,
}: {
  params: Promise<{ botId: string; slug?: string[] }>;
}) => {
  const { botId, slug } = await params;
  const maybeTab = slug?.[0];

  const activeTab = VALID_TABS.includes(maybeTab as DashboardBotDetailsTab)
    ? (maybeTab as DashboardBotDetailsTab)
    : null;

  return <BotDetails botId={botId} activeTab={activeTab} />;
};

export default BotDetailsPage;
