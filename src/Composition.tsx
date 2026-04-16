import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  Sequence,
  Audio,
  staticFile,
} from "remotion";

// Load local fonts via style injection
const style = document.createElement("style");
style.textContent = `
  @font-face {
    font-family: 'UbuntuCustom';
    src: url('${staticFile("fonts/Ubuntu-Bold.ttf")}') format('truetype');
    font-weight: 700 900;
  }
  @font-face {
    font-family: 'UbuntuCustom';
    src: url('${staticFile("fonts/Ubuntu-Regular.ttf")}') format('truetype');
    font-weight: 400;
  }
  @font-face {
    font-family: 'UbuntuCustom';
    src: url('${staticFile("fonts/Ubuntu-Medium.ttf")}') format('truetype');
    font-weight: 500 600;
  }
  @font-face {
    font-family: 'OpenSansCustom';
    src: url('${staticFile("fonts/OpenSans-ExtraBold.ttf")}') format('truetype');
    font-weight: 800 900;
  }
  @font-face {
    font-family: 'OpenSansCustom';
    src: url('${staticFile("fonts/OpenSans-Bold.ttf")}') format('truetype');
    font-weight: 700;
  }
  @font-face {
    font-family: 'OpenSansCustom';
    src: url('${staticFile("fonts/OpenSans-Regular.ttf")}') format('truetype');
    font-weight: 400 500 600;
  }
`;
if (typeof document !== "undefined") document.head.appendChild(style);

const montserrat = "'OpenSansCustom', sans-serif";
const inter = "'UbuntuCustom', sans-serif";

const FPS = 30;
const DARK = "#060644";
const GOLD = "#eeab2b";
const GOLD2 = "#f5c842";
const W = 1080;
const H = 1920;

// ── Helpers ──────────────────────────────────────────────────────────────────
const fi = (frame: number, from: number, to: number, inStart: number, inEnd: number) =>
  interpolate(frame, [inStart, inEnd], [from, to], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const fadeIn = (f: number, start: number, dur = 20) => fi(f, 0, 1, start, start + dur);

const sp = (f: number, delay: number, stiffness = 120, damping = 14) =>
  spring({ frame: f - delay, fps: FPS, config: { stiffness, damping } });

// ── Background — animated gradient ───────────────────────────────────────────
const Bg = ({ f }: { f: number }) => {
  const shift = fi(f, 0, 30, 0, 1500);
  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at 50% ${30 + shift}%, #0d1a5e 0%, #060644 55%, #020318 100%)`,
    }}>
      {/* subtle grid lines */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(238,171,43,0.04) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(238,171,43,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      {/* glow orb top */}
      <div style={{
        position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)",
        width: 700, height: 700, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(238,171,43,0.12) 0%, transparent 70%)",
      }} />
      {/* glow orb bottom */}
      <div style={{
        position: "absolute", bottom: -200, left: "50%", transform: "translateX(-50%)",
        width: 500, height: 500, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(13,26,94,0.8) 0%, transparent 70%)",
      }} />
    </AbsoluteFill>
  );
};

