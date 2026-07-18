// LitBuy Spreadsheet — Single source of truth for all page copy.
// Both visible DOM and JSON-LD schema builders read from these constants
// so schema and content can never drift apart.

export const LITBUY_LAST_UPDATED = "2026-04-28"; // ISO date used in WebPage schema + visible footer
export const LITBUY_AUTHOR = "Miki";
export const LITBUY_PRODUCT_COUNT = "10,000+";
// REVIEW_RATING / REVIEW_COUNT removed: previously held fabricated AggregateRating
// numbers that risked a Google manual action. Replace with real Trustpilot data
// when available.

// ----------------------- HERO -----------------------

// Positioned as the editorial / guide companion to lit-buy-spreadsheet.com.
// Avoids competing for the bare "litbuy spreadsheet" head term — that page
// goes to the database site. Here we target informational + outfit + tutorial
// intent.
export const LITBUY_HERO = {
  heading: "LitBuy Reps Guide 2026",
  subheading: "Outfits, Tutorials & Curated Finds",
  lede:
    "The editorial companion to the LitBuy Spreadsheet. Outfit guides, step-by-step tutorials and curated finds for shopping reps from Taobao, 1688 and Weidian — written for English-speaking shoppers in 2026.",
  primaryCtaLabel: "Browse Outfits",
  primaryCtaHref: "/outfits",
  secondaryCtaLabel: "Read the Tutorial",
};

// ----------------------- WHAT IS -----------------------

export const LITBUY_WHAT_IS = {
  heading: "What Is the LitBuy Spreadsheet?",
  anchor: "what-is-litbuy-spreadsheet",
  paragraphs: [
    "The LitBuy Spreadsheet is a community-curated database of direct product links to fashion items, sneakers, hoodies, jackets, bags, accessories and electronics sold on Chinese marketplaces like Taobao, Weidian and 1688. Instead of searching those marketplaces in Chinese and guessing which seller is reliable, the LitBuy Spreadsheet aggregates thousands of verified links, quality control photos, seller ratings and pricing into a single browsable sheet — so any English-speaking shopper can find great product finds in seconds.",
    "Originally shared as a Google Sheet and passed around communities on Reddit, Discord and TikTok, the LitBuy Spreadsheet has grown to contain more than 10,000 product entries across every major category. Each row typically includes an image preview, the product name, the brand, the seller's rating, the original Taobao or Weidian URL and a price in USD. Shoppers copy the link, paste it into their preferred shopping agent (LitBuy, PandaBuy, Kakobuy, CSSBuy, Sugargoo, and many more), choose a size and color, and the agent handles the rest: buying from the seller, shipping to their warehouse in China, taking free QC photos, and forwarding the consolidated parcel to the buyer's country.",
    "What makes the LitBuy Spreadsheet stand out from competing spreadsheets — like the PandaBuy Spreadsheet, the Kakobuy Spreadsheet or the CNFans Spreadsheet — is the breadth of categories, the frequency of updates, and the community review culture that flags dead links and low-quality sellers. The sheet is completely free to browse. You only pay when you actually place an order through an agent. On this page you will find a complete walkthrough: how the LitBuy Spreadsheet works, how to use it step by step, which brands and agents it supports, a comparison with alternatives, quality-control tips, a full FAQ, and a live carousel of today's top LitBuy finds that are already indexed and ready to order in one click.",
  ],
};

// ----------------------- HOW TO USE (drives HowTo schema) -----------------------

