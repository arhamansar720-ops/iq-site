"use client";

import ScrollVelocity from "../rb/ScrollVelocity";
import { useReducedMotion } from "./useReducedMotion";

export default function VelocityMarquee({ texts }: { texts: string[] }) {
  const reduced = useReducedMotion();
  if (reduced) {
    return <p className="px-6 text-center font-display text-3xl text-ivory/80">{texts.join(" · ")}</p>;
  }
  return (
    <ScrollVelocity
      texts={texts}
      velocity={40}
      fontSize="clamp(34px, 5vw, 68px)"
      fontWeight={500}
      gap={28}
      separator={<span className="mx-5 inline-block text-signal">✦</span>}
      outlineAlternate
      fadeEdges
      draggable
      className="font-display tracking-tight text-ivory"
    />
  );
}
