import cegedimLogo from "@/assets/images/journey/cegedim-business-services.svg";
import efreiLogo from "@/assets/images/journey/efrei.svg";
import gustaveEiffelLogo from "@/assets/images/journey/gustave-eiffel.svg";

// Non-text data of each experience / education entry. The texts live in the
// locale files under journey.items[id]. Order here is the display order.
// `home` marks the entries shown in the home "Parcours" section; the CV page
// lists all of them.
export const journey = [
  { id: "cegedim", kind: "work", logo: cegedimLogo, ongoing: true, home: true },
  { id: "efrei", kind: "education", logo: efreiLogo, home: true },
  { id: "presence-verte", kind: "work", home: true },
  { id: "but-mmi", kind: "education", logo: gustaveEiffelLogo, home: true },
  { id: "banque-palatine", kind: "work", home: true },
  { id: "bac", kind: "education", home: false },
];
