"use client";

import DecryptedText from "../rb/DecryptedText";
import { useReducedMotion } from "./useReducedMotion";

export default function Decrypt({
  text,
  className = "",
  on = "view",
}: {
  text: string;
  className?: string;
  on?: "view" | "hover" | "inViewHover";
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{text}</span>;
  return (
    <DecryptedText
      text={text}
      animateOn={on}
      sequential
      revealDirection="start"
      speed={40}
      className={className}
      encryptedClassName={`${className} text-signal/70`}
    />
  );
}
