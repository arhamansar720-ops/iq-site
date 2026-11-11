"use client";

import type { ReactNode } from "react";
import ClickSpark from "../rb/ClickSpark";
import { useReducedMotion, SIGNAL } from "./useReducedMotion";

export default function Sparks({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <ClickSpark
      disabled={reduced}
      sparkColor={[SIGNAL, "#f3f2ee", "#7d8fd9"]}
      sparkSize={9}
      sparkRadius={22}
      sparkCount={9}
      duration={460}
      className="!h-auto"
    >
      {children}
    </ClickSpark>
  );
}
