import Image from "next/image";
import { profile } from "@/data/site";

// The end of the page: Earth rising from the bottom.
// The dark background has a big curved top edge, like a planet's horizon.
// It starts just behind the bottom of the contact card, so the two overlap and blend.
export default function Footer() {
  return (
    <footer className="relative -mt-24 overflow-hidden rounded-t-[50%_7rem] bg-[#03050d] pt-28 text-white">
      {/* Earth horizon picture, faded at the edges so it melts into the dark */}
      <div className="relative mx-auto h-[45vh] max-w-3xl [mask-image:radial-gradient(ellipse_at_50%_70%,black_40%,transparent_75%)]">
        <Image src="/media/earth-horizon.jpg" alt="Earth's horizon from space" fill sizes="768px" className="object-cover object-bottom" />
      </div>

      <div className="relative mx-auto -mt-24 flex max-w-6xl flex-col items-center gap-3 px-6 pb-10 text-center">
        <p className="font-display text-2xl font-semibold sm:text-3xl">Thanks for visiting my corner of the universe.</p>
        <p className="mt-4 font-mono text-xs text-white/50">© 2026 {profile.name}</p>
      </div>
    </footer>
  );
}
