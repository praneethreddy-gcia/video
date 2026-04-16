import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

const fps = 30;

function fadeIn(frame: number, start: number, duration = 20) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
}

function slideUp(frame: number, start: number) {
  const progress = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 120 } });
  return interpolate(progress, [0, 1], [40, 0]);
}

// Scene 1: Intro — 0 to 4s (120 frames)
const Intro = ({ frame }: { frame: number }) => {
  const opacity = fadeIn(frame, 0, 25);
  const titleY = slideUp(frame, 5);
  const taglineOpacity = fadeIn(frame, 30, 20);
  const lineScale = interpolate(frame, [40, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity, transform: `translateY(${titleY}px)` }}>
          <div style={{ color: "#c9a84c", fontSize: 22, fontFamily: "sans-serif", letterSpacing: 6, textTransform: "uppercase", marginBottom: 12 }}>
            Guardian Capital
          </div>
          <div style={{ color: "white", fontSize: 72, fontFamily: "sans-serif", fontWeight: 800, letterSpacing: 2 }}>
            GCIA
          </div>
        </div>
        <div style={{
          width: 120, height: 3, background: "#c9a84c", margin: "18px auto",
          transform: `scaleX(${lineScale})`, transformOrigin: "center"
        }} />
        <div style={{ opacity: taglineOpacity, color: "#a0b8d0", fontSize: 26, fontFamily: "sans-serif", fontStyle: "italic" }}>
          Your Guardian Angel
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 2: Who We Are — 4s to 9s (120–270 frames)
const WhoWeAre = ({ frame }: { frame: number }) => {
  const opacity = fadeIn(frame, 0, 20);
  const labelY = slideUp(frame, 5);
  const textOpacity = fadeIn(frame, 20, 25);
  const textY = slideUp(frame, 20);

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ opacity, transform: `translateY(${labelY}px)`, color: "#c9a84c", fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 24 }}>
          Who We Are
        </div>
        <div style={{ opacity: textOpacity, transform: `translateY(${textY}px)`, color: "white", fontSize: 38, fontFamily: "sans-serif", fontWeight: 600, lineHeight: 1.4, maxWidth: 900 }}>
          India's fastest growing{" "}
          <span style={{ color: "#c9a84c" }}>SEBI-registered</span>{" "}
          Investment Advisory Firm
        </div>
        <div style={{ opacity: fadeIn(frame, 45, 20), color: "#a0b8d0", fontSize: 22, fontFamily: "sans-serif", marginTop: 20 }}>
          Founded 2016 · Trusted by thousands of families
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 3: Services — 9s to 17s (270–510 frames)
const services = [
  "Wealth Management",
  "Financial Planning",
  "Tax & Accounting",
  "Estate Planning",
  "Insurance Advisory",
  "Real Estate Advisory",
];

const Services = ({ frame }: { frame: number }) => {
  const labelOpacity = fadeIn(frame, 0, 20);

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ opacity: labelOpacity, color: "#c9a84c", fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 40 }}>
          What We Offer
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20 }}>
          {services.map((s, i) => {
            const itemOpacity = fadeIn(frame, 15 + i * 18, 18);
            const itemY = slideUp(frame, 15 + i * 18);
            return (
              <div key={s} style={{
                opacity: itemOpacity,
                transform: `translateY(${itemY}px)`,
                background: "rgba(201, 168, 76, 0.12)",
                border: "1px solid rgba(201, 168, 76, 0.4)",
                borderRadius: 12,
                padding: "16px 28px",
                color: "white",
                fontSize: 22,
                fontFamily: "sans-serif",
                fontWeight: 500,
              }}>
                {s}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 4: Key Stats — 17s to 23s (510–690 frames)
const stats = [
  { value: "2016", label: "Founded" },
  { value: "2.5 Yrs", label: "To become one of India's largest" },
  { value: "100%", label: "Commission Transparency" },
];

const Stats = ({ frame }: { frame: number }) => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ opacity: fadeIn(frame, 0, 20), color: "#c9a84c", fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 50 }}>
          By The Numbers
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 60 }}>
          {stats.map((s, i) => {
            const p = spring({ frame: frame - (10 + i * 20), fps, config: { damping: 12, stiffness: 100 } });
            const scale = interpolate(p, [0, 1], [0.5, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const opacity = fadeIn(frame, 10 + i * 20, 18);
            return (
              <div key={s.value} style={{ opacity, transform: `scale(${scale})`, textAlign: "center", maxWidth: 220 }}>
                <div style={{ color: "#c9a84c", fontSize: 60, fontFamily: "sans-serif", fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: "#a0b8d0", fontSize: 18, fontFamily: "sans-serif", marginTop: 8 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 5: Values — 23s to 28s (690–840 frames)
const values = ["Integrity", "Clear Thinking", "Ownership", "Passion", "Perfection"];

const Values = ({ frame }: { frame: number }) => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", justifyContent: "center", alignItems: "center", padding: 80 }}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ opacity: fadeIn(frame, 0, 20), color: "#c9a84c", fontSize: 18, fontFamily: "sans-serif", letterSpacing: 5, textTransform: "uppercase", marginBottom: 40 }}>
          Our Core Values
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          {values.map((v, i) => {
            const opacity = fadeIn(frame, 10 + i * 16, 16);
            const y = slideUp(frame, 10 + i * 16);
            return (
              <div key={v} style={{
                opacity, transform: `translateY(${y}px)`,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: 50,
                padding: "14px 26px",
                color: "white",
                fontSize: 20,
                fontFamily: "sans-serif",
              }}>
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Scene 6: Outro — 28s to 30s (840–900 frames)
const Outro = ({ frame }: { frame: number }) => {
  const opacity = fadeIn(frame, 0, 20);
  const scale = spring({ frame, fps, config: { damping: 14, stiffness: 100 } });
  const s = interpolate(scale, [0, 1], [0.85, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)", justifyContent: "center", alignItems: "center" }}>
      <div style={{ opacity, transform: `scale(${s})`, textAlign: "center" }}>
        <div style={{ color: "#c9a84c", fontSize: 22, fontFamily: "sans-serif", letterSpacing: 6, textTransform: "uppercase", marginBottom: 10 }}>
          Guardian Capital
        </div>
        <div style={{ color: "white", fontSize: 72, fontFamily: "sans-serif", fontWeight: 800 }}>GCIA</div>
        <div style={{ color: "#a0b8d0", fontSize: 24, fontFamily: "sans-serif", marginTop: 20 }}>www.gcia.in</div>
        <div style={{ color: "#c9a84c", fontSize: 18, fontFamily: "sans-serif", marginTop: 8, fontStyle: "italic" }}>
          Your Guardian Angel
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  const { fps: videoFps } = useVideoConfig();
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={120}><Intro frame={frame} /></Sequence>
      <Sequence from={120} durationInFrames={150}><WhoWeAre frame={frame - 120} /></Sequence>
      <Sequence from={270} durationInFrames={240}><Services frame={frame - 270} /></Sequence>
      <Sequence from={510} durationInFrames={180}><Stats frame={frame - 510} /></Sequence>
      <Sequence from={690} durationInFrames={150}><Values frame={frame - 690} /></Sequence>
      <Sequence from={840} durationInFrames={60}><Outro frame={frame - 840} /></Sequence>
    </AbsoluteFill>
  );
};
