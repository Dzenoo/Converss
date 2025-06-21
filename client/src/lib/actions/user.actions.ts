import { postApiHandler } from "../api";

export const syncUser = async (data: {
  token: string;
}): Promise<{ isOnboarding: boolean }> => {
  if (!data.token) throw new Error("No Clerk token found");

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
