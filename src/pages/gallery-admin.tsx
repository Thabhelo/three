import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Lock } from "lucide-react";
import { Link, Redirect } from "wouter";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { auth, googleProvider, isFirebaseConfigured } from "@/lib/firebase";

export default function GalleryAdminPage() {
  const { user, checkingAuth } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleGoogleLogin() {
    if (!auth || !googleProvider) return;
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      setError("Google sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    if (!auth) return;

    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setPassword("");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  if (!isFirebaseConfigured()) {
    return (
      <div className="site-shell">
        <Navbar />
        <main className="container mx-auto px-4 pb-24 pt-32 md:px-6">
          <div className="soft-card mx-auto max-w-lg rounded-[14px] p-8 text-center">
            <AlertCircle className="mx-auto size-10 text-white/60" />
            <h1 className="mt-4 text-2xl font-semibold">Firebase not configured</h1>
            <p className="mt-3 text-muted-foreground">Add the VITE_FIREBASE_* variables from .env.example, then reload.</p>
            <Link href="/gallery">
              <Button className="mt-6 rounded-[10px]">Back to gallery</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-10 animate-spin rounded-full border-b-2 border-white" />
      </div>
    );
  }

  if (user) {
    return <Redirect to="/gallery" />;
  }

  return (
    <div className="site-shell">
      <Navbar />
      <main className="flex min-h-[80vh] items-center justify-center px-4 pb-24 pt-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="soft-card rounded-[14px] p-8">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full border border-dashed border-white/15 p-3">
                <Lock className="size-6 text-white/70" />
              </div>
            </div>
            <h1 className="text-center text-2xl font-semibold">Gallery admin</h1>
            <p className="mt-2 text-center text-sm text-muted-foreground">Sign in to edit your gallery.</p>
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                className="w-full rounded-[10px] border border-dashed border-white/10 bg-background/70 px-4 py-3 outline-none focus:border-white/30"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className="w-full rounded-[10px] border border-dashed border-white/10 bg-background/70 px-4 py-3 outline-none focus:border-white/30"
                required
              />
              {error ? <p className="text-sm text-red-400">{error}</p> : null}
              <Button type="submit" disabled={loading} className="h-11 w-full rounded-[10px]">
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
            <Button type="button" variant="outline" disabled={loading} onClick={handleGoogleLogin} className="mt-3 h-11 w-full rounded-[10px] border-white/15">
              Continue with Google
            </Button>
            <Link href="/gallery" className="mt-6 block text-center text-sm text-muted-foreground hover:text-foreground">
              Back to gallery
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
