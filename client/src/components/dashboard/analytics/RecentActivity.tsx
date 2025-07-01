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

export const RecentActivity: React.FC<RecentActivityProps> = ({
  recentActivity,
}) => {
  return <div>Recent Activity</div>;
};

export default RecentActivity;
