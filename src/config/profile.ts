import { profile as baseProfile } from "@/content/site";

export const profile = {
  ...baseProfile,
  githubUsername: "Thabhelo",
};

export type Profile = typeof profile;
