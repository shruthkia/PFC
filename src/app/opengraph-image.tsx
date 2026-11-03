import { ImageResponse } from "next/og";

export const alt = "PawsForCause — students showing up for animals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          background: "#fff6ef",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, #f7d6e0 0%, transparent 42%), radial-gradient(circle at 10% 92%, #f3e4b4 0%, transparent 38%)",
          color: "#5c4338",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            border: "3px solid #a8385d",
            borderRadius: 999,
            padding: "10px 22px",
            alignSelf: "flex-start",
            color: "#a8385d",
            fontSize: 26,
            letterSpacing: 4,
            fontWeight: 700,
            background: "#fffaf4",
          }}
        >
          STUDENT ANIMAL-WELFARE NETWORK
        </div>
        <div style={{ display: "flex", fontSize: 96, fontWeight: 800, marginTop: 34, letterSpacing: -3 }}>
          PawsForCause
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 10, color: "#a8385d" }}>
          chapters · scrap toys · shelter tasks
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 34, color: "#6f5a50", maxWidth: 900 }}>
          11 high school chapters across the US, Canada, Qatar, and India documenting real hours, toys, and funds.
        </div>
        <div style={{ display: "flex", gap: 18, marginTop: 44 }}>
          {["85+ toys donated", "$1,550 value", "$400 raised"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                border: "2px solid #d7b8c0",
                background: "#fffaf4",
                borderRadius: 18,
                padding: "10px 20px",
                fontSize: 24,
                color: "#5c4338",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
