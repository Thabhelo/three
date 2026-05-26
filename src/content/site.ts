import faceImage from "@/assets/thabs.png";
import heroImage from "@assets/generated_images/Abstract_dark_3D_wireframe_geometry_for_developer_portfolio_hero_fcb42ce4.png";
import resume from "@/assets/Thabhelo_Duve_Resume.pdf";
import {
  docker,
  figma,
  git,
  javascript,
  nodejs,
  reactjs,
  tailwind,
  trafficdensity,
  typescript,
} from "@/assets";
import afterTheDataRamp from "@/content/blog/after-the-data-ramp.md?raw";

export const profile = {
  firstName: "Thabhelo",
  fullName: "Thabhelo Duve",
  handle: "thabheloduve",
  role: "machine learning engineer and full-stack software engineer focused on autonomous systems and AI safety",
  location: "San Francisco, CA",
  email: "thabhelo@deepubuntu.com",
  resume,
  heroImage,
  portrait: faceImage,
  github: "https://github.com/Thabhelo",
  medium: "https://medium.com/@thabheloduve",
  linkedin: "https://www.linkedin.com/in/thabhelo",
  tagline: "I build software and ML systems.",
  intro:
    "Machine learning, full-stack engineering, AI safety, and autonomous-systems data. I focus on work that has to work outside the lab.",
  shortBio: [
    "CS, Math & Physics",
    "Founder of DeepUbuntu: field-data and dataset infrastructure for autonomous systems in underrepresented regions",
    "Ex-SDE @ Amazon · Ex-ML Engineering @ Analytical AI",
    "11× hackathon titles · Top 10% · National Cyber League",
    "Top 10% YC applicant signal · YC Startup School 2026",
    "$30K+ in grants and competitions",
  ],
};

export const aboutFocusAreas = [
  {
    title: "Autonomous Systems Data",
    subtitle:
      "DeepUbuntu, CowCow, and DuFind: collecting, validating, and searching AV field data in regions current stacks rarely cover.",
  },
  {
    title: "Production ML",
    subtitle:
      "Medical imaging benchmarks, computer vision, and evaluation where preprocessing, metrics, and deployment tradeoffs matter more than demo polish.",
  },
  {
    title: "Shippable Products",
    subtitle:
      "Mesh, full-stack tools, and multi-agent systems built for real operators, offline conditions, and constraints lab demos usually skip.",
  },
];

export const profileCredentials = [
  "CS, Math & Physics",
  "YC Startup School 2026",
  "Ex-SDE @ Amazon",
  "Ex-ML Engineering @ Analytical AI",
  "11× hackathon titles",
  "Top 10% · National Cyber League",
  "Top 10% YC signal · DeepUbuntu",
  "$30K+ · grants & competitions",
];