// ── Scene 1: Title (0–4s = 0–120f) ───────────────────────────────────────────
const SceneTitle = ({ f }: { f: number }) => {
  const logoScale = interpolate(sp(f, 5, 80, 18), [0, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = fi(f, 0, 280, 35, 75);
  const titleY = interpolate(sp(f, 20, 120, 14), [0, 1], [60, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sub1O = fadeIn(f, 45, 22);
  const sub2O = fadeIn(f, 65, 22);
  const badgeO = fadeIn(f, 80, 20);

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 70px" }}>
      <Bg f={f} />
      <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
        {/* Breaking badge */}
        <div style={{
          opacity: badgeO, display: "inline-flex", alignItems: "center", gap: 10,
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
          borderRadius: 50, padding: "10px 28px", marginBottom: 36,
        }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#060644" }} />
          <span style={{ fontFamily: montserrat, fontWeight: 800, fontSize: 22, color: "#060644", letterSpacing: 3, textTransform: "uppercase" }}>
            Breaking News
          </span>
        </div>

        {/* Main title */}
        <div style={{ transform: `translateY(${titleY}px)`, opacity: fadeIn(f, 15, 22) }}>
          <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 88, color: "white", lineHeight: 1.05, marginBottom: 10 }}>
            India
          </div>
          <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 70, color: "white", lineHeight: 1.05, marginBottom: 10 }}>
            Slips to
          </div>
          <div style={{
            fontFamily: montserrat, fontWeight: 900, fontSize: 160, lineHeight: 1,
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            6th
          </div>
        </div>

        {/* Gold line */}
        <div style={{ width: lineW, height: 4, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "28px auto" }} />

        <div style={{ opacity: sub1O, fontFamily: inter, fontWeight: 500, fontSize: 34, color: "rgba(255,255,255,0.85)", marginBottom: 12 }}>
          Largest Economy
        </div>
        <div style={{ opacity: sub2O, fontFamily: inter, fontWeight: 400, fontSize: 26, color: "rgba(238,171,43,0.8)" }}>
          Falls Behind the United Kingdom
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 2: Rankings (4–12s = 120–360f) ──────────────────────────────────────
const rankings = [
  { pos: "1", country: "USA", gdp: "$29.2T", flag: "🇺🇸" },
  { pos: "2", country: "China", gdp: "$18.7T", flag: "🇨🇳" },
  { pos: "3", country: "Japan", gdp: "$4.38T", flag: "🇯🇵" },
  { pos: "4", country: "UK", gdp: "$4.26T", flag: "🇬🇧", highlight: true },
  { pos: "5→6", country: "India", gdp: "$3.92T", flag: "🇮🇳", demoted: true },
];

const SceneRankings = ({ f }: { f: number }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px" }}>
    <Bg f={f} />
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ opacity: fadeIn(f, 0, 18), textAlign: "center", marginBottom: 44 }}>
        <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 46, color: GOLD, letterSpacing: 2, textTransform: "uppercase" }}>
          GDP Rankings
        </div>
        <div style={{ fontFamily: inter, fontWeight: 400, fontSize: 26, color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
          2025 Global Economy
        </div>
      </div>

      {rankings.map((r, i) => {
        const p = sp(f, 15 + i * 22, 110, 15);
        const itemY = interpolate(p, [0, 1], [50, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const itemO = fadeIn(f, 15 + i * 22, 18);
        return (
          <div key={r.country} style={{
            opacity: itemO,
            transform: `translateY(${itemY}px)`,
            display: "flex", alignItems: "center",
            background: r.demoted
              ? `linear-gradient(135deg, rgba(238,171,43,0.18), rgba(238,171,43,0.05))`
              : "rgba(255,255,255,0.04)",
            border: r.demoted ? `1.5px solid ${GOLD}` : "1.5px solid rgba(255,255,255,0.08)",
            borderRadius: 18, padding: "20px 28px", marginBottom: 14,
            boxShadow: r.demoted ? `0 0 30px rgba(238,171,43,0.15)` : "none",
          }}>
            <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 28, color: r.demoted ? GOLD : "rgba(255,255,255,0.35)", width: 72 }}>
              #{r.pos}
            </div>
            <div style={{ fontSize: 42, marginRight: 18 }}>{r.flag}</div>
            <div style={{ flex: 1, fontFamily: montserrat, fontWeight: 700, fontSize: 32, color: r.demoted ? "white" : "rgba(255,255,255,0.88)" }}>
              {r.country}
            </div>
            <div style={{ fontFamily: inter, fontWeight: 600, fontSize: 28, color: r.demoted ? GOLD : "rgba(255,255,255,0.6)" }}>
              {r.gdp}
            </div>
          </div>
        );
      })}
    </div>
  </AbsoluteFill>
);

// ── Scene 3: Why (12–24s = 360–720f) ─────────────────────────────────────────
const reasons = [
  {
    num: "01",
    title: "GDP Base Year Revised",
    body: "India shifted base year 2011→2022, cutting nominal GDP by ~3.8%",
    icon: "📊",
  },
  {
    num: "02",
    title: "Rupee Depreciation",
    body: "INR fell ~10% vs USD in FY26, shrinking dollar-denominated GDP",
    icon: "📉",
  },
];

const SceneWhy = ({ f }: { f: number }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px" }}>
    <Bg f={f} />
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ opacity: fadeIn(f, 0, 18), textAlign: "center", marginBottom: 50 }}>
        <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 46, color: GOLD, textTransform: "uppercase", letterSpacing: 2 }}>
          Why Did This Happen?
        </div>
      </div>

      {reasons.map((r, i) => {
        const p = sp(f, 20 + i * 80, 100, 15);
        const y = interpolate(p, [0, 1], [70, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const o = fadeIn(f, 20 + i * 80, 22);
        return (
          <div key={r.num} style={{
            opacity: o, transform: `translateY(${y}px)`,
            background: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
            border: `1.5px solid rgba(238,171,43,0.3)`,
            borderLeft: `5px solid ${GOLD}`,
            borderRadius: 22, padding: "40px 38px", marginBottom: 30,
            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 18 }}>
              <div style={{ fontSize: 52 }}>{r.icon}</div>
              <div>
                <div style={{ fontFamily: montserrat, fontWeight: 800, fontSize: 16, color: GOLD, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
                  Reason {r.num}
                </div>
                <div style={{ fontFamily: montserrat, fontWeight: 800, fontSize: 34, color: "white", lineHeight: 1.2 }}>
                  {r.title}
                </div>
              </div>
            </div>
            <div style={{ fontFamily: inter, fontWeight: 400, fontSize: 28, color: "rgba(255,255,255,0.72)", lineHeight: 1.55 }}>
              {r.body}
            </div>
          </div>
        );
      })}
    </div>
  </AbsoluteFill>
);

// ── Scene 4: IMF Cut (24–33s = 720–990f) ──────────────────────────────────────
const SceneIMF = ({ f }: { f: number }) => {
  const numP = sp(f, 25, 60, 20);
  const numVal = interpolate(numP, [0, 1], [0, 380], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ringScale = interpolate(sp(f, 20, 50, 25), [0, 1], [0.3, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 70px" }}>
      <Bg f={f} />
      <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
        <div style={{ opacity: fadeIn(f, 0, 18), fontFamily: montserrat, fontWeight: 900, fontSize: 46, color: GOLD, textTransform: "uppercase", letterSpacing: 2, marginBottom: 60 }}>
          IMF Forecast Cut
        </div>

        {/* Big animated ring */}
        <div style={{
          transform: `scale(${ringScale})`, opacity: fadeIn(f, 15, 22),
          width: 480, height: 480, borderRadius: "50%",
          border: `3px solid rgba(238,171,43,0.25)`,
          background: "radial-gradient(circle, rgba(238,171,43,0.08) 0%, transparent 70%)",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          margin: "0 auto 50px",
          boxShadow: `0 0 80px rgba(238,171,43,0.15), inset 0 0 80px rgba(238,171,43,0.05)`,
        }}>
          <div style={{
            fontFamily: montserrat, fontWeight: 900, fontSize: 110,
            background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
            ${Math.round(numVal)}B
          </div>
          <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 26, color: "rgba(255,255,255,0.6)" }}>
            slashed
          </div>
        </div>

        <div style={{ opacity: fadeIn(f, 60, 20) }}>
          <div style={{ fontFamily: inter, fontWeight: 400, fontSize: 30, color: "rgba(255,255,255,0.75)", marginBottom: 14 }}>
            2027 GDP estimate reduced
          </div>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 24 }}>
            <div style={{ fontFamily: montserrat, fontWeight: 700, fontSize: 38, color: "rgba(255,255,255,0.5)", textDecoration: "line-through" }}>
              $4.96T
            </div>
            <div style={{ fontSize: 32, color: GOLD }}>→</div>
            <div style={{ fontFamily: montserrat, fontWeight: 800, fontSize: 42, color: "white" }}>
              $4.58T
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 5: Outlook (33–44s = 990–1320f) ─────────────────────────────────────
const SceneOutlook = ({ f }: { f: number }) => (
  <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 60px" }}>
    <Bg f={f} />
    <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
      <div style={{ opacity: fadeIn(f, 0, 18), fontFamily: montserrat, fontWeight: 900, fontSize: 46, color: GOLD, textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
        The Road Ahead
      </div>
      <div style={{ opacity: fadeIn(f, 12, 22), fontFamily: inter, fontWeight: 400, fontSize: 28, color: "rgba(255,255,255,0.6)", marginBottom: 50 }}>
        India bouncing back by 2027
      </div>

      {/* Projection card */}
      <div style={{
        opacity: fadeIn(f, 20, 22),
        transform: `scale(${interpolate(sp(f, 20, 90, 15), [0,1], [0.9, 1], {extrapolateLeft:"clamp",extrapolateRight:"clamp"})})`,
        background: `linear-gradient(135deg, rgba(238,171,43,0.15), rgba(238,171,43,0.04))`,
        border: `2px solid rgba(238,171,43,0.4)`,
        borderRadius: 28, padding: "50px 40px", marginBottom: 30,
        boxShadow: `0 0 60px rgba(238,171,43,0.12)`,
      }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>🚀</div>
        <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 52, color: "white", marginBottom: 12 }}>
          Reclaims <span style={{ color: GOLD }}>4th</span>
        </div>
        <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 30, color: "rgba(255,255,255,0.75)" }}>
          Projected by 2027
        </div>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {[{ label: "vs UK", val: "+$113B" }, { label: "vs Japan", val: "+$17B" }].map((item, i) => (
          <div key={item.label} style={{
            opacity: fadeIn(f, 65 + i * 30, 22), flex: 1,
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(238,171,43,0.25)",
            borderRadius: 18, padding: "26px 16px",
          }}>
            <div style={{ fontFamily: inter, fontWeight: 500, fontSize: 24, color: "rgba(255,255,255,0.6)", marginBottom: 10 }}>{item.label}</div>
            <div style={{ fontFamily: montserrat, fontWeight: 800, fontSize: 36, color: GOLD }}>{item.val}</div>
          </div>
        ))}
      </div>
    </div>
  </AbsoluteFill>
);

// ── Scene 6: Quote (44–50s = 1320–1500f) ──────────────────────────────────────
const SceneQuote = ({ f }: { f: number }) => {
  const lineH = fi(f, 0, 160, 25, 65);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", padding: "0 70px" }}>
      <Bg f={f} />
      <div style={{ position: "relative", width: "100%", textAlign: "center" }}>
        <div style={{
          opacity: fadeIn(f, 0, 25),
          fontFamily: montserrat, fontWeight: 900, fontSize: 130,
          color: GOLD, lineHeight: 0.8, marginBottom: 30, opacity: fadeIn(f, 0, 22),
        }}>
          ❝
        </div>
        <div style={{
          opacity: fadeIn(f, 18, 25),
          transform: `translateY(${interpolate(sp(f, 18, 110, 14), [0, 1], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })})`,
          fontFamily: inter, fontWeight: 500, fontSize: 36, color: "white",
          lineHeight: 1.6, marginBottom: 40,
        }}>
          GDP size reflects economic weight,{" "}
          <span style={{ color: GOLD, fontWeight: 700 }}>not the wellbeing</span>{" "}
          of the population.
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, opacity: fadeIn(f, 60, 20) }}>
          <div style={{ width: 2, height: lineH, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />
          <div style={{ fontFamily: inter, fontWeight: 400, fontSize: 24, color: "rgba(255,255,255,0.55)", textAlign: "left" }}>
            India's per capita income<br />remains far below UK & Japan
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Scene 7: Outro (50–55s = 1500–1650f) ──────────────────────────────────────
const SceneOutro = ({ f }: { f: number }) => {
  const scale = interpolate(sp(f, 0, 90, 15), [0, 1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const lineW = fi(f, 0, 360, 25, 65);
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <Bg f={f} />
      <div style={{ position: "relative", textAlign: "center", transform: `scale(${scale})`, opacity: fadeIn(f, 0, 22) }}>
        {/* Logo badge */}
        <div style={{
          display: "inline-block",
          background: `linear-gradient(135deg, ${GOLD}, ${GOLD2})`,
          borderRadius: 20, padding: "14px 36px", marginBottom: 36,
        }}>
          <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 28, color: "#060644", letterSpacing: 2 }}>
            THE SIASAT DAILY
          </div>
        </div>

        <div style={{ fontFamily: montserrat, fontWeight: 900, fontSize: 68, color: "white", lineHeight: 1.1, marginBottom: 10 }}>
          India's Economy
        </div>
        <div style={{ fontFamily: montserrat, fontWeight: 700, fontSize: 46, color: GOLD, marginBottom: 30 }}>
          A Temporary Setback
        </div>

        <div style={{ width: lineW, height: 3, background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, margin: "0 auto 30px" }} />

        <div style={{ fontFamily: inter, fontWeight: 400, fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
          www.siasat.com
        </div>
        <div style={{ fontFamily: inter, fontWeight: 400, fontSize: 22, color: "rgba(238,171,43,0.6)", marginTop: 10 }}>
          Follow for more updates
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ── Main Composition ──────────────────────────────────────────────────────────
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
      <Sequence from={1320} durationInFrames={180}><SceneQuote    f={f - 1320} /></Sequence>
      <Sequence from={1500} durationInFrames={150}><SceneOutro    f={f - 1500} /></Sequence>
    </AbsoluteFill>
  );
};
