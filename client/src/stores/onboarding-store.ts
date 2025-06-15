import { create } from "zustand";

type OnboardingStore = {
  currentStep: number;
  totalSteps: number;

  nextStep: () => void;
  prevStep: () => void;
};

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  currentStep: 0,
  totalSteps: 3,

  nextStep() {
    const currentStep = get().currentStep;
    const totalSteps = get().totalSteps;

    set({
      currentStep: currentStep === totalSteps ? totalSteps : currentStep + 1,
    });
  },

  prevStep() {
    const currentStep = get().currentStep;

    set({
      currentStep: currentStep === 0 ? 0 : currentStep - 1,
    });
  },
}));
