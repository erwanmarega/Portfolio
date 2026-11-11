export default {
  meta: {
    description:
      "Portfolio d'Erwan Marega, développeur web full stack à Paris : Vue.js, sens du produit et projets livrés.",
    titles: {
      home: "Erwan Marega | Portfolio Développeur Web Full Stack",
      now: "En ce moment — Erwan Marega",
      cv: "CV — Erwan Marega",
    },
  },
  nav: {
    ariaLabel: "Navigation principale",
    breadcrumb: "Fil d'Ariane",
    home: "Accueil",
    sections: {
      home: "À propos",
      projects: "Projets",
      journey: "Parcours",
      skills: "Stack",
      contact: "Contact",
    },
    pages: { now: "En ce moment", cv: "CV" },
  },
  sidebar: {
    role: "Développeur web fullstack",
    location: "Paris · Alternance chez Cegedim",
    cv: "CV",
    newTab: "(nouvel onglet)",
    languageLabel: "Langue",
  },
  intro: {
    role: "Développeur web fullstack",
    skip: "Passer l'intro",
  },
  home: {
    title: "À propos",
    p1: "Avec l'IA, écrire du code n'est plus la partie difficile. Ce qui m'intéresse, c'est le reste : choisir quoi construire, soigner l'interface et aller jusqu'à la mise en ligne.",
    p2: "Formé au design et à l'UX autant qu'au code, je développe en Vue.js chez Cegedim Business Services en alternance, et je sors mes propres produits à côté, comme SpotCalendar, Postulo ou Git Agent.",
  },
  projects: {
    title: "Projets",
    newTab: "(nouvel onglet)",
    alt: "Capture d'écran du projet {title}",
    code: "Code source",
    groups: {
      devops: "DevOps",
      fullstack: "Full-stack",
      frontend: "Front-end",
      tools: "Outils & IA",
    },
    items: {
      0: {
        description:
          "Suivi des sorties musicales avec une interface moderne connectée à l'API Spotify.",
        category: "Web App",
      },
      1: {
        description:
          "Assistant CLI qui génère messages de commit, noms de branches, et s'intègre à Jira et GitHub.",
        category: "Outil",
      },
      2: {
        description: "Crée ton tableau de bord immobilier en moins d'une minute.",
        category: "SaaS",
      },
      3: {
        description:
          "Refonte complète du site de la société ADI, spécialisée dans l'agencement immobilier.",
        category: "Refonte",
      },
      4: {
        description:
          "Connecte vos étudiants à votre tableau de bord. Pour les CFA et écoles en recherche d'alternance.",
        category: "SaaS",
      },
    },
  },
  journey: {
    title: "Parcours",
    ongoing: "En cours",
    items: {
      cegedim: {
        years: "2025 – 2027",
        title: "Ingénieur Développement — Alternance",
        institution: "Cegedim Business Services",
        description:
          "Teams RH, le SIRH de Cegedim (paie, temps de travail, portail RH), utilisé par des entreprises de quelques salariés à plusieurs dizaines de milliers.",
        tasks: [
          "Développement de fonctionnalités front-end en Vue.js, consommation d'API via Axios",
          "Migration de l'Options API vers la Composition API et des composants de la bibliothèque UI interne",
          "Tests unitaires avec Vitest, analyse et correction de bugs",
          "Intégration et déploiement automatisés via GitLab CI/CD",
          "Cérémonies agiles (daily, démos) et estimation en story points",
        ],
        tools:
          "Vue.js · Vitest · Axios · GitLab CI/CD · Cursor (un modèle rapide pour exécuter, un plus poussé pour analyser)",
      },
      efrei: {
        years: "2025 – 2027",
        title: "Mastère Dev Manager Full Stack",
        institution: "Efrei",
        place: "Villejuif",
        description:
          "Architecture logicielle, back-end et gestion de projet, en alternance avec Cegedim.",
      },
      "presence-verte": {
        years: "2024 – 2025",
        title: "Assistant Communication Web — Alternance",
        institution: "Présence Verte",
        tasks: [
          "Refonte du site web et de l'intranet (React, Vue.js, Node.js, WordPress)",
          "Gestion de projet web et maquettes Figma, dans le respect des exigences UX/UI",
        ],
        tools: "React · Vue.js · Node.js · Figma · WordPress",
      },
      "but-mmi": {
        years: "2022 – 2025",
        title: "BUT MMI",
        institution: "Université Gustave Eiffel",
        place: "Meaux",
        description:
          "Design, UX/UI et développement web. C'est là que j'ai appris à penser l'interface avant le code.",
      },
      "banque-palatine": {
        years: "2023",
        title: "Stage découverte DSI",
        institution: "Banque Palatine",
        description:
          "Deux mois au sein de la DSI : découverte de Java, développement d'API et optimisation du référencement (SEO).",
      },
      bac: {
        years: "2022",
        title: "Baccalauréat Technologique STI2D",
        institution: "Lycée Pierre de Coubertin",
        place: "Meaux",
      },
    },
  },
  skills: {
    title: "Stack",
    groups: ["Front-End", "Back-End & Data", "Outils & IA"],
  },
  contact: {
    title: "Contact",
    text: "Une opportunité, un projet ou une question ? Écris-moi, je réponds rapidement.",
  },
  now: {
    title: "En ce moment",
    intro: "Ce qui m'occupe ces temps-ci.",
    updatedLabel: "Mis à jour :",
    updated: "Novembre 2026",
    rows: [
      {
        label: "Travail",
        text: "Ingénieur développement en alternance chez Cegedim Business Services, sur le front-end de Teams RH (SIRH : paie, temps de travail, portail RH). En ce moment : migrations vers la Composition API et tests unitaires.",
      },
      { label: "Études", text: "Mastère Dev Manager Full Stack à l'Efrei (2025 – 2027)." },
      { label: "À côté", text: "Une base de données simplifiée, en Rust et Astro." },
      {
        label: "J'apprends",
        text: "Astro pour le front, et Terraform côté DevOps.",
      },
      {
        label: "Je cherche",
        text: "À compléter : ce que tu recherches (CDI, freelance, rencontres…).",
        placeholder: true,
      },
    ],
  },
  cv: {
    title: "CV",
    print: "Télécharger en PDF",
    sections: {
      profile: "Profil",
      experience: "Expériences",
      education: "Formation",
      skills: "Compétences",
      projects: "Projets",
      more: "Langues et autres",
    },
    profile:
      "Développeur web fullstack, en alternance chez Cegedim Business Services (septembre 2025 – juillet 2027) en parallèle d'un Mastère Dev Manager Full Stack à l'Efrei. Formé au design et à l'UX autant qu'au code.",
    skills: [
      { label: "Front-End", text: "JavaScript, TypeScript, Vue.js, React, Angular, Tailwind CSS" },
      { label: "Back-End", text: "Node.js, PHP, Java, MySQL" },
      {
        label: "Outils et méthodes",
        text: "Figma, WordPress, Git, GitLab CI/CD, Vitest, gestion de projet, UX/UI",
      },
      { label: "IA", text: "Claude, Cursor, Kimi" },
    ],
    more: [
      { label: "Langues", text: "Français (langue maternelle), anglais (B2)" },
      { label: "Atouts", text: "Esprit d'équipe, curiosité, autonomie, résolution de problèmes" },
      { label: "Permis", text: "Permis B, véhiculé" },
    ],
  },
  footer: {
    newTab: "(nouvel onglet)",
  },
};
