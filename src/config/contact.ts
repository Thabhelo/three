export const contactConfig = {
  recipientEmail: import.meta.env.VITE_CONTACT_RECIPIENT_EMAIL || "thabheloduve@gmail.com",
  calLink: import.meta.env.VITE_CALCOM_LINK || "thabheloduve/30min",
  emailJs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  },
} as const;

export function isEmailJsConfigured() {
  const { serviceId, templateId, publicKey } = contactConfig.emailJs;
  return Boolean(
    serviceId &&
      templateId &&
      publicKey &&
      !serviceId.startsWith("your_") &&
      !templateId.startsWith("your_") &&
      !publicKey.startsWith("your_"),
  );
}
