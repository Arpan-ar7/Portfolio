import Image from "next/image";

// The black hole picture behind the contact content, darkened so white text stays readable.
export default function BlackHoleBackdrop({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 ${className}`}>
      <Image src="/media/blackhole.jpg" alt="" fill sizes="100vw" className="object-cover object-right opacity-80" />
      {/* Dark fade on the left where the big text sits */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/10" />
    </div>
  );
}
