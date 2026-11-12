import spotifyImage from "../assets/images/projects/spotify.webp";
import adiImage from "../assets/images/projects/adi.webp";
import hovlyImage from "../assets/images/projects/hovly.webp";
import gitAgentImage from "../assets/images/projects/git-agent.webp";
import postuloImage from "../assets/images/projects/postulo.webp";

export const PROJECT_GROUPS = ["devops", "fullstack", "frontend", "tools"];

export const repoHost = (url) => (url.includes("gitlab.com") ? "GitLab" : "GitHub");

export const projects = [
  {
    id: 2,
    group: "devops",
    title: "Hovly",
    featured: true,
    image: hovlyImage,
    link: "https://hovly-production.up.railway.app/",
    repo: "https://gitlab.com/erwanmarega/hovly",
    tags: ["Nuxt", "TypeScript", "Supabase", "Docker", "CI/CD", "Railway"],
  },
  {
    id: 0,
    group: "fullstack",
    title: "SpotCalendar",
    featured: true,
    image: spotifyImage,
    link: "https://spotcalendar.fr",
    repo: "https://github.com/erwanmarega/spotcalendar",
    tags: ["React", "Node.js", "Spotify API"],
  },
  {
    id: 4,
    group: "fullstack",
    title: "Postulo",
    image: postuloImage,
    link: "https://postulo.fr",
    repo: "https://github.com/erwanmarega/careerly",
    tags: ["Next.js", "NestJS", "Prisma", "Stripe", "Docker"],
  },
  {
    id: 3,
    group: "frontend",
    title: "ADI",
    image: adiImage,
    link: "https://adi-soci-t.vercel.app/",
    repo: "https://github.com/erwanmarega/adi-soci-t-",
    tags: ["Vue.js", "TypeScript", "Tailwind"],
  },
  {
    id: 1,
    group: "tools",
    title: "Git Agent",
    image: gitAgentImage,
    link: "https://git-agent-steel.vercel.app/",
    repo: "https://github.com/erwanmarega/git-agent",
    tags: ["TypeScript", "CLI", "Claude API"],
  },
];
