export const profile = {
  name: "Calvin John Z. Crehencia",
  title: "Data Analyst / Full-Stack Developer",
  location: "Metro Manila, Philippines",
  email: "calvinjohn0604@gmail.com",
  summary:
    "BS Computer Science graduate who builds end-to-end analytics tools and AI-integrated systems, from raw dataset to dashboard. Beat 11 other teams for Best Thesis while carrying a full course load, then shipped three fully-built tools outside of class: a live analytics engine, a 20+ endpoint backend, and an AI-integrated trading platform.",
};

export const stats = {
  rank: "1.57 GWA",
  achievements: [
    "Best Thesis — ICTE Symposium, 1st of 12 groups",
    "Best Methods of Research Project — ICTE Symposium",
  ],
};

export const abilities = [
  "Python",
  "SQL",
  "Pandas",
  "NumPy",
  "React",
  "TypeScript",
  "Flask",
  "REST APIs",
  "Supabase",
  "PostgreSQL",
  "Dart",
  "Chart.js",
  "Recharts",
  "Git",
];

export const projects = [
  {
    id: "data-workbench",
    name: "Data Workbench",
    role: "Solo developer — personal project",
    period: "2026",
    status: "live",
    stack: ["Python", "Flask", "Pandas", "NumPy", "JavaScript", "Chart.js"],
    summary:
      "A full-stack data analysis web app that automates descriptive statistics for any uploaded dataset.",
    details: [
      "Automated descriptive statistics generation — mean, median, standard deviation, IQR, skewness — for any uploaded CSV/JSON dataset by building a Flask/Pandas/NumPy REST API, eliminating manual EDA calculation.",
      "Built data cleaning tools (null imputation, duplicate removal) to prepare messy datasets for analysis without manual pre-processing.",
      "Built 4 interactive chart types (histogram, scatter, and 2 others) in a Chart.js frontend to make relationships in the data visible without writing custom plotting code.",
    ],
  },
  {
    id: "tradr",
    name: "TRADR",
    role: "Solo developer — personal project",
    period: "2026",
    status: "live",
    featured: true,
    stack: ["React 18", "TypeScript", "Groq API", "Recharts", "Zustand", "Vite"],
    summary:
      "A paper trading simulator with 6 AI agents that generate and justify independent buy/sell decisions.",
    details: [
      "Normalized live market data for 25+ assets into a unified pricing model with 24h change and market cap, powering a real-time P&L and asset-composition analytics layer.",
      "Designed the analytics layer — P&L charts, asset composition breakdown, and a timestamped trade log — visualized via Recharts, with state managed through Zustand.",
      "Integrated 6 AI trading agents via the Groq API, each with a distinct strategy, generating and justifying independent buy/sell decisions and automating strategy analysis that would otherwise require manual review of each trade.",
      "Built limit orders and automated price alerts into the full buy/sell portfolio engine.",
    ],
  },
  {
    id: "popculture",
    name: "PopCulture",
    role: "Backend developer",
    period: "Feb 2026 — Present",
    status: "active",
    stack: ["Dart (Shelf)", "Supabase", "PostgreSQL", "Flutter"],
    summary:
      "A consignment marketplace and admin platform with 20+ REST API endpoints backing inventory and payouts.",
    details: [
      "Built and maintain 20+ REST API endpoints (Dart/Shelf) backing inventory, order fulfillment, seller ledgers, and payout workflows on Supabase/PostgreSQL.",
      "Designed analytics endpoints aggregating sales trends and top-selling items via parallelized Postgres RPC calls, cutting reporting time for seller and admin dashboards.",
      "Designed the database schema in Supabase/PostgreSQL and implemented inventory tracking and item pull-out functions.",
      "Assisted in frontend integration using Flutter, ensuring backend logic aligned with application requirements.",
    ],
  },
  {
    id: "pasada",
    name: "PASADA",
    role: "Data analyst",
    period: "Dec 2024 — Nov 2025",
    status: "shipped",
    stack: ["SQL", "Excel"],
    summary:
      "Ride-hailing and fleet management ecosystem — thesis project that won Best Thesis campus-wide.",
    details: [
      "Validated system behavior and quantified research conclusions for a campus-level thesis by running SQL and Excel-based analysis on operational fleet and ride datasets.",
      "Documented system architecture, requirements analysis, and research methodology that earned Best Thesis and Best Methods of Research out of 12 competing groups at the campus-wide ICTE Symposium.",
      "Cleaned and organized raw operational data using Excel and SQL to support system validation and research conclusions.",
      "Collaborated with the development team to ensure system implementation matched documented requirements, and contributed to thesis defense presentation materials.",
    ],
  },
  {
    id: "esports-analytics",
    name: "Esports Performance Data",
    role: "Personal analytics portfolio",
    period: "2025 — Present",
    status: "active",
    stack: ["Python", "Pandas", "Statistics"],
    summary:
      "A self-sourced dataset tracking performance metrics across Dota 2 and League of Legends.",
    details: [
      "Built and maintain a self-sourced dataset tracking performance metrics across 2 competitive titles (Dota 2, League of Legends), applying descriptive statistics and trend analysis to identify measurable performance drivers.",
      "Analyzed pick rates, item utilization, build paths, and counter matchups to practice pattern-spotting and hypothesis-testing methodology transferable to market and product analytics.",
      "Used as a recurring testbed to practice hypothesis-testing before applying the same approach to PASADA's operational data.",
    ],
  },
];

export const education = {
  school: "STI College Caloocan",
  degree: "Bachelor of Science in Computer Science",
  period: "2022 — Jul 2026",
  gwa: "1.57",
  location: "Caloocan, Metro Manila",
};
