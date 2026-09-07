"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { wedding } from "@/lib/config";
import { SendIcon } from "../Icons";
import Reveal, { SectionHeading } from "../Reveal";

type Attending = "yes" | "no" | null;

export default function Rsvp() {
  const [name, setName] = useState("");
  const [attending, setAttending] = useState<Attending>(null);
  const [guests, setGuests] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const submit = () => {
    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!attending) {
      setError("Please let us know if you will be attending.");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <section
      id="rsvp"
      className="scroll-mt-20 bg-gold-light/30 px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="mx-auto max-w-xl text-center">
        <SectionHeading eyebrow="Kindly Reply" title="Will You Join Us?" />

        <Reveal>
          <p className="text-soft">
            We joyfully await your presence. Please let us know if you will be
            joining us.
          </p>
          <p className="mt-2 font-semibold text-maroon">
            Kindly respond by {wedding.rsvpBy}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-9 rounded-3xl border border-gold-soft/70 bg-cream/85 p-6 text-left shadow-[0_16px_40px_rgba(90,60,20,0.12)] backdrop-blur-[2px] sm:p-9">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <p className="font-display text-2xl text-maroon-deep">
                  Thank You!
                </p>
                <p className="mt-3 text-soft">
                  {attending === "yes"
                    ? `We can't wait to celebrate with you${
                        guests > 1 ? ` and your ${guests - 1} guest${guests > 2 ? "s" : ""}` : ""
                      }.`
                    : "We will miss you, thank you for letting us know."}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-7">
                <div>
                  <label
                    htmlFor="rsvp-name"
                    className="mb-2 block text-sm font-semibold text-ink"
                  >
                    Full Name
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-gold-soft/60 bg-cream px-4 py-3 text-ink outline-none transition placeholder:text-soft/60 focus:border-gold focus:ring-2 focus:ring-gold/25"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-ink">
                    Will you be attending?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttending("yes")}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        attending === "yes"
                          ? "border-maroon bg-maroon text-cream"
                          : "border-gold-soft/60 bg-cream text-soft hover:border-gold"
                      }`}
                    >
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending("no")}
                      className={`rounded-xl border px-4 py-3 text-sm transition ${
                        attending === "no"
                          ? "border-maroon bg-maroon text-cream"
                          : "border-gold-soft/60 bg-cream text-soft hover:border-gold"
                      }`}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-ink">
                    Number of Guests
                  </p>
                  <div className="flex items-center justify-center gap-6">
                    <button
                      type="button"
                      aria-label="Decrease guest count"
                      onClick={() => setGuests((g) => Math.max(1, g - 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/70 bg-cream text-xl text-maroon transition hover:border-gold"
                    >
                      -
                    </button>
                    <span className="font-names w-10 text-center text-3xl font-semibold text-maroon">
                      {guests}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase guest count"
                      onClick={() => setGuests((g) => Math.min(10, g + 1))}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-soft/70 bg-cream text-xl text-maroon transition hover:border-gold"
                    >
                      +
                    </button>
                  </div>
                </div>

                {error && (
                  <p className="text-center text-sm text-maroon">{error}</p>
                )}

                <button
                  type="button"
                  onClick={submit}
                  className="flex w-full items-center justify-center gap-2.5 rounded-full border border-maroon/70 bg-cream px-6 py-3.5 text-[12px] uppercase tracking-[0.28em] text-maroon transition hover:bg-maroon hover:text-cream"
                >
                  <SendIcon className="h-4 w-4" />
                  Send RSVP
                </button>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
