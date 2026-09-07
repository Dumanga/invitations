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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-5 text-base text-ink sm:text-lg"
        >
          {wedding.dateLabel.day}, {wedding.dateLabel.date}
          <sup>{wedding.dateLabel.ordinal}</sup> {wedding.dateLabel.month}{" "}
          {wedding.dateLabel.year}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.9 }}
          onClick={onOpen}
          className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-maroon/70 bg-cream/40 px-8 py-3.5 text-[12px] uppercase tracking-[0.3em] text-maroon backdrop-blur-sm transition hover:bg-maroon hover:text-cream"
        >
          <RingsIcon className="h-4 w-4" />
          Open Invitation
        </motion.button>
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
