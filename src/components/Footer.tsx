import { ExternalLink } from "lucide-react";

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/thabhelo" },
  { name: "Twitter", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Instagram", href: "#" },
];

export default function Footer() {
  return (
    <footer className="py-20 border-t border-muted bg-background relative overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-foreground">
              LET'S<br />
              CONNECT
            </h2>

            <a
              href="mailto:thabhelo@deepubuntu.com"
              className="text-2xl md:text-3xl font-mono text-primary hover:underline decoration-2 underline-offset-8"
            >
              thabhelo@deepubuntu.com
            </a>
          </div>

          <div className="flex flex-col md:items-end gap-6">
            <div className="flex flex-col gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-xl text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="w-8 h-[1px] bg-muted-foreground group-hover:bg-primary transition-colors" />
                  {social.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-muted/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-mono">
          <p>© {new Date().getFullYear()} Thabhelo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
