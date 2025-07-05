import { IBot } from "@/types";

import BotsItem from "./BotsItem";

type BotsListProps = {
  bots: IBot[];
};

const BotsList: React.FC<BotsListProps> = ({ bots }) => {
  const hasBots = bots.length !== 0;

  if (hasBots)
    return (
      <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1">
        {bots.map((bot) => (
          <BotsItem key={bot._id} bot={bot} />
        ))}
      </div>
    );
};

export default BotsList;
