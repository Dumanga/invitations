"use client";

import { useEffect, useState } from "react";
import { wedding } from "@/lib/config";
import Reveal, { SectionHeading } from "../Reveal";

function getRemaining() {
  const target = new Date(wedding.dateISO).getTime();
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1_000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getRemaining> | null>(
    null,
  );

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: time ? String(time.days) : "--", label: "Days" },
    { value: time ? pad(time.hours) : "--", label: "Hours" },
    { value: time ? pad(time.minutes) : "--", label: "Minutes" },
    { value: time ? pad(time.seconds) : "--", label: "Seconds" },
  ];

  return (
    <section
      id="countdown"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16"
    >
      <SectionHeading eyebrow="The Big Day Awaits" title="Counting Down" />

      <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {units.map((unit, i) => (
          <Reveal key={unit.label} delay={0.08 * i}>
            <div className="flex flex-col items-center rounded-[20px] border border-gold-soft bg-cream/80 px-4 py-7 shadow-[0_12px_30px_rgba(90,60,20,0.10)] backdrop-blur-[2px]">
              <span className="font-names text-5xl font-semibold text-maroon sm:text-6xl">
                {unit.value}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-soft">
                {unit.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
