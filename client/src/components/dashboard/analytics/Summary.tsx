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
      iconColor: "text-blue-600",
      dataColor: "text-blue-700",
      borderColor: "hover:border-blue-200",
    },
    {
      id: 2,
      title: "Active bots",
      icon: Activity,
      data: summary.activeBots,
      iconColor: "text-green-600",
      dataColor: "text-green-700",
      borderColor: "hover:border-green-200",
    },
    {
      id: 3,
      title: "Total conversations",
      icon: MessageSquare,
      data: summary.totalConversations,
      iconColor: "text-purple-600",
      dataColor: "text-purple-700",
      borderColor: "hover:border-purple-200",
    },
    {
      id: 4,
      title: "Messages this month",
      icon: MessageCircle,
      data: summary.messagesThisMonth,
      iconColor: "text-orange-600",
      dataColor: "text-orange-700",
      borderColor: "hover:border-orange-200",
    },
  ];

  return (
    <ul className="grid grid-cols-4 gap-5 max-xl:grid-cols-2 max-md:grid-cols-1">
      {SummaryData.map((card) => (
        <li
          key={card.id}
          className={`space-y-4 rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:shadow-lg ${card.borderColor}`}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-lg border p-3">
              <card.icon size={20} className={card.iconColor} />
            </div>
            <div>
              <h2 className="whitespace-nowrap text-[var(--primary-gray)]">
                {card.title}
              </h2>
            </div>
          </div>
          <div>
            <span className={`text-2xl font-bold ${card.dataColor}`}>
              {card.data}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Summary;
