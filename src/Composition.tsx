import { AbsoluteFill } from "remotion";

export const MyComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f0f0f", justifyContent: "center", alignItems: "center" }}>
      <h1 style={{ color: "white", fontSize: 80, fontFamily: "sans-serif" }}>
        Hello, Remotion!
      </h1>
    </AbsoluteFill>
  );
};
