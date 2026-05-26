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
  javascript,
  nodejs,
  reactjs,
  tailwind,
  trafficdensity,
  typescript,
  web,
} from "@/assets";

export const profile = {
  firstName: "Thabhelo",
  fullName: "Thabhelo Duve",
  handle: "thabheloduve",
  role: "Software engineer building AI systems, public-safety tooling, and ML infrastructure",
  location: "Pittsburgh, PA",
  email: "thabhelo@deepubuntu.com",
  resume,
  heroImage,
  portrait: faceImage,
  github: "https://github.com/Thabhelo",
  medium: "https://medium.com/@thabheloduve",
  tagline: "I build reliable AI systems from messy real-world data.",
  intro:
    "I work across machine learning, cloud systems, developer tools, public-safety software, and autonomous-systems data infrastructure. My projects usually sit where research-grade ideas have to become usable products.",
  shortBio:
    "CS & Math at Talladega College. Ex-SDE @ Amazon, ex-ML Engineering @ Analytical AI, 11x hackathon titles, Top 10% in the National Cyber League, and winner of the Propel Center x Apple Innovation Challenge 2026 with a $17,500 award.",
};

export const socials = [
  { name: "GitHub", href: profile.github },
  { name: "Medium", href: profile.medium },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/thabhelo" },
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
    slug: "mesh-public-safety-platform",
    title: "Mesh Public Safety Platform",
    eyebrow: "Apple Propel Innovation Challenge Winner",
    description:
      "A real-time public-safety interoperability platform for incident awareness, agency coordination, surge prediction, and district-level risk intelligence.",
    year: "2026",
    role: "Founder / lead engineer",
    tags: ["Swift", "SwiftUI", "MapKit", "Public Safety", "AI", "macOS"],
    link: "https://meshofdata.org",
    repo: "https://github.com/Thabhelo/mesh-macos",
    highlights: [
      "Won the Propel Center x Apple Innovation Challenge 2026 and received a $17,500 award.",
      "Built a native macOS app with live incident feeds, MapKit overlays, surge alerts, hazard scoring, and a menu-bar companion.",
      "Designed Mesh around police, fire, EMS, and 911 data interoperability so responders can see operational signals in one place.",
    ],
    body: [
      "Mesh turns fragmented public-safety information into a single operational view for faster coordination during incidents, large events, and citywide surges.",
      "The macOS app combines real-time dashboards, mapping, trend analysis, and AI-assisted risk signals so agencies can reason from shared context instead of scattered systems.",
    ],
  },
  {
    slug: "project-genesis",
    title: "Project Genesis",
    eyebrow: "Multi-Agent AI Simulation",
    description:
      "A self-evolving AI civilization simulator where Gemini-powered agents live, negotiate, build, and govern inside a shared 3D world.",
    year: "2026",
    role: "Full-stack AI engineer",
    tags: ["TypeScript", "React", "Three.js", "Gemini", "Firestore", "Node.js"],
    repo: "https://github.com/thabhelo/project-genesis",
    highlights: [
      "Created a sandbox where five AI agents debate governance, allocate resources, and procedurally generate 3D objects through structured JSON.",
      "Built a React Three Fiber visualizer that renders agent-created objects and streams the agents' live dialogue.",
      "Designed the system as a policy and alignment testbed for observing emergent cooperation, conflict, and rule formation in multi-agent systems.",
    ],
    body: [
      "Project Genesis explores what happens when autonomous agents are placed in a shared world with only base personas, communication, memory, and the ability to build.",
      "The project is part simulation, part AI safety sandbox: every decision, proposal, rule, and world mutation becomes observable for studying emergent behavior.",
    ],
  },
  {
    slug: "deepubuntu-cowcow",
    title: "CowCow",
    eyebrow: "Autonomous Systems Data Infrastructure",
    description:
      "An offline-first data collection and quality-control system for turning raw field data into training-ready datasets for autonomous systems and ML teams.",
    year: "2026",
    role: "Founder / open-source maintainer",
    tags: ["Rust", "Python", "FastAPI", "SQLite", "gRPC", "Data Quality"],
    repo: "https://github.com/deepubuntu/cowcow",
    highlights: [
      "Built quality checks for noisy real-world collection workflows, including signal validation, metadata structure, export integrity, and dataset packaging.",
      "Designed the product to work offline first, then sync when connectivity is available.",
      "Positioned CowCow as DeepUbuntu's flagship product for robotics, autonomy, and field-data pipelines.",
    ],
    body: [
      "CowCow is built for teams that need usable datasets from messy environments, not just clean lab exports.",
      "The system focuses on collection discipline: quality checks near the source, structured metadata, repeatable exports, and workflows that still work when the network does not.",
    ],
  },
  {
    slug: "pytorch-dlrs",
    title: "pytorch-dlrs",
    eyebrow: "Open Source ML Library",
    description:
      "A PyTorch implementation of the Dynamic Learning Rate Scheduler algorithm with package distribution, documentation, examples, tests, and CI/CD.",
    year: "2026",
    role: "Open-source maintainer",
    tags: ["Python", "PyTorch", "PyPI", "CI/CD", "Testing", "ML"],
    repo: "https://github.com/Thabhelo/pytorch-dlrs",
    highlights: [
      "Converted a research learning-rate scheduling idea into an installable PyPI package.",
      "Added examples, documentation, tests, and cross-platform CI/CD across Python versions.",
      "Built the project as reusable ML infrastructure rather than a one-off notebook implementation.",
    ],
    body: [
      "pytorch-dlrs packages a dynamic learning-rate scheduler into a practical PyTorch tool that researchers and engineers can plug into training loops.",
      "The work emphasizes the boring parts that make research usable: packaging, docs, examples, tests, and compatibility across environments.",
    ],
  },
  {
    slug: "medical-image-segmentation",
    title: "3D Medical Image Segmentation Benchmark",
    eyebrow: "Clinical ML Research",
    description:
      "A comparative study of 3D deep learning architectures for volumetric CT and MRI tumor segmentation.",
    year: "2025",
    role: "ML engineer",
    tags: ["Python", "PyTorch", "MONAI", "nnU-Net", "SwinUNETR"],
    highlights: [
      "Benchmarked 3D U-Net, V-Net, nnU-Net, and SwinUNETR across accuracy, latency, and memory tradeoffs.",
      "Built preprocessing for HU windowing, resampling, normalization, augmentation, and patch-based training.",
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
];

export const experiences = [
  {
    title: "Founder / Lead Engineer",
    company: "DeepUbuntu Labs",
    location: "Remote",
    date: "Jan 2025 - Present",
    description: [
      "Building CowCow, an offline-first field-data and quality-control platform for autonomous systems, robotics, and ML teams.",
      "Designing ingestion, validation, metadata, export, and dataset-readiness workflows for real-world data collection.",
      "Developing technical writing, open-source tooling, and ML infrastructure around robustness, data quality, and applied AI systems.",
    ],
  },
  {
    title: "Founder / Lead Engineer",
    company: "Mesh",
    location: "Remote",
    date: "Feb 2026 - Present",
    description: [
      "Built Mesh, a public-safety interoperability platform with a native macOS app, live incident views, MapKit overlays, surge signals, and district-level hazard scoring.",
      "Won the Propel Center x Apple Innovation Challenge 2026 and received a $17,500 award for the product.",
      "Developing backend ingestion and API architecture for normalized incident records, data freshness, and operational public-safety intelligence.",
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
    location: "Remote",
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
  {
    title: "AI Product Engineering",
    description: "Full-stack AI systems, agentic products, RAG pipelines, public demos, and production-minded delivery.",
    icon: web,
  },
  {
    title: "Machine Learning Infrastructure",
    description: "Computer vision, medical ML, data quality, evaluation, dataset pipelines, and deployment tradeoffs.",
    icon: backend,
  },
  {
    title: "Public Safety & Civic Tech",
    description: "Operational dashboards, interoperability tooling, geospatial interfaces, and real-time risk signals.",
    icon: creator,
  },
  {
    title: "Developer Tooling",
    description: "CLIs, offline-first workflows, open-source packages, automation, and practical systems design.",
    icon: github,
  },
];

export const uses = [
  { name: "React", category: "Frontend", icon: reactjs, note: "Component systems, interaction-heavy UIs, and fast iteration." },
  { name: "TypeScript", category: "Language", icon: typescript, note: "Default for product code and shared data models." },
  { name: "Tailwind CSS", category: "Styling", icon: tailwind, note: "Design systems, motion states, and responsive layout." },
  { name: "Node.js", category: "Runtime", icon: nodejs, note: "APIs, agent backends, tooling scripts, and backend glue." },
  { name: "Docker", category: "Infrastructure", icon: docker, note: "Repeatable local environments and deployment packaging." },
  { name: "Git", category: "Workflow", icon: git, note: "Branching, review, release notes, and experiment tracking." },
  { name: "Figma", category: "Design", icon: figma, note: "Sketching product flows before touching code." },
  { name: "JavaScript", category: "Language", icon: javascript, note: "The web runtime that still pays the bills." },
];

export const links = [
  { title: "GitHub", href: profile.github, description: "Open-source projects, experiments, and tools." },
  { title: "Mesh", href: "https://meshofdata.org", description: "Public-safety interoperability platform and Apple Propel Innovation Challenge winning project." },
  { title: "Project Genesis", href: "https://github.com/thabhelo/project-genesis", description: "Multi-agent AI civilization simulator powered by Gemini and a real-time 3D visualizer." },
  { title: "CowCow", href: "https://github.com/deepubuntu/cowcow", description: "Offline-first data collection and quality-control tooling for autonomous systems." },
  { title: "Medium", href: profile.medium, description: "Essays on software, AI systems, and the builder journey." },
  { title: "ML Blog", href: "/blog", description: "Machine learning teaching notes hosted on this site." },
  { title: "Resume", href: profile.resume, description: "A concise overview of my experience and education." },
  { title: "Email", href: `mailto:${profile.email}`, description: "The fastest way to reach me for work or collaborations." },
  { title: "DreamSprint", href: "/dreamsprint", description: "A focused landing page for sprinting from idea to launch." },
];

export const bucketList = [
  { title: "Ship CowCow as a polished interface, not just a CLI", status: "In progress" },
  { title: "Turn Mesh into a credible public-safety data platform", status: "In progress" },
  { title: "Publish more open-source ML infrastructure", status: "In progress" },
  { title: "Build a stronger research portfolio around robust ML systems", status: "In progress" },
  { title: "Visit 30 countries while writing about builders", status: "Queued" },
  { title: "Record a full music project", status: "Queued" },
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
    slug: "why-i-built-mesh",
    title: "Why I Built Mesh",
    date: "2026-05-26",
    excerpt:
      "How fragmented public-safety data became the product problem behind Mesh, and why operational interfaces matter during emergencies.",
    tags: ["Civic Tech", "Public Safety", "Apple", "Product"],
    readingTime: "4 min read",
    sections: [
      "Most emergency-response software problems are not about one missing dashboard. They are about agencies, incidents, maps, updates, and risk signals living in separate places while time is moving.",
      "Mesh is my attempt to turn that fragmentation into a shared operational picture: incident feeds, map overlays, surge prediction, hazard scoring, and status awareness in a native Mac experience.",
    ],
    code: "const signal = normalizeIncident(rawCall)\nconst risk = scoreDistrict(signal, historicalBaseline)",
  },
  {
    slug: "offline-first-tools-for-real-world-data",
    title: "Offline-First Tools for Real-World Data",
    date: "2026-04-18",
    excerpt:
      "Why unreliable connectivity should be a first-class design constraint for dataset tools, autonomy products, and field-data software.",
    tags: ["Open Source", "Data", "Autonomous Systems"],
    readingTime: "4 min read",
    sections: [
      "If software only works on perfect internet, it fails exactly where some of the most valuable data is collected.",
      "Offline-first design is not a fallback. It is respect for the environment the product is entering.",
    ],
    code: "cowcow record --offline\ncowcow sync --when-connected",
  },
];

export const guestbookEntries = [
  {
    name: "Future collaborator",
    message: "Excited to see what you ship next. The ML writing series is going to help a lot of people.",
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
