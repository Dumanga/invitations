"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { wedding } from "@/lib/config";
import BottomNav from "./BottomNav";
import Cover from "./Cover";
import Countdown from "./sections/Countdown";
import Events from "./sections/Events";
import Footer from "./sections/Footer";
import Gallery from "./sections/Gallery";
import Hero from "./sections/Hero";
import Rsvp from "./sections/Rsvp";
import Story from "./sections/Story";
import Venue from "./sections/Venue";
import { MusicIcon, MusicOffIcon } from "./Icons";

type Phase = "cover" | "video" | "main";

export default function InvitationExperience() {
  const [phase, setPhase] = useState<Phase>("cover");
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const playMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 1;
    audio
      .play()
      .then(() => setMusicOn(true))
      .catch(() => setMusicOn(false));
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setMusicOn(true)).catch(() => {});
    } else {
      audio.pause();
      setMusicOn(false);
    }
  }, []);

  const openInvitation = useCallback(() => {
    setPhase("video");
    playMusic();
    // Start the intro video as soon as it is mounted.
    requestAnimationFrame(() => {
      videoRef.current?.play().catch(() => setPhase("main"));
    });
  }, [playMusic]);

  const finishVideo = useCallback(() => {
    setPhase("main");
  }, []);

  // Safety net: if video playback stalls (power saving, hidden tab),
  // move on to the main page once the intro duration has passed.
  useEffect(() => {
    if (phase !== "video") return;
    const id = setTimeout(() => setPhase("main"), 12_000);
    const onVisible = () => {
      if (!document.hidden) videoRef.current?.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [phase]);

  // Lock page scroll while the cover or the intro video is showing.
  useEffect(() => {
    document.body.style.overflow = phase === "main" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  return (
    <div className="relative">
      {/* Fixed silk backdrop behind the whole page */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${wedding.assets.backdrop})` }}
      />

      <audio ref={audioRef} src={wedding.assets.music} loop preload="auto" />

      <main className="relative">
        <Hero />
        <Story />
        <Countdown />
        <Events />
        <Gallery />
        <Venue />
        <Rsvp />
        <Footer />
      </main>

      <BottomNav />

      {/* Floating music toggle (visible after the invitation is opened) */}
      {phase === "main" && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          onClick={toggleMusic}
          aria-label={musicOn ? "Turn music off" : "Turn music on"}
          className="fixed right-4 top-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-maroon-deep/55 bg-maroon-deep/85 text-gold-light shadow-lg backdrop-blur transition hover:bg-maroon-deep"
        >
          {musicOn ? (
            <MusicIcon className="h-5 w-5" />
          ) : (
            <MusicOffIcon className="h-5 w-5" />
          )}
        </motion.button>
      )}

      {/* Intro video overlay */}
      <AnimatePresence>
        {phase === "video" && (
          <motion.div
            key="intro-video"
            className="fixed inset-0 z-[60] overflow-hidden bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.1, ease: "easeInOut" } }}
          >
            <video
              ref={videoRef}
              src={wedding.assets.introVideo}
              className="absolute inset-0 h-full w-full object-cover"
              muted
              playsInline
              autoPlay
              onEnded={finishVideo}
            />
            <div className="absolute inset-0 bg-black/20" />

            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
            >
              <p className="text-xs uppercase tracking-[0.5em] text-white/90 sm:text-sm">
                The Wedding Of
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="h-px w-10 bg-white/60" />
                <span className="block h-1.5 w-1.5 rotate-45 bg-white/80" />
                <span className="h-px w-10 bg-white/60" />
              </div>
              <p className="font-names mt-5 text-5xl italic text-[#f3e9c8] drop-shadow-lg sm:text-7xl">
                {wedding.bride}{" "}
                <span className="text-gold-light">&amp;</span> {wedding.groom}
              </p>
              <p className="mt-5 text-xs uppercase tracking-[0.35em] text-white/90 sm:text-sm">
                {wedding.dateLabel.day}, {wedding.dateLabel.date}
                <sup>{wedding.dateLabel.ordinal}</sup> {wedding.dateLabel.month}{" "}
                {wedding.dateLabel.year}
              </p>
            </motion.div>

            <motion.button
              onClick={finishVideo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 right-8 rounded-full bg-black/45 px-6 py-3 text-[11px] uppercase tracking-[0.3em] text-white/90 backdrop-blur transition hover:bg-black/60"
            >
              Skip
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cover overlay */}
      <AnimatePresence>
        {phase === "cover" && (
          <Cover key="cover" onOpen={openInvitation} />
        )}
      </AnimatePresence>
    </div>
  );
}
