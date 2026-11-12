import spotifyImage from "../assets/images/projects/spotify.webp";
import adiImage from "../assets/images/projects/adi.webp";
import hovlyImage from "../assets/images/projects/hovly.webp";
import gitAgentImage from "../assets/images/projects/git-agent.webp";
import postuloImage from "../assets/images/projects/postulo.webp";

// Non-text project data, shared by the home section and the CV page. Texts come
// from the locale messages (projects.items), matched by id. Tags are the real
// stack of each repository.
// `group` is one of PROJECT_GROUPS; the array order is the display order
// (projects of a group are kept together).
export const PROJECT_GROUPS = ["devops", "fullstack", "frontend", "tools"];

export const projects = [
  {
    id: 2,
    group: "devops",
    title: "Hovly",
    image: hovlyImage,
    link: "https://hovly-production.up.railway.app/",
    repo: "https://gitlab.com/erwanmarega/hovly",
    tags: ["Nuxt", "TypeScript", "Supabase", "Docker", "CI/CD", "Railway"],
  },
  {
    id: 0,
    group: "fullstack",
    title: "SpotCalendar",
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
