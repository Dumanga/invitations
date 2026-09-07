"use client";

import { wedding } from "@/lib/config";
import Reveal, { Divider } from "../Reveal";

export default function Story() {
  return (
    <section id="story" className="scroll-mt-20 px-5 py-7 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-gold-soft/60 bg-cream/70 px-6 py-10 shadow-[0_20px_60px_rgba(90,60,20,0.10)] backdrop-blur-[2px] sm:px-12 sm:py-14">
        {/* Intro */}
        <div className="grid items-center gap-8 sm:grid-cols-[2fr_3fr] sm:gap-12">
          <Reveal>
            <div className="mx-auto max-w-xs sm:max-w-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wedding.assets.loveStory}
                alt={`${wedding.bride} & ${wedding.groom}`}
                className="block h-full w-full select-none object-contain"
              />
            </div>
          </Reveal>

          <div className="text-center sm:text-left">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.34em] text-maroon">
                Our Story
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-3 text-4xl text-maroon-deep sm:text-5xl">
                Together Forever
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <Divider className="mt-5 sm:justify-start" />
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 leading-relaxed text-soft">
                {wedding.story.intro}
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="font-names mt-6 text-2xl italic text-maroon sm:text-3xl">
                {wedding.dateLabel.day}, {wedding.dateLabel.date}
                <sup>{wedding.dateLabel.ordinal}</sup> {wedding.dateLabel.month}{" "}
                {wedding.dateLabel.year}
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-5 text-sm leading-relaxed text-ink sm:text-base">
                <span className="font-semibold">
                  Together with their families
                </span>{" "}
                {wedding.story.families}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Venue line */}
        <Reveal>
          <div className="mt-12 border-t border-gold-soft/50 pt-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-maroon-deep sm:text-base">
              {wedding.venue.name}
            </p>
            <p className="mt-2 text-[11px] uppercase tracking-[0.3em] text-soft">
              {wedding.venue.city}
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <div className="mt-12 border-t border-gold-soft/50 pt-10">
          <Reveal>
            <p className="text-center text-[11px] uppercase tracking-[0.34em] text-maroon">
              A Journey Together
            </p>
          </Reveal>
          <div className="mx-auto mt-8 max-w-2xl space-y-8">
            {wedding.story.timeline.map((item, i) => (
              <Reveal key={item.year} delay={0.08 * i}>
                <div className="grid grid-cols-[72px_1fr] items-start gap-5 sm:grid-cols-[96px_1fr] sm:gap-8">
                  <span className="font-names pt-0.5 text-3xl italic text-gold sm:text-4xl">
                    {item.year}
                  </span>
                  <div className="border-b border-gold-soft/40 pb-7">
                    <h4 className="font-display text-lg tracking-[0.08em] text-maroon-deep sm:text-xl">
                      {item.title}
                    </h4>
                    <p className="mt-2 leading-relaxed text-soft">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
