import type { Metadata } from "next";

// Categories page is a pure client-side UI — no unique SEO content.
// Noindex prevents it from competing with /litbuy-spreadsheet for crawl budget.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
