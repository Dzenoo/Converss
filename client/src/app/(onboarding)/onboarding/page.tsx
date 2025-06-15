"use client";

import { useOnboardingStore } from "@/stores/onboarding-store";

import { Button } from "@/components/ui/buttons/button";

const OnboardingPage = () => {
  const { currentStep, totalSteps, nextStep, prevStep } = useOnboardingStore();

  function renderComponent() {
    const components = [
      <div>Step 1</div>,
      <div>Step 2</div>,
      <div>Step 3</div>,
      <div>Step 4</div>,
    ];
    return components[currentStep];
  }

  return (
    <div className="flex h-full flex-col justify-between p-10">
      <div>{renderComponent()}</div>

      <div className="flex gap-2 self-end">
        {currentStep != 0 && (
          <Button onClick={prevStep} size="lg" variant="outline">
            Back
          </Button>
        )}
        {totalSteps != currentStep && (
          <Button onClick={nextStep} size="lg">
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