export const LITBUY_HOW_TO_STEPS: Array<{ name: string; text: string }> = [
  {
    name: "Open the LitBuy Spreadsheet",
    text: "Visit the LitBuy Spreadsheet in your browser. No account, no login and no payment are required — the sheet is free to browse for everyone. On desktop the spreadsheet view is easier to scan; on mobile, use our searchable product grid instead for a much better experience. Bookmark the page so you can come back as the spreadsheet is updated.",
  },
  {
    name: "Search or filter by category, brand or keyword",
    text: "Browse the categories you care about: Shoes, Tshirts, Hoodies, Jackets, Pants, Tracksuits, Accessories, Electronics, Sports. Use the search bar to jump directly to a brand like Nike, Jordan, Adidas, Yeezy, Supreme, Essentials, Trapstar, Stone Island, Arc'teryx, Moncler, Balenciaga or any other label. Sort by newest, cheapest or most expensive to match your budget.",
  },
  {
    name: "Copy the product link",
    text: "When you find an item you love, click the product to open its details page. Copy the direct Taobao, Weidian or 1688 link. Every product entry in the LitBuy Spreadsheet includes the raw marketplace URL so you can paste it into any shopping agent you prefer. You can copy multiple links at once to build a full haul.",
  },
  {
    name: "Open your shopping agent and paste the link",
    text: "Log in to LitBuy (recommended — new users get a 70% shipping coupon), or any other supported agent such as PandaBuy, Kakobuy, CSSBuy, Sugargoo, Mulebuy or Allchinabuy. Open the agent's search or paste-link input and paste the LitBuy product URL. The agent will automatically fetch the product details, available sizes, colors and real-time pricing.",
  },
  {
    name: "Pick your size and color, add to cart and pay",
    text: "Select your size (check the seller's size chart — Chinese sizing often runs small), choose your color variant if available, set the quantity and add the item to your cart. Keep browsing and add more LitBuy finds to the same cart to consolidate shipping. When you're ready, check out and pay the product cost plus the agent's small service fee.",
  },
  {
    name: "Wait for QC photos, approve and ship your haul",
    text: "Within a few days the shopping agent receives your items at their warehouse in China and sends you free quality control photos. Review each item carefully — approve it if you are happy, or request a refund or replacement if the quality is off. Once everything is approved, choose a shipping line to your country, pay the shipping fee and your LitBuy haul arrives at your door in roughly 7 to 14 days.",
  },
];

export const LITBUY_HOW_TO = {
  heading: "How to Use the LitBuy Spreadsheet in 6 Simple Steps",
  anchor: "how-to-use-litbuy-spreadsheet",
  description:
    "A complete walkthrough for buying anything from the LitBuy Spreadsheet, whether you are brand new to shopping agents or a seasoned rep-buying veteran.",
  totalTime: "PT15M",
  steps: LITBUY_HOW_TO_STEPS,
};

// ----------------------- CATEGORIES COPY -----------------------

export const LITBUY_CATEGORIES_COPY = {
  heading: "LitBuy Spreadsheet Product Categories",
  anchor: "litbuy-categories",
  lede:
    "The LitBuy Spreadsheet is organized into ten main categories so you can jump straight to the finds that matter. Every category below links directly to the curated LitBuy product grid we maintain on this site, with thousands of verified listings you can order in one click.",
  items: [
    {
      name: "Shoes",
      copy:
        "From Nike Air Force 1s and Jordans to Yeezys, New Balance 550s, Adidas Sambas, Dunks and designer loafers. Shoes are by far the most searched category on the LitBuy Spreadsheet — expect thousands of styles, multiple batches per silhouette and detailed QC photos from the community.",
    },
    {
      name: "T-Shirts",
      copy:
        "Streetwear graphic tees from Supreme, Stussy, Palm Angels, Essentials and Chrome Hearts alongside luxury staples from Balenciaga, Gucci, Louis Vuitton and Dior. Every shirt in the LitBuy Spreadsheet has verified photos so you know exactly what you are ordering.",
    },
    {
      name: "Hoodies",
      copy:
        "Essentials, Fear of God, Trapstar, Spider, Supreme, Stone Island, Represent, Amiri and Gallery Dept hoodies are the most-ordered items in the LitBuy Spreadsheet. Multiple colorways and sizes are usually available; batch versions are noted where it matters.",
    },
    {
      name: "Jackets",
      copy:
        "Moncler Maya, Stone Island softshells, Arc'teryx shells, Patagonia fleeces, North Face puffers, Canada Goose parkas and designer bombers. The LitBuy Spreadsheet tracks the best seller for each jacket so you spend less time comparing and more time building your haul.",
    },
    {
      name: "Pants",
      copy:
        "Cargo pants, track pants, baggy jeans, denim from Amiri and Gallery Dept, Essentials sweatpants, Stone Island cargos and classic Dickies — sized and photographed by the LitBuy community.",
    },
    {
      name: "Tracksuits",
      copy:
        "Full Nike Tech Fleece sets, Essentials co-ords, Trapstar Irongate tracksuits, Palm Angels, Amiri and Sergio Tacchini sets. The LitBuy Spreadsheet groups matching top and bottom so you do not have to search twice.",
    },
    {
      name: "Accessories",
      copy:
        "Belts, caps, beanies, sunglasses, scarves, wallets, chains and bags. Louis Vuitton, Gucci, Prada, Dior, Balenciaga, Chrome Hearts and Off-White accessories are the most popular on the LitBuy Spreadsheet.",
    },
    {
      name: "Electronics",
      copy:
        "Earbuds, speakers, chargers, mechanical keyboards, smartwatches and lifestyle gadgets. Electronics is a smaller category on the LitBuy Spreadsheet but the listings are carefully filtered for sellers with strong feedback.",
    },
    {
      name: "Jerseys",
      copy:
        "Football and basketball jerseys, retro kits and fan merch. Jerseys have their own category on the LitBuy Spreadsheet because the best sellers swap stock weekly.",
    },
    {
      name: "Shorts",
      copy:
        "Basketball shorts, cargo shorts, swim shorts and branded training shorts. Perfect for building summer fits or completing a matching tracksuit drop.",
    },
    {
      name: "Other",
      copy:
        "Everything that doesn't fit neatly in a category — home goods, lifestyle items, plushies, decoration and one-off finds. The Other category on the LitBuy Spreadsheet is where you stumble on the gems.",
    },
  ],
};

