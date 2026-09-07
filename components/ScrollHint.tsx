"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

// Nudges guests who linger on the first screen without scrolling.
export default function ScrollHint() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 40) {
        setDismissed(true);
        setVisible(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(() => {
      if (window.scrollY <= 40) setVisible(true);
    }, 2000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed right-2 top-1/2 z-50 -translate-y-1/2 sm:right-4"
        >
          <div className="flex flex-col items-center gap-3 rounded-full border border-gold/45 bg-cream/95 px-2.5 py-5 shadow-[0_10px_30px_rgba(90,60,20,0.20)] backdrop-blur">
            <span
              className="text-[9px] font-semibold uppercase tracking-[0.3em] text-maroon"
              style={{ writingMode: "vertical-rl" }}
            >
              Scroll Down
            </span>
            <motion.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-maroon"
            >
              <path d="m6 9 6 6 6-6" />
              <path d="m6 4 6 6 6-6" opacity="0.4" />
            </motion.svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
