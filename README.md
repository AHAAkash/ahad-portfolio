# Ahad Hosen Akash | Personal Portfolio

A modern, responsive personal portfolio showcasing my work in **Machine Learning, Artificial Intelligence, research, and full-stack development**.

🌐 **Live Website:** [Add your deployed website URL here]

## About Me

Hi, I'm **Ahad Hosen Akash**, a Computer Science and Engineering graduate from Bangladesh with a strong interest in Machine Learning, Natural Language Processing, AI research, and software engineering.

I build intelligent applications, explore research problems, and develop full-stack products that solve real-world challenges.

- 🎓 B.Sc. in Computer Science and Engineering
- 🤖 Interested in Machine Learning, NLP, and Graph Machine Learning
- 💻 Full-stack and mobile application developer
- 🔬 Exploring research opportunities and graduate studies
- 🚀 Machine Learning Intern at FlyRank AI

## Features

- **Interactive Hero Section** — Introduction, professional roles, and navigation.
- **About Me** — Academic background, research interests, and career goals.
- **Technical Skills** — Programming, AI/ML, and software development skills.
- **Research Portfolio** — Research topics, methods, and selected results.
- **Featured Projects** — Links to selected AI, web, and mobile applications.
- **Experience & Education** — Professional experience and academic history.
- **Contact Section** — Contact form powered by EmailJS.
- **Motion Effects** — Smooth animations and interactive UI elements.
- **Responsive Design** — Adaptable layouts for desktop and mobile devices.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| Vite | Development server and build tool |
| Tailwind CSS v4 | Styling and responsive layouts |
| Framer Motion | Animations and transitions |
| React Icons | Interface icons |
| EmailJS | Contact form integration |
| JavaScript (ES Modules) | Application logic |

## Featured Projects

- **Bangladesh Mess Management System** — Shared household management for meals, expenses, and payments.
- **Krishi Bondhu** — Multi-agent AI assistance for Bangladeshi farmers.
- **MonBondhu** — Bilingual, offline-first mental health companion.
- **My ChatGPT** — Conversational AI assistant.

Visit my [GitHub profile](https://github.com/AHAAkash) to explore more projects.

## Getting Started

### Prerequisites

- Node.js 20.19 or newer
- npm
- Git

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

4. Configure environment variables by copying `.env.template` to `.env` and updating the EmailJS settings as needed.

   On Windows PowerShell:

   ```powershell
   Copy-Item .env.template .env
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in your terminal.

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

The generated website files are placed in the `dist/` directory.

## Project Structure

```text
ahad-portfolio/
├── public/
│   └── Resume.pdf
├── src/
│   ├── Assets/
│   ├── components/
│   │   ├── Cursor.jsx
│   │   ├── Intro.jsx
│   │   ├── Navbar.jsx
│   │   └── Particles.jsx
│   ├── sections/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Research.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Education.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── data.js
│   └── main.jsx
├── .env.template
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

## Customization

- Update profile information, projects, research, experience, education, and social links in `src/data.js`.
- Modify individual sections in `src/sections/`.
- Customize animations and shared UI elements in `src/components/`.
- Update styles in `src/index.css` and the relevant component files.
- Replace `public/Resume.pdf` with the latest CV.

## Deployment

This project can be deployed using:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [GitHub Pages](https://pages.github.com/)

For Vercel or Netlify, use `npm run build` as the build command and `dist` as the output directory. Configure the required environment variables in the deployment settings.

## Contact

- **GitHub:** [AHAAkash](https://github.com/AHAAkash)
- **LinkedIn:** [Ahad Hosen Akash](https://www.linkedin.com/in/ahad-hosen-akash/)
- **Email:** a.h.aakash215@gmail.com
- **ORCID:** [0009-0006-5897-5179](https://orcid.org/0009-0006-5897-5179)

---

*Designed and developed by Ahad Hosen Akash.*
