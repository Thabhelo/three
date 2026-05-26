import { experiences as baseExperiences } from "@/content/site";
import { amz, analyticalAi, deepubuntu, telone } from "@/assets";

export const experiences = baseExperiences.map((experience, index) => ({
  ...experience,
  type: ["Founder-led lab", "Internship", "Internship", "Full-time"][index] ?? "Experience",
  logo: [deepubuntu, analyticalAi, amz, telone][index],
  logoText: experience.company.slice(0, 2).toUpperCase(),
  techStack: [
    ["YOLOv8", "SigLIP", "Rust", "Python"],
    ["PyTorch", "MONAI", "3D CV", "Research"],
    ["AWS", "GenAI", "Search", "Serverless"],
    ["Power BI", "Tableau", "Excel", "OpenRefine"],
  ][index] ?? [],
  color: ["cyan", "violet", "blue", "pink"][index] ?? "cyan",
}));

export type ExperienceConfig = (typeof experiences)[number];
