export default {
  meta: {
    description:
      "Portfolio of Erwan Marega, full-stack web developer in Paris: Vue.js, product sense and shipped projects.",
    titles: {
      home: "Erwan Marega | Full-Stack Web Developer Portfolio",
      now: "Now — Erwan Marega",
      cv: "Résumé — Erwan Marega",
    },
  },
  nav: {
    ariaLabel: "Main navigation",
    breadcrumb: "Breadcrumb",
    home: "Home",
    sections: {
      home: "About",
      projects: "Projects",
      journey: "Background",
      skills: "Stack",
      contact: "Contact",
    },
    pages: { now: "Now", cv: "Résumé" },
  },
  sidebar: {
    role: "Full-stack web developer",
    location: "Paris · Apprentice at Cegedim",
    cv: "Résumé",
    newTab: "(new tab)",
    languageLabel: "Language",
  },
  intro: {
    role: "Full-stack web developer",
    skip: "Skip intro",
  },
  home: {
    title: "About",
    p1: "With AI, writing code is no longer the hard part. What interests me is everything else: choosing what to build, polishing the interface and getting it shipped.",
    p2: "Trained in design and UX as much as in code, I build with Vue.js at Cegedim Business Services as an apprentice, and I ship my own products on the side, such as SpotCalendar, Postulo and Git Agent.",
  },
  projects: {
    title: "Projects",
    newTab: "(new tab)",
    alt: "Screenshot of the {title} project",
    code: "Source code",
    groups: {
      devops: "DevOps",
      fullstack: "Full-stack",
      frontend: "Front-end",
      tools: "Tools & AI",
    },
    items: {
      0: {
        description:
          "Track music releases through a modern interface connected to the Spotify API.",
        category: "Web App",
      },
      1: {
        description:
          "CLI assistant that writes commit messages and branch names, and plugs into Jira and GitHub.",
        category: "Tool",
      },
      2: {
        description: "Build your real-estate dashboard in under a minute.",
        category: "SaaS",
      },
      3: {
        description:
          "Full redesign of the website of ADI, a company specialised in property fit-out.",
        category: "Redesign",
      },
      4: {
        description:
          "Connects your students to your dashboard. For apprenticeship centres and schools whose students are looking for a work-study placement.",
        category: "SaaS",
      },
    },
  },
  journey: {
    title: "Background",
    ongoing: "Ongoing",
    items: {
      cegedim: {
        years: "2025 – 2027",
        title: "Software Engineer — Apprenticeship",
        institution: "Cegedim Business Services",
        description:
          "Teams RH, Cegedim's HR information system (payroll, time tracking, HR portal), used by companies ranging from a handful of employees to tens of thousands.",
        tasks: [
          "Building front-end features in Vue.js, consuming APIs with Axios",
          "Migrating from the Options API to the Composition API, and components of the in-house UI library",
          "Unit testing with Vitest, bug analysis and fixing",
          "Automated integration and deployment with GitLab CI/CD",
          "Agile ceremonies (daily stand-ups, demos) and story point estimation",
        ],
        tools:
          "Vue.js · Vitest · Axios · GitLab CI/CD · Cursor (a fast model to execute, a stronger one to analyse)",
      },
      efrei: {
        years: "2025 – 2027",
        title: "Mastère Dev Manager Full Stack (master's level)",
        institution: "Efrei",
        place: "Villejuif",
        description:
          "Software architecture, back-end and project management, alternating with my work at Cegedim.",
      },
      "presence-verte": {
        years: "2024 – 2025",
        title: "Web Communication Assistant — Apprenticeship",
        institution: "Présence Verte",
        tasks: [
          "Redesign of the website and the intranet (React, Vue.js, Node.js, WordPress)",
          "Web project management and Figma mock-ups, in line with UX/UI requirements",
        ],
        tools: "React · Vue.js · Node.js · Figma · WordPress",
      },
      "but-mmi": {
        years: "2022 – 2025",
        title: "BUT MMI (bachelor's in multimedia and web)",
        institution: "Université Gustave Eiffel",
        place: "Meaux",
        description:
          "Design, UX/UI and web development. This is where I learned to think about the interface before the code.",
      },
      "banque-palatine": {
        years: "2023",
        title: "IT Department Internship",
        institution: "Banque Palatine",
        description:
          "Two months in the IT department: introduction to Java, API development and search engine optimisation (SEO).",
      },
      bac: {
        years: "2022",
        title: "Baccalauréat Technologique STI2D (high-school diploma, engineering track)",
        institution: "Lycée Pierre de Coubertin",
        place: "Meaux",
      },
    },
  },
  skills: {
    title: "Stack",
    groups: ["Front-End", "Back-End & Data", "Tools & AI"],
  },
  contact: {
    title: "Contact",
    text: "An opportunity, a project or a question? Write to me, I reply quickly.",
  },
  now: {
    title: "Now",
    intro: "What I'm busy with these days.",
    updatedLabel: "Updated:",
    updated: "November 2026",
    rows: [
      {
        label: "Work",
        text: "Software engineering apprentice at Cegedim Business Services, on the front-end of Teams RH (HR information system: payroll, time tracking, HR portal). Right now: Composition API migrations and unit tests.",
      },
      { label: "Studies", text: "Mastère Dev Manager Full Stack at Efrei (2025 – 2027)." },
      { label: "On the side", text: "A simplified database, built with Rust and Astro." },
      {
        label: "Learning",
        text: "Astro on the front-end, and Terraform on the DevOps side.",
      },
      {
        label: "Looking for",
        text: "To be completed: what I'm looking for (full-time role, freelance, meeting people…).",
        placeholder: true,
      },
    ],
  },
  cv: {
    print: "Download as PDF",
    sections: {
      profile: "Profile",
      experience: "Experience",
      education: "Education",
      skills: "Skills",
      projects: "Projects",
      more: "Languages & more",
    },
    profile:
      "Full-stack web developer, apprentice at Cegedim Business Services (September 2025 – July 2027) alongside a Mastère Dev Manager Full Stack at Efrei. Trained in design and UX as much as in code.",
    skills: [
      { label: "Front-End", text: "JavaScript, TypeScript, Vue.js, React, Angular, Tailwind CSS" },
      { label: "Back-End", text: "Node.js, PHP, Java, MySQL" },
      {
        label: "Tools & methods",
        text: "Figma, WordPress, Git, GitLab CI/CD, Vitest, project management, UX/UI",
      },
      { label: "AI", text: "Claude, Cursor, Kimi" },
    ],
    more: [
      { label: "Languages", text: "French (native), English (B2)" },
      { label: "Strengths", text: "Team spirit, curiosity, autonomy, problem solving" },
      { label: "Driving licence", text: "Category B, own vehicle" },
    ],
  },
  footer: {
    newTab: "(new tab)",
  },
};
