import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top left, #242433 0%, #0a0a0f 45%, #050507 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -140,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "rgba(255, 227, 77, 0.14)",
            filter: "blur(8px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255, 227, 77, 0.08)",
            filter: "blur(6px)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 18,
                background: "#ffe34d",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#0a0a0f",
                fontSize: 34,
                fontWeight: 900,
                letterSpacing: "-0.08em",
              }}
            >
              LB
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#a5a5bc",
                textTransform: "uppercase",
                letterSpacing: "0.18em",
              }}
            >
              LitBuy Spreadsheet
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 22,
              maxWidth: 940,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 0,
                fontSize: 126,
                fontWeight: 900,
                letterSpacing: "-0.08em",
                lineHeight: 0.9,
                textTransform: "lowercase",
              }}
            >
              <span style={{ color: "#ffe34d" }}>lit</span>
              <span>buy</span>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 56,
                fontWeight: 800,
                lineHeight: 1.05,
                color: "white",
              }}
            >
              2026 spreadsheet, verified finds, links and buying guide
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 30,
                lineHeight: 1.3,
                color: "#a5a5bc",
                maxWidth: 860,
              }}
            >
              Browse curated products, tutorials and direct links in one fast,
              mobile-friendly index.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 24,
              color: "#a5a5bc",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "#ffe34d",
                }}
              />
              Updated weekly
            </div>
            <div style={{ display: "flex" }}>litbuyspreadsheet.xyz</div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
