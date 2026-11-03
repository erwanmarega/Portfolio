export const METERS_PER_UNIT = 33;

export const CALLOUTS = [
  { id: "home", y: 9.7 },
  { id: "about", y: 8.9 },
  { id: "journey", y: 6.5 },
  { id: "skills", y: 3.8 },
  { id: "tech-watch", y: 2.8 },
  { id: "projects", y: 1.8 },
  { id: "contact", y: 0.4 },
];

export function calloutLabel(index, y) {
  return `[ ${String(index + 1).padStart(2, "0")} — ${Math.round(y * METERS_PER_UNIT)} M ]`;
}
