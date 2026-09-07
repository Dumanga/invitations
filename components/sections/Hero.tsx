"use client";

import { motion } from "framer-motion";
import { wedding } from "@/lib/config";
import Reveal, { Divider } from "../Reveal";

export default function Hero() {
  return (
    <section id="hero" className="relative scroll-mt-20 overflow-hidden pt-6 sm:pt-10">
      {/* Mandala crown behind the card */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-25 sm:w-[42%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wedding.assets.mandala}
          alt=""
          className="animate-slow-spin block w-full"
        />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="relative rounded-[26px] border border-gold-soft/80 bg-cream/55 p-[7px] shadow-[0_20px_60px_rgba(90,60,20,0.12)] backdrop-blur-[2px]">
          <div className="rounded-[20px] border border-gold-soft/60 px-5 pb-0 pt-10 text-center sm:px-10 sm:pt-14">
            <Reveal>
              <p className="font-display text-2xl font-bold tracking-[0.06em] text-maroon sm:text-3xl">
                {wedding.greeting}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-gold sm:text-xs">
                You are Invited to the Wedding of
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <Divider className="mt-5" />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 flex items-center justify-center gap-4 sm:gap-6">
                <h2 className="font-names text-4xl italic text-maroon sm:text-6xl">
                  {wedding.bride}
                </h2>
                <span
                  aria-hidden
                  className="font-names text-3xl italic text-gold sm:text-5xl"
                >
                  &amp;
                </span>
                <h2 className="font-names text-4xl italic text-maroon sm:text-6xl">
                  {wedding.groom}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-6">
                <p className="text-sm sm:text-base">
                  <span className="block font-semibold text-ink">
                    Daughter of
                  </span>
                  <span className="mt-1 block text-soft">
                    {wedding.brideParents}
                  </span>
                </p>
                <p className="text-sm sm:text-base">
                  <span className="block font-semibold text-ink">Son of</span>
                  <span className="mt-1 block text-soft">
                    {wedding.groomParents}
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.35}>
              <div className="mx-auto mt-9 flex max-w-lg items-center justify-center">
                <span className="flex-1 border-y border-maroon/50 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-maroon sm:text-xl">
                  {wedding.dateLabel.month}
                </span>
                <span className="font-names px-6 text-5xl font-bold text-maroon sm:px-8 sm:text-6xl">
                  {wedding.dateLabel.date}
                </span>
                <span className="flex-1 border-y border-maroon/50 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-maroon sm:text-xl">
                  {wedding.dateLabel.year}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.42}>
              <p className="mt-8 text-xl font-bold text-ink sm:text-2xl">
                {wedding.dateLabel.day}, {wedding.dateLabel.date}
                <sup>{wedding.dateLabel.ordinal}</sup> {wedding.dateLabel.month}{" "}
                {wedding.dateLabel.year}
              </p>
            </Reveal>

            <Reveal delay={0.5}>
              <div className="mt-6 flex justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={wedding.assets.heroCouple}
                  alt={`${wedding.bride} and ${wedding.groom}`}
                  className="block w-[78%] max-w-md select-none object-contain sm:w-[64%]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Perahera procession strip */}
      <div className="pointer-events-none mt-[-4%] flex items-end">
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
      </div>

      {/* Scroll down indicator */}
      <div className="flex justify-center pb-10 pt-6">
        <a
          href="#story"
          className="group flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-soft"
        >
          <span>Scroll Down</span>
          <motion.span
            aria-hidden
            className="flex h-9 w-5 items-start justify-center rounded-full border border-gold/60 p-1"
          >
            <span className="animate-scroll-dot block h-1.5 w-1.5 rounded-full bg-gold" />
          </motion.span>
        </a>
      </div>
    </section>
  );
}
