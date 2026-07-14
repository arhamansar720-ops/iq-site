"use client";

import { motion, useInView, animate, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState, type RefObject } from "react";

type Props = {
  label: string;
  score: number;
  delay?: number;
  className?: string;
  drift?: number;
  draggable?: boolean;
  dragConstraintsRef?: RefObject<HTMLElement | null>;
  // when provided (desktop hero usage), position is fully owned by the
  // parent's shared physics loop (bounce + inter-card collisions) instead
  // of this component animating itself.
  motionX?: MotionValue<number>;
  motionY?: MotionValue<number>;
  cardElRef?: RefObject<HTMLDivElement>;
  onPressChange?: (pressed: boolean) => void;
  onReleaseVelocity?: (vx: number, vy: number) => void;
};

export default function InstrumentCard({
  label,
  score,
  delay = 0,
  className = "",
  drift = 6,
  draggable = false,
  dragConstraintsRef,
  motionX,
  motionY,
  cardElRef,
  onPressChange,
  onReleaseVelocity,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const localCardRef = useRef<HTMLDivElement>(null);
  const cardRef = cardElRef ?? localCardRef;
  const inView = useInView(wrapRef, { once: true, margin: "-10%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, score, {
      duration: 1.4,
      delay: delay + 0.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, score, delay]);

  const externallyDriven = draggable && !!motionX && !!motionY;

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      <motion.div
        ref={cardRef}
        style={externallyDriven ? { x: motionX, y: motionY, zIndex: 20 } : undefined}
        animate={externallyDriven ? undefined : { y: [0, -14, 0] }}
        transition={
          externallyDriven
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: drift * 0.15 }
        }
        drag={draggable}
        dragConstraints={dragConstraintsRef}
        dragElastic={0.15}
        dragMomentum={false}
        onPointerDown={() => onPressChange?.(true)}
        onPointerUp={() => onPressChange?.(false)}
        onPointerCancel={() => onPressChange?.(false)}
        onDragEnd={(_, info) => {
          onPressChange?.(false);
          onReleaseVelocity?.(info.velocity.x, info.velocity.y);
        }}
        whileDrag={{ scale: 1.08, boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
        whileHover={draggable ? { scale: 1.03 } : undefined}
        className={`relative w-[156px] rounded-2xl glass px-4 py-3.5 overflow-hidden ${
          draggable ? "cursor-grab active:cursor-grabbing pointer-events-auto" : ""
        }`}
      >
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent via-signal/10 to-transparent animate-scan" />
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] uppercase tracking-[0.12em] text-mute">{label}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulseDot" />
        </div>
        <div className="font-mono text-3xl tabular-nums text-ivory">{display}</div>
        <div className="mt-2 h-1 w-full rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-signal2 to-signal"
            style={{ width: inView ? `${score}%` : "0%", transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)", transitionDelay: `${delay + 0.3}s` }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
