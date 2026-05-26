import { Switch, Route } from "wouter";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DreamSprintLanding from "@/pages/dreamsprint";
import BlogAdminPage from "@/pages/blog-admin";
import GalleryAdminPage from "@/pages/gallery-admin";
import {
  AboutPage,
  BlogIndexPage,
  BlogPostPage,
  GalleryPage,
  ContactPage,
  GuestbookPage,
  PrivacyPage,
  LinksPage,
  ProjectDetailPage,
  ProjectsPage,
  RssRedirectPage,
} from "@/pages/site-pages";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={AboutPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/:slug" component={ProjectDetailPage} />
      <Route path="/blog" component={BlogIndexPage} />
      <Route path="/blog/admin" component={BlogAdminPage} />
      <Route path="/blog/:slug" component={BlogPostPage} />
      <Route path="/guestbook" component={GuestbookPage} />
      <Route path="/links" component={LinksPage} />
      <Route path="/gallery" component={GalleryPage} />
      <Route path="/gallery/admin" component={GalleryAdminPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/rss" component={RssRedirectPage} />
      <Route path="/legal/privacy" component={PrivacyPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/dreamsprint" component={DreamSprintLanding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