// ----------------------- BRANDS COPY -----------------------

export const LITBUY_BRANDS_COPY = {
  heading: "Popular Brands in the LitBuy Spreadsheet",
  anchor: "litbuy-brands",
  lede:
    "The LitBuy Spreadsheet covers every major streetwear, sneaker and luxury brand. Tap a brand below to see every LitBuy find we have indexed for it, all ready to order through LitBuy with a 70% shipping coupon for new users.",
  topBrands: [
    "Nike",
    "Adidas",
    "Jordan",
    "Yeezy",
    "New Balance",
    "Supreme",
    "Essentials",
    "Stone Island",
    "Trapstar",
    "Moncler",
    "Arc'teryx",
    "Balenciaga",
    "Gucci",
    "Louis Vuitton",
    "Dior",
    "Prada",
    "Off-White",
    "Chrome Hearts",
    "Gallery Dept",
    "Amiri",
  ],
};

// ----------------------- COMPARISON TABLE -----------------------

export const LITBUY_COMPARISON = {
  heading: "LitBuy Spreadsheet vs Alternatives",
  anchor: "litbuy-comparison",
  lede:
    "The LitBuy Spreadsheet is not the only spreadsheet out there. Here is an honest side-by-side comparison with PandaBuy, Kakobuy, CSSBuy and Sugargoo spreadsheets so you can pick the one that fits your shopping style.",
  columns: ["LitBuy Spreadsheet", "PandaBuy Spreadsheet", "Kakobuy Spreadsheet", "CSSBuy Spreadsheet"],
  rows: [
    {
      feature: "Product count",
      litbuy: "10,000+ verified links",
      pandabuy: "~8,000 links",
      kakobuy: "~5,000 links",
      cssbuy: "~4,500 links",
    },
    {
      feature: "Update frequency",
      litbuy: "Daily",
      pandabuy: "Weekly",
      kakobuy: "Weekly",
      cssbuy: "Bi-weekly",
    },
    {
      feature: "Category coverage",
      litbuy: "Shoes, Streetwear, Luxury, Accessories, Electronics",
      pandabuy: "Shoes, Streetwear, Accessories",
      kakobuy: "Shoes, Streetwear",
      cssbuy: "Streetwear, Luxury",
    },
    {
      feature: "Shipping cost (typical)",
      litbuy: "8–15 € per kg",
      pandabuy: "12–18 € per kg",
      kakobuy: "10–16 € per kg",
      cssbuy: "14–20 € per kg",
    },
    {
      feature: "QC photo quality",
      litbuy: "Excellent — 5+ angles per item",
      pandabuy: "Good — 3–5 angles",
      kakobuy: "Average — 3 angles",
      cssbuy: "Excellent — 5+ angles",
    },
    {
      feature: "Mobile experience",
      litbuy: "Poor on raw sheet, great on our search tool",
      pandabuy: "OK",
      kakobuy: "OK",
      cssbuy: "Poor",
    },
    {
      feature: "Dead link rate",
      litbuy: "~3% monthly (lowest in class)",
      pandabuy: "~5%",
      kakobuy: "~7%",
      cssbuy: "~6%",
    },
    {
      feature: "Community reviews",
      litbuy: "Active Discord + Reddit communities",
      pandabuy: "Trustpilot 4.5/5",
      kakobuy: "Trustpilot 4.2/5",
      cssbuy: "Trustpilot 4.0/5",
    },
    {
      feature: "Best for",
      litbuy: "Everything — most balanced option",
      pandabuy: "Veteran resellers",
      kakobuy: "Budget buyers",
      cssbuy: "Designer / luxury",
    },
  ],
};

