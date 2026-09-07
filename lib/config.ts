// Inlined at build time; set to "/invitations" for the GitHub Pages build.
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const wedding = {
  bride: "Naduni",
  groom: "Sisira",
  brideParents: "Mr. & Mrs. Samaranayaka",
  groomParents: "Mr. & Mrs. Wijethunga",
  dateISO: "2026-11-13T08:30:00+05:30",
  dateLabel: { day: "Friday", date: 13, month: "November", year: 2026, ordinal: "th" },
  shortDate: "13 . 11 . 26",
  venue: {
    name: "Hotel Divine Light",
    city: "Monaragala, Sri Lanka",
    mapQuery: "Hotel Divine Light, Monaragala, Sri Lanka",
  },
  greeting: "SRI SUBA MANGALAM!",
  rsvpBy: "1st November 2026",
  events: [
    {
      title: "Registration",
      date: "13th November 2026",
      time: "8:30 AM",
      venue: "Hotel Divine Light, Monaragala",
      icon: "calendar" as const,
    },
    {
      title: "Poruwa Ceremony",
      date: "13th November 2026",
      time: "9:02 AM",
      venue: "Hotel Divine Light, Monaragala",
      icon: "temple" as const,
    },
  ],
  story: {
    intro:
      "We are delighted to invite you to celebrate the beginning of our forever as we exchange vows surrounded by our loved ones. Your presence will make our special day even more memorable.",
    families:
      "request the honour of your presence at the celebration of their marriage.",
    timeline: [
      {
        year: "2019",
        title: "The Beginning",
        text: "Two paths crossed on an ordinary day, and somehow nothing felt ordinary after that.",
      },
      {
        year: "2021",
        title: "Growing Together",
        text: "Through seasons of laughter and quiet moments alike, a friendship blossomed into something deeper.",
      },
      {
        year: "2023",
        title: "The Promise",
        text: "Under a sky full of stars, one question changed everything, and the answer was yes.",
      },
      {
        year: "2025",
        title: "Building a Home",
        text: "Side by side, we turned shared dreams into plans and plans into a life we cherish.",
      },
      {
        year: "2026",
        title: "Forever Begins",
        text: "Now, surrounded by the people we love, we are ready for our most beautiful chapter yet: Becoming husband and wife.",
      },
    ],
  },
  gallery: [
    `${base}/assets/love-story-couple-Photoroom.png`,
    `${base}/assets/hero-section-couple-Photoroom.png`,
    `${base}/assets/love-story-couple-Photoroom.png`,
    `${base}/assets/hero-section-couple-Photoroom.png`,
    `${base}/assets/love-story-couple-Photoroom.png`,
    `${base}/assets/hero-section-couple-Photoroom.png`,
  ],
  assets: {
    backdrop: `${base}/assets/backdrop.webp`,
    mandala: `${base}/assets/mandala-art-in-top.svg`,
    heroCouple: `${base}/assets/hero-section-couple-Photoroom.png`,
    loveStory: `${base}/assets/love-story-couple-Photoroom.png`,
    peraharaLeft: `${base}/assets/perahara-left.webp`,
    peraharaRight: `${base}/assets/perahara-right.webp`,
    introVideo: `${base}/assets/sunset-drive-intro.mp4`,
    music: `${base}/assets/bg-music.mp3`,
  },
};

export type Wedding = typeof wedding;
