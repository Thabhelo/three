import { useState, type FormEvent } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { deliverGuestbookEntry } from "@/lib/contact-service";

export function useGuestbookForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFirebaseConfigured()) {
      setError("Guestbook is not connected yet.");
      return;
    }

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const website = String(form.get("website") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    if (!name || !message) return;

    setSubmitting(true);
    setError(null);

    try {
      await deliverGuestbookEntry(name, message, website || undefined, email || undefined);
      setSubmitted(true);
      event.currentTarget.reset();
    } catch (err) {
      console.error(err);
      setError("Could not send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return { handleSubmit, submitting, error, submitted };
}
