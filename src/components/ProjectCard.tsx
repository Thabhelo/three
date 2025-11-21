import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  index: number;
}

export default function ProjectCard({ title, description, tags, image, link, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        <Card className="group overflow-hidden border-muted bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors duration-300 rounded-xl h-full">
          <div className="aspect-video w-full overflow-hidden bg-muted relative">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary/30 group-hover:bg-secondary/50 transition-colors">
                <span className="text-4xl font-bold text-muted-foreground/20 group-hover:text-primary/20 transition-colors">
                  {title.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <CardHeader className="p-4">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                {title}
              </CardTitle>
              <div className="text-muted-foreground hover:text-primary transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0">
            <p className="text-muted-foreground font-mono text-xs leading-relaxed">
              {description}
            </p>
          </CardContent>

          <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="rounded-md border-primary/20 text-primary/80 bg-primary/5 hover:bg-primary/10 text-[10px] px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      </a>
    </motion.div >
  );
}
