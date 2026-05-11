import { BookOpen, Command, Link as LinkIcon, PenLine } from "lucide-react";

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
    tone: "from-blue-500/28 via-violet-500/14 to-transparent",
    image: "/media/guestbook-journal.jpg",
  },
  {
    name: "Bucket List",
    href: "/bucket-list",
    description: "Things to do at least once",
    icon: BookOpen,
    featured: true,
    tone: "from-fuchsia-500/24 via-cyan-500/12 to-transparent",
    image: "/media/bucket-list-adventure.jpg",
  },
  {
    name: "Links",
    href: "/links",
    description: "All my links",
    icon: LinkIcon,
  },
  {
    name: "Uses",
    href: "/uses",
    description: "My tools and workflow",
    icon: BookOpen,
  },
  {
    name: "Attribution",
    href: "/attribution",
    description: "Craft and credits",
    icon: Command,
  },
];
