import { signOut, type User } from "firebase/auth";
import { adminInactivityMs, isAdminEmail } from "@/config/admin";
import { auth } from "./firebase";

const activityEvents = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"] as const;

let inactivityTimer: number | null = null;
let watchingActivity = false;

function resetInactivityTimer() {
  if (!auth) return;

  if (inactivityTimer) window.clearTimeout(inactivityTimer);
  inactivityTimer = window.setTimeout(() => {
    void signOut(auth!);
  }, adminInactivityMs);
}

function handleAdminActivity() {
  resetInactivityTimer();
}

function startInactivityWatch() {
  if (watchingActivity || typeof window === "undefined") return;

  activityEvents.forEach((event) => {
    window.addEventListener(event, handleAdminActivity, { passive: true });
  });
  watchingActivity = true;
  resetInactivityTimer();
}

function stopInactivityWatch() {
  if (!watchingActivity || typeof window === "undefined") return;

  activityEvents.forEach((event) => {
    window.removeEventListener(event, handleAdminActivity);
  });
  watchingActivity = false;

  if (inactivityTimer) {
    window.clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }
}

export function syncAdminInactivity(user: User | null) {
  if (user) startInactivityWatch();
  else stopInactivityWatch();
}

export async function rejectUnauthorizedAdmin(user: User | null): Promise<User | null> {
  if (!user) {
    syncAdminInactivity(null);
    return null;
  }

  if (isAdminEmail(user.email)) {
    syncAdminInactivity(user);
    return user;
  }

  if (auth) await signOut(auth);
  syncAdminInactivity(null);
  return null;
}

export async function signOutAdmin(): Promise<void> {
  if (!auth) return;
  await signOut(auth);
  syncAdminInactivity(null);
}
