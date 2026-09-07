"use client";

import { wedding } from "@/lib/config";
import { ExternalIcon, MapPinIcon } from "../Icons";
import Reveal, { SectionHeading } from "../Reveal";

export default function Venue() {
  const query = encodeURIComponent(wedding.venue.mapQuery);

  return (
    <section
      id="venue"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16"
    >
      <SectionHeading eyebrow="The Setting" title="Wedding Venue" />

      <div className="grid items-center gap-6 lg:grid-cols-[2fr_3fr] lg:gap-10">
        <Reveal>
          <div className="flex items-center gap-5 rounded-3xl border border-gold-soft/70 bg-cream/80 p-6 shadow-[0_12px_30px_rgba(90,60,20,0.10)] backdrop-blur-[2px] sm:p-8">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold-soft/70 bg-cream text-maroon">
              <MapPinIcon className="h-6 w-6" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.34em] text-gold">
                Venue
              </p>
              <h3 className="font-display mt-1.5 text-2xl text-maroon-deep">
                {wedding.venue.name}
              </h3>
              <p className="mt-1 text-soft">{wedding.venue.city}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="overflow-hidden rounded-3xl border border-gold-soft/60 shadow-[0_16px_40px_rgba(90,60,20,0.15)]">
            <iframe
              title={`Map of ${wedding.venue.name}`}
              src={`https://maps.google.com/maps?q=${query}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
              className="h-72 w-full sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-4 flex justify-center lg:justify-end">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-gold/45 bg-cream/90 px-6 py-2.5 text-[11px] uppercase tracking-[0.25em] text-soft transition hover:border-gold hover:text-maroon"
            >
              <ExternalIcon className="h-3.5 w-3.5" />
              View on Map
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
