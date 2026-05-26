import emailjs from "@emailjs/browser";
import { contactConfig, isEmailJsConfigured } from "@/config/contact";
import { submitContactMessage, submitGuestbookEntry } from "@/lib/content-service";

async function sendViaEmailJs(name: string, email: string, message: string) {
  const { serviceId, templateId, publicKey } = contactConfig.emailJs;
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS is not configured");
  }

  await emailjs.send(
    serviceId,
    templateId,
    {
      from_name: name,
      to_name: "Thabhelo",
      from_email: email,
      reply_to: email,
      to_email: contactConfig.recipientEmail,
      message,
    },
    publicKey,
  );
}

async function sendViaFormSubmit(
  name: string,
  email: string,
  message: string,
  subject = `Portfolio message from ${name}`,
) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(contactConfig.recipientEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: subject,
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`FormSubmit failed (${response.status})`);
  }

  const payload = (await response.json()) as { success?: string };
  if (payload.success !== "true") {
    throw new Error("FormSubmit rejected the message");
  }
}

export async function deliverContactMessage(name: string, email: string, message: string): Promise<void> {
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  try {
    await submitContactMessage(trimmedName, trimmedEmail, trimmedMessage);
  } catch {
    // Firestore backup is best-effort; email delivery still proceeds.
  }

  if (isEmailJsConfigured()) {
    try {
      await sendViaEmailJs(trimmedName, trimmedEmail, trimmedMessage);
      return;
    } catch {
      // Fall through to FormSubmit when EmailJS fails at runtime.
    }
  }

  await sendViaFormSubmit(trimmedName, trimmedEmail, trimmedMessage);
}

export async function deliverGuestbookEntry(
  name: string,
  message: string,
  website?: string,
  email?: string,
): Promise<void> {
  const trimmedName = name.trim();
  const trimmedMessage = message.trim();
  const trimmedWebsite = website?.trim();
  const trimmedEmail = email?.trim();

  try {
    await submitGuestbookEntry(trimmedName, trimmedMessage, trimmedWebsite, trimmedEmail);
  } catch {
    // Firestore backup is best-effort; email delivery still proceeds.
  }

  const lines = [
    trimmedMessage,
    trimmedWebsite ? `Website: ${trimmedWebsite}` : null,
    trimmedEmail ? `Email: ${trimmedEmail}` : null,
  ]
    .filter(Boolean)
    .join("\n\n");

  if (isEmailJsConfigured() && trimmedEmail) {
    try {
      await sendViaEmailJs(trimmedName, trimmedEmail, lines);
      return;
    } catch {
      // Fall through to FormSubmit when EmailJS fails at runtime.
    }
  }

  await sendViaFormSubmit(trimmedName, trimmedEmail || "guestbook@noreply.local", lines, `Guestbook from ${trimmedName}`);
}
