"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/config";
import { RingsIcon } from "./Icons";

export default function Cover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${wedding.assets.backdrop})` }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: "easeInOut" } }}
    >
      {/* Mandala crown */}
      <motion.div
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="pointer-events-none absolute left-1/2 top-0 w-[115%] max-w-none -translate-x-1/2 -translate-y-[58%] sm:w-[32%] sm:-translate-y-[55%]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wedding.assets.mandala}
          alt=""
          className="animate-slow-spin block w-full"
        />
      </motion.div>

      {/* Centre content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="text-[11px] uppercase tracking-[0.45em] text-soft sm:text-xs"
        >
          The Wedding Of
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.9 }}
          className="mt-4 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-gold-soft/80" />
          <span className="block h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-12 bg-gold-soft/80" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="font-names mt-6 text-5xl italic text-maroon sm:text-6xl md:text-7xl"
        >
          {wedding.bride} <span className="text-gold">&amp;</span>{" "}
          {wedding.groom}
        </motion.h1>

        {/* Date hidden on the cover — it is shown on the main invitation card.
            Remove the `hidden` class to bring it back. */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-5 hidden text-base text-ink sm:text-lg"
        >
          {wedding.dateLabel.day}, {wedding.dateLabel.date}
          <sup>{wedding.dateLabel.ordinal}</sup> {wedding.dateLabel.month}{" "}
          {wedding.dateLabel.year}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          className="relative mt-9"
        >
          {/* Expanding ripple rings that invite a tap */}
          <span
            aria-hidden
            className="animate-invite-ring pointer-events-none absolute inset-0 rounded-full border-2 border-maroon/50"
          />
          <span
            aria-hidden
            className="animate-invite-ring pointer-events-none absolute inset-0 rounded-full border-2 border-maroon/50 [animation-delay:1.1s]"
          />
          <motion.button
            onClick={onOpen}
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="relative inline-flex items-center gap-2.5 rounded-full border border-maroon/70 bg-cream/60 px-8 py-3.5 text-[12px] uppercase tracking-[0.3em] text-maroon shadow-[0_6px_24px_rgba(122,31,26,0.25)] backdrop-blur-sm transition hover:bg-maroon hover:text-cream"
          >
            <RingsIcon className="h-4 w-4" />
            Open Invitation
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0.4, 1] }}
          transition={{ delay: 2.4, duration: 2.4, repeat: Infinity, repeatDelay: 0.4 }}
          className="mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-maroon/80"
        >
          <motion.span
            aria-hidden
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="text-base"
          >
            👆
          </motion.span>
          Tap the button to open
        </motion.p>
      </div>

      {/* Perahera procession strip */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wedding.assets.peraharaLeft}
          alt=""
          className="block w-1/2 select-none object-contain"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wedding.assets.peraharaRight}
          alt=""
          className="block w-1/2 select-none object-contain"
        />
      </motion.div>
    </motion.div>
  );
}
