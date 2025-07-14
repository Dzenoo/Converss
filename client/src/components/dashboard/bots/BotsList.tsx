import { Search } from "lucide-react";

import { IBot } from "@/types";
import Empty from "@/helpers/Empty";

import BotsItem from "./BotsItem";

type BotsListProps = {
  bots: IBot[];
};

const BotsList: React.FC<BotsListProps> = ({ bots }) => {
  const hasBots = bots.length !== 0;

  if (hasBots) {
    return (
      <div className="grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-lg:grid-cols-1">
        {bots.map((bot) => (
          <BotsItem key={bot._id} bot={bot} />
        ))}
      </div>
    );
  }

  return (
    <Empty
      customStyles={{ container: "pt-10" }}
      icon={<Search size={25} className="mb-4" />}
      title="No Bots Found"
      description="Oops! It seems like there are no bots found."
    />
  );
};

export default BotsList;
