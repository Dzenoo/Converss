type BotPerformanceProps = {
  botPerformance: {
    id: any;
    name: any;
    isActive: any;
    conversations: any;
    lastActive: any;
    widgetId: any;
  }[];
};

const BotPerformance: React.FC<BotPerformanceProps> = ({ botPerformance }) => {
  return <div>BotPerformance</div>;
};

export default BotPerformance;
