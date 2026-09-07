"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { wedding } from "@/lib/config";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "../Icons";
import Reveal, { SectionHeading } from "../Reveal";

export default function Gallery() {
  const photos = wedding.gallery;
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (dir: number) => {
      setLightbox((current) =>
        current === null
          ? null
          : (current + dir + photos.length) % photos.length,
      );
    },
    [photos.length],
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, close, step]);

  // Masonry layout: [tall] [two stacked] [two stacked] [tall]
  const columns: number[][] = [[0], [1, 4], [2, 5], [3]];

  return (
    <section
      id="gallery"
      className="mx-auto max-w-6xl scroll-mt-20 px-5 py-12 sm:px-8 sm:py-16"
    >
      <SectionHeading eyebrow="Captured Moments" title="Our Gallery" />

      <div className="grid grid-cols-2 items-center gap-3 sm:gap-4 lg:grid-cols-4">
        {columns.map((column, ci) => (
          <div key={ci} className="flex flex-col gap-3 sm:gap-4">
            {column.map((index, ri) => (
              <Reveal key={index} delay={0.08 * (ci + ri)}>
                <button
                  type="button"
                  aria-label="View photo"
                  onClick={() => setLightbox(index)}
                  className={`group relative block w-full overflow-hidden rounded-2xl border border-gold-soft/40 shadow-[0_12px_30px_rgba(90,60,20,0.12)] ${
                    column.length === 1
                      ? "aspect-[3/4.6]"
                      : "aspect-[3/2.2]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photos[index]}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <span className="absolute inset-0 bg-maroon-deep/0 transition group-hover:bg-maroon-deep/15" />
                </button>
              </Reveal>
            ))}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative max-h-[85vh] max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[lightbox]}
                alt=""
                className="max-h-[85vh] w-auto rounded-xl object-contain"
              />
              <button
                onClick={close}
                aria-label="Close"
                className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-cream text-maroon shadow-lg transition hover:bg-white"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
              <button
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              >
                <ChevronLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next photo"
                className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              >
                <ChevronRightIcon className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
