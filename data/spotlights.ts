// The two big showcase cards at the top of the Projects section.

// One big "showcase" card at the top of the Projects section (your research, your live app).
export type Spotlight = {
  kind: string; // small label, e.g. "Research"
  status: string; // shown with a green dot, e.g. "In progress"
  title: string;
  description: string;
  stats: { value: string; label: string }[]; // three short facts in a row
  points: string[]; // 3-4 short bullet points
  tags: string[];
  credit?: string; // small line about who it was done with
  teammate?: string; // the name of someone from collaborators.ts you did it with (shown as a link)
  link?: { label: string; href: string }; // the button. Leave it out when there's nothing to link yet.
};

// The showcase cards. The order here is the order on the page.
export const spotlights: Spotlight[] = [
  {
    kind: "Research",
    status: "In progress",
    title: "Does a model really forget? Unlearning in continual learning",
    description:
      "When a model keeps learning new tasks and is also asked to forget old ones, today's tests only check its outputs. I look inside the network instead: a small probe on every block of a ResNet-18, compared with a model that never saw the forgotten data.",
    stats: [
      { value: "5", label: "unlearning methods tested" },
      { value: "2", label: "datasets: CIFAR-100, Tiny-ImageNet" },
      { value: "Every block", label: "of the network is probed" },
    ],
    // Early findings. Update these (and add the paper link below) when the paper is finished.
    points: [
      "Early finding: unlearning is shallow. Most of the forgotten task is removed from the last block, very little from the first",
      "The forgotten task comes back in the last block after the model learns just one new task",
      "Output accuracy and a membership-inference check both say \"forgotten\" while the features still hold it",
    ],
    tags: ["PyTorch", "Continual learning", "Machine unlearning", "Linear probes"],
    credit: "Co-first author · joint work at Marwadi University · paper being written",
    teammate: "Adarsh Milan",
    // link: { label: "Read the paper", href: "..." },  // add this when the paper is out
  },
  {
    kind: "Live product",
    status: "Live on Google Play",
    title: "UniCart",
    description:
      "A campus delivery app where students help each other. Stuck in the hostel? Post what you need and the delivery fee you'll pay. A batchmate who is already outside picks it up and brings it to your block.",
    // Downloads: 300+ (Arpan, 19 Nov 2026). Rating from the Play Store page on 15 Nov 2026. Update them as they grow.
    stats: [
      { value: "300+", label: "downloads" },
      { value: "4.5 ★", label: "rating on Google Play" },
      { value: "Real users", label: "at Marwadi University" },
    ],
    points: [
      "Live feed of requests on campus, which runners accept with one tap",
      "In-app chat to agree on details without sharing phone numbers",
      "The requester sets the delivery fee and pays by UPI or cash",
      "Running at Marwadi University first, built so more campuses can be added",
    ],
    tags: ["Android", "Real-time feed", "In-app chat"],
    credit: "Built with my team · published as 2Hex",
    teammate: "Adarsh Milan",
    link: { label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.hex.uncart" },
  },
];
