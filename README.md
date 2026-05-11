# Thabhelo Duve Portfolio

A full-feature personal portfolio built with React, Vite, Tailwind CSS, framer-motion, and typed local content.

## Features

- Editorial homepage with motion, polished typography, and project highlights.
- About, projects, project case studies, blog, guestbook, links, uses, bucket list, contact, attribution, legal, and RSS shell routes.
- Static frontend shells for backend-heavy features that are tracked in GitHub issues: native blog/RSS, guestbook persistence, production contact backend, project content pipeline, and PWA/SEO automation.
- EmailJS contact fallback using environment variables.
- Manifest, robots, and sitemap starter files in `public/`.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS 4
- framer-motion
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
- `/guestbook`
- `/links`
- `/uses`
- `/bucket-list`
- `/contact`
- `/attribution`
- `/legal/terms`
- `/legal/privacy`
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

Run locally:

```bash
npm run dev
```
