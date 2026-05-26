import { useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { subscribeMailingList } from "@/lib/content-service";

interface MailingListSignupProps {
  source?: string;
  compact?: boolean;
}

export default function MailingListSignup({ source = "blog", compact = false }: MailingListSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;

    setStatus("loading");
    const ok = await subscribeMailingList(trimmed, source);
    setStatus(ok ? "success" : "error");
    if (ok) setEmail("");
  }

  return (
    <div className={compact ? "" : "soft-card rounded-[14px] p-6 md:p-8"}>
      <p className="font-label">Mailing list</p>
      <h2 className={`mt-3 font-semibold ${compact ? "text-xl" : "font-editorial text-2xl md:text-3xl"}`}>
        Get notified when the next post drops
      </h2>
      {!compact && (
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          ML teaching notes and new writing — one email when something new goes live. No spam.
        </p>
      )}
      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="you@example.com"
          className="min-w-0 flex-1 rounded-[10px] border border-dashed border-white/10 bg-white/[0.03] px-4 py-3 text-sm outline-none focus:border-white/25"
        />
        <Button type="submit" className="shrink-0 rounded-[10px]" disabled={status === "loading"}>
          {status === "loading" ? "Joining..." : "Join list"}
          <ArrowUpRight className="size-4" />
        </Button>
      </form>
      {status === "success" && <p className="mt-3 text-sm text-emerald-300">You&apos;re on the list.</p>}
      {status === "error" && <p className="mt-3 text-sm text-red-400">Could not subscribe. Try again.</p>}
    </div>
  );
}
