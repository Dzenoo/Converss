import { postApiHandler } from "../api";

export const syncUser = async (data: {
  token: string;
}): Promise<{ isOnboarding: boolean; onboardingCompleted: boolean }> => {
  return await postApiHandler(
    "user/sync",
    {},
    {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    },
  );
};
