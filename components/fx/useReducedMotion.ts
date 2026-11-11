"use client";

import { useSyncExternalStore } from "react";

export const SIGNAL = "#aebdf2";

const REDUCED = "(prefers-reduced-motion: reduce)";
function subscribeReduced(cb: () => void) {
  const mq = matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduced, () => matchMedia(REDUCED).matches, () => false);
}
