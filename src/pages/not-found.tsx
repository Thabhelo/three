import { ArrowLeft, SearchX } from "lucide-react";
import { Link } from "wouter";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="container mx-auto grid min-h-[72vh] place-items-center px-4 pt-28 md:px-6">
        <div className="glass-panel max-w-2xl rounded-[14px] p-8 text-center md:p-12">
          <SearchX className="mx-auto size-12 text-white/70" />
          <p className="mt-6 font-label">404</p>
          <h1 className="mt-4 font-display text-5xl leading-none md:text-7xl">This page wandered off.</h1>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            The route does not exist yet, or the content has not been wired into the portfolio.
          </p>
          <Link href="/">
            <Button className="mt-8 rounded-full">
              <ArrowLeft className="mr-2 size-4" /> Back home
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
