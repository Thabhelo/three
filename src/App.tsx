import { Switch, Route } from "wouter";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import DreamSprintLanding from "@/pages/dreamsprint";
import BlogAdminPage from "@/pages/blog-admin";
import {
  AboutPage,
  AttributionPage,
  BlogIndexPage,
  BlogPostPage,
  BucketListPage,
  ContactPage,
  GuestbookPage,
  LegalPage,
  LinksPage,
  ProjectDetailPage,
  ProjectsPage,
  RssRedirectPage,
  UsesPage,
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
      <Route path="/uses" component={UsesPage} />
      <Route path="/bucket-list" component={BucketListPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/attribution" component={AttributionPage} />
      <Route path="/rss" component={RssRedirectPage} />
      <Route path="/legal/terms">
        <LegalPage page="terms" />
      </Route>
      <Route path="/legal/privacy">
        <LegalPage page="privacy" />
      </Route>
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
