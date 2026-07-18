// Tutorial sub-pages — informational deep-dives that complement the main
// /tutorial step-by-step. Targets specific long-tail "how to" queries that
// the main spreadsheet site (lit-buy-spreadsheet.com) does not cover.

export interface TutorialPage {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  hero: string;
  sections: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  keywords: string[];
}

export const TUTORIAL_PAGES: TutorialPage[] = [
  {
    slug: "qc-photos",
    title: "QC Photos Explained — How to Read & Verify Quality Control Photos",
    metaDescription:
      "Step-by-step guide to reading QC photos when ordering reps through LitBuy. What to look for, how to spot bad batches, and when to reject before shipping.",
    h1: "How to Read QC Photos",
    tagline: "Spotting bad batches before they ship.",
    hero:
      "Quality Control (QC) photos are the single most important step between paying for an item on Taobao or Weidian and actually receiving it. Once your shopping agent has the package at their warehouse, they photograph it and send the photos to you. You decide whether to ship or refund. Most rep buyers approve QC photos in 30 seconds and miss obvious flaws. This guide walks through how to actually read them — by garment type — and when you should reject.",
    sections: [
      {
        heading: "What QC photos actually show you",
        body:
          "Standard QC includes the product flat-laid from front and back, the brand label tag, the size tag, the original packaging if any, and any defects the agent noticed. For shoes, you also get a photo of each shoe individually plus the shoebox. For bags, an interior photo. Most agents include 5–8 photos per item. Premium QC services include 15–20 photos plus a 30-second video.",
      },
      {
        heading: "Universal red flags",
        body:
          "Reject any QC where: the brand label is glued or printed instead of stitched; the size tag has the wrong language or wrong size; stitching is uneven or has loose threads; the colour is visibly different from listing photos under daylight; the shoebox does not match the model. For shoes specifically, check that left and right are mirror images — factory mistakes happen and you can get two left shoes.",
      },
      {
        heading: "Garment-specific checks",
        body:
          "Hoodies: kangaroo pocket alignment, drawstring tip metal/plastic. Tees: neckline ribbing, hem clean. Pants: zipper brand, button quality, inseam length. Jackets: lining attachment, pit zip function, taped seams (for shells). Sneakers: midsole foam colour exact match, heel collar shape, outsole cleanness. Bags: hardware finish (chrome vs gold vs antique brass), interior lining presence, zipper pull engraving.",
      },
      {
        heading: "When to reject vs accept-with-discount",
        body:
          "Reject for: wrong colour, wrong size, missing major hardware, unrepairable defects (holes, stains). Accept-with-discount for: minor stitching irregularities you can live with, slightly off colour that is within batch variation, missing tag (you can verify the rest is right). Most agents will negotiate a 10–25% discount on accept-with-discount cases. Always reject if you have any doubt — the seller refunds, you order again.",
      },
      {
        heading: "Premium QC: when it is worth paying for",
        body:
          "Premium QC adds video and additional close-ups. Worth it for: shoes ($1–3 extra, catches outsole and midsole issues), leather goods ($2–4 extra, catches material quality), tailored pieces ($2–5 extra, catches construction). Not worth it for: basic tees, accessories under $20, or items where you are willing to live with batch variation.",
      },
    ],
    faq: [
      {
        q: "How long does QC take with LitBuy?",
        a: "Standard QC at the LitBuy warehouse is 24–72 hours from package arrival. You get an email when it is ready, then you have 48 hours to approve or request changes before the package goes into pending shipping. If you request additional photos, expect another 24 hours.",
      },
      {
        q: "Can I request additional QC photos?",
        a: "Yes — for free in most cases. Use the in-platform message system to ask for specific photos: 'please show interior of left shoe', 'photograph the inside seam of the right sleeve', etc. Be specific. Agents will not interpret vague requests like 'better photos'.",
      },
      {
        q: "What if I approve QC and the item arrives different?",
        a: "Once you approve QC, the agent's responsibility ends — they shipped what you saw. Damage claims can still be made if shipping caused issues, but quality issues you should have caught in QC are on you. That is why this guide exists.",
      },
    ],
    keywords: ["qc photos guide", "how to read qc photos", "litbuy qc", "rep buying qc photos", "taobao qc photos"],
  },
  {
    slug: "customs-declaration",
    title: "Customs Declaration Values for LitBuy Hauls — Per-Country Guide 2026",
    metaDescription:
      "Complete customs declaration guide for LitBuy hauls in 2026. Per-country tax-free thresholds, recommended declaration values and shipping line tips for US, UK, EU, Canada and Australia.",
    h1: "Customs Declaration for LitBuy Hauls",
    tagline: "Per-country thresholds and declaration strategies for 2026.",
    hero:
      "When your LitBuy package leaves the warehouse and crosses an international border, customs decides whether you owe import tax. The declaration value the agent puts on the parcel determines whether your package sails through or gets a tax bill. This guide covers the 2026 thresholds for major destination countries and how the LitBuy declaration system actually works in practice.",
    sections: [
      {
        heading: "How LitBuy declaration works",
        body:
          "When you ship a parcel from the LitBuy warehouse, you are asked to enter a declaration value in USD. This appears on the customs label. Customs in the destination country uses this value to calculate import tax, VAT and processing fees. Lower declarations mean lower tax — but underdeclaring carries seizure risk if the package is opened and the contents are obviously worth more.",
      },
      {
        heading: "United States — $800 de minimis",
        body:
          "The US has a $800 per-shipment de minimis: parcels declared under $800 USD enter duty-free for personal use. This is the highest threshold of any major country and makes the US the easiest destination. Recommended declaration: actual value, up to $700 to leave headroom. Best shipping lines: US Air LDT (cheapest, 7–10 days), US Tax-Free Line (slightly slower, more reliable).",
      },
      {
        heading: "United Kingdom — £135 threshold",
        body:
          "Below £135 (~$170 USD) declared value, you pay 20% VAT but no customs duty. Above £135 you pay VAT plus customs duty (often 12% for clothing). Recommended declaration: $17.90 USD with UK Line B is the community-standard low-tax route. Best shipping lines: UK-Yodel, Royal Mail. Avoid DHL Express (more aggressive customs inspection).",
      },
      {
        heading: "Germany & EU — €150 / €1000 thresholds",
        body:
          "Below €150 declared, you pay 19% VAT (Germany) or your country's standard VAT rate. Above €150 you pay VAT plus customs duty (12% for clothing, varies by HS code). Above €1,000 the package gets manual customs inspection. Recommended declaration: real value if under €150, otherwise split into multiple smaller hauls. Best shipping lines: EU-PostNL, EU-DHL eCommerce.",
      },
      {
        heading: "Canada — CAD $20 threshold",
        body:
          "Canada has the lowest threshold of any major country. Above CAD $20 (~$15 USD) you pay GST/HST plus duties. There is no cheap way to import to Canada legally. Recommended declaration: actual value but split orders into the smallest packages possible. Best shipping lines: CA-Yanwen, CA-Sunyou.",
      },
      {
        heading: "Australia — AUD $1000 threshold",
        body:
          "Australia has a generous AUD $1,000 (~$650 USD) threshold below which you only pay GST (10%) but no customs duty. Above $1,000 you pay GST plus duty (5–10% depending on HS code). Recommended declaration: actual value up to AUD $900 to leave buffer. Best shipping lines: AU-Special Line, AU-DHL eCommerce.",
      },
    ],
    faq: [
      {
        q: "Is underdeclaring on LitBuy parcels illegal?",
        a: "Technically yes — customs declarations are legal documents. In practice, customs in most countries does not pursue small underdeclarations on personal parcels, but they can confiscate the package and impose fines if they catch it. The LitBuy Spreadsheet community generally recommends declaring at the lower end of safe but not below 10% of actual value.",
      },
      {
        q: "What happens if my package is held by customs?",
        a: "You receive a notice (paper letter or email) requesting payment of duty/tax. Pay it through the carrier's portal and the package is released. If you refuse to pay, the package is destroyed or returned to sender. LitBuy refunds the product cost in return-to-sender cases but not shipping.",
      },
      {
        q: "Should I split a large haul into multiple shipments?",
        a: "Yes if the haul value exceeds the de minimis threshold of your country. Split into 2–3 packages each under the threshold. The shipping cost will be slightly higher (you pay base fees per package) but you save on import tax.",
      },
    ],
    keywords: ["litbuy customs declaration", "rep buying customs", "taobao customs values", "litbuy uk customs", "litbuy us customs", "litbuy declaration guide"],
  },
  {
    slug: "verifying-sellers",
    title: "How to Verify Taobao & Weidian Sellers — LitBuy Spreadsheet Guide",
    metaDescription:
      "Step-by-step guide to verifying Taobao and Weidian sellers before placing a LitBuy order. Reading seller ratings, sales history, refund rates and red flags to avoid bad batches.",
    h1: "How to Verify Sellers Before Ordering",
    tagline: "Reading the signals that separate trustworthy sellers from scammers.",
    hero:
      "The LitBuy Spreadsheet aggregates listings from thousands of sellers on Taobao, Weidian and 1688. Most are reliable. Some are not. The difference between a good haul and a bad one usually comes down to 30 seconds of seller research before you click 'add to LitBuy'. This guide walks through the specific signals to read on Taobao seller pages, Weidian shop pages and 1688 supplier listings.",
    sections: [
      {
        heading: "Taobao seller signals",
        body:
          "Taobao shows three crucial metrics: seller rating (1–5 hearts/diamonds/crowns), refund rate (lower is better, target under 1.5%), and DSR scores (Description / Service / Speed, target 4.7+ on each). Click into the seller's shop and check: total transaction count (10,000+ is established), shop age (over 2 years preferred), and refund rate trend. Avoid sellers with under 500 transactions or under 4.5 DSR on any axis.",
      },
      {
        heading: "Weidian shop signals",
        body:
          "Weidian is more curated than Taobao but less standardised. Look for: shop creation date (over 1 year), follower count (over 5,000 indicates established), and recent post engagement (active posting in the last 30 days). Weidian sellers often run on Instagram-like 'shops' rather than dedicated stores, so check their linked social media — a seller with no Instagram presence is harder to verify.",
      },
      {
        heading: "1688 supplier signals",
        body:
          "1688 is wholesale-focused so the signals differ. Look for: 'verified supplier' badge (passed Alibaba inspection), assessment supplier badge (factory audited), and trade volume (higher means more capacity). 1688 sellers do not always serve individual buyers — confirm with the LitBuy agent whether the supplier accepts MOQ-1 orders before placing.",
      },
      {
        heading: "Universal red flags",
        body:
          "Reject sellers showing any of: stock photos copied verbatim from Western brand sites (no in-house photography); listings under 30 days old with no review history; profile photo of celebrity or aspirational lifestyle (real sellers use product photos or shop logos); response time over 24 hours in pre-purchase questions. Most LitBuy Spreadsheet listings flag these signals automatically — the curated sellers have all passed basic vetting.",
      },
      {
        heading: "How the LitBuy Spreadsheet helps",
        body:
          "The LitBuy Spreadsheet pre-filters listings by seller reliability — most curated entries are from sellers with 1,000+ transactions and 4.5+ DSR scores. Listings on the spreadsheet still vary in seller quality, but you avoid the bottom 80% of marketplace sellers automatically by browsing through the spreadsheet rather than searching Taobao directly.",
      },
    ],
    faq: [
      {
        q: "What seller rating should I trust on Taobao?",
        a: "5 crowns is the highest tier and indicates over 1 million transactions. 5 diamonds (50,000–500,000 transactions) is plenty for most rep buying. Below 5 hearts (500–10,000 transactions), be cautious. The LitBuy Spreadsheet tags listings by seller tier so you can filter.",
      },
      {
        q: "Can I trust a brand-new Taobao seller with low reviews?",
        a: "Generally no — but with one exception. Established sellers sometimes open new shops to escape negative reviews on their main store. If the new shop has the same product range and writing style as a known-bad shop, avoid. If it is genuinely a new operation with high-quality original product photos, you can take a small test order at $20–50 to verify.",
      },
      {
        q: "Why does the same product appear from multiple sellers?",
        a: "Most factories sell to multiple resellers. The same item appears on five different Taobao stores at five different prices — the cheapest reseller is usually the closest to the factory. The LitBuy Spreadsheet flags duplicate-product listings and recommends the cheapest reliable source.",
      },
    ],
    keywords: ["verify taobao sellers", "weidian seller verification", "trustworthy taobao", "1688 verified supplier", "litbuy seller guide"],
  },
  {
    slug: "shipping-lines-explained",
    title: "LitBuy Shipping Lines Explained — Choosing the Right Line in 2026",
    metaDescription:
      "Understand every LitBuy shipping line in 2026: speed, cost, customs handling and which line to choose for your country. Air, sea and tax-friendly lines compared.",
    h1: "LitBuy Shipping Lines Explained",
    tagline: "Picking the right shipping line for your country and budget.",
    hero:
      "When you check out a LitBuy haul, you are presented with 8–15 different shipping lines, each with different speeds, prices and customs reliability. Pick wrong and you pay double, or your package sits in customs for three weeks. This guide breaks down each shipping line type, when to use which, and the specific lines worth using per destination country.",
    sections: [
      {
        heading: "Air vs sea — the basic decision",
        body:
          "Air freight: 5–20 days, $8–18 per kg, low risk of damage, all package sizes. Sea freight: 30–60 days, $2–5 per kg, higher risk of damage on fragile goods, only economical above 10 kg. Choose air for any haul under 10 kg. Choose sea for furniture, large electronics or bulk fashion (20+ items).",
      },
      {
        heading: "Standard air vs express air",
        body:
          "Standard air (10–20 days, $10–14/kg): default choice, good balance of speed and cost. Express air (5–10 days, $14–18/kg): pay $40–80 more for a 7-day delivery instead of 14-day. Worth it for time-sensitive items (fits for an event), not worth it for general restocking. Avoid 'super express' (3–5 days, $20+/kg) unless you really need it within the week.",
      },
      {
        heading: "Tax-friendly lines",
        body:
          "Some lines are specifically designed to avoid customs scrutiny in particular countries. UK Line B (under £18 declarations clear smoothly), US Tax-Free Line (consistently approves under $700), EU-PostNL (lower flag rate than DHL Express). These lines are usually slower (15–25 days) but cost the same as standard. Use them whenever your declaration is under your country's threshold.",
      },
      {
        heading: "Sea freight lines",
        body:
          "Sea freight is split into LCL (less than container load, what you almost certainly want) and FCL (full container load, business-scale only). LCL takes 35–60 days, costs $2–5/kg or $50–80 per CBM. Worth it only if your haul is over 10–15 kg or includes bulky low-density items (puffer jackets, shoes, bags). Customs handling is the same as air — declared value still determines tax.",
      },
      {
        heading: "Per-country recommendations",
        body:
          "US: US Air LDT (standard), US Tax-Free Line (under $700 declarations). UK: UK-Yodel (standard), UK Line B (under £18 declarations). Germany/EU: EU-PostNL (standard), EU-DHL eCommerce (slightly faster). Canada: CA-Yanwen (cheapest available), CA-Sunyou. Australia: AU-Special Line (standard), AU-DHL eCommerce (faster). The LitBuy Spreadsheet links to a customs calculator that estimates tax per line per country.",
      },
    ],
    faq: [
      {
        q: "Why are some shipping lines cheaper for the same speed?",
        a: "Two reasons. First, some lines do not include insurance — if the package is lost, you eat the cost. Second, some lines have less reliable customs handling — they get held more often, leading to delays. Always check whether a line includes insurance and whether it has a 'sensitive goods' surcharge (electronics, batteries, liquids).",
      },
      {
        q: "Can I split shipping across multiple lines?",
        a: "Yes — useful if your haul has both fragile items (need air) and bulk fashion (could go sea). Split-ship at the LitBuy warehouse: items on one declaration go via line A, others via line B. Costs slightly more in handling fees but can save money overall.",
      },
      {
        q: "What happens if my package is lost in shipping?",
        a: "If the line includes insurance (most do), file a claim through the LitBuy platform. Refund processing takes 14–30 days. If the line does not include insurance (cheapest options), you have no recourse — the package is gone. Always check insurance coverage before picking the cheapest line.",
      },
    ],
    keywords: ["litbuy shipping lines", "rep buying shipping", "taobao shipping options", "litbuy us shipping", "litbuy uk shipping", "litbuy germany shipping"],
  },
  {
    slug: "first-haul-checklist",
    title: "First LitBuy Haul Checklist — Step-by-Step for New Buyers 2026",
    metaDescription:
      "Complete first-haul checklist for new LitBuy Spreadsheet shoppers. Account setup, finding products, ordering, QC photos, shipping and delivery — 12 steps end to end.",
    h1: "Your First LitBuy Haul — Step by Step",
    tagline: "12 steps from account creation to delivery.",
    hero:
      "If you have never ordered through a Chinese shopping agent before, the LitBuy Spreadsheet workflow can feel intimidating: copy a link, paste it into another platform, wait for a warehouse, approve photos, choose a shipping line. This guide is a checklist for your first haul. Follow it step by step and your first order will arrive without surprises.",
    sections: [
      {
        heading: "Steps 1–3: Setup",
        body:
          "1. Create a LitBuy account at litbuy.com — use any email, no payment required upfront. 2. Verify your email and shipping address (do not lie about your address — customs sees the real one). 3. Add a payment method — credit card, PayPal or Wise transfer. Some payment methods have lower fees than others, check before depositing.",
      },
      {
        heading: "Steps 4–6: Finding products",
        body:
          "4. Open the LitBuy Spreadsheet and filter by category, brand or price. 5. Click into a product, review the QC photos already on the listing if any. 6. Copy the Taobao or Weidian link from the listing. Do not paste it into your browser — paste it into LitBuy directly.",
      },
      {
        heading: "Steps 7–9: Ordering",
        body:
          "7. In LitBuy, click 'Add to cart' and paste the link. 8. Select size, colour and any options the seller requires. Read the size chart in cm, not size labels. 9. Pay for the products. The agent now buys from the seller on your behalf — typically 1–3 days until the package arrives at the LitBuy warehouse.",
      },
      {
        heading: "Steps 10–12: QC, shipping, delivery",
        body:
          "10. When the package arrives at the warehouse, you receive a QC photo email. Review using our QC photos guide — accept, reject or request additional photos. 11. Once all items in your cart are QC-approved, choose a shipping line. Use our shipping lines guide to pick the right one for your country. 12. Pay for shipping. Track the package via the line's tracking link. Delivery is 5–60 days depending on line. Sign for the package on delivery — done.",
      },
      {
        heading: "Common mistakes new buyers make",
        body:
          "Ordering too many items at once: start with 3–5 pieces in your first haul, not 20. Picking the cheapest shipping without reading insurance coverage: pay the extra $5 for insurance on your first order. Approving QC in 5 seconds without checking: spend 60 seconds per item, every time. Underdeclaring without understanding your country's threshold: read our customs guide first.",
      },
    ],
    faq: [
      {
        q: "What is the realistic budget for a first LitBuy haul?",
        a: "$120–250 USD total including shipping for 3–5 items. That is enough to test the process — verify your country's customs handling, evaluate the QC quality, see how long shipping really takes — without risking too much money if something goes wrong.",
      },
      {
        q: "How long does the entire process take?",
        a: "Realistically 14–28 days from order to delivery. Breakdown: 1–3 days for the seller to ship to LitBuy warehouse, 1–2 days for QC, 0–7 days for you to approve QC and pay shipping (varies on your speed), 7–20 days actual shipping. Add 3–7 days if you split-ship or request additional QC.",
      },
      {
        q: "Should I tell anyone what is in the package?",
        a: "Not strictly required — the customs declaration on the package label is what matters. If a courier asks at delivery, you can describe the contents truthfully. Do not lie to customs officers if directly questioned. Most of the time no one asks.",
      },
    ],
    keywords: ["first litbuy haul", "litbuy beginner guide", "first time litbuy", "rep buying first time", "how to start litbuy"],
  },
];

export function getTutorialPage(slug: string): TutorialPage | undefined {
  return TUTORIAL_PAGES.find((p) => p.slug === slug);
}
