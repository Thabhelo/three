import faceImage from "@/assets/thabs.png";
import heroImage from "@assets/generated_images/Abstract_dark_3D_wireframe_geometry_for_developer_portfolio_hero_fcb42ce4.png";
import resume from "@/assets/Thabhelo_Duve_Resume.pdf";
import {
  backend,
  creator,
  docker,
  figma,
  git,
  github,
  homenergy,
  javascript,
  nodejs,
  reactjs,
  skillcon,
  tailwind,
  trafficdensity,
  typescript,
  web,
} from "@/assets";

export const profile = {
  firstName: "Thabhelo",
  fullName: "Thabhelo Duve",
  handle: "thabheloduve",
  role: "Software engineer, ML builder, and open-source tinkerer",
  location: "Zimbabwe / United States",
  email: "thabhelo@deepubuntu.com",
  resume,
  heroImage,
  portrait: faceImage,
  github: "https://github.com/Thabhelo",
  blog: "https://medium.com/@thabheloduve",
  tagline: "Code that feels useful, human, and alive.",
  intro:
    "I build software across machine learning, cloud systems, developer tools, and products for communities that are usually underrepresented in tech.",
  shortBio:
    "CS, Math and Physics. 11x hackathon winner. Former Amazon SDE intern. Currently building DeepUbuntu AV and practical ML systems.",
};

export const socials = [
  { name: "GitHub", href: profile.github },
  { name: "Medium", href: profile.blog },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/thabhelo-duve" },
  { name: "Email", href: `mailto:${profile.email}` },
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Guestbook", href: "/guestbook" },
  { name: "Uses", href: "/uses" },
  { name: "Links", href: "/links" },
  { name: "Contact", href: "/contact" },
  { name: "DreamSprint", href: "/dreamsprint" },
];

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  year: string;
  role: string;
  tags: string[];
  image?: string;
  link?: string;
  repo?: string;
  highlights: string[];
  body: string[];
};

export const projects: Project[] = [
  {
    slug: "medical-image-segmentation",
    title: "3D Medical Image Segmentation Benchmark",
    eyebrow: "Clinical ML Research",
    description:
      "A comparative study across 3D deep learning architectures for volumetric CT and MRI tumor segmentation.",
    year: "2025",
    role: "ML engineer",
    tags: ["Python", "PyTorch", "MONAI", "nnU-Net", "SwinUNETR"],
    highlights: [
      "Benchmarked 3D U-Net, V-Net, nnU-Net, and SwinUNETR across accuracy, latency, and memory tradeoffs.",
      "Built preprocessing for HU windowing, resampling, normalization, and patch-based training.",
      "Used mixed precision and distributed training to keep experiments reproducible and GPU-efficient.",
    ],
    body: [
      "This project focuses on the part of clinical ML that matters after the demo: reliable preprocessing, comparable metrics, and understanding what a model costs to deploy.",
      "The benchmark frames segmentation as a product and systems problem, not only a model-selection problem. Each architecture is evaluated by clinical quality signals and operational throughput.",
    ],
  },
  {
    slug: "traffic-density-classification",
    title: "Singapore Traffic Density Classification",
    eyebrow: "Computer Vision",
    description:
      "A spatio-temporal classifier for vehicle density in Singapore CBD camera feeds, published on ReadyTensor.",
    year: "2024",
    role: "ML engineer",
    tags: ["Python", "PyTorch", "Keras", "OpenCV", "AWS"],
    image: trafficdensity,
    repo: "https://github.com/Thabhelo/traffic-density-classification",
    highlights: [
      "Integrated CNN features with LSTM sequence modeling for vehicle density classification.",
      "Built OpenCV preprocessing, adaptive background subtraction, and YOLO-based vehicle detection.",
      "Optimized deployment with GPU batching and quantization for sub-150 ms inference.",
    ],
    body: [
      "The system turns traffic camera frames into a compact sequence classification problem, balancing accuracy with the latency needed for live city operations.",
      "A large part of the work was data discipline: filtering noisy frames, aligning temporal windows, and designing evaluation around changing weather, light, and congestion patterns.",
    ],
  },
  {
    slug: "fineprint",
    title: "FinePrint",
    eyebrow: "Contract Intelligence",
    description:
      "An NLP contract-intelligence platform using transformer models, semantic search, and risk classification.",
    year: "2024",
    role: "Founder / engineer",
    tags: ["JavaScript", "spaCy", "LangChain", "DeBERTa-v3", "FastAPI"],
    link: "https://www.fineprint.vercel.app",
    highlights: [
      "Secured $12K in seed funding for a practical legal-risk review product.",
      "Combined embeddings, regex heuristics, and ensemble learning for multi-label risk detection.",
      "Designed confidence calibration so users could understand when the model was uncertain.",
    ],
    body: [
      "FinePrint was built around a simple idea: contracts should be readable before they become expensive.",
      "The product blends semantic retrieval with focused risk classifiers, making it useful as a review assistant instead of a generic chatbot.",
    ],
  },
  {
    slug: "cowcow-cli",
    title: "CowCow CLI",
    eyebrow: "Open Source Audio Tooling",
    description:
      "An offline-first audio data collection tool with quality control and reward mechanics for distributed datasets.",
    year: "2025",
    role: "Open-source maintainer",
    tags: ["Rust", "FastAPI", "SQLite", "gRPC", "VAD"],
    repo: "https://github.com/Thabhelo/cowcow",
    highlights: [
      "Added SNR analysis, clipping detection, silence detection, and VAD quality checks.",
      "Designed export pipelines for JSON/WAV datasets and integrity validation.",
      "Kept collection offline-first so contributors can work with unreliable connectivity.",
    ],
    body: [
      "CowCow is infrastructure for dataset collection in places where connectivity cannot be assumed.",
      "The CLI is intentionally practical: it checks audio quality early, packages data cleanly, and gives contributors a workflow that does not collapse when the network does.",
    ],
  },
  {
    slug: "deepubuntu-community-tools",
    title: "DeepUbuntu Community Tools",
    eyebrow: "Community Infrastructure",
    description:
      "A collection of education, labeling, and content tools for DeepUbuntu programs and applied AI projects.",
    year: "2025",
    role: "Software engineer",
    tags: ["React", "TypeScript", "Cloud", "ML Ops"],
    image: skillcon,
    highlights: [
      "Built workflow tools around learning, labeling, and project coordination.",
      "Explored offline-first annotation and dataset versioning for supervised ML at scale.",
      "Connected engineering work to community education and local AI capacity building.",
    ],
    body: [
      "DeepUbuntu work sits at the intersection of education, data, and product systems.",
      "The tools are designed to reduce operational friction so teams can focus on learning and building instead of fighting process overhead.",
    ],
  },
  {
    slug: "home-energy-dashboard",
    title: "Home Energy Dashboard",
    eyebrow: "Data Visualization",
    description:
      "A dashboard concept for interpreting residential energy usage patterns and highlighting efficiency opportunities.",
    year: "2023",
    role: "Frontend / data",
    tags: ["React", "Data Viz", "UX", "Analytics"],
    image: homenergy,
    highlights: [
      "Turned noisy household data into readable trends and action prompts.",
      "Designed charts around decision-making rather than raw telemetry.",
      "Used the project to refine dashboard hierarchy and information density.",
    ],
    body: [
      "This project is about making energy consumption legible.",
      "The interface emphasizes patterns, comparisons, and next actions so users can move from numbers to practical changes.",
    ],
  },
];

