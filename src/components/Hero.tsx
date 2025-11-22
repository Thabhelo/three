import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  backgroundImage: string;
}

export default function Hero({ backgroundImage }: HeroProps) {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background/80 z-10 backdrop-blur-[2px] bg-scanlines" />
        <img
          src={backgroundImage}
          alt="Abstract 3D Background"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-primary font-mono mb-4 text-lg tracking-widest uppercase">
            // Hi, I'm Thabhelo
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6 text-foreground mix-blend-difference">
            I code, I write,<br />
            I think, I sing,<br />
            I travel and repeat.
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-8 font-light">
            I teach ML too.
          </p>

          <div className="flex gap-4">
            <a href="https://thabhelo.hashnode.dev" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-primary text-primary-foreground hover:bg-primary/90 hover:text-glow transition-all">
                Blog <ArrowUpRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-lg h-14 px-8 border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Let's Connect
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-mono text-muted-foreground">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
