"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mb-10 text-center sm:mb-12">
      <Reveal>
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-maroon">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 className="font-display mt-3 text-4xl text-maroon-deep sm:text-5xl">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <Divider className="mt-5" />
      </Reveal>
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-16 bg-gold-soft/70" />
      <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
      <span className="h-px w-16 bg-gold-soft/70" />
    </div>
  );
}
