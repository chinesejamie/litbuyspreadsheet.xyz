import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import FloatingButtons from "@/components/FloatingButtons";
import ScrollToTop from "@/components/ScrollToTop";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { SchemaScript } from "@/components/seo/SchemaScript";
import { organizationSchema, webSiteSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LitBuy Spreadsheet 2026 — Finds, Outfits & Ordering Guide",
    template: "%s | LitBuy Reps Guide",
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SchemaScript
          schema={[organizationSchema(), webSiteSchema()]}
          id="root-schema"
        />
        <ScrollToTop />
        <Header />
        <main className="pt-[60px]">{children}</main>
        <FloatingButtons />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
