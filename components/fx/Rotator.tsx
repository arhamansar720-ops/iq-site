"use client";

import RotatingText from "../rb/RotatingText";
import { useReducedMotion } from "./useReducedMotion";

export default function Rotator({ words, className = "" }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{words[0]}</span>;
  return (
    <RotatingText
      texts={words}
      mainClassName={`relative inline-flex overflow-hidden ${className}`}
      splitLevelClassName="overflow-hidden pb-[0.1em]"
      staggerFrom="last"
      staggerDuration={0.02}
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      transition={{ type: "spring", damping: 28, stiffness: 380 }}
      rotationInterval={2200}
    />
  );
}