export const socials = [
  { name: "GitHub", href: profile.github },
  { name: "Medium", href: profile.medium },
  { name: "LinkedIn", href: profile.linkedin },
];

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "Guestbook", href: "/guestbook" },
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
  /** When true, show founder-style Role / Year in the project sidebar. */
  isStartup?: boolean;
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
    role: "Full-stack engineer",
    tags: ["Swift", "SwiftUI", "MapKit", "Public Safety", "AI", "macOS"],
    image: "/media/project-mesh-public-safety.jpg",
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
    role: "Full-stack engineer",
    tags: ["TypeScript", "React", "Three.js", "Gemini", "Firestore", "Node.js"],
    image: "/media/project-genesis.jpg",
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
      "A pipeline for turning raw field data into training-ready datasets: quality checks, metadata, exports, and packaging for autonomous-systems and ML teams.",
    year: "2026",
    role: "Founder / open-source maintainer",
    isStartup: true,
    tags: ["Rust", "Python", "FastAPI", "SQLite", "gRPC", "Data Quality"],
    image: "/media/project-cowcow-field.jpg",
    repo: "https://github.com/deepubuntu/cowcow",
    highlights: [
      "Built quality checks for noisy real-world collection workflows, including signal validation, metadata structure, export integrity, and dataset packaging.",
      "Designed the pipeline to work offline first, then sync when connectivity is available.",
      "Anchors DeepUbuntu's field-data stack alongside underrepresented AV dataset collection and DuFind search.",
    ],
    body: [
      "CowCow is the processing layer: raw captures in, training-ready datasets out.",
      "The system focuses on collection discipline near the source: validation, structured metadata, repeatable exports, and workflows that still work when the network does not.",
    ],
  },
  {
    slug: "deepubuntu-dufind",
    title: "DuFind",
    eyebrow: "Local-First AV Dataset Search",
    description:
      "A local-first semantic search tool for autonomous-vehicle datasets, combining YOLOv8 object detection with SigLIP embeddings to explore and retrieve field data on machine.",
    year: "2026",
    role: "Founder / lead engineer",
    isStartup: true,
    tags: ["Python", "YOLOv8", "SigLIP", "Computer Vision", "Semantic Search", "Local-First"],
    image: "/media/project-dufind-traffic.jpg",
    highlights: [
      "Indexes AV dataset assets locally so search and preview work without round-trips to the cloud.",
      "Pairs YOLOv8 detections with SigLIP semantic embeddings for object- and concept-level retrieval.",
      "Built to sit on top of CowCow exports and underrepresented field datasets collected through DeepUbuntu.",
    ],
    body: [
      "DuFind is for the moment after collection: finding the right frames, scenes, and labels inside large, messy autonomy datasets.",
      "Local-first search keeps sensitive field data on your machine while still making multimodal retrieval practical for training and review workflows.",
    ],
  },
  {
    slug: "pytorch-dlrs",
    title: "pytorch-dlrs",
    eyebrow: "Open Source ML Library",
    description:
      "A PyTorch implementation of the Dynamic Learning Rate Scheduler algorithm with package distribution, documentation, examples, tests, and CI/CD.",
    year: "2026",
    role: "Full-stack engineer",
    tags: ["Python", "PyTorch", "PyPI", "CI/CD", "Testing", "ML"],
    image: "/media/project-pytorch-dlrs.jpg",
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
    role: "Full-stack engineer",
    tags: ["Python", "PyTorch", "MONAI", "nnU-Net", "SwinUNETR"],
    image: "/media/project-medical-imaging.jpg",
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
    role: "Full-stack engineer",
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
    isStartup: true,
    tags: ["JavaScript", "spaCy", "LangChain", "DeBERTa-v3", "FastAPI"],
    image: "/media/project-fineprint-contract.jpg",
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
      "Collecting underrepresented autonomous-systems datasets from regions where current AV stacks rarely operate: Africa, Southeast Asia, Eastern Europe, and LATAM.",
      "Building CowCow, a pipeline for turning raw field data into training-ready datasets.",
      "Shipping DuFind, a local-first semantic search tool for AV datasets using YOLOv8 and SigLIP.",
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
      "Built internal AI tooling to automate repetitive data workflows and reduce manual coordination across teams.",
      "Implemented semantic retrieval and search so distributed datasets could be accessed with richer, cross-functional context.",
      "Shipped event-driven ingestion and processing on cloud infrastructure for reliable, scalable data movement.",
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
    title: "Machine Learning Engineering",
    description:
      "Computer vision, medical imaging, model benchmarking, training pipelines, evaluation, and the deployment tradeoffs that decide whether research survives production.",
  },
  {
    title: "Full Stack Software Engineering",
    description:
      "End-to-end product delivery across React, TypeScript, APIs, native apps, and cloud backends, from interface polish to the infrastructure that keeps systems reliable.",
  },
  {
    title: "AI Safety & Policy",
    description:
      "Multi-agent simulation, alignment testbeds, governance observability, and policy-aware tooling for studying how autonomous systems behave under real constraints.",
  },
  {
    title: "Systems Engineering (Autonomous Systems)",
    description:
      "Field data collection, dataset quality pipelines, offline-first AV tooling, and infrastructure for turning messy real-world captures into training-ready autonomy data.",
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
  { title: "CowCow", href: "https://github.com/deepubuntu/cowcow", description: "Pipeline for turning raw field data into training-ready AV datasets." },
  { title: "Medium", href: profile.medium, description: "Essays on software, AI systems, and the builder journey." },
  { title: "ML Blog", href: "/blog", description: "Machine learning teaching notes hosted on this site." },
  { title: "Resume", href: profile.resume, description: "A concise overview of my experience and education." },
  { title: "Email", href: `mailto:${profile.email}`, description: "The fastest way to reach me for work or collaborations." },
  { title: "DreamSprint", href: "/dreamsprint", description: "A focused landing page for sprinting from idea to launch." },
];

export const galleryImages = [
  { id: "portrait", src: "/media/gallery-portrait.jpg", label: "San Francisco, CA" },
  { id: "field-road", src: "/media/project-cowcow-field.jpg", label: "On the road" },
  { id: "team-build", src: "/media/project-genesis.jpg", label: "With collaborators" },
  { id: "public-safety", src: "/media/project-mesh-public-safety.jpg", label: "Urban ops" },
  { id: "clinical-ml", src: "/media/project-medical-imaging.jpg", label: "Research bench" },
  { id: "travel-perspective", src: "/media/mountain-travel-cinematic.jpg", label: "Outside the city" },
  { id: "training-discipline", src: "/media/gym-training-cinematic.jpg", label: "Gym" },
  { id: "writing-desk", src: "/media/guestbook-journal.jpg", label: "Desk" },
  { id: "traffic-singapore", src: "/media/project-dufind-traffic.jpg", label: "Urban CV" },
];

export const posts = [
  {
    slug: "after-the-data-ramp",
    title: "Scaling Autonomous Vehicles: Miles, Data, and Coverage",
    date: "2026-05-26",
    excerpt:
      "Waymo and Tesla are scaling fleet miles faster than training data covers new geographies. What changes when scalability—not demos—becomes the AV strategy.",
    tags: ["Autonomous Vehicles", "Data", "DeepUbuntu", "Industry"],
    readingTime: "14 min read",
    coverImage: "/media/blog-highway-aerial.jpg",
    content: afterTheDataRamp,
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

export const privacyNotice =
  "This site collects only what you submit. Contact messages (name, email, and message) are stored so I can reply, and may be sent through Firebase and email delivery providers. Guestbook entries (name, message, and optional email) are stored the same way. Booking through Cal.com is handled by Cal.com under their privacy policy. I do not sell your data or use invasive ad tracking. To ask about or delete something you submitted, email me at thabheloduve@gmail.com.";
