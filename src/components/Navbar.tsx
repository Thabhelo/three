import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import resume from "@/assets/Thabhelo_Duve_Resume.pdf";

const NAV_LINKS = [
    { name: "About", href: "/#about" },
    { name: "Work Experience", href: "/#experience" },
    { name: "Projects", href: "/#projects" },
    { name: "Contact", href: "/#contact" },
    { name: "DreamSprint", href: "/dreamsprint" },
    { name: "Blog", href: "https://thabhelo.hashnode.dev", external: true },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, setTheme } = useTheme();
    const [location] = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.querySelector(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
            setIsOpen(false);
        }
    };

    return (
        <nav
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300",
                scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tighter">
                            Thabhelo<span className="text-primary">.</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        {NAV_LINKS.map((link) => (
                            link.external ? (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </a>
                            ) : (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => {
                                        if (link.href.startsWith("/#")) {
                                            e.preventDefault();
                                            if (location !== "/") {
                                                window.location.href = link.href;
                                            } else {
                                                scrollToSection(link.href.substring(1));
                                            }
                                        }
                                    }}
                                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                                >
                                    {link.name}
                                </a>
                            )
                        ))}

                        <a href={resume} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="rounded-full">
                                Resume
                            </Button>
                        </a>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="rounded-full"
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>

                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background border-b border-border p-4 flex flex-col gap-4 shadow-lg">
                    {NAV_LINKS.map((link) => (
                        link.external ? (
                            <a
                                key={link.name}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ) : (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => {
                                    if (link.href.startsWith("/#")) {
                                        e.preventDefault();
                                        if (location !== "/") {
                                            window.location.href = link.href;
                                        } else {
                                            scrollToSection(link.href.substring(1));
                                            setIsOpen(false);
                                        }
                                    } else {
                                        setIsOpen(false);
                                    }
                                }}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                            >
                                {link.name}
                            </a>
                        )
                    ))}
                    <a href={resume} target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full rounded-full">
                            Resume
                        </Button>
                    </a>
                </div>
            )}
        </nav>
    );
}
