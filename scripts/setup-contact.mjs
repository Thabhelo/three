#!/usr/bin/env node

/**
 * Contact + booking setup checklist for thabhelo-portfolio.
 * Run: node scripts/setup-contact.mjs
 */

const recipient = process.env.VITE_CONTACT_RECIPIENT_EMAIL ?? "thabheloduve@gmail.com";
const calLink = process.env.VITE_CALCOM_LINK ?? "thabheloduve/30min";

console.log(`
Contact setup checklist
========================

Recipient inbox: ${recipient}

1) Send Message form
   - Messages are saved to Firestore (contactMessages) and emailed via FormSubmit.
   - On the FIRST real submission, FormSubmit emails ${recipient} an activation link.
     Open that email and click Activate. After that, all form messages deliver normally.
   - Optional: add EmailJS keys to .env to use EmailJS instead of FormSubmit.

2) Book a Call (Cal.com)
   - Sign up at https://cal.com with ${recipient}
   - Connect Google Calendar (same Google account) and enable Google Meet
   - Create a 30-minute event type; set timezone to America/New_York
   - Copy your public slug (e.g. username/30min) into .env:
       VITE_CALCOM_LINK=${calLink}
   - Current slug resolves here: https://cal.com/${calLink}

3) Production (Vercel)
   - Add VITE_CONTACT_RECIPIENT_EMAIL and VITE_CALCOM_LINK to project env vars
   - Redeploy after Cal.com is configured

4) Verify locally
   - npm run dev → /contact → Send Message (check ${recipient})
   - /contact → Book a Call (live Cal.com calendar should load)
`);
