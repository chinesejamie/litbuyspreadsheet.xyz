// Outfit-style guides. Each entry powers /outfits (hub) and /outfits/[slug] (detail).
// Designed to rank for "[style] reps outfit" / "[style] reps guide" long-tails.

export interface OutfitGuide {
  slug: string;
  title: string; // SEO title
  metaDescription: string;
  h1: string;
  tagline: string;
  hero: string; // intro paragraph
  sections: { heading: string; body: string }[];
  pieces: {
    role: string; // "Outerwear", "Top", "Bottom", "Shoes", "Bag", "Accessory"
    name: string;
    note: string;
    typicalPriceUsd: string;
    platform: string; // Taobao | Weidian | 1688
  }[];
  faq: { q: string; a: string }[];
  keywords: string[];
}

export const OUTFIT_GUIDES: OutfitGuide[] = [
  {
    slug: "streetwear",
    title: "Streetwear Reps Outfit Guide 2026 — Full LitBuy Look",
    metaDescription:
      "Build a complete streetwear reps outfit through the LitBuy Spreadsheet. Hoodie, cargo pants, sneakers and accessories — verified Taobao and Weidian links, QC photos and sizing notes.",
    h1: "Streetwear Reps Outfit Guide",
    tagline: "Full-look reps for the modern streetwear shopper.",
    hero:
      "Streetwear is still the most-shopped category in the LitBuy Spreadsheet — for good reason. The blueprint has not changed much since 2023: a heavyweight hoodie, a tapered cargo pant, a chunky sneaker, a crossbody bag and a cap. What has changed is which sellers consistently deliver good batches. This guide walks through a complete streetwear outfit you can build in one LitBuy haul, with the specific roles each piece plays, what to look for in QC photos, and which marketplace each item is best sourced from.",
    sections: [
      {
        heading: "Why this outfit works",
        body:
          "The streetwear silhouette is forgiving — oversized layers cover most fit issues, and the colour palette is usually neutral, so QC photos are easier to verify against. That makes it a great first haul if you are new to the LitBuy Spreadsheet. If a piece comes back wrong in QC, you are still saving enough on the rest of the look to make the order worth it.",
      },
      {
        heading: "Sizing notes",
        body:
          "Chinese sizing on streetwear pieces typically runs one full size smaller than EU/US. If you are a US Medium, order Large. If you are unsure, the LitBuy Spreadsheet usually lists the seller's body measurements in cm — match those against a piece you already own, do not trust the size label. Hoodies tend to shrink 3–5% on first wash; size up if you want a long-term oversized fit.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "For hoodies: stitching on the kangaroo pocket, the drawstring tips, and the brand patch alignment. For pants: the inseam length, taper consistency, and zipper brand on cargo pockets. For sneakers: heel collar shape, midsole foam colour, and that the shoebox matches the silhouette. Reject any QC where the brand patch is glued instead of stitched.",
      },
    ],
    pieces: [
      { role: "Outerwear", name: "Heavyweight branded hoodie (450–500 gsm)", note: "Look for double-needle stitching at the cuffs.", typicalPriceUsd: "$28–45", platform: "Weidian" },
      { role: "Top", name: "Boxy graphic tee (heavyweight cotton)", note: "Avoid sellers using thin 180gsm cotton — it pills fast.", typicalPriceUsd: "$15–25", platform: "Taobao" },
      { role: "Bottom", name: "Tapered cargo pants", note: "Triple-check pocket placement in QC.", typicalPriceUsd: "$30–55", platform: "Taobao" },
      { role: "Shoes", name: "Chunky panel sneaker", note: "Match midsole foam colour exactly to the OG.", typicalPriceUsd: "$60–120", platform: "Weidian" },
      { role: "Bag", name: "Crossbody utility bag", note: "Check zipper pulls — most fakes use generic ones.", typicalPriceUsd: "$25–40", platform: "1688" },
      { role: "Accessory", name: "Embroidered cap", note: "3D embroidery is easier to verify than flat printing.", typicalPriceUsd: "$10–18", platform: "Taobao" },
    ],
    faq: [
      {
        q: "How much does a full streetwear reps outfit cost through LitBuy?",
        a: "A complete streetwear haul from this guide typically lands at $170–290 USD plus shipping (usually $30–60 via LitBuy depending on weight and shipping line). That includes hoodie, tee, cargo pants, sneakers, bag and cap. The LitBuy Spreadsheet usually has variants of each piece at multiple price points so you can scale up or down.",
      },
      {
        q: "How long does shipping take on a streetwear haul?",
        a: "Express air via LitBuy is usually 5–10 days, standard air 10–20 days, and sea freight 30–60 days. For a full outfit you will likely consolidate 4–6 packages at the LitBuy warehouse first, which adds 3–7 days of processing.",
      },
      {
        q: "Is streetwear safer to buy reps than other categories?",
        a: "Generally yes. Streetwear silhouettes are forgiving — oversized fits hide minor fit issues, and the most-replicated brands (Essentials, Stussy, Corteiz, Travis Scott) have well-known QC reference photos online so you can spot a bad batch quickly.",
      },
    ],
    keywords: ["streetwear reps outfit", "streetwear reps guide", "rep streetwear haul", "streetwear taobao guide", "litbuy streetwear"],
  },
  {
    slug: "techwear",
    title: "Techwear Reps Outfit Guide 2026 — Full LitBuy Haul",
    metaDescription:
      "Complete techwear reps outfit via the LitBuy Spreadsheet: shell jacket, tactical pants, GORE-TEX trail shoes, sling bag. Verified Taobao and Weidian links with QC notes.",
    h1: "Techwear Reps Outfit Guide",
    tagline: "Functional, weatherproof reps for the techwear shopper.",
    hero:
      "Techwear is the most technical category in the LitBuy Spreadsheet — and the one where QC matters most. A shell jacket is only worth ordering if the seller can prove taped seams and a real DWR coating. Trail shoes are only worth it if the GORE-TEX or comparable membrane is actually present. This guide walks through a complete techwear outfit, the specific functional features to look for in QC, and which sellers in the LitBuy Spreadsheet have the most consistent track record.",
    sections: [
      {
        heading: "Why techwear is harder to rep well",
        body:
          "Techwear performance comes from materials and construction you cannot see in product photos: membrane laminates, taped seams, ventilation zips that actually work, and durable hardware. A bad rep will look identical to a good one in marketplace photos but fail on the first rainy day. Always pay extra for QC photos that show the inside of seams.",
      },
      {
        heading: "Sizing notes",
        body:
          "Techwear sellers almost always list garment-flat measurements in cm — use those, not size labels. Shell jackets need room for layers underneath, so size up one if you plan to wear a hoodie under it. Tactical pants run wider in the thigh and taper at the ankle; a US 32 waist is usually a 32 in the spreadsheet, but check inseam carefully.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Shell jacket: ask the agent to photograph the inside seams (looking for taped seams, not just stitched), the pit zips functioning, and the storm flap. Pants: the articulated knee panel, the boot-cut zipper at the ankle, and the YKK or equivalent zipper hardware. Shoes: midsole flex grooves and the GORE-TEX label sewn into the tongue lining.",
      },
    ],
    pieces: [
      { role: "Outerwear", name: "Hardshell jacket (3-layer fabric)", note: "Ask seller for taped-seam interior photos.", typicalPriceUsd: "$80–160", platform: "Taobao" },
      { role: "Mid-layer", name: "Technical fleece (grid pattern)", note: "Lighter is usually better — avoid bulky fleeces.", typicalPriceUsd: "$35–55", platform: "Taobao" },
      { role: "Bottom", name: "Tactical articulated pants", note: "Confirm knee dart construction.", typicalPriceUsd: "$45–80", platform: "Weidian" },
      { role: "Shoes", name: "Trail / GORE-TEX hiker", note: "Membrane label inside tongue is verifiable.", typicalPriceUsd: "$70–140", platform: "Weidian" },
      { role: "Bag", name: "Sling chest pack with MOLLE", note: "Check buckle quality — Duraflex or copy.", typicalPriceUsd: "$30–55", platform: "1688" },
      { role: "Accessory", name: "Tactical cap with anti-glare visor", note: "Skip if visor coating looks plasticky in QC.", typicalPriceUsd: "$12–20", platform: "Taobao" },
    ],
    faq: [
      {
        q: "Is it worth buying techwear reps?",
        a: "Yes if you prioritise look over performance, or if you find a seller in the LitBuy Spreadsheet with verified taped-seam construction. Pure aesthetics can be had for $200 USD. True performance — waterproof, breathable, durable — is rarer in reps and you may pay $300+ on a single piece for something that genuinely matches the original.",
      },
      {
        q: "Which marketplace has the best techwear sellers?",
        a: "Taobao for jackets and pants (more variety, more established sellers), Weidian for trail shoes (closer factory access), 1688 for accessories and bags (cheapest, but fewer QC services). The LitBuy Spreadsheet tags each entry by platform so you can filter accordingly.",
      },
      {
        q: "How do I verify a hardshell jacket in QC?",
        a: "Three checks. First, ask for an interior seam photo — real taped seams have a glossy plastic strip running along every stitch line. Second, ask the seller to splash water on the exterior and photograph it — a real DWR coating beads water for 20–30 seconds. Third, check that the pit zips actually open through both layers, not just the outer shell.",
      },
    ],
    keywords: ["techwear reps outfit", "techwear reps guide", "techwear taobao", "techwear weidian", "litbuy techwear"],
  },
  {
    slug: "y2k",
    title: "Y2K Reps Outfit Guide 2026 — Full LitBuy Look",
    metaDescription:
      "Build a Y2K reps outfit via the LitBuy Spreadsheet: low-rise denim, baby tee, chunky sneakers, mini bag. Verified Taobao and Weidian links with QC photos and sizing notes.",
    h1: "Y2K Reps Outfit Guide",
    tagline: "Y2K aesthetic finds curated from the LitBuy Spreadsheet.",
    hero:
      "Y2K is the easiest aesthetic to build through the LitBuy Spreadsheet because most of the silhouettes — low-rise jeans, baby tees, mini shoulder bags — have direct equivalents on Taobao and Weidian under different brand names. You are mostly buying the look, not specific designer pieces. That makes verification simple and price points low. This guide walks through a complete Y2K outfit and which sellers consistently deliver the early-2000s silhouette without slipping into modern cuts.",
    sections: [
      {
        heading: "Why Y2K is the easiest aesthetic to rep",
        body:
          "Most Y2K-coded pieces are not strictly branded reps — they are silhouette-focused: a butterfly halter top, a low-rise bootcut jean, a frosted heart pendant. Sellers do not need to clone an exact original, they just need to nail the proportions. That makes QC straightforward and dramatically reduces the risk of a bad order.",
      },
      {
        heading: "Sizing notes",
        body:
          "Y2K silhouettes were cut for early-2000s body proportions — long torsos, low rises, very tight tops. Modern Chinese sizing already runs small. Order based on garment measurements, not size labels. For low-rise denim specifically, measure your favourite low-rise jeans flat and match the rise number in cm — most sellers list it.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "For tops: the neckline shape (Y2K is shallow scoop or true halter, not modern bardot), and the hem length sitting just at the natural waist. For jeans: the rise (5–8 cm is true Y2K), back pocket placement, and the wash. Avoid sellers who use heavily edited model photos — those often hide modern cut lines under post-processing.",
      },
    ],
    pieces: [
      { role: "Top", name: "Butterfly print baby tee", note: "Make sure print is silkscreen, not iron-on transfer.", typicalPriceUsd: "$10–18", platform: "Taobao" },
      { role: "Bottom", name: "Low-rise bootcut jean", note: "Confirm rise in cm before ordering.", typicalPriceUsd: "$25–45", platform: "Weidian" },
      { role: "Shoes", name: "Chunky platform sneaker (white)", note: "Sole height should be 4–5 cm minimum.", typicalPriceUsd: "$45–80", platform: "Taobao" },
      { role: "Bag", name: "Mini metallic shoulder bag", note: "Hardware finish matters — chrome not gold.", typicalPriceUsd: "$20–35", platform: "Taobao" },
      { role: "Outerwear", name: "Cropped puffer jacket", note: "Cropped means cropped — should sit above natural waist.", typicalPriceUsd: "$35–60", platform: "Taobao" },
      { role: "Accessory", name: "Frosted heart pendant + bracelet set", note: "Skip plastic — find resin or acrylic.", typicalPriceUsd: "$8–15", platform: "1688" },
    ],
    faq: [
      {
        q: "Where in the LitBuy Spreadsheet do I find Y2K pieces?",
        a: "Filter by category 'Clothing' and search terms like 'low rise', 'butterfly', 'baby tee', 'platform'. Y2K listings are scattered across different sellers — most are not tagged 'Y2K' specifically, so you have to know the silhouette keywords. The hub at /outfits/y2k links directly to the most reliable seller pages.",
      },
      {
        q: "What is a realistic budget for a full Y2K outfit?",
        a: "$140–250 USD before shipping, depending on whether you go all-Taobao (cheapest) or mix Weidian for the denim (best fit). The LitBuy Spreadsheet has Y2K-coded pieces starting at $8 for accessories, so you can scale up or down easily.",
      },
      {
        q: "Are Y2K reps generally safer than streetwear or designer reps?",
        a: "Yes. Most Y2K pieces are silhouette-driven rather than logo-driven, so there is less reliance on counterfeit branding. That means lower legal risk in customs, and lower QC risk because there are fewer details to get wrong.",
      },
    ],
    keywords: ["y2k reps outfit", "y2k reps guide", "y2k taobao", "y2k aesthetic reps", "low rise jeans reps"],
  },
  {
    slug: "old-money",
    title: "Old Money Reps Outfit Guide 2026 — Quiet Luxury Through LitBuy",
    metaDescription:
      "Quiet-luxury old-money reps outfit via the LitBuy Spreadsheet. Cashmere knit, tailored trousers, leather loafers, structured tote. Verified Taobao and Weidian links.",
    h1: "Old Money Reps Outfit Guide",
    tagline: "Quiet luxury, sourced from the LitBuy Spreadsheet.",
    hero:
      "Old money / quiet-luxury is the hardest aesthetic to rep convincingly because everything depends on materials and tailoring rather than logos. A cheap cashmere blend will pill in two weeks. A polyester pleated trouser will not drape correctly. This guide walks through a complete quiet-luxury outfit and the specific construction details to verify in QC before you commit.",
    sections: [
      {
        heading: "Why old money is harder to rep",
        body:
          "Quiet luxury is about texture and silhouette, not branding. There are no logos to verify — instead you are verifying material quality and tailoring. That requires asking sellers for high-resolution close-ups of fabric weave, button construction, lining material, and stitch density. Most rep sellers are not used to this level of QC, so you will pay more time-wise even if the price is low.",
      },
      {
        heading: "Sizing notes",
        body:
          "Tailored pieces fit on body measurements, not size labels. Always provide your shoulder, chest, waist, hip and inseam in cm to the seller before ordering. The LitBuy Spreadsheet flags sellers who offer made-to-measure or alteration services — prefer those for trousers and outerwear.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Knitwear: ask for a close-up of the fabric. Real cashmere has a soft halo of short fibres above the surface. Synthetic cashmere blends look flat and shiny. Trousers: request a photo of the inside waistband — quality construction has a grosgrain ribbon, not just a folded waistband. Loafers: the leather should crease softly, not crack. The sole should be welted, not glued.",
      },
    ],
    pieces: [
      { role: "Top", name: "Cable-knit cashmere blend sweater", note: "Halo of fibres in close-up = real cashmere blend.", typicalPriceUsd: "$45–95", platform: "Taobao" },
      { role: "Bottom", name: "Pleated tailored trouser (wool blend)", note: "Inside waistband ribbon = quality marker.", typicalPriceUsd: "$50–95", platform: "Taobao" },
      { role: "Shoes", name: "Penny loafers (leather)", note: "Welted sole, not glued.", typicalPriceUsd: "$60–120", platform: "Weidian" },
      { role: "Bag", name: "Structured leather tote", note: "Real leather creases softly in QC; PU cracks.", typicalPriceUsd: "$70–150", platform: "Taobao" },
      { role: "Outerwear", name: "Camel double-breasted overcoat", note: "Lining matters — silk or viscose, not poly.", typicalPriceUsd: "$130–280", platform: "Taobao" },
      { role: "Accessory", name: "Silk twill scarf", note: "Edges should be hand-rolled, not machine-hemmed.", typicalPriceUsd: "$15–35", platform: "Taobao" },
    ],
    faq: [
      {
        q: "Can quiet luxury actually be repped well?",
        a: "Yes, but it costs roughly 2x what streetwear or Y2K reps cost because materials matter. Expect to pay $400–700 USD for a complete old-money outfit before shipping, versus $150–250 for streetwear. The LitBuy Spreadsheet flags sellers with documented material composition — those are the only ones worth ordering quiet-luxury pieces from.",
      },
      {
        q: "What is the single biggest mistake in repping old money?",
        a: "Buying based on photos alone. Most rep listings use the same supplier photos as the originals, so the listing looks identical. The difference shows up in QC: cheap fabric drapes wrong, plastic buttons feel light, glued soles separate. Always pay for additional QC photos and reject any order that does not match material expectations.",
      },
      {
        q: "Are there real cashmere sellers on Taobao or Weidian?",
        a: "Yes — Inner Mongolia is the largest cashmere production region in the world, and many factories sell directly through Taobao under different brand names. The LitBuy Spreadsheet has a cluster of cashmere-specialist sellers tagged accordingly. Expect to pay $40–100 for a sweater that retails $400+ in Western markets.",
      },
    ],
    keywords: ["old money reps", "quiet luxury reps", "cashmere reps", "tailored reps outfit", "old money taobao"],
  },
  {
    slug: "minimalist",
    title: "Minimalist Reps Outfit Guide 2026 — Essentials Built Through LitBuy",
    metaDescription:
      "Build a minimalist reps wardrobe through the LitBuy Spreadsheet. Heavyweight tee, straight denim, white sneaker, structured tote. Verified Taobao links and QC notes.",
    h1: "Minimalist Reps Outfit Guide",
    tagline: "Essentials-only, sourced from the LitBuy Spreadsheet.",
    hero:
      "Minimalist style is the most accessible entry point to the LitBuy Spreadsheet because every piece is essentials-grade — no logos to verify, no specific silhouettes to copy, just well-made basics in neutral colours. The differentiator is fabric weight and cut. This guide walks through a complete minimalist outfit and which sellers in the LitBuy Spreadsheet specialise in heavyweight basics.",
    sections: [
      {
        heading: "Why minimalist is the safest first haul",
        body:
          "When you are new to LitBuy and rep buying, minimalist pieces have the lowest risk profile. A 280gsm white tee that comes back slightly off-spec is still a usable white tee. A loud streetwear piece that comes back wrong is unwearable. Start here, learn the QC process, then graduate to riskier categories.",
      },
      {
        heading: "Sizing notes",
        body:
          "Minimalist cuts are typically more fitted than streetwear and looser than tailoring — true to size in modern Western terms. Chinese sizing still runs small, so order one size up unless the seller explicitly lists Western sizing. For tees specifically, the body length matters more than chest width — minimalist tees should sit at mid-hip, not below.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Tees: fabric weight (ask for gsm), neckline construction (double-stitched ribbed collar = quality), and hem (clean single-needle hem). Denim: indigo depth (real selvedge denim has a deep, slightly purple tone), and stitching colour matching the wash. Sneakers: outsole cleanness — minimalist style requires a perfectly white sole with no factory residue.",
      },
    ],
    pieces: [
      { role: "Top", name: "Heavyweight white tee (280–320 gsm)", note: "Ribbed neckline + clean hem = quality basics.", typicalPriceUsd: "$15–28", platform: "Taobao" },
      { role: "Bottom", name: "Straight-leg raw denim", note: "Real selvedge has visible orange edge stitching.", typicalPriceUsd: "$45–85", platform: "Taobao" },
      { role: "Shoes", name: "Minimal white leather sneaker", note: "Outsole must be clean — reject factory residue.", typicalPriceUsd: "$50–100", platform: "Weidian" },
      { role: "Outerwear", name: "Wool-blend overshirt (camel or grey)", note: "Lining presence matters — unlined feels cheap.", typicalPriceUsd: "$55–95", platform: "Taobao" },
      { role: "Bag", name: "Structured leather tote (black or tan)", note: "Same material checks as old-money guide.", typicalPriceUsd: "$60–130", platform: "Taobao" },
      { role: "Accessory", name: "Steel watch (38–40 mm case)", note: "Movement type is verifiable in QC video.", typicalPriceUsd: "$45–120", platform: "Taobao" },
    ],
    faq: [
      {
        q: "Is minimalist style worth repping at all?",
        a: "Yes — partly because the cost difference between rep and retail is large for basics (a $30 LitBuy tee versus a $180 designer tee), and partly because the risk of getting a bad batch is low. Minimalist pieces are mostly about fabric and fit, both of which are verifiable in QC.",
      },
      {
        q: "What is the typical budget for a minimalist outfit?",
        a: "$200–350 USD before shipping for a complete look (tee, denim, sneaker, overshirt, tote, watch). You can go lower by skipping the watch or tote — a basic tee, denim and sneaker is around $110–200.",
      },
      {
        q: "Are LitBuy Spreadsheet basics actually well made?",
        a: "Some sellers — yes, comparable to mid-tier Western basics brands. Many sellers — no. The LitBuy Spreadsheet flags creators who specialise in heavyweight cotton (typically tagged with gsm in the description). Filter by that and you avoid the thin, low-quality majority.",
      },
    ],
    keywords: ["minimalist reps outfit", "minimalist reps guide", "essentials reps", "basics taobao", "heavyweight tee reps"],
  },
];

export function getOutfitGuide(slug: string): OutfitGuide | undefined {
  return OUTFIT_GUIDES.find((g) => g.slug === slug);
}
