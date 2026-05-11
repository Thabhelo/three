import { projects as baseProjects } from "@/content/site";

export const projects = baseProjects.map((project, index) => ({
  ...project,
  imageFallback: project.image,
  imageQuery: [
    "clinical machine learning interface",
    "city traffic technology",
    "contract intelligence software",
    "audio waveform developer tool",
    "open source developer workspace",
    "home energy dashboard",
  ][index],
  gradient: [
    "from-fuchsia-500/80 via-pink-500/55 to-zinc-900",
    "from-blue-600/80 via-violet-500/55 to-zinc-900",
    "from-slate-400/75 via-slate-700/55 to-zinc-950",
    "from-cyan-500/70 via-blue-500/45 to-zinc-950",
    "from-violet-500/70 via-cyan-500/35 to-zinc-950",
    "from-emerald-500/65 via-blue-500/40 to-zinc-950",
  ][index],
  featured: index < 3,
  cursorBadge: index === baseProjects.length - 1,
}));

export type ProjectConfig = (typeof projects)[number];
