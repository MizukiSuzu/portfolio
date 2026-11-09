import { useEffect, useRef } from "react";

// Scatter-plot style background: drifting dots that link when close and reach toward the cursor.
const AMBER = "232,163,61";
const TEAL = "95,168,160";

export default function Background() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -999, y: -999 };
    let w, h, pts, raf;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = canvas.width = innerWidth * dpr;
      h = canvas.height = innerHeight * dpr;
      ctx.scale(dpr, dpr);
      const n = Math.round((innerWidth * innerHeight) / 18000); // ponytail: O(n²) pair check, fine below ~150 points
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        c: Math.random() < 0.7 ? AMBER : TEAL,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!still) {
          p.x = (p.x + p.vx + innerWidth) % innerWidth;
          p.y = (p.y + p.vy + innerHeight) % innerHeight;
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 130) {
            ctx.strokeStyle = `rgba(${a.c},${0.12 * (1 - d / 130)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (dm < 170) {
          ctx.strokeStyle = `rgba(${a.c},${0.35 * (1 - dm / 170)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
        ctx.fillStyle = `rgba(${a.c},0.45)`;
        ctx.beginPath(); ctx.arc(a.x, a.y, 1.8, 0, Math.PI * 2); ctx.fill();
      }
      if (!still) raf = requestAnimationFrame(frame);
    };

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; if (still) frame(); };
    const onResize = () => { cancelAnimationFrame(raf); resize(); frame(); };
    resize();
    frame();
    addEventListener("mousemove", onMove);
    addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("mousemove", onMove);
      removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="bg-layer" aria-hidden="true" style={{ width: "100%", height: "100%" }} />;
}
