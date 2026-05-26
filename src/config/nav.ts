import { FileText, Images, Link as LinkIcon, PenLine } from "lucide-react";
import { profile } from "@/content/site";

export const primaryLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Work", href: "/projects" },
  { name: "Blog", href: "/blog" },
];

export const moreLinks = [
  {
    name: "Guestbook",
    href: "/guestbook",
    description: "Let me know you were here",
    icon: PenLine,
    featured: true,
    image: "/media/guestbook-journal.jpg",
  },
  {
    name: "Gallery",
    href: "/gallery",
    description: "Meaningful images from the work and the road",
    icon: Images,
    featured: true,
    image: "/media/mountain-travel-cinematic.jpg",
  },
  {
    name: "Links",
    href: "/links",
    description: "All my links",
    icon: LinkIcon,
  },
  {
    name: "Resume",
    href: profile.resume,
    description: "PDF: experience and education",
    icon: FileText,
    external: true,
  },
];
