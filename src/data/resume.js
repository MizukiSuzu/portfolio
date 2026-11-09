export const profile = {
  name: "Calvin John Z. Crehencia",
  shortName: "Calvin Crehencia",
  title: "Data Analyst / Full-Stack Developer",
  location: "Metro Manila, Philippines",
  email: "calvinjohn0604@gmail.com",
  // Leave a link empty to hide it. Put the resume PDF in public/ and set resume: "/resume.pdf".
  github: "https://github.com/MizukiSuzu",
  linkedin: "https://www.linkedin.com/in/calvin-john-crehencia-515876237/",
  resume: "/Calvin_Crehencia_Resume.pdf",
  tagline:
    "I build end-to-end analytics tools and AI-integrated systems, from raw dataset to dashboard — three shipped outside the classroom, including a live analytics engine and a statistical stock-forecasting app.",
  summary:
    "BS Computer Science graduate who builds end-to-end analytics tools and AI-integrated systems, from raw dataset to dashboard. Beat 11 other teams for Best Thesis while carrying a full course load, then shipped three fully-built tools outside of class: a live analytics engine, a 20+ endpoint backend, and a statistical stock-forecasting app.",
};

export const stats = {
  kpis: [
    { value: 1.57, decimals: 2, label: "GWA" },
    { value: 20, suffix: "+", label: "API endpoints" },
    { value: 5, label: "projects" },
  ],
  tiles: [
    { value: "1.57", label: "GWA", detail: "BS Computer Science, STI College Caloocan" },
    { value: "#1 of 12", label: "Best Thesis", detail: "Campus ICTE Symposium, AY 2024–2025" },
    { value: "2", label: "Symposium awards", detail: "Best Thesis and Best Methods of Research" },
  ],
};

export const skillGroups = [
  {
    label: "Languages",
    group: "group-lang",
    skills: [
      { name: "Python", caption: "Built the Flask REST API powering Data Workbench's automated statistics engine." },
      { name: "SQL", caption: "Ran SQL analysis on PASADA's operational fleet and ride datasets to validate system behavior." },
      { name: "TypeScript", caption: "Wrote TRADR's Monte Carlo forecast engine, signals and backtest in TypeScript." },
      { name: "Dart", caption: "Built and maintain 20+ REST endpoints (Shelf) behind PopCulture's marketplace." },
    ],
  },
  {
    label: "Data & analysis",
    group: "group-data",
    skills: [
      { name: "Pandas", caption: "Powers automated mean, median, SD, IQR and skewness generation in Data Workbench." },
      { name: "NumPy", caption: "Handles the numerical computation behind Data Workbench's statistics pipeline." },
    ],
  },
  {
    label: "Frontend & visualization",
    group: "group-front",
    skills: [
      { name: "React", caption: "Built TRADR's UI — ticker search, watchlist, stock forecast page and prediction game." },
      { name: "Chart.js", caption: "Built 4 interactive chart types in Data Workbench's frontend." },
      { name: "Recharts", caption: "Draws TRADR's price charts, forecast cones and backtest chart." },
    ],
  },
  {
    label: "Backend & infrastructure",
    group: "group-back",
    skills: [
      { name: "Flask", caption: "Serves Data Workbench's REST API for on-demand dataset analysis." },
      { name: "REST APIs", caption: "Designed 20+ endpoints backing PopCulture's inventory, orders, and payouts." },
      { name: "Supabase", caption: "Schema, inventory tracking, and item pull-out logic for PopCulture." },
      { name: "PostgreSQL", caption: "Parallelized RPC calls cutting reporting time for PopCulture's seller dashboards." },
      { name: "Git", caption: "Version control across every shipped project." },
    ],
  },
];

export const projects = [
  {
    id: "data-workbench",
    chart: "histogram",
    metric: "12 cleaning actions",
    name: "Data Workbench",
    role: "Solo developer — personal project",
    period: "2026",
    status: "live",
    links: { live: "https://data-workbench-iota.vercel.app", source: "https://github.com/MizukiSuzu/data-workbench" },
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
    chart: "cone",
    metric: "5,000 simulated paths",
    name: "TRADR",
    role: "Solo developer — personal project",
    period: "2026",
    status: "live",
    links: { live: "https://tradr-ashy.vercel.app", source: "https://github.com/MizukiSuzu/tradr" },
    featured: true,
    stack: ["React 18", "TypeScript", "Recharts", "Zustand", "Twelve Data API", "Groq API", "Vercel"],
    summary:
      "A stock forecasting app and prediction game: see where any US stock is statistically likely to go, then call Up or Down.",
    details: [
      "Built a block-bootstrap Monte Carlo forecast engine in TypeScript (5,000 simulated paths from a year of daily returns) that shows 68% and 95% price ranges for any US stock or ETF.",
      "Added trend, momentum, RSI(14) and volatility-regime signals, each explained in one sentence, so the forecast is readable without a finance background.",
      "Validated the forecasts with a 12-month walk-forward backtest that builds each past forecast only from data available on that date and checks where the actual price landed.",
      "Turned the forecasts into an Up/Down prediction game that pays more for calls the model rated unlikely, with Replay rounds on hidden past data and Live calls that resolve later.",
      "Kept market-data and AI API keys server-side behind Vercel functions with CDN caching; a Groq-powered analyst chat explains the numbers on screen.",
    ],
  },
  {
    id: "popculture",
    chart: "bars",
    metric: "20+ API endpoints",
    name: "PopCulture",
    role: "Backend developer",
    period: "Feb 2026 — Present",
    status: "active",
    links: { live: "", source: "" },
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
    chart: "line",
    metric: "1st of 12 thesis groups",
    name: "PASADA",
    role: "Data analyst",
    period: "Dec 2024 — Nov 2025",
    status: "shipped",
    links: { live: "", source: "" },
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
    chart: "scatter",
    metric: "2 competitive titles",
    name: "Esports Performance Data",
    role: "Personal analytics portfolio",
    period: "2025 — Present",
    status: "active",
    links: { live: "", source: "" },
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
