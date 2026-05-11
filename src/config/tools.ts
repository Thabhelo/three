import { uses } from "@/content/site";

export const tools = uses.map((tool) => ({
  ...tool,
  url: "/uses",
  description: tool.note,
}));

export type ToolConfig = (typeof tools)[number];
