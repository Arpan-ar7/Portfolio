// ============================================================
//  A small catalog of real bright stars for the live night sky.
//  ra  = right ascension in hours (0-24)
//  dec = declination in degrees (-90 to 90)
//  mag = brightness (smaller = brighter; Sirius is -1.46)
//  Positions are rounded, which is plenty for drawing on screen.
// ============================================================

export type Star = { name: string; con: string; ra: number; dec: number; mag: number };

export const STARS: Star[] = [
  // The brightest stars in the sky
  { name: "Sirius", con: "Canis Major", ra: 6.752, dec: -16.716, mag: -1.46 },
  { name: "Canopus", con: "Carina", ra: 6.399, dec: -52.696, mag: -0.74 },
  { name: "Rigil Kentaurus", con: "Centaurus", ra: 14.66, dec: -60.834, mag: -0.27 },
  { name: "Arcturus", con: "Boötes", ra: 14.261, dec: 19.182, mag: -0.05 },
  { name: "Vega", con: "Lyra", ra: 18.616, dec: 38.784, mag: 0.03 },
  { name: "Capella", con: "Auriga", ra: 5.278, dec: 45.998, mag: 0.08 },
  { name: "Rigel", con: "Orion", ra: 5.242, dec: -8.202, mag: 0.13 },
  { name: "Procyon", con: "Canis Minor", ra: 7.655, dec: 5.225, mag: 0.34 },
  { name: "Achernar", con: "Eridanus", ra: 1.629, dec: -57.237, mag: 0.46 },
  { name: "Betelgeuse", con: "Orion", ra: 5.919, dec: 7.407, mag: 0.5 },
  { name: "Hadar", con: "Centaurus", ra: 14.064, dec: -60.373, mag: 0.61 },
  { name: "Altair", con: "Aquila", ra: 19.846, dec: 8.868, mag: 0.76 },
  { name: "Acrux", con: "Crux", ra: 12.443, dec: -63.099, mag: 0.77 },
  { name: "Aldebaran", con: "Taurus", ra: 4.599, dec: 16.509, mag: 0.86 },
  { name: "Antares", con: "Scorpius", ra: 16.49, dec: -26.432, mag: 0.96 },
  { name: "Spica", con: "Virgo", ra: 13.42, dec: -11.161, mag: 0.97 },
  { name: "Pollux", con: "Gemini", ra: 7.755, dec: 28.026, mag: 1.14 },
  { name: "Fomalhaut", con: "Piscis Austrinus", ra: 22.961, dec: -29.622, mag: 1.16 },
  { name: "Deneb", con: "Cygnus", ra: 20.69, dec: 45.28, mag: 1.25 },
  { name: "Mimosa", con: "Crux", ra: 12.795, dec: -59.689, mag: 1.25 },
  { name: "Regulus", con: "Leo", ra: 10.14, dec: 11.967, mag: 1.35 },
  { name: "Adhara", con: "Canis Major", ra: 6.977, dec: -28.972, mag: 1.5 },
  { name: "Castor", con: "Gemini", ra: 7.577, dec: 31.888, mag: 1.58 },
  { name: "Shaula", con: "Scorpius", ra: 17.56, dec: -37.104, mag: 1.62 },
  { name: "Gacrux", con: "Crux", ra: 12.519, dec: -57.113, mag: 1.63 },
  { name: "Bellatrix", con: "Orion", ra: 5.419, dec: 6.35, mag: 1.64 },
  { name: "Elnath", con: "Taurus", ra: 5.438, dec: 28.608, mag: 1.65 },
  { name: "Miaplacidus", con: "Carina", ra: 9.22, dec: -69.717, mag: 1.68 },
  { name: "Alnilam", con: "Orion", ra: 5.604, dec: -1.202, mag: 1.69 },
  { name: "Alnitak", con: "Orion", ra: 5.679, dec: -1.943, mag: 1.77 },
  { name: "Alioth", con: "Ursa Major", ra: 12.9, dec: 55.96, mag: 1.77 },
  { name: "Dubhe", con: "Ursa Major", ra: 11.062, dec: 61.751, mag: 1.79 },
  { name: "Mirfak", con: "Perseus", ra: 3.405, dec: 49.861, mag: 1.79 },
  { name: "Wezen", con: "Canis Major", ra: 7.14, dec: -26.393, mag: 1.83 },
  { name: "Kaus Australis", con: "Sagittarius", ra: 18.403, dec: -34.385, mag: 1.85 },
  { name: "Alkaid", con: "Ursa Major", ra: 13.792, dec: 49.313, mag: 1.86 },
  { name: "Sargas", con: "Scorpius", ra: 17.622, dec: -42.998, mag: 1.86 },
  { name: "Menkalinan", con: "Auriga", ra: 5.992, dec: 44.948, mag: 1.9 },
  { name: "Alhena", con: "Gemini", ra: 6.629, dec: 16.399, mag: 1.92 },
  { name: "Polaris", con: "Ursa Minor", ra: 2.53, dec: 89.264, mag: 1.98 },
  { name: "Mirzam", con: "Canis Major", ra: 6.378, dec: -17.956, mag: 1.98 },
  { name: "Alphard", con: "Hydra", ra: 9.46, dec: -8.659, mag: 1.98 },
  { name: "Hamal", con: "Aries", ra: 2.12, dec: 23.462, mag: 2.0 },
  { name: "Nunki", con: "Sagittarius", ra: 18.921, dec: -26.297, mag: 2.05 },
  { name: "Mirach", con: "Andromeda", ra: 1.162, dec: 35.621, mag: 2.05 },
  { name: "Alpheratz", con: "Andromeda", ra: 0.14, dec: 29.091, mag: 2.06 },
  { name: "Algieba", con: "Leo", ra: 10.333, dec: 19.842, mag: 2.08 },
  { name: "Rasalhague", con: "Ophiuchus", ra: 17.582, dec: 12.56, mag: 2.08 },
  { name: "Saiph", con: "Orion", ra: 5.796, dec: -9.67, mag: 2.09 },
  { name: "Algol", con: "Perseus", ra: 3.136, dec: 40.956, mag: 2.12 },
  { name: "Denebola", con: "Leo", ra: 11.818, dec: 14.572, mag: 2.14 },
  { name: "Sadr", con: "Cygnus", ra: 20.37, dec: 40.257, mag: 2.23 },
  { name: "Mintaka", con: "Orion", ra: 5.533, dec: -0.299, mag: 2.23 },
  { name: "Mizar", con: "Ursa Major", ra: 13.399, dec: 54.925, mag: 2.23 },
  { name: "Schedar", con: "Cassiopeia", ra: 0.675, dec: 56.537, mag: 2.24 },
  { name: "Caph", con: "Cassiopeia", ra: 0.153, dec: 59.15, mag: 2.28 },
  { name: "Dschubba", con: "Scorpius", ra: 16.006, dec: -22.622, mag: 2.29 },
  { name: "Larawag", con: "Scorpius", ra: 16.836, dec: -34.293, mag: 2.29 },
  { name: "Merak", con: "Ursa Major", ra: 11.031, dec: 56.382, mag: 2.37 },
  { name: "Enif", con: "Pegasus", ra: 21.736, dec: 9.875, mag: 2.38 },
  { name: "Kappa Scorpii", con: "Scorpius", ra: 17.708, dec: -39.03, mag: 2.39 },
  { name: "Scheat", con: "Pegasus", ra: 23.063, dec: 28.083, mag: 2.42 },
  { name: "Phecda", con: "Ursa Major", ra: 11.897, dec: 53.695, mag: 2.44 },
  { name: "Aludra", con: "Canis Major", ra: 7.401, dec: -29.303, mag: 2.45 },
  { name: "Navi", con: "Cassiopeia", ra: 0.945, dec: 60.717, mag: 2.47 },
  { name: "Markab", con: "Pegasus", ra: 23.079, dec: 15.205, mag: 2.48 },
  { name: "Aljanah", con: "Cygnus", ra: 20.77, dec: 33.97, mag: 2.48 },
  { name: "Zosma", con: "Leo", ra: 11.235, dec: 20.524, mag: 2.56 },
  { name: "Ascella", con: "Sagittarius", ra: 19.044, dec: -29.88, mag: 2.6 },
  { name: "Acrab", con: "Scorpius", ra: 16.091, dec: -19.806, mag: 2.62 },
  { name: "Ruchbah", con: "Cassiopeia", ra: 1.43, dec: 60.235, mag: 2.68 },
  { name: "Lesath", con: "Scorpius", ra: 17.512, dec: -37.296, mag: 2.7 },
  { name: "Kaus Media", con: "Sagittarius", ra: 18.35, dec: -29.828, mag: 2.7 },
  { name: "Tarazed", con: "Aquila", ra: 19.771, dec: 10.613, mag: 2.72 },
  { name: "Imai", con: "Crux", ra: 12.252, dec: -58.749, mag: 2.79 },
  { name: "Kaus Borealis", con: "Sagittarius", ra: 18.466, dec: -25.422, mag: 2.81 },
  { name: "Paikauhale", con: "Scorpius", ra: 16.598, dec: -28.216, mag: 2.82 },
  { name: "Algenib", con: "Pegasus", ra: 0.221, dec: 15.184, mag: 2.83 },
  { name: "Fawaris", con: "Cygnus", ra: 19.75, dec: 45.131, mag: 2.87 },
  { name: "Alcyone", con: "Taurus (Pleiades)", ra: 3.791, dec: 24.105, mag: 2.87 },
  { name: "Alniyat", con: "Scorpius", ra: 16.353, dec: -25.593, mag: 2.89 },
  { name: "Fang", con: "Scorpius", ra: 15.981, dec: -26.114, mag: 2.89 },
  { name: "Ras Algethi", con: "Hercules", ra: 17.244, dec: 14.39, mag: 2.78 },
  { name: "Alnasl", con: "Sagittarius", ra: 18.097, dec: -30.424, mag: 2.98 },
  { name: "Ras Elased", con: "Leo", ra: 9.764, dec: 23.774, mag: 2.98 },
  { name: "Iota Scorpii", con: "Scorpius", ra: 17.793, dec: -40.127, mag: 3.0 },
  { name: "Xamidimura", con: "Scorpius", ra: 16.864, dec: -38.047, mag: 3.0 },
  { name: "Albireo", con: "Cygnus", ra: 19.512, dec: 27.96, mag: 3.08 },
  { name: "Albaldah", con: "Sagittarius", ra: 18.761, dec: -26.991, mag: 3.17 },
  { name: "Sulafat", con: "Lyra", ra: 18.982, dec: 32.69, mag: 3.25 },
  { name: "Chertan", con: "Leo", ra: 11.237, dec: 15.43, mag: 3.33 },
  { name: "Eta Scorpii", con: "Scorpius", ra: 17.202, dec: -43.239, mag: 3.33 },
  { name: "Tau Sagittarii", con: "Sagittarius", ra: 19.116, dec: -27.671, mag: 3.32 },
  { name: "Megrez", con: "Ursa Major", ra: 12.257, dec: 57.033, mag: 3.31 },
  { name: "Segin", con: "Cassiopeia", ra: 1.907, dec: 63.67, mag: 3.37 },
  { name: "Adhafera", con: "Leo", ra: 10.278, dec: 23.417, mag: 3.43 },
  { name: "Sheliak", con: "Lyra", ra: 18.835, dec: 33.363, mag: 3.52 },
  { name: "Zeta Scorpii", con: "Scorpius", ra: 16.91, dec: -42.362, mag: 3.62 },
  { name: "Alshain", con: "Aquila", ra: 19.922, dec: 6.407, mag: 3.71 },
];

