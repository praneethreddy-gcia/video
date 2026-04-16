import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  Sequence,
  Audio,
  staticFile,
} from "remotion";

const FPS = 30;
const DARK = "#060644";
const GOLD = "#eeab2b";

function fadeIn(frame: number, start: number, dur = 20) {
  return interpolate(frame, [start, start + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function slideUp(frame: number, start: number, stiffness = 120) {
  const p = spring({ frame: frame - start, fps: FPS, config: { damping: 14, stiffness } });
  return interpolate(p, [0, 1], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
}

// ── Scene 1: Title (0–4s = 0–120f) ──────────────────────────────────────────
const SceneTitle = ({ f }: { f: number }) => {
  const lineW = interpolate(f, [30, 65], [0, 340], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity: fadeIn(f, 0, 18), transform: `translateY(${slideUp(f, 0)}px)`, color: GOLD, fontSize: 20, fontFamily: "sans-serif", letterSpacing: 6, textTransform: "uppercase", marginBottom: 16 }}>
          Breaking News
        </div>
        <div style={{ opacity: fadeIn(f, 12, 22), transform: `translateY(${slideUp(f, 12)}px)`, color: "white", fontSize: 62, fontWeight: 800, fontFamily: "sans-serif", lineHeight: 1.2, maxWidth: 900 }}>
          India Slips to{" "}
          <span style={{ color: GOLD }}>6th</span>
          <br />Largest Economy
        </div>
        <div style={{ width: lineW, height: 3, background: GOLD, margin: "20px auto" }} />
        <div style={{ opacity: fadeIn(f, 50, 20), color: "#a0b4cc", fontSize: 22, fontFamily: "sans-serif" }}>
          Falls behind the United Kingdom
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2: Rankings (4–12s = 120–360f) ────────────────────────────────────
const rankings = [
  { pos: "1st", country: "USA", gdp: "$29.2T" },
  { pos: "2nd", country: "China", gdp: "$18.7T" },
  { pos: "3rd", country: "Japan", gdp: "$4.38T" },
  { pos: "4th", country: "UK", gdp: "$4.26T", highlight: true },
  { pos: "5th→6th", country: "India", gdp: "$3.92T", demoted: true },
];

const SceneRankings = ({ f }: { f: number }) => (
  <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center", padding: "0 100px" }}>
    <div style={{ width: "100%" }}>
      <div style={{ opacity: fadeIn(f, 0, 18), color: GOLD, fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 32, textAlign: "center" }}>
        2025 GDP Rankings
      </div>
      {rankings.map((r, i) => {
        const op = fadeIn(f, 15 + i * 18, 18);
        const y = slideUp(f, 15 + i * 18);
        return (
          <div key={r.country} style={{
            opacity: op, transform: `translateY(${y}px)`,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: r.demoted ? "rgba(238,171,43,0.12)" : r.highlight ? "rgba(255,255,255,0.05)" : "transparent",
            border: r.demoted ? `1px solid ${GOLD}` : "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, padding: "14px 28px", marginBottom: 10,
          }}>
            <div style={{ color: r.demoted ? GOLD : "#a0b4cc", fontSize: 20, fontFamily: "sans-serif", width: 100 }}>{r.pos}</div>
            <div style={{ color: "white", fontSize: 24, fontWeight: 700, fontFamily: "sans-serif", flex: 1 }}>{r.country}</div>
            <div style={{ color: r.demoted ? GOLD : "#a0b4cc", fontSize: 20, fontFamily: "sans-serif" }}>{r.gdp}</div>
          </div>
        );
      })}
    </div>
  </AbsoluteFill>
);

// ── Scene 3: Why (12–24s = 360–720f) ────────────────────────────────────────
const SceneWhy = ({ f }: { f: number }) => {
  const r1op = fadeIn(f, 20, 20);
  const r1y = slideUp(f, 20);
  const r2op = fadeIn(f, 80, 20);
  const r2y = slideUp(f, 80);
  return (
    <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center", padding: "0 100px" }}>
      <div style={{ width: "100%" }}>
        <div style={{ opacity: fadeIn(f, 0, 18), color: GOLD, fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 44, textAlign: "center" }}>
          Why Did This Happen?
        </div>
        {/* Reason 1 */}
        <div style={{ opacity: r1op, transform: `translateY(${r1y}px)`, background: "rgba(255,255,255,0.04)", border: `1px solid rgba(238,171,43,0.3)`, borderLeft: `4px solid ${GOLD}`, borderRadius: 12, padding: "28px 36px", marginBottom: 24 }}>
          <div style={{ color: GOLD, fontSize: 16, fontFamily: "sans-serif", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Reason 1</div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 8 }}>GDP Base Year Revision</div>
          <div style={{ color: "#a0b4cc", fontSize: 20, fontFamily: "sans-serif", lineHeight: 1.5 }}>
            India shifted base year from 2011–12 to 2022–23,<br />
            reducing nominal GDP by <span style={{ color: GOLD, fontWeight: 700 }}>~3.8%</span>
          </div>
        </div>
        {/* Reason 2 */}
        <div style={{ opacity: r2op, transform: `translateY(${r2y}px)`, background: "rgba(255,255,255,0.04)", border: `1px solid rgba(238,171,43,0.3)`, borderLeft: `4px solid ${GOLD}`, borderRadius: 12, padding: "28px 36px" }}>
          <div style={{ color: GOLD, fontSize: 16, fontFamily: "sans-serif", letterSpacing: 3, textTransform: "uppercase", marginBottom: 10 }}>Reason 2</div>
          <div style={{ color: "white", fontSize: 28, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 8 }}>Rupee Depreciation</div>
          <div style={{ color: "#a0b4cc", fontSize: 20, fontFamily: "sans-serif", lineHeight: 1.5 }}>
            INR weakened by <span style={{ color: GOLD, fontWeight: 700 }}>~10%</span> against USD in FY26,<br />
            shrinking India's dollar-denominated GDP
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 4: IMF Cut (24–33s = 720–990f) ────────────────────────────────────
const SceneIMF = ({ f }: { f: number }) => {
  const numP = spring({ frame: f - 25, fps: FPS, config: { damping: 16, stiffness: 80 } });
  const numVal = interpolate(numP, [0, 1], [0, 380], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center", padding: "0 100px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity: fadeIn(f, 0, 18), color: GOLD, fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 30 }}>
          IMF Forecast Cut
        </div>
        <div style={{ opacity: fadeIn(f, 15, 20), color: "white", fontSize: 28, fontFamily: "sans-serif", marginBottom: 40, lineHeight: 1.6 }}>
          India's <span style={{ color: GOLD }}>2027 GDP estimate</span> slashed by:
        </div>
        <div style={{ opacity: fadeIn(f, 20, 20) }}>
          <span style={{ color: GOLD, fontSize: 110, fontWeight: 900, fontFamily: "sans-serif" }}>
            ${Math.round(numVal)}B
          </span>
        </div>
        <div style={{ opacity: fadeIn(f, 60, 20), color: "#a0b4cc", fontSize: 22, fontFamily: "sans-serif", marginTop: 20 }}>
          Down from <span style={{ color: "white" }}>$4.96T</span> to <span style={{ color: "white" }}>$4.58T</span>
        </div>
        <div style={{ opacity: fadeIn(f, 80, 20), color: "#a0b4cc", fontSize: 20, fontFamily: "sans-serif", marginTop: 10 }}>
          Source: International Monetary Fund
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5: Outlook (33–44s = 990–1320f) ────────────────────────────────────
const SceneOutlook = ({ f }: { f: number }) => (
  <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center", padding: "0 100px" }}>
    <div style={{ textAlign: "center", width: "100%" }}>
      <div style={{ opacity: fadeIn(f, 0, 18), color: GOLD, fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 30 }}>
        The Road Ahead
      </div>
      <div style={{ opacity: fadeIn(f, 15, 22), transform: `translateY(${slideUp(f, 15)})`, color: "white", fontSize: 38, fontWeight: 700, fontFamily: "sans-serif", marginBottom: 44, lineHeight: 1.3 }}>
        India projected to reclaim <span style={{ color: GOLD }}>4th position</span><br />by 2027
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        {[
          { label: "vs UK", margin: "$113B ahead" },
          { label: "vs Japan", margin: "$17B ahead" },
        ].map((item, i) => {
          const op = fadeIn(f, 55 + i * 30, 22);
          const y = slideUp(f, 55 + i * 30);
          return (
            <div key={item.label} style={{
              opacity: op, transform: `translateY(${y}px)`,
              background: "rgba(238,171,43,0.1)", border: `1px solid ${GOLD}`,
              borderRadius: 14, padding: "24px 44px", textAlign: "center",
            }}>
              <div style={{ color: GOLD, fontSize: 22, fontFamily: "sans-serif", marginBottom: 8 }}>{item.label}</div>
              <div style={{ color: "white", fontSize: 20, fontFamily: "sans-serif" }}>{item.margin}</div>
            </div>
          );
        })}
      </div>
    </div>
  </AbsoluteFill>
);

// ── Scene 6: Caveat (44–50s = 1320–1500f) ───────────────────────────────────
const SceneCaveat = ({ f }: { f: number }) => (
  <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center", padding: "0 120px" }}>
    <div style={{ textAlign: "center" }}>
      <div style={{ opacity: fadeIn(f, 0, 22), color: GOLD, fontSize: 52, fontFamily: "sans-serif", marginBottom: 24 }}>
        ❝
      </div>
      <div style={{ opacity: fadeIn(f, 10, 25), transform: `translateY(${slideUp(f, 10)})`, color: "white", fontSize: 32, fontFamily: "sans-serif", fontStyle: "italic", lineHeight: 1.6, maxWidth: 900 }}>
        GDP size reflects aggregate economic weight,
        <span style={{ color: GOLD }}> not population wellbeing.</span>
      </div>
      <div style={{ opacity: fadeIn(f, 55, 20), color: "#a0b4cc", fontSize: 20, fontFamily: "sans-serif", marginTop: 30 }}>
        India's per capita income remains significantly lower<br />than the UK and Japan
      </div>
    </div>
  </AbsoluteFill>
);

// ── Scene 7: Outro (50–55s = 1500–1650f) ────────────────────────────────────
const SceneOutro = ({ f }: { f: number }) => {
  const p = spring({ frame: f, fps: FPS, config: { damping: 14, stiffness: 90 } });
  const scale = interpolate(p, [0, 1], [0.88, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = interpolate(f, [20, 55], [0, 300], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: DARK, justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center", transform: `scale(${scale})`, opacity: fadeIn(f, 0, 22) }}>
        <div style={{ color: GOLD, fontSize: 20, fontFamily: "sans-serif", letterSpacing: 6, textTransform: "uppercase", marginBottom: 10 }}>
          The Siasat Daily
        </div>
        <div style={{ color: "white", fontSize: 48, fontWeight: 800, fontFamily: "sans-serif" }}>India's Economy</div>
        <div style={{ color: "white", fontSize: 48, fontWeight: 800, fontFamily: "sans-serif" }}>A Temporary Setback</div>
        <div style={{ width: lineW, height: 3, background: GOLD, margin: "20px auto" }} />
        <div style={{ color: "#a0b4cc", fontSize: 20, fontFamily: "sans-serif" }}>www.siasat.com</div>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ─────────────────────────────────────────────────────────
export const MyComposition = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Audio src={staticFile("audio.mp3")} />
      <Sequence from={0}    durationInFrames={120}><SceneTitle    f={f} /></Sequence>
      <Sequence from={120}  durationInFrames={240}><SceneRankings f={f - 120} /></Sequence>
      <Sequence from={360}  durationInFrames={360}><SceneWhy      f={f - 360} /></Sequence>
      <Sequence from={720}  durationInFrames={270}><SceneIMF      f={f - 720} /></Sequence>
      <Sequence from={990}  durationInFrames={330}><SceneOutlook  f={f - 990} /></Sequence>
      <Sequence from={1320} durationInFrames={180}><SceneCaveat   f={f - 1320} /></Sequence>
      <Sequence from={1500} durationInFrames={150}><SceneOutro    f={f - 1500} /></Sequence>
    </AbsoluteFill>
  );
};