export const experiences = [
  {
    title: "Software Engineer",
    company: "DeepUbuntu Labs",
    location: "Remote",
    date: "Jan 2025 - Present",
    description: [
      "Developing DeepUbuntu AV, an autonomous vehicle perception stack with multi-modal sensor fusion across LiDAR, RADAR, RGB, and IMU data.",
      "Engineering labeling pipelines, offline-first annotation workflows, quality control, and dataset versioning for supervised learning.",
      "Building synthetic data generation modules for safety-critical edge cases and underrepresented driving conditions.",
    ],
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Analytical AI",
    location: "Birmingham, AL",
    date: "Aug 2025 - Present",
    description: [
      "Benchmarking deep learning architectures for 3D medical image segmentation using PyTorch and MONAI.",
      "Building reproducible preprocessing, augmentation, and evaluation pipelines across public clinical datasets.",
      "Designing modular training infrastructure for scalable experimentation and clinical interpretability.",
    ],
  },
  {
    title: "Software Development Engineer Intern",
    company: "Amazon",
    location: "Austin, TX",
    date: "May 2025 - Aug 2025",
    description: [
      "Developed a generative AI tool using Amazon Bedrock and Titan models for intelligent data pipeline automation.",
      "Built a RAG pipeline with OpenSearch, semantic search, and multi-modal embeddings for cross-organizational data access.",
      "Implemented serverless ingestion and event-driven processing with AWS Lambda, API Gateway, DynamoDB, SQS, and SNS.",
    ],
  },
  {
    title: "Data Analyst",
    company: "TelOne",
    location: "Bulawayo, Zimbabwe",
    date: "Sep 2021 - Aug 2022",
    description: [
      "Automated data collection and reporting workflows with Excel, Power BI, Tableau, and OpenRefine.",
      "Improved FTTH recovery reporting and KYC data quality through validation and dashboarding.",
      "Reduced recurring manual reporting effort with macros and repeatable data cleaning processes.",
    ],
  },
];

