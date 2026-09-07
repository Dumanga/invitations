"use client";

import { wedding } from "@/lib/config";
import { HeartIcon } from "../Icons";
import Reveal from "../Reveal";

export default function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-footer-brown">
      {/* Faint mandala watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 w-[130%] max-w-2xl -translate-x-1/2 -translate-y-1/2 sm:w-[60%]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={wedding.assets.mandala}
          alt=""
          className="block w-full opacity-[0.08]"
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.4em] text-gold-light/80">
            Save the Date
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-names mt-5 text-6xl text-gold-light sm:text-8xl">
            {wedding.shortDate}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mt-5 text-gold-light/70">
            Thank you for being part of our special day.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-8 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gold-light/40" />
            <HeartIcon className="h-4 w-4 fill-gold-light text-gold-light" />
            <span className="h-px w-16 bg-gold-light/40" />
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-names mt-8 text-4xl italic text-gold-light sm:text-5xl">
            {wedding.bride} <span className="text-gold-soft">&amp;</span>{" "}
            {wedding.groom}
          </p>
        </Reveal>
        <Reveal delay={0.36}>
          <p className="mt-6 text-[11px] uppercase tracking-[0.4em] text-gold-light/60">
            {wedding.venue.name}
          </p>
        </Reveal>
      </div>

      {/* Space so the fixed bottom nav doesn't cover content */}
      <div className="h-16" />
    </footer>
  );
}
