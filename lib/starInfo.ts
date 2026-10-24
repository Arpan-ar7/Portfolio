// ============================================================
//  Extra info for the live night sky: what each constellation is
//  called in English, and short facts about the famous stars.
//  Shown when you hover a star (constellation name) or click one (info card).
// ============================================================

// What each constellation's name means
export const CONSTELLATIONS: Record<string, string> = {
  Andromeda: "The Princess",
  Aquila: "The Eagle",
  Aries: "The Ram",
  Auriga: "The Charioteer",
  "Boötes": "The Herdsman",
  "Canis Major": "The Great Dog",
  "Canis Minor": "The Little Dog",
  Carina: "The Keel",
  Cassiopeia: "The Queen",
  Centaurus: "The Centaur",
  Crux: "The Southern Cross",
  Cygnus: "The Swan",
  Eridanus: "The River",
  Gemini: "The Twins",
  Hercules: "The Strongman",
  Hydra: "The Water Snake",
  Leo: "The Lion",
  Lyra: "The Lyre",
  Ophiuchus: "The Serpent Bearer",
  Orion: "The Hunter",
  Pegasus: "The Winged Horse",
  Perseus: "The Hero",
  "Piscis Austrinus": "The Southern Fish",
  Sagittarius: "The Archer",
  Scorpius: "The Scorpion",
  Taurus: "The Bull",
  "Taurus (Pleiades)": "The Seven Sisters",
  "Ursa Major": "The Great Bear",
  "Ursa Minor": "The Little Bear",
  Virgo: "The Maiden",
};

// Short facts about the best-known stars. Other stars get a simpler line.
export const STAR_FACTS: Record<string, string> = {
  Sirius: "The brightest star in the night sky, only 8.6 light-years away. It has a tiny white-dwarf companion.",
  Canopus: "The second-brightest star in the sky. Spacecraft have used it as a guide star to keep their bearings.",
  "Rigil Kentaurus": "Part of Alpha Centauri, the closest star system to the Sun, about 4.4 light-years away.",
  Arcturus: "An orange giant about 37 light-years away, and the brightest star in the northern half of the sky.",
  Vega: "About 25 light-years away. As Earth slowly wobbles, Vega will become the North Star again in roughly 12,000 years.",
  Capella: "Looks like one star, but it's four: two yellow giants orbiting each other, plus a pair of faint red dwarfs.",
  Rigel: "A blue supergiant marking Orion's foot, tens of thousands of times brighter than the Sun.",
  Procyon: "One of our nearest neighbours at about 11 light-years, with a small white-dwarf companion.",
  Achernar: "One of the flattest stars known: it spins so fast that its middle bulges out.",
  Betelgeuse: "A dying red supergiant. Put in place of the Sun it would reach past Mars, and one day it will explode as a supernova.",
  Altair: "Spins once every 9 hours or so, so fast that it's squashed into a flattened shape.",
  Acrux: "The brightest star of the Southern Cross, which appears on the flags of several countries.",
  Aldebaran: "The glowing orange eye of Taurus the Bull, about 65 light-years away.",
  Antares: "A red supergiant at the heart of the Scorpion. Its name means 'rival of Mars' because of its red colour.",
  Spica: "Really two hot blue stars, orbiting so close together that they pull each other into egg shapes.",
  Pollux: "The brighter of the Gemini twins: an orange giant with a planet orbiting it.",
  Fomalhaut: "Surrounded by a huge ring of dust and debris, photographed by the Hubble and Webb telescopes.",
  Deneb: "One of the most luminous stars we can see with our eyes, even though it's well over a thousand light-years away.",
  Regulus: "The heart of Leo the Lion. It spins so fast it's close to flying apart.",
  Castor: "Looks like one star, but it's actually a family of six stars orbiting each other.",
  Polaris: "The North Star. The whole sky turns around it while it barely moves, so travellers have used it to find north for centuries.",
  Mintaka: "The westernmost star of Orion's Belt. It sits almost exactly on the celestial equator.",
  Alnilam: "The middle star of Orion's Belt: a blue supergiant over a thousand light-years away.",
  Alnitak: "The eastern star of Orion's Belt. The famous Horsehead Nebula sits just next to it.",
  Bellatrix: "Orion's shoulder: a hot blue giant. Its name means 'female warrior'.",
  Algol: "The 'Demon Star'. It dims every 2.87 days, when a fainter companion star passes in front of it.",
  Mizar: "Has a faint partner, Alcor, right next to it. Seeing both was once used as an eyesight test.",
  Albireo: "Through a small telescope it splits into a gold star and a blue star, one of the prettiest sights in the sky.",
  Alcyone: "The brightest star in the Pleiades, the 'Seven Sisters' star cluster.",
  Dubhe: "One of the two 'pointer' stars of the Big Dipper. Follow the line through it to find Polaris.",
  Merak: "The other 'pointer' star of the Big Dipper, lined up with Dubhe toward Polaris.",
};

// Wikipedia page names where the star's name alone isn't the right page
const WIKI_PAGES: Record<string, string> = {
  "Rigil Kentaurus": "Alpha Centauri",
  Navi: "Gamma Cassiopeiae",
  Fang: "Pi Scorpii",
  Larawag: "Epsilon Scorpii",
  Imai: "Delta Crucis",
  Fawaris: "Delta Cygni",
  Aljanah: "Epsilon Cygni",
  Albaldah: "Pi Sagittarii",
  Paikauhale: "Tau Scorpii",
  Alniyat: "Sigma Scorpii",
  Xamidimura: "Mu1 Scorpii",
};

/** A link to the star's Wikipedia page (opens the page directly when the name matches one) */
export function wikiLink(name: string) {
  const page = WIKI_PAGES[name] ?? name;
  return `https://en.wikipedia.org/wiki/Special:Search?go=Go&search=${encodeURIComponent(page)}`;
}

/** How bright a magnitude looks, in plain words */
export function brightnessWords(mag: number) {
  if (mag < 0.5) return "one of the brightest in the sky";
  if (mag < 1.5) return "very bright";
  if (mag < 2.5) return "easy to see";
  return "visible from dark places";
}
