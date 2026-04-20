import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
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
            width: 372,
            height: 372,
            borderRadius: 88,
            background: "linear-gradient(180deg, #fff175 0%, #ffe34d 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 0 12px rgba(255, 227, 77, 0.08)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              color: "#0a0a0f",
              fontSize: 170,
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