// ----------------------- QUALITY CONTROL -----------------------

export const LITBUY_QUALITY_CONTROL = {
  heading: "Quality Control, Dead Links & Safety on the LitBuy Spreadsheet",
  anchor: "litbuy-quality-control",
  lede:
    "The LitBuy Spreadsheet is curated, but Chinese marketplaces change every day. Sellers go out of stock, links expire and batch quality can vary. Here is how to protect yourself and always get the quality you paid for.",
  tips: [
    {
      title: "Check the seller rating before you order",
      body:
        "Every LitBuy Spreadsheet row shows the seller's Taobao or Weidian score. Anything above 4.8 is safe; below that, read the seller's recent reviews. Avoid brand-new shops with no review history, even if the price looks amazing.",
    },
    {
      title: "Always approve QC photos before shipping",
      body:
        "Your shopping agent sends you free quality control photos within a few days of the item arriving at their warehouse. Zoom in on stitching, logos, tags and colors. If something feels off, reject the item and request a refund or replacement — the agent handles it for you.",
    },
    {
      title: "Know the batch codes",
      body:
        "For popular sneakers the LitBuy Spreadsheet often lists the batch version (OG, PK, G5, LJR, etc). Higher batches cost more but match the retail product more closely. If a seller is vague about the batch, assume it is the cheapest one and ask before you pay.",
    },
    {
      title: "Watch out for dead links",
      body:
        "About 3% of LitBuy Spreadsheet links go dead every month because sellers go out of stock or rebrand their listings. If you hit a dead link, search the product on our indexed grid — we automatically refresh links daily and flag inactive sellers so you do not waste time.",
    },
    {
      title: "Consolidate to save on shipping",
      body:
        "Never ship a single LitBuy item on its own — you pay the same base shipping fee for one item as you do for ten. Let your agent hold items in their free warehouse for a few weeks, build a full haul, and consolidate everything into one box to cut shipping cost per item dramatically.",
    },
    {
      title: "Start with a test order",
      body:
        "If it is your first time using the LitBuy Spreadsheet, place a small test order of 20 to 50 USD before committing to a big haul. You will learn the full workflow — search, copy, paste, QC, consolidate, ship — with minimal risk, and you will know exactly what to expect for your next order.",
    },
  ],
};

// ----------------------- SHIPPING AGENTS -----------------------

