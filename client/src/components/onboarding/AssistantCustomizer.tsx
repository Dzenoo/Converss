import { Control } from "react-hook-form";

import { OnboardingValues } from "./forms/OnboardingForm";

type AssistantCustomizerProps = {
  control: Control<OnboardingValues>;
};

const AssistantCustomizer: React.FC<AssistantCustomizerProps> = ({
  control,
}) => {
  return <div>AssistantCustomizer</div>;
};

export default AssistantCustomizer;
