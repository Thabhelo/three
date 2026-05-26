export const adminEmails = [
  "thabheloduve@gmail.com",
  "thabhelo.duve@talladega.edu",
  "thabhelo@deepubuntu.com",
] as const;

/** Sign out automatically after 30 minutes without pointer, keyboard, scroll, or touch activity. */
export const adminInactivityMs = 30 * 60 * 1000;

const adminEmailSet = new Set(adminEmails.map((email) => email.toLowerCase()));

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return adminEmailSet.has(email.trim().toLowerCase());
}