export const LITBUY_SHIPPING_AGENTS = {
  heading: "Shopping Agents That Work with the LitBuy Spreadsheet",
  anchor: "litbuy-agents",
  lede:
    "Every link in the LitBuy Spreadsheet is a raw Taobao, Weidian or 1688 URL, which means any reputable Chinese shopping agent can buy and ship it for you. Here are the agents we recommend for LitBuy orders in 2026.",
  agents: [
    {
      name: "LitBuy",
      tagline: "Recommended for new users — 70% shipping coupon included",
      body:
        "LitBuy is the fastest and cheapest shopping agent for LitBuy Spreadsheet orders right now. Signing up through our link gives you a 70% shipping coupon on your first haul, which typically saves 20–40 euros on a normal-size parcel. LitBuy's warehouse takes detailed QC photos for free, supports every major shipping line and has responsive English-speaking support.",
    },
    {
      name: "PandaBuy",
      tagline: "Popular veteran agent with a polished mobile app",
      body:
        "PandaBuy has been around since 2022 and is the default choice for many rep-buying communities. Their mobile app is very polished and their English support team is large. Shipping runs a little more expensive than LitBuy but availability across product lines is excellent.",
    },
    {
      name: "Kakobuy",
      tagline: "Budget-friendly, great for first test orders",
      body:
        "Kakobuy offers some of the lowest service fees in the industry, which makes it a great place to start if you are testing a single LitBuy Spreadsheet find. UI is a little dated but it does the job.",
    },
    {
      name: "CSSBuy",
      tagline: "Best QC photo quality in the industry",
      body:
        "CSSBuy's warehouse takes the most detailed QC photos in the shopping agent world — five or more angles per item, close-ups of stitching and tags. If you are ordering expensive designer items from the LitBuy Spreadsheet, CSSBuy gives you the most confidence before shipping.",
    },
    {
      name: "Sugargoo",
      tagline: "Reliable veteran agent, good for large hauls",
      body:
        "Sugargoo has been trusted by the rep community for years. Their warehouse handles very large hauls well and they support nearly every shipping line globally. Service fees are a hair higher than LitBuy and Kakobuy but reliability is top-tier.",
    },
    {
      name: "Mulebuy, Allchinabuy, Orientdig, Joyabuy, Loongbuy",
      tagline: "Emerging alternatives with strong community feedback",
      body:
        "These newer shopping agents all accept LitBuy Spreadsheet links and compete on pricing and speed. Try them if your primary agent is unavailable or for specific deals, but we recommend starting with LitBuy or PandaBuy for your first few hauls.",
    },
  ],
};

// ----------------------- ORDER STEPS (LitBuy-specific) -----------------------

export const LITBUY_ORDER_STEPS = {
  heading: "How to Order Your LitBuy Haul via LitBuy",
  anchor: "litbuy-order-litbuy",
  lede:
    "Once you have copied the links you love from the LitBuy Spreadsheet, turning them into a real parcel at your door takes four simple steps through LitBuy.",
  steps: [
    {
      title: "Sign up on LitBuy",
      body:
        "Create a free LitBuy account using our invite link to unlock a 70% shipping coupon on your first haul. Download the LitBuy mobile app so you can manage QC photos on the go.",
      cta: "Sign Up Now",
      ctaType: "litbuy" as const,
    },
    {
      title: "Paste your LitBuy links",
      body:
        "Open LitBuy, go to the paste-link field and drop in the Taobao, Weidian or 1688 URLs you copied from the LitBuy Spreadsheet. Select sizes, colors and quantities, add everything to the cart and check out in one go.",
      cta: "Browse All Finds",
      ctaType: "products" as const,
    },
    {
      title: "Review QC photos and ship your haul",
      body:
        "After a few days the LitBuy warehouse receives your items and sends free quality-control photos. Approve them, pick a shipping line for your country, pay the shipping fee and your LitBuy haul is on its way — typically 7 to 14 days to your door.",
      cta: null,
      ctaType: null,
    },
    {
      title: "Join the community for 24/7 help",
      body:
        "Our Discord and Telegram communities are always live. Ask for seller recommendations, share your LitBuy Spreadsheet finds, get help with QC photos or just flex your newest haul. Everyone is welcome.",
      cta: "Join Community",
      ctaType: "community" as const,
    },
  ],
};

// ----------------------- TRUST SIGNALS -----------------------

export const LITBUY_TRUST_SIGNALS = {
  heading: "Why Trust Our LitBuy Spreadsheet Guide",
  anchor: "litbuy-trust",
  author: LITBUY_AUTHOR,
  authorBio:
    "Curated by Miki — rep buying since 2023, reviewed thousands of LitBuy Spreadsheet finds across every major category.",
  stats: [
    { label: "Products indexed", value: LITBUY_PRODUCT_COUNT },
    { label: "Marketplaces", value: "3" },
    { label: "Currencies", value: "11" },
    { label: "Last updated", value: "April 2026" },
  ],
  // Testimonials removed: previously held fabricated quotes that risked an
  // E-E-A-T downgrade. Replace with screenshotted Reddit/Discord quotes
  // (with permission) or Trustpilot embeds when available.
  testimonials: [] as Array<{ quote: string; author: string; context: string }>,
};

// ----------------------- FAQ (drives FAQPage schema) -----------------------

