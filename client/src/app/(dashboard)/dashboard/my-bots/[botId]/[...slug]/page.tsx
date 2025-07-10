import BotDetails from "@/components/dashboard/bots/details/BotDetails";

const BotDetailsPage = async ({
  params,
}: {
  params: Promise<{ botId: string; slug?: string[] }>;
}) => {
  const { botId, slug } = await params;
  const activeTab = slug?.[0] || "overview";

  return <BotDetails botId={botId} activeTab={activeTab} />;
};

export default BotDetailsPage;
