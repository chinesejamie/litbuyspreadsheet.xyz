import Script from "next/script";
import { GA_MEASUREMENT_IDS, GA_PRIMARY_ID } from "@/lib/analytics";

/**
 * Loads gtag.js once and configures every measurement ID. Rendered from the
 * root layout so every route (including ISR product pages) is tracked.
 * `afterInteractive` keeps it off the critical rendering path.
 */
export default function GoogleAnalytics() {
  if (!GA_PRIMARY_ID) return null;

  const configLines = GA_MEASUREMENT_IDS.map(
    (id) => `gtag('config', '${id}');`
  ).join("\n");

  return (
    <>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_PRIMARY_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
${configLines}`}
      </Script>
    </>
  );
}