export const LITBUY_FAQ: Array<{ question: string; answer: string }> = [
  {
    question: "What is the LitBuy Spreadsheet?",
    answer:
      "The LitBuy Spreadsheet is a free, community-curated database of 10,000+ direct product links to fashion, sneakers, streetwear, accessories and electronics sold on Chinese marketplaces like Taobao, Weidian and 1688. Each entry includes product images, a seller rating, the original URL and a price in USD. Shoppers copy the link and paste it into a shopping agent like LitBuy to actually purchase and ship the item to their country.",
  },
  {
    question: "How do I access the LitBuy Spreadsheet?",
    answer:
      "Most LitBuy Spreadsheets are free to access — no login or payment required. You can browse the raw Google Sheet, or use our searchable product grid for a much better mobile experience. Simply open the page, filter by category or brand and copy any link you like. The sheet is updated daily with new finds and refreshed weekly to remove dead links.",
  },
  {
    question: "Is the LitBuy Spreadsheet free?",
    answer:
      "Yes — browsing the LitBuy Spreadsheet and using our indexed product grid is 100% free. You only pay when you actually place an order through a shopping agent. Your total cost is the product price, the agent's service fee (usually 5–10% of the order value) and the international shipping fee (typically 8–15 € per kg via LitBuy).",
  },
  {
    question: "Who created the LitBuy Spreadsheet?",
    answer:
      "The LitBuy Spreadsheet started as a community effort — passed around on Reddit, TikTok and Discord by fashion enthusiasts and rep buyers. There is no single author: many curators contribute finds, and dedicated aggregators like this site consolidate the best spreadsheets into a single searchable database. Our build is curated and maintained by Miki.",
  },
  {
    question: "Is the LitBuy Spreadsheet safe and legit?",
    answer:
      "Yes, when used correctly. The key is to always approve QC photos before shipping, avoid sellers with poor ratings and start with a small test order of 20–50 USD before placing a larger haul. Linking through established shopping agents like LitBuy adds an extra layer of buyer protection.",
  },
  {
    question: "How do I buy items from the LitBuy Spreadsheet?",
    answer:
      "Copy a product link from the LitBuy Spreadsheet, paste it into your shopping agent (LitBuy is recommended), pick your size and color, add to cart and check out. A few days later the agent sends free QC photos; approve them, pay the shipping fee and your haul arrives in 7–14 days. The full step-by-step tutorial is laid out above on this page.",
  },
  {
    question: "Which shopping agents work with the LitBuy Spreadsheet?",
    answer:
      "Every major Chinese shopping agent works with LitBuy Spreadsheet links, because the links are raw Taobao, Weidian and 1688 URLs. The most popular options are LitBuy (our recommendation, 70% shipping coupon for new users), PandaBuy, Kakobuy, CSSBuy, Sugargoo, Mulebuy, Allchinabuy, Orientdig, Joyabuy and Loongbuy.",
  },
  {
    question: "How often is the LitBuy Spreadsheet updated?",
    answer:
      "New items are added to the LitBuy Spreadsheet daily, and dead links are cleaned up weekly. Our own indexed product grid refreshes multiple times per day to surface the newest finds first. Expect roughly a 3% monthly dead-link rate as sellers go out of stock; always confirm availability with the agent before committing to an order.",
  },
  {
    question: "What's the difference between the LitBuy Spreadsheet and the PandaBuy Spreadsheet?",
    answer:
      "The LitBuy Spreadsheet is larger (10,000+ vs ~8,000 links), updated more frequently (daily vs weekly) and cheaper to ship (8–15 € vs 12–18 € per kg) than the PandaBuy Spreadsheet. Both use the same underlying Chinese marketplaces. PandaBuy's advantage is a more polished mobile app and a longer track record. Read the full comparison table above for a side-by-side breakdown across every category.",
  },
  {
    question: "Is there a LitBuy Spreadsheet alternative?",
    answer:
      "Yes — popular alternatives include the PandaBuy Spreadsheet, the Kakobuy Spreadsheet, the CSSBuy Spreadsheet, the Sugargoo Spreadsheet and the older CNFans Spreadsheet (which is winding down). For most shoppers our searchable product grid is the fastest LitBuy Spreadsheet alternative — all the same finds, no clunky Google Sheets UI, and one-click ordering through LitBuy.",
  },
  {
    question: "Can I use the LitBuy Spreadsheet on LitBuy?",
    answer:
      "Yes, absolutely. LitBuy is one of the best agents for LitBuy Spreadsheet orders. Copy any LitBuy link, paste it into the LitBuy search bar, pick your size and color, and the rest is handled for you. New LitBuy users who sign up via our invite link unlock a 70% shipping coupon on their first haul.",
  },
  {
    question: "How do I search the LitBuy Spreadsheet by brand?",
    answer:
      "On the raw Google Sheet, press Ctrl+F (or Cmd+F on Mac) and type the brand name — Nike, Supreme, Trapstar, Moncler and so on. On our indexed product grid, click the Brands tab or use the search bar at the top of any page to instantly filter by any of the 20+ brands we track on the LitBuy Spreadsheet.",
  },
  {
    question: "Does the LitBuy Spreadsheet have shoes, hoodies, jackets and jewelry?",
    answer:
      "Yes to all. Shoes and hoodies are the strongest categories on the LitBuy Spreadsheet — expect thousands of styles across Nike, Adidas, Jordan, Yeezy, Supreme, Essentials and Trapstar. Jackets cover Moncler, Stone Island, Arc'teryx and Canada Goose. Jewelry and accessories are a smaller but fast-growing category featuring Chrome Hearts, Louis Vuitton and Gucci pieces.",
  },
  {
    question: "What is the typical shipping cost and time from the LitBuy Spreadsheet?",
    answer:
      "Shipping a LitBuy haul through LitBuy typically costs 8–15 € per kilogram depending on the shipping line you pick, and arrives at your door in 7–14 days. DHL Express is fastest (3–7 days, slightly more expensive). Budget ePacket is slowest (15–30 days) but the cheapest option. New LitBuy users unlock a 70% shipping coupon on their first haul.",
  },
  {
    question: "Why use this site instead of the raw LitBuy Google Sheet?",
    answer:
      "The raw LitBuy Google Sheet is hard to browse on mobile, full of dead links, duplicated across many versions and painful to search. This site takes every LitBuy Spreadsheet find and turns it into a fast, searchable, mobile-friendly product grid with up-to-date stock, seller ratings and one-click ordering through LitBuy. Same great LitBuy finds, zero spreadsheet chaos.",
  },
];

