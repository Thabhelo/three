import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { rejectUnauthorizedAdmin, signOutAdmin } from "@/lib/admin-auth";
import { auth } from "@/lib/firebase";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(Boolean(auth));

  useEffect(() => {
    if (!auth) {
      setCheckingAuth(false);
      return;
    }

    return onAuthStateChanged(auth, async (nextUser) => {
      const allowedUser = await rejectUnauthorizedAdmin(nextUser);
      setUser(allowedUser);
      setCheckingAuth(false);
    });
  }, []);

  const signOut = useCallback(async () => {
    await signOutAdmin();
  }, []);

  return { user, checkingAuth, signOutAdmin: signOut };
}
