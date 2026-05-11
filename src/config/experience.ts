import { experiences as baseExperiences } from "@/content/site";
import { amz, ewc, telone } from "@/assets";

export const experiences = baseExperiences.map((experience, index) => ({
  ...experience,
  type: ["Founder-led lab", "Internship", "Internship", "Full-time"][index] ?? "Experience",
  logo: [ewc, undefined, amz, telone][index],
  logoText: experience.company.slice(0, 2).toUpperCase(),
  techStack: [
    ["React", "Python", "Perception", "Datasets"],
    ["PyTorch", "MONAI", "3D CV", "Research"],
    ["AWS", "Bedrock", "OpenSearch", "Serverless"],
    ["Power BI", "Tableau", "Excel", "OpenRefine"],
  ][index] ?? [],
  color: ["cyan", "violet", "blue", "pink"][index] ?? "cyan",
}));

export type ExperienceConfig = (typeof experiences)[number];
