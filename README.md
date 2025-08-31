## Blog (Markdown + KaTeX)

Storage-only posts in Supabase:

1. In Supabase project (same as DreamSprint), run the migration to create the bucket and policies:

```
-- SQL in supabase/migrations/20250831_add_blog_md_bucket.sql
```

Or apply manually:

```
insert into storage.buckets (id, name, public)
values ('blog-md', 'blog-md', true)
on conflict (id) do nothing;
-- policies are in the migration file
```

2. Create folder `posts/` inside bucket `blog-md` (optional; the app writes to `posts/slug.md`).

3. Set env vars:

```
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Routes:
- `/blog` list posts
- `/blog/new` editor (requires auth to publish)
- `/blog/:slug` view

<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Three_JS-black?style=for-the-badge&logoColor=white&logo=threedotjs&color=000000" alt="three.js" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>
  
<hr />

  <h3 align="center"> This is my Developer Portfolio made with ReactJS and ThreeJS</h3>
</div>

## <a name="introduction">🤖 Introduction</a>

I developed this project on my journey to learn threeJS to boost my frontend dev skills. It has been a great experience to craft immersive web experiences, mastering 3D libraries, and implementing engaging animations. The combination of creativity and technical skills showcased in this project may help you too to enhance your future projects and captivate users with awesome 3d designs.

## <a name="tech-stack">⚙️ Tech Stack</a>

- React.js
- Three.js
- React Three Fiber
- React Three Drei
- Email JS
- Vite
- Tailwind CSS

## <a name="features">🔋 Features</a>

-  **Customizable 3D Hero Section**: Includes a 3D desktop model easily customizable to suit specific needs.

-  **Interactive Experience and Work Sections**: Utilizes animations powered by framer motion for engaging user experience.

-  **3D Skills Section**: Showcases skills using 3D geometries through three.js and React Three fiber

-  **Animated Projects and Testimonials**: Features animated sections using framer motion for projects and client testimonials.

-  **Contact Section with 3D Earth Model**:Integrates a 3D earth model with email functionality powered by emailjs.

-  **3D Stars**: Generate stars progressively at random positions using Three.js for background display.

-  **Consistent Animations**: Implements cohesive animations throughout the website using framer motion.

-  **Responsive Design**: Ensures optimal display and functionality across all devices.

and many more, including code architecture and reusability 

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone git@github.com:Thabhelo/three.git
cd three
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env` in the root of your project and add the following content:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# EmailJS Configuration for Contact Form
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_RECIPIENT_EMAIL=your_email@domain.com
```

Replace the placeholder values with your actual credentials:
- **Supabase**: Get these from your [Supabase project settings](https://supabase.com/)
- **EmailJS**: Get these from your [EmailJS dashboard](https://www.emailjs.com/)

You can also copy the `.env.example` file and rename it to `.env`, then fill in your actual values.

**Running the Project**

```bash
npm run dev
```
<h3>Be sure to drop me a message in the contact page of my website</h3>
