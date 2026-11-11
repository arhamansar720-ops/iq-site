"use client";

import BlurText from "../rb/BlurText";
import { useReducedMotion } from "./useReducedMotion";

export default function BlurHeadline({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  return <BlurText text={text} animateBy="words" direction="bottom" delay={90} className={className} />;
}