// Constellation stick figures, as pairs of star names to join with a line
export const LINES: [string, string][] = [
  // Orion
  ["Betelgeuse", "Bellatrix"], ["Betelgeuse", "Alnitak"], ["Bellatrix", "Mintaka"],
  ["Mintaka", "Alnilam"], ["Alnilam", "Alnitak"], ["Alnitak", "Saiph"], ["Mintaka", "Rigel"],
  // Big Dipper (Ursa Major)
  ["Dubhe", "Merak"], ["Merak", "Phecda"], ["Phecda", "Megrez"], ["Megrez", "Dubhe"],
  ["Megrez", "Alioth"], ["Alioth", "Mizar"], ["Mizar", "Alkaid"],
  // Cassiopeia (the "W")
  ["Caph", "Schedar"], ["Schedar", "Navi"], ["Navi", "Ruchbah"], ["Ruchbah", "Segin"],
  // Scorpius
  ["Acrab", "Dschubba"], ["Dschubba", "Fang"], ["Dschubba", "Alniyat"], ["Alniyat", "Antares"],
  ["Antares", "Paikauhale"], ["Paikauhale", "Larawag"], ["Larawag", "Xamidimura"],
  ["Xamidimura", "Zeta Scorpii"], ["Zeta Scorpii", "Eta Scorpii"], ["Eta Scorpii", "Sargas"],
  ["Sargas", "Iota Scorpii"], ["Iota Scorpii", "Kappa Scorpii"], ["Kappa Scorpii", "Shaula"],
  ["Shaula", "Lesath"],
  // Sagittarius (the "Teapot")
  ["Alnasl", "Kaus Media"], ["Kaus Media", "Kaus Australis"], ["Kaus Australis", "Alnasl"],
  ["Kaus Media", "Kaus Borealis"], ["Kaus Borealis", "Albaldah"], ["Albaldah", "Kaus Media"],
  ["Albaldah", "Nunki"], ["Nunki", "Tau Sagittarii"], ["Tau Sagittarii", "Ascella"],
  ["Ascella", "Albaldah"], ["Ascella", "Kaus Australis"],
  // Crux (Southern Cross)
  ["Acrux", "Gacrux"], ["Mimosa", "Imai"],
  // Cygnus (Northern Cross)
  ["Deneb", "Sadr"], ["Sadr", "Albireo"], ["Fawaris", "Sadr"], ["Sadr", "Aljanah"],
  // Lyra
  ["Vega", "Sheliak"], ["Sheliak", "Sulafat"], ["Sulafat", "Vega"],
  // Aquila
  ["Tarazed", "Altair"], ["Altair", "Alshain"],
  // Leo
  ["Regulus", "Algieba"], ["Algieba", "Adhafera"], ["Adhafera", "Ras Elased"],
  ["Algieba", "Zosma"], ["Zosma", "Denebola"], ["Denebola", "Chertan"], ["Chertan", "Regulus"],
  // Gemini
  ["Castor", "Pollux"], ["Pollux", "Alhena"],
  // Canis Major
  ["Mirzam", "Sirius"], ["Sirius", "Adhara"], ["Adhara", "Wezen"], ["Wezen", "Aludra"],
  // Pegasus (Great Square) + Andromeda
  ["Markab", "Scheat"], ["Scheat", "Alpheratz"], ["Alpheratz", "Algenib"], ["Algenib", "Markab"],
  ["Alpheratz", "Mirach"], ["Markab", "Enif"],
  // Taurus
  ["Aldebaran", "Elnath"],
  // Auriga
  ["Capella", "Menkalinan"],
];
