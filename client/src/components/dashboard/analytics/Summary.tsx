import { Activity, Bot, MessageCircle, MessageSquare } from "lucide-react";

type SummaryProps = {
  summary: {
    totalBots: number;
    activeBots: number;
    totalConversations: any;
    messagesThisMonth: any;
  };
};

const Summary: React.FC<SummaryProps> = ({ summary }) => {
  const SummaryData = [
    {
      id: 1,
      title: "Total bots",
      icon: Bot,
      data: summary.totalBots,
    },
    {
      id: 2,
      title: "Active bots",
      icon: Activity,
      data: summary.activeBots,
    },
    {
      id: 3,
      title: "Total conversations",
      icon: MessageSquare,
      data: summary.totalConversations,
    },
    {
      id: 4,
      title: "Messages this month",
      icon: MessageCircle,
      data: summary.messagesThisMonth,
    },
  ];

  return (
    <ul className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
      {SummaryData.map((card) => (
        <li
          key={card.id}
          className="space-y-4 rounded-lg border border-[var(--tertiary-gray)] p-5 transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-gray-100 p-2">
              <card.icon size={17} />
            </div>
            <div>
              <h2 className="whitespace-nowrap text-[var(--primary-gray)]">
                {card.title}
              </h2>
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold">{card.data}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Summary;
