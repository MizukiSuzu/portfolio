// Small decorative chart for a project card header. Drawn in a 260x110 box; the
// bottom-left corner stays fairly empty so the project name can sit over it.
const SHAPES = {
  histogram: (c) =>
    [18, 34, 52, 70, 58, 40, 24, 12].map((h, i) => (
      <rect key={i} x={104 + i * 19} y={100 - h} width="15" height={h} rx="2" fill={c} />
    )),
  cone: (c) => (
    <>
      <path d="M120,58 L250,14 L250,102 Z" fill={c} opacity="0.25" />
      <path d="M120,58 L250,34 L250,82 Z" fill={c} opacity="0.35" />
      <path d="M10,72 L30,66 L48,70 L66,60 L84,64 L102,54 L120,58" fill="none" stroke={c} strokeWidth="2" />
      <path d="M120,58 L250,56" fill="none" stroke={c} strokeWidth="2" strokeDasharray="4 4" />
    </>
  ),
  bars: (c) =>
    [30, 42, 38, 55, 62, 58, 76].map((h, i) => (
      <rect key={i} x={110 + i * 20} y={100 - h} width="14" height={h} rx="3" fill={c} />
    )),
  line: (c) => {
    const pts = [[10, 86], [45, 74], [80, 78], [115, 56], [150, 60], [185, 38], [220, 42], [250, 20]];
    return (
      <>
        <polyline points={pts.join(" ")} fill="none" stroke={c} strokeWidth="2" />
        {pts.map(([x, y]) => <circle key={x} cx={x} cy={y} r="3" fill={c} />)}
      </>
    );
  },
  scatter: (c) =>
    [[120, 80], [132, 66], [145, 72], [150, 52], [163, 58], [170, 40], [182, 47], [190, 30],
     [204, 36], [210, 22], [222, 28], [236, 16], [140, 88], [198, 54], [228, 42]].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="3.5" fill={c} opacity="0.85" />
    )),
};

export default function MiniChart({ type, color }) {
  const draw = SHAPES[type];
  if (!draw) return null;
  return (
    <svg
      viewBox="0 0 260 110"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.7 }}
    >
      {[30, 60, 90].map((y) => (
        <line key={y} x1="0" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.06)" />
      ))}
      {draw(color)}
    </svg>
  );
}
