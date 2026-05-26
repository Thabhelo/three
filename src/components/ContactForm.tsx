import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { contactConfig } from "@/config/contact";
import { toast } from "@/hooks/use-toast";
import { deliverContactMessage } from "@/lib/contact-service";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      await deliverContactMessage(form.name, form.email, form.message);
      setForm({ name: "", email: "", message: "" });
      toast({
        title: "Message sent",
        description: `Thanks. I'll reply at ${contactConfig.recipientEmail} as soon as I can.`,
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Could not send message",
        description: `Please email me directly at ${contactConfig.recipientEmail}.`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="soft-card rounded-[14px] p-5 md:p-8">
      <div className="grid gap-5">
        <label className="grid gap-2 text-sm font-medium">
          Your name
          <input
            required
            name="name"
            value={form.name}
            onChange={handleChange}
            className="rounded-[10px] border border-dashed border-white/10 bg-background/70 px-4 py-3 outline-none transition-colors focus:border-white/30"
            placeholder="What should I call you?"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Your email
          <input
            required
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="rounded-[10px] border border-dashed border-white/10 bg-background/70 px-4 py-3 outline-none transition-colors focus:border-white/30"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Message
          <textarea
            required
            rows={6}
            name="message"
            value={form.message}
            onChange={handleChange}
            className="resize-none rounded-[10px] border border-dashed border-white/10 bg-background/70 px-4 py-3 outline-none transition-colors focus:border-white/30"
            placeholder="Tell me what you are building."
          />
        </label>
        <Button disabled={loading} className="h-12 rounded-[10px]">
          {loading ? "Sending..." : "Send message"}
        </Button>
        <p className="text-center text-xs leading-5 text-muted-foreground">
          By sending a message, you agree to our{" "}
          <Link href="/privacy" className="underline underline-offset-4 transition-colors hover:text-foreground">
            privacy policy
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
