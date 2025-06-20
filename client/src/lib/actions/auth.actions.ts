import { RequestCodeDto, VerifyCodeDto } from "@/types";

import { getApiHandler, postApiHandler } from "../api";

export const requestCode = async (
  data: RequestCodeDto,
): Promise<
  ServerResponse<{
    isSent: boolean;
  }>
> => {
  return await postApiHandler("auth/magic/request", data);
};

export const verifyCode = async (
  data: VerifyCodeDto,
): Promise<
  ServerResponse<{
    redirectTo: string;
  }>
> => {
  return await postApiHandler("auth/magic/verify", data);
};

export const getCurrentUser = async (): Promise<ServerResponse<{
  user: {
    userId: string;
  };
}> | null> => {
  try {
    return await getApiHandler("user/me");
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const logout = async (): Promise<ServerResponse> => {
  return await postApiHandler("auth/logout", {});
};
