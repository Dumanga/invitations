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
import Story from "./sections/Story";
import Venue from "./sections/Venue";
import { MusicIcon, MusicOffIcon } from "./Icons";

type Phase = "loading" | "cover" | "video" | "main";

export default function InvitationExperience() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [progress, setProgress] = useState(0);
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

  // Preload every image and buffer the intro video before showing the cover.
  useEffect(() => {
    const a = wedding.assets;
    const images = [
      a.backdrop,
      a.mandala,
      a.peraharaLeft,
      a.peraharaRight,
      a.heroCouple,
      a.loveStory,
    ];
    const total = images.length + 1; // +1 for the intro video
    const startedAt = Date.now();
    let done = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      // Keep the loader visible at least briefly so it never flashes.
      const wait = Math.max(0, 900 - (Date.now() - startedAt));
      setTimeout(() => {
        setProgress(100);
        setPhase((p) => (p === "loading" ? "cover" : p));
      }, wait);
    };

    const bump = () => {
      done += 1;
      setProgress(Math.min(100, Math.round((done / total) * 100)));
      if (done >= total) finish();
    };

    for (const src of images) {
      const img = new window.Image();
      img.onload = bump;
      img.onerror = bump;
      img.src = src;
    }

    const video = document.createElement("video");
    video.preload = "auto";
    video.muted = true;
    video.oncanplaythrough = () => {
      video.oncanplaythrough = null;
      bump();
    };
    video.onerror = () => bump();
    video.src = a.introVideo;
    video.load();

    // Never keep guests waiting on a slow connection.
    const timeout = setTimeout(finish, 12_000);
    return () => clearTimeout(timeout);
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
        {/* RSVP section hidden for now — re-add <Rsvp /> (and its nav item) to restore it */}
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

      {/* Loading screen shown until every asset is preloaded */}
      <AnimatePresence>
        {phase === "loading" && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[#f7efdd] px-8"
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={wedding.assets.mandala}
              alt=""
              className="animate-loader-spin h-28 w-28 opacity-70 sm:h-36 sm:w-36"
            />

            <p className="font-names mt-8 text-3xl italic text-maroon sm:text-4xl">
              {wedding.bride} <span className="text-gold">&amp;</span>{" "}
              {wedding.groom}
            </p>

            <div className="mt-3 flex items-center gap-3">
              <span className="h-px w-10 bg-gold-soft/70" />
              <span className="block h-1 w-1 rotate-45 bg-gold" />
              <span className="h-px w-10 bg-gold-soft/70" />
            </div>

            <div className="mt-8 h-[3px] w-48 overflow-hidden rounded-full bg-gold-soft/30 sm:w-56">
              <div
                className="h-full rounded-full bg-gold transition-[width] duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-soft">
              Preparing your invitation
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
