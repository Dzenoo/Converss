const BotDetailsPage = async ({
  params,
}: {
  params: Promise<{ botId: string }>;
}) => {
  const { botId } = await params;

  return <>{botId}</>;
};

export default BotDetailsPage;
