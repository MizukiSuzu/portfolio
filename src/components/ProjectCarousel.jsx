import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/resume";
import { PROJ_COLOR, STATUS_COLOR } from "../data/statusColor";
import ProjectModal from "./ProjectModal";

const OPACITY_THRESHOLD = 0.05; // fade curve is front-loaded, so "invisible" arrives well before transition end
const CARD_TRANSITION =
  "transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease";

function circularOffset(i, active, count) {
  let diff = i - active;
  if (diff > count / 2) diff -= count;
  if (diff < -count / 2) diff += count;
  return diff;
}

export default function ProjectCarousel() {
  const n = projects.length;
  const initialActive = Math.max(
    projects.findIndex((p) => p.id === "tradr"),
    0
  );

  const cardRefs = useRef([]);
  const posRef = useRef(projects.map((_, i) => circularOffset(i, initialActive, n)));
  const visRef = useRef(projects.map(() => "visible"));
  const timerRef = useRef(projects.map(() => null));

  const [activeIndex, setActiveIndex] = useState(initialActive);
  const [modalIndex, setModalIndex] = useState(null);

  const applyCardStyle = useCallback((i) => {
    const card = cardRefs.current[i];
    if (!card) return 0;

    const offset = posRef.current[i];
    const absOff = Math.abs(offset);

    const scale = offset === 0 ? 1.15 : absOff === 1 ? 0.82 : 0.62;
    const xShift = offset * 190;
    const rotate = offset * -22;
    const zShift = -absOff * 90;
    const opacity = absOff > 2 ? 0 : offset === 0 ? 1 : absOff === 1 ? 0.75 : 0.4;
    const z = 10 - absOff;

    card.style.transform = "translate(-50%, -50%) translateX(" + xShift + "px) translateZ(" + zShift + "px) rotateY(" + rotate + "deg) scale(" + scale + ")";
    card.style.opacity = opacity;
    card.style.zIndex = z;
    card.style.pointerEvents = absOff > 2 ? "none" : "auto";
    card.style.boxShadow = offset === 0 ? "0 20px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--accent)" : "none";
    card.dataset.center = offset === 0 ? "true" : "false";

    return absOff;
  }, []);

  const instantWrap = useCallback(
    (i) => {
      const card = cardRefs.current[i];
      if (!card) return;

      let target = posRef.current[i];
      while (target > 2) target -= n;
      while (target < -2) target += n;
      const staging = target > 0 ? target + 1 : target - 1;

      posRef.current[i] = staging;
      card.style.transition = "none";
      applyCardStyle(i);
      void card.offsetWidth; // force reflow so the jump commits before re-enabling transitions
      card.style.transition = CARD_TRANSITION;

      posRef.current[i] = target;
      applyCardStyle(i);
    },
    [applyCardStyle, n]
  );

  const watchForInvisible = useCallback(
    (i) => {
      const card = cardRefs.current[i];
      const poll = () => {
        if (Math.abs(posRef.current[i]) <= 2) {
          visRef.current[i] = "visible";
          return;
        }
        const opacity = parseFloat(getComputedStyle(card).opacity);
        if (opacity <= OPACITY_THRESHOLD) {
          instantWrap(i);
          visRef.current[i] = Math.abs(posRef.current[i]) > 2 ? "invisible" : "visible";
          return;
        }
        timerRef.current[i] = requestAnimationFrame(poll);
      };
      poll();
    },
    [instantWrap]
  );

  const update = useCallback(() => {
    projects.forEach((_, i) => {
      const absOff = applyCardStyle(i);

      if (absOff <= 2) {
        cancelAnimationFrame(timerRef.current[i]);
        visRef.current[i] = "visible";
        return;
      }

      if (visRef.current[i] === "invisible") {
        instantWrap(i);
        visRef.current[i] = Math.abs(posRef.current[i]) > 2 ? "invisible" : "visible";
        return;
      }

      if (visRef.current[i] !== "pending") {
        visRef.current[i] = "pending";
        watchForInvisible(i);
      }
    });

    const active = posRef.current.findIndex((p) => p === 0);
    if (active !== -1) setActiveIndex(active);
  }, [applyCardStyle, instantWrap, watchForInvisible]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) card.style.transition = CARD_TRANSITION;
    });
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goNext = () => {
    for (let i = 0; i < n; i++) posRef.current[i] -= 1;
    update();
  };

  const goPrev = () => {
    for (let i = 0; i < n; i++) posRef.current[i] += 1;
    update();
  };

  const jumpTo = (index) => {
    const delta = -posRef.current[index];
    for (let i = 0; i < n; i++) posRef.current[i] += delta;
    update();
  };

  const handleCardClick = (i) => {
    if (posRef.current[i] === 0) {
      setModalIndex(i);
    } else {
      jumpTo(i);
    }
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 20,
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "var(--panel)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={{ marginTop: "8px" }}>
      <div
        style={{
          position: "relative",
          height: "420px",
          perspective: "1400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <button onClick={goPrev} aria-label="Previous project" style={{ ...arrowStyle, left: "0.5rem" }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {projects.map((p, i) => {
            const accent = PROJ_COLOR[p.id] || "var(--teal)";
            const statusColor = STATUS_COLOR[p.status] || accent;
            const isCenter = activeIndex === i;

            return (
              <div
                key={p.id}
                ref={(el) => (cardRefs.current[i] = el)}
                onClick={() => handleCardClick(i)}
                style={{
                  "--accent": accent,
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  width: "260px",
                  background: "var(--panel)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                <div
                  style={{
                    height: "84px",
                    background: "linear-gradient(135deg, " + accent + ", transparent)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "0.85rem 1rem",
                  }}
                >
                  {p.featured && (
                    <span
                      style={{
                        position: "absolute",
                        top: "0.65rem",
                        right: "0.8rem",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.68rem",
                        background: accent,
                        color: "#0a0e12",
                        padding: "0.18rem 0.5rem",
                        borderRadius: "4px",
                        fontWeight: 600,
                      }}
                    >
                      Featured
                    </span>
                  )}
                  <p
                    style={{
                      fontFamily: "'Fraunces', serif",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      color: "var(--text)",
                      margin: 0,
                    }}
                  >
                    {p.name}
                  </p>
                </div>

                <div style={{ padding: "1rem" }}>
                  <p
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.76rem",
                      color: statusColor,
                      margin: "0 0 0.5rem",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {p.status}
                  </p>

                  <p
                    style={{
                      fontFamily: "'Work Sans', sans-serif",
                      fontSize: "0.87rem",
                      lineHeight: 1.5,
                      color: "var(--text-dim)",
                      margin: "0 0 0.85rem",
                      maxHeight: isCenter ? "160px" : "0",
                      opacity: isCenter ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease, opacity 0.3s ease",
                    }}
                  >
                    {p.summary}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.35rem",
                      maxHeight: isCenter ? "80px" : "0",
                      opacity: isCenter ? 1 : 0,
                      overflow: "hidden",
                      transition: "max-height 0.4s ease, opacity 0.3s ease",
                    }}
                  >
                    {p.stack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        style={{
                          fontFamily: "'Work Sans', sans-serif",
                          fontSize: "0.73rem",
                          color: "var(--text-dim)",
                          background: "rgba(255,255,255,0.05)",
                          padding: "0.2rem 0.45rem",
                          borderRadius: "4px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={goNext} aria-label="Next project" style={{ ...arrowStyle, right: "0.5rem" }}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1rem" }}>
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => jumpTo(i)}
            aria-label={"Go to " + p.name}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: activeIndex === i ? "var(--amber)" : "rgba(255,255,255,0.15)",
              transform: activeIndex === i ? "scale(1.3)" : "scale(1)",
              transition: "background 0.2s ease, transform 0.2s ease",
            }}
          />
        ))}
      </div>

      {modalIndex !== null && (
        <ProjectModal project={projects[modalIndex]} onClose={() => setModalIndex(null)} />
      )}
    </div>
  );
}
