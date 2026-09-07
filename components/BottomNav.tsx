"use client";

import { useEffect, useState } from "react";
import {
  CalendarIcon,
  HeartIcon,
  HomeIcon,
  MailIcon,
  MapPinIcon,
} from "./Icons";

const items = [
  { id: "hero", label: "Home", Icon: HomeIcon },
  { id: "story", label: "Our Story", Icon: HeartIcon },
  { id: "events", label: "Events", Icon: CalendarIcon },
  { id: "venue", label: "Venue", Icon: MapPinIcon },
  { id: "rsvp", label: "RSVP", Icon: MailIcon },
];

export default function BottomNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const { id } of items) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
    >
      <ul className="flex items-center gap-1 rounded-full border border-gold/45 bg-cream/95 px-3 py-1.5 shadow-[0_10px_30px_rgba(90,60,20,0.18)] backdrop-blur sm:gap-2 sm:px-4 sm:py-2">
        {items.map(({ id, label, Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={label}
              className={`flex h-10 w-12 items-center justify-center rounded-full transition sm:w-14 ${
                active === id
                  ? "bg-maroon text-cream"
                  : "text-maroon hover:bg-gold-light/40"
              }`}
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
