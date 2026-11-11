"use client";

import type { ReactNode } from "react";
import SpotlightCard from "../rb/SpotlightCard";
import { SIGNAL } from "./useReducedMotion";

export default function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <SpotlightCard
      theme="dark"
      spotlightColor={SIGNAL}
      intensity={0.35}
      spotlightSize={320}
      borderGlow={0.8}
      className={className}
      style={{ ["--spotlight-card-surface" as string]: "rgba(255,255,255,0.025)" }}
    >
      {children}
    </SpotlightCard>
  );
}
