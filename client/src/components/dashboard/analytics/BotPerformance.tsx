type BotPerformanceProps = {
  botPerformance: {
    id: string;
    name: string;
    isActive: boolean;
    conversations: number;
    lastActive: string;
    widgetId: string;
  }[];
};

const BotPerformance: React.FC<BotPerformanceProps> = ({ botPerformance }) => {
  return <div>BotPerformance</div>;
};

export default BotPerformance;
