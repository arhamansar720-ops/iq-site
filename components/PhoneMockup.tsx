"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function PhoneMockup({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative rounded-[28px] glass p-5 md:p-7 w-full max-w-[420px] aspect-[4/5] mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <div
        className="relative h-full flex items-center justify-center"
        style={{ perspective: "1600px" }}
      >
        <div className="relative h-full max-h-[480px] aspect-[9/19.5] animate-float">
          <motion.div
            className="relative h-full w-full"
            style={{ transformStyle: "preserve-3d" }}
            initial={{ rotateY: -6, rotateX: 1, opacity: 0 }}
            whileInView={{ rotateY: -24, rotateX: 3, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* side edge — catches the same top-down glow as the page background */}
            <div
              className="absolute top-0 right-0 bottom-0 w-3 rounded-r-[2.6rem]"
              style={{
                background:
                  "linear-gradient(180deg, #d8deff 0%, #aebdf2 10%, #7d8fd9 22%, #232329 55%, #0c0c0e 100%)",
              }}
            />
            {/* front face */}
            <div className="absolute inset-0 rounded-[2.6rem] border-[3px] border-white/15 bg-black shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden">
              <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[34%] h-[3.2%] rounded-full bg-black z-10 ring-1 ring-white/10" />
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 260px"
                priority
              />
              {/* soft top-down light wash, matching the radial-glow behind it */}
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-signal/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
