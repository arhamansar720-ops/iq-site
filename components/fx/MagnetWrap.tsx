"use client";

import type { ReactNode } from "react";
import Magnet from "../rb/Magnet";
import { useReducedMotion } from "./useReducedMotion";

export default function MagnetWrap({ children, strength = 3, className = "" }: { children: ReactNode; strength?: number; className?: string }) {
  const reduced = useReducedMotion();
  if (reduced) return <>{children}</>;
  return (
    <Magnet padding={50} magnetStrength={strength} maxOffset={10} wrapperClassName={className}>
      {children}
    </Magnet>
  );
}
