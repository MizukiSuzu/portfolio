import { useCallback, useEffect, useRef, useState } from "react";
import { projects } from "../data/resume";
import { STATUS_COLOR } from "../data/statusColor";
import ProjectModal from "./ProjectModal";

const OPACITY_THRESHOLD = 0.05; // fade curve is front-loaded, so "invisible" arrives well before transition end
const CARD_TRANSITION =
  "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease";

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

    const scale = offset === 0 ? 1.1 : absOff === 1 ? 0.8 : 0.62;
    const xShift = offset * 158;
    const rotate = offset * -18;
    const zShift = -absOff * 70;
    const opacity = absOff > 2 ? 0 : offset === 0 ? 1 : absOff === 1 ? 0.65 : 0.3;
    const z = 10 - absOff;

    card.style.transform = `translate(-50%, -50%) translateX(${xShift}px) translateZ(${zShift}px) rotateY(${rotate}deg) scale(${scale})`;
    card.style.opacity = opacity;
    card.style.zIndex = z;
    card.style.pointerEvents = absOff > 2 ? "none" : "auto";
    card.style.borderColor = offset === 0 ? "var(--accent)" : "var(--border)";
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

  return (
    <div style={{ marginTop: "8px" }}>
      <div
        style={{
          position: "relative",
          height: "300px",
          perspective: "1200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <button
          onClick={goPrev}
          aria-label="Previous project"
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "var(--panel)",
            border: "1px solid var(--border)",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &lsaquo;
        </button>

        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          {projects.map((p, i) => {
            const accent = STATUS_COLOR[p.status] || "var(--teal)";
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
                  width: "220px",
                  background: "var(--panel)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "12px 14px",
                  cursor: "pointer",
                  boxShadow: isCenter ? "0 14px 30px rgba(0,0,0,0.35)" : "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--text)",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      color: accent,
                    }}
                  >
                    {p.status}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    lineHeight: 1.5,
                    color: "var(--text-dim)",
                    margin: "0 0 8px",
                    maxHeight: isCenter ? "80px" : "0",
                    opacity: isCenter ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease, opacity 0.3s ease",
                  }}
                >
                  {p.summary}
                </p>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    maxHeight: isCenter ? "60px" : "0",
                    opacity: isCenter ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.35s ease, opacity 0.3s ease",
                  }}
                >
                  {p.stack.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "var(--teal)",
                        border: "1px solid var(--border)",
                        borderRadius: "3px",
                        padding: "2px 6px",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={goNext}
          aria-label="Next project"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 20,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "var(--panel)",
            border: "1px solid var(--border)",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: "14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          &rsaquo;
        </button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "7px",
          marginTop: "14px",
        }}
      >
        {projects.map((p, i) => (
          <button
            key={p.id}
            onClick={() => jumpTo(i)}
            aria-label={`Go to ${p.name}`}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "none",
              padding: 0,
              cursor: "pointer",
              background: activeIndex === i ? "var(--teal)" : "var(--border)",
              transform: activeIndex === i ? "scale(1.4)" : "scale(1)",
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
