"use client";

import { motion, motionValue, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import InstrumentCard from "./InstrumentCard";

const CARDS = [
  { label: "Health IQ", score: 84, top: "8%", left: "4%", delay: 0.1, drift: 1 },
  { label: "Driving IQ", score: 92, top: "2%", left: "62%", delay: 0.25, drift: 3 },
  { label: "Spending IQ", score: 79, top: "58%", left: "1%", delay: 0.4, drift: 5 },
  { label: "Commute IQ", score: 88, top: "66%", left: "72%", delay: 0.2, drift: 2 },
  { label: "Life IQ", score: 91, top: "30%", left: "82%", delay: 0.55, drift: 4 },
];

const CARD_W = 156;
const CARD_H = 103;
const RADIUS_EASE = 1.2; // 1/sec — how fast a knocked-off-ring card eases back
const SPEED_RELAX = 0.3; // 1/sec — how fast angular speed relaxes back to baseline

type CardPhysics = {
  x: MotionValue<number>;
  y: MotionValue<number>;
  angle: number;
  angularSpeed: number;
  baseAngularSpeed: number;
  targetRadiusX: number;
  targetRadiusY: number;
  curRadiusX: number;
  curRadiusY: number;
  pressed: boolean;
  naturalLeft: number;
  naturalTop: number;
};

type Anchor = { centerX: number; centerY: number };

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardElRefs = useRef(CARDS.map(() => ({ current: null as HTMLDivElement | null }))).current;
  const physics = useRef<CardPhysics[]>(
    CARDS.map((c, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      const baseAngularSpeed = dir * (0.08 + c.drift * 0.015);
      return {
        x: motionValue(0),
        y: motionValue(0),
        angle: (i / CARDS.length) * Math.PI * 2 + Math.random() * 0.6,
        angularSpeed: baseAngularSpeed,
        baseAngularSpeed,
        targetRadiusX: 0,
        targetRadiusY: 0,
        curRadiusX: 0,
        curRadiusY: 0,
        pressed: false,
        naturalLeft: 0,
        naturalTop: 0,
      };
    })
  ).current;
  const anchor = useRef<Anchor | null>(null);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    let last = performance.now();

    function measure() {
      const container = heroRef.current;
      const text = textRef.current;
      if (!container || !text) return;
      const containerRect = container.getBoundingClientRect();
      const textRect = text.getBoundingClientRect();

      physics.forEach((p, i) => {
        const el = cardElRefs[i].current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        p.naturalLeft = rect.left - p.x.get();
        p.naturalTop = rect.top - p.y.get();
      });

      const centerX = textRect.left + textRect.width / 2;
      const centerY = textRect.top + textRect.height / 2;
      anchor.current = { centerX, centerY };

      // orbit ring clears the text block, and stays within the hero section
      const minRadiusX = textRect.width / 2 + 60;
      const minRadiusY = textRect.height / 2 + 40;
      const maxRadiusX = Math.max(minRadiusX + 20, containerRect.width / 2 - CARD_W / 2 - 16);
      const maxRadiusY = Math.max(minRadiusY + 20, containerRect.height / 2 - CARD_H / 2 - 16);

      physics.forEach((p, i) => {
        const t = (i + 1) / (physics.length + 1); // spreads cards across rings
        const rx = minRadiusX + (maxRadiusX - minRadiusX) * t;
        const ry = minRadiusY + (maxRadiusY - minRadiusY) * t;
        p.targetRadiusX = rx;
        p.targetRadiusY = ry;
        if (p.curRadiusX === 0 && p.curRadiusY === 0) {
          p.curRadiusX = rx;
          p.curRadiusY = ry;
        }
      });
    }

    function tick(now: number) {
      if (cancelled) return;
      const dt = Math.min(now - last, 32) / 1000;
      last = now;
      const a0 = anchor.current;

      if (a0) {
        physics.forEach((p) => {
          if (p.pressed) return;
          p.angle += p.angularSpeed * dt;
          if (p.angle > Math.PI * 2) p.angle -= Math.PI * 2;
          if (p.angle < -Math.PI * 2) p.angle += Math.PI * 2;
          p.curRadiusX += (p.targetRadiusX - p.curRadiusX) * RADIUS_EASE * dt;
          p.curRadiusY += (p.targetRadiusY - p.curRadiusY) * RADIUS_EASE * dt;
          p.angularSpeed += (p.baseAngularSpeed - p.angularSpeed) * SPEED_RELAX * dt;

          const nx = a0.centerX + p.curRadiusX * Math.cos(p.angle) - CARD_W / 2 - p.naturalLeft;
          const ny = a0.centerY + p.curRadiusY * Math.sin(p.angle) - CARD_H / 2 - p.naturalTop;
          p.x.set(nx);
          p.y.set(ny);
        });

        // pairwise collisions — a pressed (dragged) card is a live obstacle
        // for the others but is never itself redirected
        for (let i = 0; i < physics.length; i++) {
          for (let j = i + 1; j < physics.length; j++) {
            const a = physics[i];
            const b = physics[j];
            if (a.pressed && b.pressed) continue;

            const aLeft = a.naturalLeft + a.x.get();
            const aTop = a.naturalTop + a.y.get();
            const bLeft = b.naturalLeft + b.x.get();
            const bTop = b.naturalTop + b.y.get();

            const overlapX = Math.min(aLeft + CARD_W, bLeft + CARD_W) - Math.max(aLeft, bLeft);
            const overlapY = Math.min(aTop + CARD_H, bTop + CARD_H) - Math.max(aTop, bTop);
            if (overlapX <= 0 || overlapY <= 0) continue;

            // Resolve a fraction of the actual pixel overlap every frame
            // (exponential convergence — fast but not an instant snap), then
            // convert that pixel push into an angle delta via each card's
            // own orbit radius (arc length ≈ radius·dθ). Two earlier bugs
            // here: (1) the push magnitude was scaled by dt twice, making it
            // negligible against the cards' own drift, so overlapping cards
            // never actually separated ("fused"); (2) the push *direction*
            // was picked by comparing raw X position — on an ellipse, a
            // given angle change barely moves you in X near the left/right
            // extremes, so that comparison was unreliable and could even
            // point the wrong way. Comparing orbital angle directly (for two
            // orbiting cards) or testing which direction actually increases
            // separation (for a dragged card, which isn't on the orbit
            // formula at all) fixes both.
            const penetration = Math.min(overlapX, overlapY);
            const resolveFrac = Math.min(0.9, 9 * dt); // ~90%+ resolved within a few frames
            const pushPx = penetration * resolveFrac;

            if (!a.pressed && !b.pressed) {
              const aRadius = Math.max(30, (a.curRadiusX + a.curRadiusY) / 2);
              const bRadius = Math.max(30, (b.curRadiusX + b.curRadiusY) / 2);
              let delta = b.angle - a.angle;
              delta = ((delta + Math.PI) % (Math.PI * 2)) - Math.PI; // shortest signed gap, wrapped
              const sign = delta >= 0 ? 1 : -1;
              a.angle -= sign * (pushPx / 2 / aRadius);
              b.angle += sign * (pushPx / 2 / bRadius);
              // ease angular speeds toward each other instead of a hard swap
              const blend = Math.min(1, 3 * dt);
              const avg = (a.angularSpeed + b.angularSpeed) / 2;
              a.angularSpeed += (avg - a.angularSpeed) * blend;
              b.angularSpeed += (avg - b.angularSpeed) * blend;
            } else {
              const moving = a.pressed ? b : a;
              const fixedCenterX = a.pressed ? aLeft + CARD_W / 2 : bLeft + CARD_W / 2;
              const fixedCenterY = a.pressed ? aTop + CARD_H / 2 : bTop + CARD_H / 2;
              const movingRadius = Math.max(30, (moving.curRadiusX + moving.curRadiusY) / 2);
              // test both directions, keep whichever actually increases
              // the distance from the pressed card
              const probe = 0.02;
              const upX = a0.centerX + moving.curRadiusX * Math.cos(moving.angle + probe);
              const upY = a0.centerY + moving.curRadiusY * Math.sin(moving.angle + probe);
              const downX = a0.centerX + moving.curRadiusX * Math.cos(moving.angle - probe);
              const downY = a0.centerY + moving.curRadiusY * Math.sin(moving.angle - probe);
              const distUp = Math.hypot(upX - fixedCenterX, upY - fixedCenterY);
              const distDown = Math.hypot(downX - fixedCenterX, downY - fixedCenterY);
              const movingDir = distUp >= distDown ? 1 : -1;
              moving.angle += movingDir * (pushPx / movingRadius);
              moving.curRadiusX = Math.min(moving.targetRadiusX * 1.3, moving.curRadiusX + pushPx * 0.5);
              moving.curRadiusY = Math.min(moving.targetRadiusY * 1.3, moving.curRadiusY + pushPx * 0.5);
              // a positional-only correction isn't enough here: unlike the
              // free-free case (which also softens both cards' angular
              // speed), a pressed card is a permanent obstacle, so if the
              // moving card's own angular speed keeps driving it forward
              // into the obstacle, it'll re-collide every frame and just
              // slide along it. Redirect its speed away on impact instead.
              if (Math.sign(moving.angularSpeed || 1) !== movingDir) {
                moving.angularSpeed = movingDir * Math.max(Math.abs(moving.angularSpeed), 0.06);
              }
            }
          }
        }
      }

      raf = window.requestAnimationFrame(tick);
    }

    // wait for the entrance animation to settle before measuring/starting
    const id = window.setTimeout(() => {
      measure();
      last = performance.now();
      raf = window.requestAnimationFrame(tick);
    }, 1600);
    window.addEventListener("resize", measure);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
    // physics/cardElRefs are stable refs created once — intentionally omitted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="top" ref={heroRef} className="relative min-h-[100svh] flex items-center overflow-hidden bg-radial-glow">
      {/* ambient particles */}
      <div className="absolute inset-0 noise opacity-40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 28 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-signal/40"
            style={{
              top: `${(i * 13.7) % 100}%`,
              left: `${(i * 29.3) % 100}%`,
              width: i % 5 === 0 ? 3 : 1.5,
              height: i % 5 === 0 ? 3 : 1.5,
              opacity: 0.15 + (i % 4) * 0.08,
              animation: `float ${5 + (i % 6)}s ease-in-out infinite`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* floating instrument cards — desktop only, loosely orbit the hero text and collide with each other.
          z-20 here (not just on the card) is required: a nested element's z-index can't outrank a
          sibling's own stacking context (the z-10 text block below) unless this wrapper establishes
          its own stacking context at a higher level. */}
      <div className="absolute inset-0 z-20 hidden lg:block pointer-events-none">
        {CARDS.map((c, i) => (
          <div key={c.label} className="absolute" style={{ top: c.top, left: c.left }}>
            <InstrumentCard
              label={c.label}
              score={c.score}
              delay={c.delay}
              drift={c.drift}
              draggable
              dragConstraintsRef={heroRef}
              motionX={physics[i].x}
              motionY={physics[i].y}
              cardElRef={cardElRefs[i]}
              onPressChange={(pressed) => {
                physics[i].pressed = pressed;
              }}
              onReleaseVelocity={(vx, vy) => {
                const p = physics[i];
                const a0 = anchor.current;
                if (a0) {
                  const cx = p.naturalLeft + p.x.get() + CARD_W / 2;
                  const cy = p.naturalTop + p.y.get() + CARD_H / 2;
                  const dx = cx - a0.centerX;
                  const dy = cy - a0.centerY;
                  p.angle = Math.atan2(dy, dx);
                  // radiusX and radiusY must share the same underlying
                  // distance (not independent |dx|/|dy|) or the very next
                  // frame's (angle, radius) reconstruction lands somewhere
                  // other than the actual drop point — that mismatch was
                  // the "glitch" on release.
                  const r = Math.min(Math.max(p.targetRadiusX, p.targetRadiusY) * 1.6, Math.max(20, Math.hypot(dx, dy)));
                  p.curRadiusX = r;
                  p.curRadiusY = r;
                }
                const flingSpeed = Math.hypot(vx, vy) * 0.05;
                const dir = vx * Math.sin(p.angle) - vy * Math.cos(p.angle) >= 0 ? 1 : -1;
                p.angularSpeed = dir * Math.min(1.2, Math.max(Math.abs(p.baseAngularSpeed), flingSpeed * 0.01));
              }}
            />
          </div>
        ))}
      </div>

      <div ref={textRef} className="relative z-10 w-full mx-auto max-w-5xl px-6 md:px-10 text-center pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-balance text-[2.25rem] leading-[1.15] sm:text-6xl sm:leading-[1.05] md:text-7xl lg:text-[5.25rem] tracking-tight text-ivory"
        >
          Intelligence for everyday life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22 }}
          className="mt-7 mx-auto max-w-xl text-balance text-base md:text-lg text-mute"
        >
          A family of AI-powered products designed to help you drive smarter, spend smarter,
          live healthier, and make better decisions every day.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center rounded-full bg-ivory text-void text-sm font-medium px-7 py-3.5 hover:bg-signal transition-colors duration-300 w-full sm:w-auto"
          >
            Explore Products
          </a>
          <a
            href="#ecosystem"
            className="inline-flex items-center justify-center rounded-full border border-line text-ivory text-sm font-medium px-7 py-3.5 hover:border-signal/50 hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto"
          >
            View Ecosystem
          </a>
        </motion.div>

        {/* mobile/tablet instrument strip */}
        <div className="lg:hidden mt-14 flex gap-3 overflow-x-auto scrollbar-none pb-2 -mx-6 px-6">
          {CARDS.map((c, i) => (
            <div key={c.label} className="shrink-0">
              <InstrumentCard label={c.label} score={c.score} delay={i * 0.08} drift={i} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none" />
    </section>
  );
}
