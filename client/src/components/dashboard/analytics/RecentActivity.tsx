type RecentActivityProps = {
  recentActivity: {
    _id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: string;
    botName: string;
    botId: string;
    widgetId: string;
  }[];
};

const RecentActivity: React.FC<RecentActivityProps> = ({ recentActivity }) => {
  return <div>RecentActivity</div>;
};

export default RecentActivity;