export const testimonials = [
  {
    text: "Great progress man! I am proud of the work you have been doing and your zeal to learn new languages and technologies over the past couple of years! Proud mentor.",
    name: "Andile Mbele",
    designation: "Co-Founder at Qu Stack | Co-founder of Rooibos Radar",
    company: "Qu Stack",
  },
  {
    text: "Your dedication and awesome work ethic has a great impact and progressive effect to the Emzini we Code community. Thank you for your continued willingness to support.",
    name: "Eric Khumalo",
    designation: "Data Scientist & Privacy Engineer at Good Research | Founder & Head Instructor at Emzini we Code",
    company: "Good Research",
  },
  {
    text: "I am impressed by the brilliant work you are doing in such a short period of time since you arrived. I am optimistic that we will cover a lot of ground and be ahead of our goals.",
    name: "Temba Ngwenya",
    designation: "Client Relations Associate at TelOne",
    company: "TelOne",
  },
];

export const capabilities = [
  { title: "Software Engineering", description: "React, TypeScript, APIs, cloud systems, and product-minded delivery.", icon: web },
  { title: "Machine Learning", description: "Computer vision, clinical ML, NLP, data pipelines, and deployment tradeoffs.", icon: backend },
  { title: "Community Building", description: "Teaching, open source, hackathons, and tooling for emerging builders.", icon: creator },
  { title: "Developer Tooling", description: "CLIs, offline-first workflows, automation, and practical systems design.", icon: github },
];

export const uses = [
  { name: "React", category: "Frontend", icon: reactjs, note: "Component systems, interaction-heavy UIs, and fast iteration." },
  { name: "TypeScript", category: "Language", icon: typescript, note: "Default for product code and shared data models." },
  { name: "Tailwind CSS", category: "Styling", icon: tailwind, note: "Design systems, motion states, and responsive layout." },
  { name: "Node.js", category: "Runtime", icon: nodejs, note: "APIs, tooling scripts, and backend glue." },
  { name: "Docker", category: "Infrastructure", icon: docker, note: "Repeatable local environments and deployment packaging." },
  { name: "Git", category: "Workflow", icon: git, note: "Branching, review, release notes, and experiment tracking." },
  { name: "Figma", category: "Design", icon: figma, note: "Sketching product flows before touching code." },
  { name: "JavaScript", category: "Language", icon: javascript, note: "The web runtime that still pays the bills." },
];

export const links = [
  { title: "GitHub", href: profile.github, description: "Open-source projects, experiments, and tools." },
  { title: "Medium", href: profile.blog, description: "Writing about machine learning, software, and the builder journey." },
  { title: "Resume", href: profile.resume, description: "A concise overview of my experience and education." },
  { title: "Email", href: `mailto:${profile.email}`, description: "The fastest way to reach me for work or collaborations." },
  { title: "DreamSprint", href: "/dreamsprint", description: "A focused landing page for sprinting from idea to launch." },
];

export const bucketList = [
  { title: "Ship an African autonomous driving benchmark", status: "In progress" },
  { title: "Publish more open-source ML education material", status: "In progress" },
  { title: "Build a voice dataset collection network", status: "In progress" },
  { title: "Visit 30 countries while writing about builders", status: "Queued" },
  { title: "Record a full music project", status: "Queued" },
  { title: "Teach 1,000 people practical machine learning", status: "Always" },
];

export const posts = [
  {
    slug: "building-ml-that-survives-the-real-world",
    title: "Building ML That Survives the Real World",
    date: "2026-05-10",
    excerpt:
      "Notes on the difference between a model that demos well and a system that survives edge cases, messy data, and deployment pressure.",
    tags: ["Machine Learning", "Systems", "MLOps"],
    readingTime: "5 min read",
    sections: [
      "The hardest parts of ML rarely show up in the architecture diagram. They show up in labels, missing metadata, edge cases, and the distance between a benchmark and production.",
      "My current rule is simple: every model deserves an evaluation story, an operations story, and a failure story before it deserves a launch story.",
    ],
    code: "metrics = evaluate(model, dataset)\nreport_tradeoffs(metrics, latency_ms=142, memory_gb=9.8)",
  },
  {
    slug: "offline-first-tools-for-real-communities",
    title: "Offline-First Tools for Real Communities",
    date: "2026-04-18",
    excerpt:
      "Why unreliable connectivity should be a first-class design constraint for dataset tools, education products, and community software.",
    tags: ["Open Source", "Community", "Tools"],
    readingTime: "4 min read",
    sections: [
      "If software only works on perfect internet, it excludes many of the people I most want to build for.",
      "Offline-first design is not a fallback. It is respect for the environment the product is entering.",
    ],
    code: "cowcow record --offline\ncowcow sync --when-connected",
  },
];

export const guestbookEntries = [
  {
    name: "Future collaborator",
    message: "Guestbook backend is tracked in GitHub issue #15. This shell is ready for real messages.",
    date: "May 2026",
  },
  {
    name: "Open-source friend",
    message: "Leave a note, a project idea, or a trail of where you found the site.",
    date: "Soon",
  },
];

export const legalPages = {
  terms:
    "This portfolio is provided for informational purposes. Project links, writing, and contact forms are maintained by Thabhelo Duve.",
  privacy:
    "The current site avoids invasive tracking. Contact form submissions may include the name, email, and message you provide so Thabhelo can respond.",
};
