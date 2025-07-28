import ChatInterface from "@/components/embed/chat/ChatInterface";

const EmbedPage = async ({
  params,
}: {
  params: Promise<{ widgetId: string }>;
}) => {
  const { widgetId } = await params;

  return <ChatInterface data={{ widgetId }} />;
};

export default EmbedPage;
