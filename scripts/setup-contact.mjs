#!/usr/bin/env node

/**
 * Contact + booking setup checklist for thabhelo-portfolio.
 * Run: node scripts/setup-contact.mjs
 */

const recipient = process.env.VITE_CONTACT_RECIPIENT_EMAIL ?? "thabheloduve@gmail.com";
const bookingUrl = process.env.VITE_BOOKING_URL ?? "https://calendar.app.google/fB6AtdB5FVSs8YoA9";

console.log(`
Contact setup checklist
========================

Recipient inbox: ${recipient}

1) Send Message form
   - Messages are saved to Firestore (contactMessages) and emailed via FormSubmit.
   - On the FIRST real submission, FormSubmit emails ${recipient} an activation link.
     Open that email and click Activate. After that, all form messages deliver normally.
   - Optional: add EmailJS keys to .env to use EmailJS instead of FormSubmit.

2) Book a Call (Google Calendar)
   - Use your Google Calendar appointment page URL in .env:
       VITE_BOOKING_URL=${bookingUrl}
   - Share link: ${bookingUrl}

3) Production (Vercel)
   - Add VITE_CONTACT_RECIPIENT_EMAIL and VITE_BOOKING_URL to project env vars
   - Redeploy after updating env

4) Verify locally
   - npm run dev → /contact → Send Message (check ${recipient})
   - /contact → Book a Call (Google Calendar scheduling page should load)
`);
