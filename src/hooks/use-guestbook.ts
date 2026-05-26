import { useEffect, useState, type FormEvent } from "react";
import { isFirebaseConfigured } from "@/lib/firebase";
import { getGuestbookEntries, submitGuestbookEntry, type GuestbookEntry } from "@/lib/content-service";
import { guestbookEntries as staticGuestbookEntries } from "@/content/site";

export function useGuestbook() {
  const [entries, setEntries] = useState<GuestbookEntry[]>(
    staticGuestbookEntries.map((entry, index) => ({
      id: `static-${index}`,
      name: entry.name,
      message: entry.message,
      createdAt: entry.date,
    })),
  );
  const [loading, setLoading] = useState(isFirebaseConfigured());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        const fetched = await getGuestbookEntries();
        if (cancelled) return;
        if (fetched.length > 0) setEntries(fetched);
      } catch (err) {
        console.error("Failed to load guestbook:", err);
        if (!cancelled) setError("Could not load guestbook entries.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function submit(name: string, message: string, email?: string) {
    if (!isFirebaseConfigured()) {
      setError("Guestbook is not connected yet.");
      return false;
    }

    setSubmitting(true);
    setError(null);

    try {
      const ok = await submitGuestbookEntry(name, message, email);
      if (!ok) throw new Error("Submit failed");
      setSubmitted(true);
      const fetched = await getGuestbookEntries();
      if (fetched.length > 0) setEntries(fetched);
      return true;
    } catch (err) {
      console.error(err);
      setError("Could not submit your note. Please try again.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  return { entries, loading, submitting, error, submitted, submit };
}

export function useGuestbookForm(onSuccess?: () => void) {
  const { submit, submitting, error, submitted } = useGuestbook();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    if (!name || !message) return;

    const ok = await submit(name, message, email || undefined);
    if (ok) {
      event.currentTarget.reset();
      onSuccess?.();
    }
  }

  return { handleSubmit, submitting, error, submitted };
}
