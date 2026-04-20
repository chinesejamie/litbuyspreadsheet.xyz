import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, #242433 0%, #0a0a0f 55%, #050507 100%)",
        }}
      >
        <div
          style={{
            width: 132,
            height: 132,
            borderRadius: 32,
            background: "linear-gradient(180deg, #fff175 0%, #ffe34d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 4,
              color: "#0a0a0f",
              fontSize: 62,
              fontWeight: 900,
              letterSpacing: "-0.12em",
              lineHeight: 1,
              textTransform: "uppercase",
            }}
          >
            <span>L</span>
            <span style={{ opacity: 0.82 }}>B</span>
          </div>
        </div>
      </div>
    ),
    size
  );
}
