import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
// import { syncUser } from "@/lib/actions/user.actions";

const useSyncUser = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const hasSynced = useRef(false);

  useEffect(() => {
    if (!isSignedIn || !user || hasSynced.current) return;
    hasSynced.current = true;
    (async () => {
      try {
        const token = await getToken();
        if (token) {
          // await syncUser({ token });
        }
      } catch (err) {
        // Optionally, add toast or logging here
        // console.error("User sync failed", err);
      }
    })();
  }, [isSignedIn, user, getToken]);
};

export { useSyncUser };
