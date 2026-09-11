"use client";

import { wedding } from "@/lib/config";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  TempleIcon,
} from "../Icons";
import Reveal, { SectionHeading } from "../Reveal";

function calendarUrl() {
  const start = "20261113T033200Z"; // 9:02 AM +05:30 (Poruwa ceremony)
  const end = "20261113T063200Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Wedding of ${wedding.bride} & ${wedding.groom}`,
    dates: `${start}/${end}`,
    details: `We joyfully invite you to celebrate the wedding of ${wedding.bride} & ${wedding.groom}.`,
    location: `${wedding.venue.name}, ${wedding.venue.city}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default function Events() {
  return (
    <section
      id="events"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16"
    >
      <SectionHeading eyebrow="Celebrate With Us" title="Wedding Events" />

      <div className="mx-auto max-w-2xl space-y-5">
        {wedding.events.map((event, i) => (
          <Reveal key={event.title} delay={0.1 * i}>
            <div className="flex items-center gap-5 rounded-3xl border border-gold-soft/70 bg-cream/80 p-5 shadow-[0_12px_30px_rgba(90,60,20,0.10)] backdrop-blur-[2px] sm:gap-7 sm:p-7">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-maroon-deep text-gold-light shadow-inner sm:h-20 sm:w-20">
                {event.icon === "calendar" ? (
                  <CalendarIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                ) : (
                  <TempleIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                )}
              </span>
              <div>
                <h3 className="font-display text-xl uppercase tracking-[0.1em] text-maroon-deep sm:text-2xl">
                  {event.title}
                </h3>
                <div className="mt-3 space-y-1.5 text-sm text-soft sm:text-base">
                  <p className="flex items-center gap-2.5">
                    <CalendarIcon className="h-4 w-4 shrink-0 text-gold" />
                    <span className="tracking-[0.12em]">{event.date}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <ClockIcon className="h-4 w-4 shrink-0 text-gold" />
                    <span className="tracking-[0.12em]">{event.time}</span>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <MapPinIcon className="h-4 w-4 shrink-0 text-gold" />
                    <span className="tracking-[0.12em]">{event.venue}</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <div className="mt-8 flex justify-center">
          <a
            href={calendarUrl()}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 rounded-full border border-gold/45 bg-cream/90 px-6 py-3 shadow-[0_10px_24px_rgba(90,60,20,0.12)] transition hover:border-gold hover:bg-cream"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-deep text-gold-light">
              <CalendarIcon className="h-5 w-5" />
            </span>
            <span className="text-left">
              <span className="block font-semibold text-maroon-deep">
                Save the Date
              </span>
              <span className="block text-xs text-soft">
                Add the wedding to your calendar
              </span>
            </span>
          </a>
        </div>
      </Reveal>
    </section>
  );
}
