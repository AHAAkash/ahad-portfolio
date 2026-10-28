# Ahad Hosen Akash | Portfolio

<p align="center">
  <strong>Machine Learning Enthusiast · Aspiring Researcher · Full-Stack Developer</strong>
</p>

<p align="center">
  A modern, responsive personal portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion.
</p>

<p align="center">
  <a href="https://github.com/AHAAkash/ahad-portfolio">GitHub Repository</a> ·
  <a href="https://www.linkedin.com/in/ahad-hosen-akash-63b7162b8/">LinkedIn</a> ·
  <a href="mailto:a.h.aakash215@gmail.com">Email</a>
</p>

---

## About

Hi, I'm **Ahad Hosen Akash**, a Computer Science and Engineering graduate from Bangladesh with interests in Artificial Intelligence, Machine Learning, Natural Language Processing, research, and full-stack development.

This portfolio brings together my academic background, technical skills, research interests, professional experience, and selected projects in one place.

## Features

- **Modern UI** — Clean, professional portfolio design.
- **Responsive Layout** — Optimized for desktop, tablet, and mobile screens.
- **Interactive Animations** — Smooth transitions powered by Framer Motion.
- **Custom Cursor & Particle Effects** — Enhanced visual interactions.
- **About Me** — Personal introduction and professional interests.
- **Skills** — Technical skills and development tools.
- **Research** — Research interests and ongoing work.
- **Projects** — Selected software and AI/ML projects.
- **Experience & Education** — Academic and professional background.
- **Contact Form** — EmailJS integration for sending messages.
- **Resume Access** — Downloadable CV in PDF format.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | UI components |
| Vite 7 | Development server and production build |
| Tailwind CSS v4 | Responsive styling |
| Framer Motion | Animations and transitions |
| JavaScript | Application logic |
| EmailJS | Contact form integration |
| React Icons | Icons and visual elements |

## Getting Started

### Prerequisites

- Node.js **20.19 or newer**
- npm
- Git

Check your installed versions:

```bash
node --version
npm --version
```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AHAAkash/ahad-portfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ahad-portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create your local environment file:

   **Windows PowerShell**

   ```powershell
   Copy-Item .env.template .env
   ```

   **macOS / Linux**

   ```bash
   cp .env.template .env
   ```

5. Configure your EmailJS environment variables in `.env` according to the names defined in `.env.template`.

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open the local URL displayed in your terminal.

## Build for Production

Generate the optimized production build:

```bash
npm run build
```

The generated files will be available in `dist/`.

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
ahad-portfolio/
├── public/
│   ├── avatar.png
│   └── Resume.pdf
├── src/
│   ├── Assets/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── Intro.jsx
│   │   ├── Navbar.jsx
│   │   └── Particles.jsx
│   ├── sections/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Education.jsx
│   │   ├── Experience.jsx
│   │   ├── Footer.jsx
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   ├── Research.jsx
│   │   ├── Skills.jsx
│   │   └── WorkCarousel.jsx
│   ├── App.jsx
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── .env.template
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

*Note: The structure above illustrates the expected organization. The `avatar.png` file is optional unless your application references it.*

## Customization

### Update Portfolio Content

Edit `src/data.js` to update your personal information, projects, skills, education, experience, research, and social links, according to the data structure used by your application.

### Update Your Photo

Add your profile photo to `public/avatar.png` if your components use that path. A transparent PNG can work well with a dark or modern hero design.

### Update Your CV

Place your latest CV at:

```text
public/Resume.pdf
```

Ensure that the download or resume link in your components points to the correct file.

### Configure EmailJS

Set up your EmailJS account and add the required configuration values to `.env`, following `.env.template`.

**Security:** Never commit `.env` or publish private credentials. Environment variables prefixed with `VITE_` are exposed to client-side code in Vite, so only use them for public configuration—not private secrets.

## Deployment

You can deploy this portfolio using platforms such as:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

For Vercel or Netlify, configure:

- **Build command:** `npm run build`
- **Output directory:** `dist`

Set any required environment variables in your hosting provider's project settings before deployment.

## Connect With Me

- **GitHub:** [AHAAkash](https://github.com/AHAAkash)
- **LinkedIn:** [Ahad Hosen Akash](https://www.linkedin.com/in/ahad-hosen-akash-63b7162b8/)
- **Email:** [a.h.aakash215@gmail.com](mailto:a.h.aakash215@gmail.com)

---

<p align="center">
  Built with React and a passion for AI, research, and software development.
</p>
