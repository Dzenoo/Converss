import { createGenericQueryHook } from "./createGenericQueryHook";
import { getUserDashboard } from "@/lib/actions/user.actions";

const UserQueryFunctions = {
  GET_DASHBOARD: () => getUserDashboard(),
} as const;

enum UserQueryType {
  GET_DASHBOARD = "GET_DASHBOARD",
}

const useUserQuery = createGenericQueryHook("users", UserQueryFunctions);

export { useUserQuery, UserQueryType };
