import { useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import heroImage from "@assets/generated_images/Abstract_dark_3D_wireframe_geometry_for_developer_portfolio_hero_fcb42ce4.png";
import faceImage from "@/assets/thabs.png";
import emailjs from "@emailjs/browser";

import {
  trafficdensity
} from "@/assets";

const PROJECTS = [
  {
    title: "3D Medical Image Segmentation Benchmark",
    description: "Designed comparative study across 4 3D deep learning architectures (3D U-Net, V-Net, nnU-Net, SwinUNETR) on volumetric CT & MRI datasets for tumor segmentation. Implemented preprocessing pipelines (HU windowing, resampling, normalization, patch-based sampling) and GPU-optimized training with mixed precision and distributed data parallel. Benchmarked models using Dice coefficient, Hausdorff distance, and inference throughput, providing insights into accuracy-latency-memory tradeoffs for clinical deployment.",
    tags: ["Python", "PyTorch", "MONAI", "nnU-Net", "3D U-Net", "V-Net"],
    image: undefined,
    link: "#"
  },
  {
    title: "Singapore Traffic Density Classification",
    description: "Published spatio-temporal classification model integrating CNNs with LSTMs for vehicle density classification on traffic camera datasets in Singapore’s CBD (Publication on ReadyTensor). Built dataset pipeline with OpenCV preprocessing, adaptive background subtraction, and YOLO-based vehicle detection to feed into CNN-LSTM classifiers. Optimized deployment with AWS GPU clusters, model quantization, and batch streaming for real-time inference <150 ms latency and classification accuracy above 92%.",
    tags: ["Python", "PyTorch", "Keras", "OpenCV"],
    image: trafficdensity,
    link: "https://github.com/Thabhelo/traffic-density-classification"
  },
  {
    title: "FinePrint",
    description: "Engineered an NLP contract-intelligence platform leveraging transformer-based models (DeBERTa-v3) with spaCy tokenization and semantic search, securing $12K seed funding. Implemented hybrid classification pipeline combining fine-tuned embeddings, regex heuristics, and ensemble learning for multi-label risk detection with confidence calibration.",
    tags: ["JavaScript", "spaCy", "LangChain", "DeBERTa-v3", "FastAPI"],
    image: undefined,
    link: "https://www.fineprint.vercel.app"
  },
  {
    title: "CowCow CLI",
    description: "Open-sourced offline-first audio data collection tool with quality control (SNR analysis, clipping detection, VAD) and token-based reward system for distributed dataset generation. Developed advanced export pipelines supporting multi-format outputs (JSON/WAV), dataset integrity validation, and automated QC metric-driven curation.",
    tags: ["Rust", "FastAPI", "SQLite", "gRPC", "VAD"],
    image: undefined,
    link: "https://github.com/Thabhelo/cowcow"
  }
];

const EXPERIENCES = [
  {
    title: "Software Engineer",
    company: "DeepUbuntu Labs",
    location: "Remote",
    date: "Jan 2025 - Present",
    description: [
      "Developing DeepUbuntu AV, an autonomous vehicle perception stack with multi-modal sensor fusion (LiDAR, RADAR, RGB, IMU) optimized for edge cases such as unpaved roads, informal traffic flows, and underrepresented driving conditions.",
      "Engineered large-scale data labeling pipelines with offline-first annotation workflows, automated quality control (SNR scoring, clipping/silence detection), and dataset versioning for supervised learning at scale.",
      "Building synthetic data generation modules leveraging domain randomization, GAN-based scene augmentation, and physics-driven simulators to anticipate safety-critical anomalies before real-world incidents occur."
    ]
  },
  {
    title: "Machine Learning Engineer Intern",
    company: "Analytical AI",
    location: "Birmingham, AL",
    date: "Aug 2025 - Present",
    description: [
      "Developing and benchmarking deep learning architectures for 3D medical image segmentation using PyTorch and MONAI, focusing on performance-efficiency tradeoffs across brain, liver, and full-body datasets.",
      "Built reproducible experimental pipelines (preprocessing, augmentation, evaluation) comparing 3D U-Net, UNETR, and SegResNet on BraTS, MSD, and TotalSegmentator datasets with Dice, IoU, and Hausdorff metrics.",
      "Engineered modular training infrastructure with standardized loaders, MONAI transforms, and automated experiment orchestration for scalable experimentation and clinical interpretability."
    ]
  },
  {
    title: "Software Development Engineer Intern",
    company: "Amazon",
    location: "Austin, TX",
    date: "May 2025 - Aug 2025",
    description: [
      "Developed a generative AI tool using Amazon Bedrock, and Titan models for intelligent data pipeline automation, processing 500TB+ of data with 99.7% accuracy, reducing manual data processing by 78%.",
      "Built a RAG (Retrieval-Augmented Generation) pipeline integrating vector databases (Amazon OpenSearch), semantic search algorithms, and multi-modal embedding models to streamline cross-organizational data access.",
      "Developed a microservices architecture using AWS Lambda, API Gateway, and DynamoDB for scalable data ingestion, event-driven processing with SQS/SNS that handles 2M+ daily transactions with sub-100ms latency & failover mechanisms."
    ]
  },
  {
    title: "Data Analyst",
    company: "TelOne",
    location: "Bulawayo, Zimbabwe",
    date: "Sep 2021 - Aug 2022",
    description: [
      "Developed automated data collection processes using Excel and PowerBI, reducing manual effort by 50%, and ensuring consistent and accurate data retrieval.",
      "Achieved a 23% surge in FTTH recovery rate during the initial 2 quarters of 2021.",
      "Created interactive dashboards using Tableau and streamlined management's data-driven decisions, enhancing visual data interpretation and reducing analysis time by 30%.",
      "Automated generation of monthly performance reports using Excel macros, saving 20 hours of manual effort per month and improving report accuracy.",
      "Implemented data cleaning and validation procedures with OpenRefine, resulting in a 30% increase in KYC data accuracy."
    ]
  }
];

const TESTIMONIALS = [
  {
    text: "Great progress man! I am proud of the work you have been doing and your zeal to learn new languages and technologies over the past couple of years! Proud mentor.",
    name: "Andile Mbele",
    designation: "Co-Founder at Qu Stack | Co-founder of Rooibos Radar",
    company: "Qu Stack"
  },
  {
    text: "Your dedication and awesome work ethic has a great impact and progressive effect to the Emzini we Code community. Thank you for your continued willingness to support.",
    name: "Eric Khumalo",
    designation: "Data Scientist & Privacy Engineer at Good Research | Founder & Head Instructor at Emzini we Code",
    company: "Good Research"
  },
  {
    text: "I am impressed by the brilliant work you are doing in such a short period of time since you arrived, I am optimistic that we will cover a lot of ground and be ahead of our goals for this year's quarter 1 and 2.",
    name: "Temba Ngwenya",
    designation: "Client Relations Associate at TelOne",
    company: "TelOne"
  }
];

const ABOUT_CARDS = [
  { title: "Software Engineer", icon: "💻" },
  { title: "Data Science/ML Engineer", icon: "📊" },
  { title: "Cloud Engineer", icon: "☁️" },
  { title: "Content Creator", icon: "🎥" }
];

export default function Home() {
  const containerRef = useRef(null);
  useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Get EmailJS configuration from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const recipientEmail = import.meta.env.VITE_EMAILJS_RECIPIENT_EMAIL;

    if (!serviceId || !templateId || !publicKey || !recipientEmail) {
      setLoading(false);
      alert("Email configuration is missing. Please contact the administrator.");
      console.error("Missing EmailJS environment variables");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          to_name: "Thabhelo",
          from_email: form.email,
          to_email: recipientEmail,
          message: form.message,
        },
        publicKey
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ah, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div ref={containerRef} className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      <Hero backgroundImage={heroImage} />

      <main className="relative z-10 bg-background">
        {/* About Section */}
        <section id="about" className="py-24 md:py-32 border-b border-muted">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                  <img
                    src={faceImage}
                    alt="Thabhelo Duve"
                    className="relative w-full max-w-md mx-auto rounded-2xl shadow-2xl border border-muted bg-muted/50 object-cover aspect-square"
                  />
                </div>
              </div>
              <div className="lg:col-span-7 lg:pl-12 flex flex-col justify-between">
                <h3 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">// Introduction</h3>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">Overview</h2>

                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    CS, Math and Physics, 11x hackathon titles, Formerly Software Engineering Intern at Amazon.
                  </p>
                  <p>
                    I'm a huge fan of open-source too
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-12">
                  {ABOUT_CARDS.map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="p-4 border border-muted rounded-xl bg-muted/20 hover:bg-muted/40 transition-colors flex items-center gap-3"
                    >
                      <span className="text-2xl">{card.icon}</span>
                      <span className="font-medium text-sm md:text-base">{card.title}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 md:py-32 border-b border-muted bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mb-16">
              <h3 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">// What I have done so far</h3>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Work Experience.</h2>
            </div>

            <div className="space-y-12">
              {EXPERIENCES.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 p-8 border border-muted rounded-2xl bg-background/50 hover:bg-background transition-colors"
                >
                  <div className="md:col-span-4">
                    <h4 className="text-2xl font-bold mb-2">{exp.company}</h4>
                    <p className="text-primary font-mono text-sm mb-1">{exp.title}</p>
                    <p className="text-muted-foreground text-sm">{exp.date} | {exp.location}</p>
                  </div>
                  <div className="md:col-span-8">
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Work Section */}
        <section id="projects" className="py-24 md:py-32 border-b border-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h3 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">// My work</h3>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">Projects</h2>
              </div>
              <p className="text-muted-foreground font-mono mt-4 md:mt-0 max-w-md text-right">
                The following projects showcase my skills and experience through real-world examples of my work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={project.title} {...project} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 md:py-32 border-b border-muted bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="mb-16">
              <h3 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">// What others said about me</h3>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Testimonials.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-background p-8 rounded-2xl border border-muted relative"
                >
                  <span className="text-6xl text-primary/20 font-serif absolute top-4 left-4">"</span>
                  <p className="text-muted-foreground mb-6 relative z-10 pt-4 italic">
                    {testimonial.text}
                  </p>
                  <div className="flex flex-col">
                    <span className="font-bold text-foreground">@{testimonial.name}</span>
                    <span className="text-xs text-primary mt-1">{testimonial.company}</span>
                    <span className="text-xs text-muted-foreground mt-1">{testimonial.designation}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h3 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">// Get in touch</h3>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Contact.</h2>


                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      📧
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <a href="mailto:thabhelo@deepubuntu.com" className="text-lg font-bold hover:text-primary transition-colors">thabhelo@deepubuntu.com</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/20 p-8 rounded-3xl border border-muted">
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="What's your preferred name?"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="What's your email address?"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Message</label>
                    <textarea
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Let's talk!"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-muted focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