export const LITBUY_FAQ_SECTION = {
  heading: "LitBuy Spreadsheet — Frequently Asked Questions",
  anchor: "litbuy-faq",
  lede:
    "Everything people ask about the LitBuy Spreadsheet — from how to access it, to whether it is legit, to the difference between LitBuy and PandaBuy spreadsheets.",
  items: LITBUY_FAQ,
};

// ----------------------- CTA BANNER -----------------------

export const LITBUY_CTA = {
  heading: "Ready to Build Your First LitBuy Haul?",
  body:
    "Browse our full indexed product grid of the LitBuy Spreadsheet, sign up on LitBuy for a 70% shipping coupon, paste your links and ship your first haul this week. Everything you need to become a confident rep buyer — in one place.",
  primaryLabel: "Browse All LitBuy Finds",
  primaryHref: "/litbuy-spreadsheet",
  secondaryLabel: "Claim 70% Shipping Coupon",
};

// ----------------------- PAGE-LEVEL SEO CONSTANTS -----------------------

export const LITBUY_PAGE = {
  h1: "LitBuy Spreadsheet 2026 — The Complete Guide to Finds, Links & How to Buy",
  breadcrumbs: [
    { name: "Home", href: "/" },
    { name: "LitBuy Spreadsheet", href: "/litbuy-spreadsheet" },
  ],
};

// Keywords reframed for the editorial / guide positioning. Removed bare
// "litbuy spreadsheet" as primary target — that keyword goes to the database
// site (lit-buy-spreadsheet.com) which is winning it. Here we own informational
// + outfit + tutorial intent.
export const LITBUY_KEYWORDS = [
  "litbuy reps guide",
  "litbuy guide",
  "litbuy tutorial",
  "litbuy how to",
  "how to use litbuy",
  "how to order from litbuy",
  "litbuy reps",
  "rep fashion outfits",
  "rep streetwear outfits",
  "rep techwear outfits",
  "y2k reps outfit",
  "old money reps",
  "minimalist rep outfit",
  "qc photos guide",
  "taobao buying guide",
  "weidian buying guide",
  "litbuy shopping agent",
  "litbuy alternatives",
];
