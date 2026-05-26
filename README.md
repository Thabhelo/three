# Thabhelo Duve Portfolio

A cinematic personal portfolio for Thabhelo Duve, built with React, Vite, Tailwind CSS, framer-motion, COBE, and typed local content.

## Features

- Editorial homepage with motion, polished typography, and project highlights.
- Cinematic hero, glass navigation, bottom-up command palette, animated bento cards, COBE globe, tech marquees, and cursor-follow interactions.
- About, projects, project case studies, blog, gallery, guestbook, links, contact, privacy, and RSS shell routes.
- Data-driven content modules for profile, projects, experience, blog posts, tools, testimonials, links, and navigation.
- Real GitHub contribution/stat loading with graceful failure states.
- Curated local media assets with Pexels attribution stored in `public/media/pexels-manifest.json`.
- Static frontend shells for backend-heavy features that are tracked in GitHub issues: native blog/RSS, guestbook persistence, production contact backend, project content pipeline, and PWA/SEO automation.
- EmailJS contact fallback using environment variables.
- Manifest, robots, and sitemap starter files in `public/`.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- framer-motion
- COBE
- lucide-react
- wouter
- EmailJS

## Routes

- `/`
- `/about`
- `/projects`
- `/projects/:slug`
- `/blog`
- `/blog/:slug`
- `/gallery`
- `/guestbook`
- `/links`
- `/contact`
- `/legal/privacy`
- `/privacy`
- `/rss`
- `/dreamsprint`

## Quick Start

Follow these steps to set up the project locally on your machine.

Prerequisites:

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

Clone the repository:

```bash
git clone git@github.com:Thabhelo/three.git
cd three
```

Install dependencies:

Install the project dependencies using npm:

```bash
npm install
```

Set up environment variables:

Create a new file named `.env` in the root of your project and add the following content:

```env
# EmailJS Configuration for Contact Form
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_RECIPIENT_EMAIL=your_email@domain.com
```

Copy `.env.example` to `.env` and fill in the EmailJS values if you want the contact form to send mail.

Optional media refresh:

```bash
PEXELS_API_KEY=your_pexels_api_key node scripts/fetch-pexels-media.mjs
```

The Pexels key is used only by the local fetch script and should never be exposed as a `VITE_` variable or committed with a real value.

Run locally:

```bash
npm run dev
```
