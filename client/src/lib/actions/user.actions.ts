import { getApiHandler } from "../api";

export const getCurrentUser = async (data: {
  token: string;
}): Promise<
  ServerResponse<{
    data: {
      isOnboarding: boolean;
      onboardingCompleted: boolean;
    };
  }>
> =>
  getApiHandler("user", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });
