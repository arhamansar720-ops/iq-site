import Image from "next/image";

export default function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-[28px] glass p-5 md:p-7 w-full max-w-[420px] aspect-[4/5] mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div className="relative h-full flex items-center justify-center">
        <div className="relative h-full max-h-[480px] aspect-[9/19.5] rounded-[2.6rem] border-[3px] border-white/15 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.55)] overflow-hidden">
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[3.2%] rounded-full bg-black z-10 ring-1 ring-white/10" />
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 60vw, 260px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
