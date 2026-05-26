export const contactConfig = {
  recipientEmail: import.meta.env.VITE_CONTACT_RECIPIENT_EMAIL || "thabheloduve@gmail.com",
  bookingUrl: import.meta.env.VITE_BOOKING_URL || "https://calendar.app.google/fB6AtdB5FVSs8YoA9",
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
