export const METERS_PER_UNIT = 33;

export const CALLOUTS = [
  { id: "home", y: 9.7 },
  { id: "projects", y: 7.4 },
  { id: "journey", y: 5.0 },
  { id: "skills", y: 2.7 },
  { id: "contact", y: 0.4 },
];

export function calloutLabel(index) {
  return `[ ${String(index + 1).padStart(2, "0")} ]`;
}
