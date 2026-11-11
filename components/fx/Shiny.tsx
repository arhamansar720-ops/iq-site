"use client";

import type { ReactNode } from "react";
import ShinyText from "../rb/ShinyText";
import { useReducedMotion } from "./useReducedMotion";

export default function Shiny({
  children,
  className = "",
  speed = 3,
  color = "#8b8c93",
  shineColor = "#f3f2ee",
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
  color?: string;
  shineColor?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <span className={className}>{children}</span>;
  return (
    <ShinyText color={color} shineColor={shineColor} speed={speed} trigger="view" className={className}>
      {children}
    </ShinyText>
  );
}
