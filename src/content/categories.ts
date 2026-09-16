// Kategorie-Landingpages (/categories und /categories/[slug]).
//
// Diese zehn Seiten sind die indexierbaren "kommerziellen" Seiten der Domain
// und ersetzen die ~8.600 dünnen Produktseiten im Google-Index. Jede Seite
// kombiniert redaktionellen Text (Sizing, QC, Budget, Plattform) mit einem
// serverseitig gerenderten Produkt-Grid aus der Datenbank.
//
// Slugs müssen zu `categorySlug(canonical)` in lib/categoryGroups.ts passen.

export interface CategoryGuide {
  slug: string;
  canonical: string; // key in CATEGORY_GROUPS
  title: string; // <title>, 50–60 chars
  metaDescription: string; // 150–160 chars
  h1: string;
  tagline: string;
  intro: string[]; // 2 paragraphs
  highlights: string[]; // "what you will find" bullets
  buyingTips: { heading: string; body: string }[];
  faq: { q: string; a: string }[];
  relatedOutfits: string[]; // slugs from content/outfits.ts
  relatedTutorials: string[]; // slugs from content/tutorials.ts
  image: string; // /public path
  keywords: string[];
}

export const CATEGORY_GUIDES: CategoryGuide[] = [
  {
    slug: "shoes",
    canonical: "Shoes",
    title: "Reps Shoes on the LitBuy Spreadsheet — Sneakers & Boots",
    metaDescription:
      "Browse rep sneakers, boots and loafers from the LitBuy Spreadsheet. Sizing guide for Chinese shoe sellers, QC photo checks and realistic budgets per silhouette.",
    h1: "Shoes on the LitBuy Spreadsheet",
    tagline: "Sneakers, boots and loafers — the largest category in the sheet.",
    intro: [
      "Shoes are the biggest and most competitive category on the LitBuy Spreadsheet. Almost every popular silhouette — Air Force 1, Dunk Low, Jordan 1 and 4, Samba, New Balance 550 and 2002R, Yeezy Slides, Foam Runners — exists in several batches from different factories, and the difference between a good and a bad batch is far larger than the price difference. The listings below are pulled live from the spreadsheet database and sorted so recently added and community-boosted finds surface first.",
      "Use this page as the starting point when you know which shoe you want but not which seller. Read the sizing and QC notes before you order, then open the listing on LitBuy to see the seller's own photos and size table.",
    ],
    highlights: [
      "Lifestyle sneakers: Air Force 1, Dunk, Samba, Gazelle, Campus, NB 550 and 574",
      "Retro basketball: Jordan 1, 3, 4 and 11 in the most requested colourways",
      "Runners and slides: Yeezy 350 and 700, Foam Runner, slides and clogs",
      "Boots and loafers: Chelsea boots, Timberland-style 6-inch, penny and horsebit loafers",
    ],
    buyingTips: [
      {
        heading: "Sizing",
        body:
          "Chinese sellers list shoes in EU or CN sizing. CN sizing runs roughly one to two sizes off US, so always convert against the seller's own size chart in the LitBuy listing rather than a generic table. When a batch is known to run small — common for Sambas and Jordan 1 lows — the community notes are usually in the product description or the seller's photos. If in doubt, size up half a size for lifestyle sneakers and size true for runners.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Ask for photos of both shoes side by side, the box label, the insole logo and the toe-box shape from the front. The most common defects are uneven toe-box height, glue stains along the midsole and misaligned heel tabs. Reject anything with two left shoes (it happens), visible glue or a size tag that does not match your order.",
      },
      {
        heading: "Budget and platform",
        body:
          "Most sneakers on the spreadsheet land between $20 and $60 after conversion from CNY, with premium batches of Jordans and Yeezys closer to $60–$90. Shoes are heavy — expect 1.0–1.5 kg with the box — so factor in shipping when comparing to retail. Weidian hosts most of the well-known batches; Taobao is stronger for boots and loafers.",
      },
    ],
    faq: [
      {
        q: "Do shoes from the LitBuy Spreadsheet come with a box?",
        a: "Usually yes, but the box adds weight and cost. If you do not need it, ask LitBuy to remove the box at the warehouse before shipping — most agents offer this as a free or low-cost service.",
      },
      {
        q: "Which shoe batches are the best?",
        a: "Batch quality changes over time as factories update moulds. Rather than trusting a batch name, check recent QC photos in the community and compare the toe-box shape and stitching against retail references before approving.",
      },
      {
        q: "Are shoe sizes on Weidian and Taobao the same as US sizes?",
        a: "No. Sellers use CN or EU sizing. Convert with the seller's own chart shown on the LitBuy product page. When a chart is missing, message the seller through LitBuy before paying.",
      },
    ],
    relatedOutfits: ["streetwear", "y2k", "minimalist"],
    relatedTutorials: ["qc-photos", "shipping-lines-explained"],
    image: "/categories/shoes.png",
    keywords: ["litbuy shoes", "rep sneakers litbuy", "litbuy spreadsheet shoes", "rep shoes weidian"],
  },
  {
    slug: "t-shirts",
    canonical: "T-Shirts",
    title: "Reps T-Shirts on the LitBuy Spreadsheet — Graphic & Basic Tees",
    metaDescription:
      "Rep graphic tees, basics and longsleeves from the LitBuy Spreadsheet. Fabric weight guide, print QC checks and what a good tee should cost through LitBuy.",
    h1: "T-Shirts on the LitBuy Spreadsheet",
    tagline: "Graphic tees, heavyweight basics and longsleeves.",
    intro: [
      "T-shirts are the cheapest way to test a new seller and the second-largest category on the LitBuy Spreadsheet. The range runs from streetwear graphics — Stussy, Supreme, Palm Angels, Chrome Hearts, Gallery Dept — to designer basics from Balenciaga, Dior and Louis Vuitton, plus plain heavyweight blanks that many buyers order in bulk.",
      "Because tees are light and inexpensive they are ideal filler for a haul: adding two or three rarely changes the shipping bracket. The listings below are live from the spreadsheet database; use the sort control on the full spreadsheet page if you want to browse by price.",
    ],
    highlights: [
      "Streetwear graphics: Stussy, Supreme, Palm Angels, Represent, Corteiz, Broken Planet",
      "Luxury basics: Balenciaga, Dior, Louis Vuitton, Amiri and Fear of God Essentials",
      "Heavyweight blanks and boxy fits in 230–300 gsm cotton",
      "Longsleeves, ringer tees and vintage-wash graphics",
    ],
    buyingTips: [
      {
        heading: "Fabric weight",
        body:
          "Look for the gsm figure in the listing. 180–200 gsm is a standard summer tee; 230 gsm and above drapes like a premium streetwear blank. Sellers who state the weight and show a close-up of the fabric are more reliable than those who only post stock images.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Ask for a flat-lay front and back, a close-up of the print and the neck label. Puff prints should be evenly raised, screen prints should have no bleed at the edges, and the neck tag should be stitched, not glued. Colour accuracy is the most common complaint, so compare against the retail reference under daylight rather than warehouse lighting.",
      },
      {
        heading: "Budget and platform",
        body:
          "Most tees on the spreadsheet cost $8–$25 after conversion. Anything under $6 is almost always a thin blank with a low-quality print. Weidian has the deepest selection of streetwear graphics; Taobao is better for plain heavyweight blanks sold by the pack.",
      },
    ],
    faq: [
      {
        q: "How do rep tees fit compared to retail?",
        a: "Most Chinese sellers use Asian sizing, which runs one size smaller than US or EU. The LitBuy listing shows the seller's size chart with chest and length in centimetres — measure a tee you already own and match those numbers instead of picking your usual letter size.",
      },
      {
        q: "Do prints crack or fade after washing?",
        a: "Quality varies by seller. Screen prints on heavyweight cotton hold up well when washed inside out on cold. Cheap DTG prints on thin blanks fade fastest. Check the print close-up in QC before approving.",
      },
      {
        q: "Is it worth ordering tees on their own?",
        a: "Shipping minimums make a tee-only haul expensive per item. Tees work best as add-ons to a haul that already contains shoes or a jacket.",
      },
    ],
    relatedOutfits: ["streetwear", "y2k", "minimalist"],
    relatedTutorials: ["qc-photos", "verifying-sellers"],
    image: "/categories/tshirts.png",
    keywords: ["litbuy t-shirts", "rep tees litbuy", "litbuy spreadsheet shirts", "rep graphic tees"],
  },
  {
    slug: "hoodies",
    canonical: "Hoodies",
    title: "Reps Hoodies on the LitBuy Spreadsheet — Zip-Ups & Pullovers",
    metaDescription:
      "Rep hoodies, crewnecks and zip-ups from the LitBuy Spreadsheet. Fleece weight guide, sizing for oversized fits, QC checks and realistic LitBuy budgets.",
    h1: "Hoodies on the LitBuy Spreadsheet",
    tagline: "Pullovers, zip-ups and crewnecks from the most-ordered brands.",
    intro: [
      "Hoodies are the most-ordered single item on the LitBuy Spreadsheet by a wide margin. Fear of God Essentials, Trapstar, Spider, Stone Island, Represent and Gallery Dept dominate, alongside Nike Tech Fleece hoodies that are usually sold as part of a set. A hoodie is also the item where batch differences are easiest to see: fleece weight, cuff elasticity and the finish on the drawstrings tell you almost everything about the factory.",
      "The grid below shows live listings from the spreadsheet database. Filter by price on the full spreadsheet page if you are hunting for a specific budget, and read the sizing note before ordering an oversized fit.",
    ],
    highlights: [
      "Essentials, Stone Island, CP Company and Represent pullovers",
      "Trapstar, Spider, Corteiz and Broken Planet graphic hoodies",
      "Nike Tech Fleece, Adidas and Sergio Tacchini zip-ups",
      "Crewnecks and quarter-zips in heavyweight 400+ gsm fleece",
    ],
    buyingTips: [
      {
        heading: "Sizing for oversized fits",
        body:
          "Essentials-style hoodies are designed oversized, and Asian sizing runs small on top of that. The rule that works for most buyers is to order one size up from your US size for a regular fit and two sizes up for the intended boxy look. Always check the chest and length figures in the seller's chart on LitBuy first.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Request a shot of the inside fleece, the cuff and hem ribbing, the drawstring tips and the rubber or embroidered logo. Good batches have dense brushed fleece and thick ribbing that springs back; bad batches have thin loop-back fleece and flat ribbing. Puff-print logos should be evenly raised with clean edges.",
      },
      {
        heading: "Budget and platform",
        body:
          "Expect $18–$45 for most hoodies after conversion, with heavyweight Stone Island or Represent batches nearer $45–$70. Hoodies weigh 600–900 g, so two hoodies plus a pair of shoes typically fill the 2–3 kg shipping bracket. Weidian is the main platform for streetwear hoodies; Taobao is worth checking for plain heavyweight blanks.",
      },
    ],
    faq: [
      {
        q: "Do rep hoodies shrink after washing?",
        a: "Cotton-heavy fleece can shrink 2–4 percent on the first wash. Wash cold, do not tumble dry, and factor the shrinkage in if you are between sizes.",
      },
      {
        q: "What does gsm mean on hoodie listings?",
        a: "Grams per square metre — the fabric weight. 300–350 gsm is a mid-weight hoodie; 400 gsm and above is heavyweight and holds its shape. Sellers who list gsm are usually the more reliable ones.",
      },
      {
        q: "Can I buy just the hoodie from a tracksuit listing?",
        a: "Often yes. Many sellers list the top and bottom as separate options on the same product. Choose the option in the LitBuy listing before adding to cart.",
      },
    ],
    relatedOutfits: ["streetwear", "techwear", "minimalist"],
    relatedTutorials: ["qc-photos", "first-haul-checklist"],
    image: "/categories/hoodies.png",
    keywords: ["litbuy hoodies", "rep hoodies litbuy", "essentials hoodie litbuy", "litbuy spreadsheet hoodies"],
  },
  {
    slug: "jackets",
    canonical: "Jackets",
    title: "Reps Jackets on the LitBuy Spreadsheet — Puffers & Shells",
    metaDescription:
      "Rep puffers, shells, fleeces and bombers from the LitBuy Spreadsheet. Fill and shell fabric guide, jacket QC checks and how to keep shipping costs down.",
    h1: "Jackets on the LitBuy Spreadsheet",
    tagline: "Puffers, technical shells, fleeces and bombers.",
    intro: [
      "Jackets are where the LitBuy Spreadsheet saves buyers the most money in absolute terms. Moncler Maya and Maya 70, Canada Goose parkas, The North Face 1996 Nuptse, Arc'teryx Beta and Alpha shells, Stone Island softshells and Patagonia fleeces are all present in multiple batches. They are also the items with the highest risk of disappointment if you skip QC, because fill quality and shell fabric are hard to judge from listing photos.",
      "Listings below are live from the spreadsheet database. Read the fill and QC notes first — a jacket is usually the single most expensive item in a haul, and it drives the shipping weight.",
    ],
    highlights: [
      "Down puffers: Moncler, Canada Goose, The North Face Nuptse and Himalayan",
      "Technical shells: Arc'teryx Beta LT and Alpha SV, Stone Island, CP Company",
      "Fleeces and varsity: Patagonia Retro-X, Carhartt, Supreme and Palm Angels varsity jackets",
      "Leather and denim: Amiri, Celine and Saint Laurent biker jackets, Levi's-style truckers",
    ],
    buyingTips: [
      {
        heading: "Fill and fabric",
        body:
          "For puffers, listings that say '90/10 white duck down' or give a fill weight in grams are the ones worth considering. Polyester-fill jackets are lighter and cheaper but lose loft after a season. For shells, look for a stated waterproof rating and taped seams in the photos. If the seller cannot answer what the fill is through LitBuy, move on.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Ask for the inside label, the zipper pull close-up, the baffle stitching and a photo with the jacket hung up so you can judge loft. Uneven baffles, a zipper brand you do not recognise, and loose threads at the pocket corners are the standard rejection reasons.",
      },
      {
        heading: "Budget and platform",
        body:
          "Fleeces and light shells run $25–$50; down puffers and premium shells are $50–$120 after conversion. A parka can weigh 1.5–2 kg, so it often makes sense to ship a jacket on its own line rather than with shoes. Taobao has the widest range of down jackets; Weidian sellers specialise in Moncler and Arc'teryx batches.",
      },
    ],
    faq: [
      {
        q: "Are rep puffers actually warm?",
        a: "Down-filled batches with a stated fill weight are comparable to mid-range retail puffers. Polyester-filled ones are fine for mild winters but not for sub-zero conditions. The fill type is the single most important spec to confirm before ordering.",
      },
      {
        q: "Will customs flag a jacket?",
        a: "Jackets are declared like any other clothing. Keep the declared value realistic and remove branded packaging at the warehouse. Our customs tutorial covers per-country thresholds.",
      },
      {
        q: "How do jacket sizes run?",
        a: "Asian sizing again — usually one size smaller than EU. Chest and shoulder width in the LitBuy size chart are the numbers to match, especially for fitted styles like Moncler Maya.",
      },
    ],
    relatedOutfits: ["techwear", "old-money", "streetwear"],
    relatedTutorials: ["qc-photos", "customs-declaration", "shipping-lines-explained"],
    image: "/categories/jackets.png",
    keywords: ["litbuy jackets", "rep puffer litbuy", "moncler rep litbuy", "litbuy spreadsheet jackets"],
  },
  {
    slug: "pants",
    canonical: "Pants",
    title: "Reps Pants on the LitBuy Spreadsheet — Cargos, Denim & Joggers",
    metaDescription:
      "Rep cargo pants, denim, joggers and track pants from the LitBuy Spreadsheet. Inseam and waist sizing guide, denim QC checks and what to budget through LitBuy.",
    h1: "Pants on the LitBuy Spreadsheet",
    tagline: "Cargos, denim, joggers and track pants.",
    intro: [
      "Pants are the category where sizing goes wrong most often, so this page leans heavily on fit guidance. The LitBuy Spreadsheet covers Amiri and Gallery Dept denim, Stone Island and Carhartt cargos, Essentials and Nike Tech Fleece sweatpants, Corteiz and Represent joggers and a growing number of flared and baggy silhouettes for Y2K-style outfits.",
      "Listings below come live from the spreadsheet database. Check the waist and inseam figures against a pair you own before ordering; Chinese size labels are not a reliable guide on their own.",
    ],
    highlights: [
      "Designer denim: Amiri MX1, Gallery Dept flares, Purple Brand, Chrome Hearts",
      "Cargos and workwear: Stone Island, Carhartt, Dickies 874, Stussy",
      "Sweatpants and joggers: Essentials, Nike Tech Fleece, Represent, Corteiz",
      "Track pants and baggy cuts for Y2K and streetwear fits",
    ],
    buyingTips: [
      {
        heading: "Waist and inseam",
        body:
          "Sellers list waist in centimetres and often quote the flat measurement, which you need to double. Inseam is rarely adjusted for height, so tall buyers should look for 'long' options or expect to hem. Measure a pair that fits you and match waist, hip and inseam in the LitBuy chart — ignore the letter or number size entirely.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "For denim: the button and rivet stamps, the back-pocket stitching and the fade pattern under natural light. For cargos: pocket alignment and whether the pocket flaps sit flat. For sweatpants: the elastic waistband and the cuff ribbing. Distressing on Amiri-style denim should look intentional and symmetrical.",
      },
      {
        heading: "Budget and platform",
        body:
          "Sweatpants and joggers run $18–$35; premium denim and cargos are $30–$60 after conversion. Denim is heavy at 700–900 g per pair, so pair it with tees rather than a jacket to stay in a lower shipping bracket. Weidian is stronger for designer denim, Taobao for workwear and plain cargos.",
      },
    ],
    faq: [
      {
        q: "Do rep jeans stretch or shrink?",
        a: "Raw denim shrinks slightly on first wash; stretch denim relaxes a little with wear. Order your true waist for stretch fabrics and consider one size up for rigid raw denim.",
      },
      {
        q: "Can I ask the seller to hem pants?",
        a: "Some Taobao sellers offer free hemming if you message the inseam you need before shipping. Ask through LitBuy at the time of ordering — it cannot be done once the item reaches the warehouse.",
      },
      {
        q: "Which pants work best for a first haul?",
        a: "Sweatpants and joggers are the most forgiving fit and the easiest to QC. Save designer denim for after you know how a seller's sizing runs.",
      },
    ],
    relatedOutfits: ["streetwear", "y2k", "techwear"],
    relatedTutorials: ["qc-photos", "first-haul-checklist"],
    image: "/categories/pants.png",
    keywords: ["litbuy pants", "rep jeans litbuy", "rep cargo pants litbuy", "litbuy spreadsheet pants"],
  },
  {
    slug: "shorts",
    canonical: "Shorts",
    title: "Reps Shorts on the LitBuy Spreadsheet — Mesh, Cargo & Swim",
    metaDescription:
      "Rep basketball, cargo and swim shorts from the LitBuy Spreadsheet. Length and fit guide, print QC checks and why shorts are the best haul filler in summer.",
    h1: "Shorts on the LitBuy Spreadsheet",
    tagline: "Mesh, cargo, sweat and swim shorts for summer hauls.",
    intro: [
      "Shorts are a small but useful category on the LitBuy Spreadsheet. Essentials sweat shorts, Nike Tech Fleece shorts, Eric Emanuel and Chrome Hearts-style mesh shorts, Stussy and Corteiz cargos and designer swim shorts from Dior and Louis Vuitton make up most of the listings. They are light, cheap and rarely fail QC, which makes them ideal for filling a haul that is just under a shipping bracket.",
      "The grid below shows live listings. The main decision is length — inseams range from 5 to 9 inches and sellers do not always state it, so read the sizing note.",
    ],
    highlights: [
      "Mesh basketball shorts in the Eric Emanuel style with 5, 7 and 9 inch inseams",
      "Sweat shorts from Essentials, Nike Tech Fleece and Represent",
      "Cargo shorts from Stussy, Corteiz and Carhartt",
      "Swim shorts from Dior, Louis Vuitton and Palm Angels",
    ],
    buyingTips: [
      {
        heading: "Length and fit",
        body:
          "Ask the seller for the inseam in centimetres if it is not listed. 13 cm is roughly a 5-inch short, 18 cm a 7-inch, 23 cm a 9-inch. Waist follows the same rules as pants — double the flat measurement and match your own pair.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Mesh shorts: the drawstring tips, the side-panel stitching and the embroidered logo. Swim shorts: the mesh liner and the all-over print alignment at the seams. Cargo shorts: pocket flap alignment. Shorts rarely need to be rejected, but misaligned prints on swim shorts are common.",
      },
      {
        heading: "Budget and platform",
        body:
          "Most shorts are $10–$25 after conversion and weigh 200–350 g. Two pairs typically add under $3 in shipping. Weidian has the best selection of mesh and sweat shorts; Taobao is good for plain cargo shorts.",
      },
    ],
    faq: [
      {
        q: "Do mesh shorts come with a liner?",
        a: "Most Eric Emanuel-style mesh shorts do not, matching retail. Swim shorts should have a mesh liner — check for it in the QC photos.",
      },
      {
        q: "Are shorts worth QC photos?",
        a: "Yes, but you can approve quickly. The only frequent defect is print misalignment on swim shorts and uneven embroidery on mesh shorts.",
      },
      {
        q: "What size should I order in Essentials shorts?",
        a: "One size up from your US size for a regular fit. The retail cut is already relaxed and Asian sizing runs small.",
      },
    ],
    relatedOutfits: ["streetwear", "y2k"],
    relatedTutorials: ["qc-photos", "shipping-lines-explained"],
    image: "/categories/others.png",
    keywords: ["litbuy shorts", "rep mesh shorts litbuy", "rep swim shorts", "litbuy spreadsheet shorts"],
  },
  {
    slug: "tracksuits",
    canonical: "Tracksuits",
    title: "Reps Tracksuits on the LitBuy Spreadsheet — Full Sets",
    metaDescription:
      "Rep tracksuits and matching sets from the LitBuy Spreadsheet. Nike Tech Fleece, Essentials, Trapstar and Sergio Tacchini sets with sizing, QC and budget notes.",
    h1: "Tracksuits on the LitBuy Spreadsheet",
    tagline: "Matching top-and-bottom sets ordered in one listing.",
    intro: [
      "Tracksuits on the LitBuy Spreadsheet are listed as full sets so you get a matching top and bottom from the same factory and dye lot. Nike Tech Fleece is the most requested, followed by Essentials co-ords, Trapstar Irongate sets, Palm Angels and Amiri track suits and retro Sergio Tacchini and Fila sets for Y2K-style fits.",
      "The grid below shows live set listings. The two things to get right are ordering matching sizes for the top and bottom (they can differ) and confirming that both pieces ship from the same seller so the colour matches.",
    ],
    highlights: [
      "Nike Tech Fleece full-zip sets in the core colourways",
      "Essentials, Represent and Corteiz co-ord sets",
      "Trapstar Irongate, Palm Angels and Amiri track suits",
      "Retro sets: Sergio Tacchini, Fila, Kappa and Lacoste",
    ],
    buyingTips: [
      {
        heading: "Sizing top and bottom separately",
        body:
          "Many set listings let you pick a different size for the hoodie and the pants. Take advantage of it — most buyers need one size up on the top for an oversized look and true size on the bottom. Check both charts in the LitBuy listing.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Ask for the top and bottom photographed together under the same light so you can confirm the colours match. Then check the zipper, the cuffs on both pieces and the logo placement. A colour mismatch between top and bottom is the main reason to reject a set.",
      },
      {
        heading: "Budget and platform",
        body:
          "Sets run $35–$70 after conversion and weigh 1.0–1.4 kg. One set plus a pair of shoes fills a 2–2.5 kg parcel neatly. Weidian sellers dominate Tech Fleece and Essentials; Taobao is where the retro sets live.",
      },
    ],
    faq: [
      {
        q: "Can I buy the tracksuit pants on their own?",
        a: "Often. Set listings frequently include 'top only' and 'pants only' options. Select the option before adding the item to your LitBuy cart.",
      },
      {
        q: "Is Nike Tech Fleece from the spreadsheet the same weight as retail?",
        a: "Good batches use a similar double-knit fleece. Cheaper batches are noticeably thinner — ask for a close-up of the fabric and cuff in QC before approving.",
      },
      {
        q: "Do tracksuits fade?",
        a: "Dark colours can fade slightly if washed hot. Wash cold and inside out, and avoid the dryer.",
      },
    ],
    relatedOutfits: ["streetwear", "y2k"],
    relatedTutorials: ["qc-photos", "first-haul-checklist"],
    image: "/categories/tracksuits.png",
    keywords: ["litbuy tracksuit", "tech fleece rep litbuy", "rep tracksuit set", "litbuy spreadsheet tracksuits"],
  },
  {
    slug: "jerseys",
    canonical: "Jerseys",
    title: "Reps Jerseys on the LitBuy Spreadsheet — Football & NBA Kits",
    metaDescription:
      "Rep football kits, NBA jerseys and retro shirts from the LitBuy Spreadsheet. Player vs fan version explained, badge and print QC checks and sizing guidance.",
    h1: "Jerseys on the LitBuy Spreadsheet",
    tagline: "Football kits, NBA swingmans and retro shirts.",
    intro: [
      "Jerseys have their own category on the LitBuy Spreadsheet because the sellers turn over stock faster than any other category — new kits appear within days of a club launch, and last season's shirts disappear just as quickly. You will find current and retro football kits from the major European clubs and national teams, NBA swingman jerseys, NFL and MLB shirts and a growing number of retro 90s designs.",
      "The listings below are live from the database. The key decision for football shirts is player version versus fan version; read the note below before ordering.",
    ],
    highlights: [
      "Current-season football kits: home, away and third for the top European clubs",
      "Retro football shirts from the 90s and 2000s",
      "NBA swingman and city-edition jerseys",
      "NFL, MLB and NHL jerseys plus F1 team shirts",
    ],
    buyingTips: [
      {
        heading: "Player version vs fan version",
        body:
          "Player versions are slim-fit with heat-pressed badges and lighter fabric; fan versions are a regular fit with embroidered badges. Sellers list both. Player versions run about one size smaller than fan versions, so order up if you want a relaxed fit. Name and number printing is usually a paid option in the LitBuy listing.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "The club crest, the sponsor print and the manufacturer logo are the three places where quality shows. Ask for close-ups of all three and check alignment and edge sharpness. Customised names should be centred and the number font should match the league's official one.",
      },
      {
        heading: "Budget and platform",
        body:
          "Fan versions cost $12–$20 and player versions $15–$28 after conversion. Jerseys weigh under 250 g, so they are ideal haul filler. Weidian and Taobao both carry jerseys; Taobao sellers generally offer more customisation options.",
      },
    ],
    faq: [
      {
        q: "Can I add a name and number?",
        a: "Yes on most listings. Choose the customisation option in the LitBuy listing and enter the name and number in the remarks. Customised items take a few extra days before they ship to the warehouse.",
      },
      {
        q: "How do jersey sizes run?",
        a: "Fan versions are close to EU sizing. Player versions are slim and run small — size up one for a normal fit.",
      },
      {
        q: "Are retro shirts the same quality as current kits?",
        a: "Retro shirts use heavier fabric and embroidered details, and quality is generally good. Check the crest embroidery in QC as the main indicator.",
      },
    ],
    relatedOutfits: ["y2k", "streetwear"],
    relatedTutorials: ["qc-photos", "verifying-sellers"],
    image: "/categories/sports.png",
    keywords: ["litbuy jerseys", "rep football kits litbuy", "rep nba jersey", "litbuy spreadsheet jerseys"],
  },
  {
    slug: "accessories",
    canonical: "Accessories",
    title: "Reps Accessories on the LitBuy Spreadsheet — Bags, Belts & Caps",
    metaDescription:
      "Rep bags, belts, wallets, caps, sunglasses and jewellery from the LitBuy Spreadsheet. Hardware and leather QC checks plus budgets for small leather goods via LitBuy.",
    h1: "Accessories on the LitBuy Spreadsheet",
    tagline: "Bags, belts, wallets, caps, sunglasses and jewellery.",
    intro: [
      "Accessories are the widest category on the LitBuy Spreadsheet and the one with the biggest quality spread. A Louis Vuitton belt or Gucci cardholder can be excellent or terrible depending on the factory, and the price difference between the two is often only a few dollars. Bags, belts and wallets from Louis Vuitton, Gucci, Prada, Dior and Balenciaga, caps and beanies from Supreme, Stussy and New Era, Chrome Hearts jewellery and designer sunglasses make up the bulk of listings.",
      "The listings below come live from the database. For leather goods, the hardware and stitching notes below matter more than anything else.",
    ],
    highlights: [
      "Small leather goods: cardholders, wallets and belts from LV, Gucci, Prada and Dior",
      "Bags: crossbody, tote and backpack styles from Louis Vuitton, Prada and Balenciaga",
      "Headwear: New Era caps, Supreme and Stussy beanies, designer bucket hats",
      "Jewellery and eyewear: Chrome Hearts, Vivienne Westwood, Cartier-style bracelets, designer sunglasses",
    ],
    buyingTips: [
      {
        heading: "Hardware and leather",
        body:
          "For belts and bags, the buckle or clasp is where cheap batches fail — look for a solid, heavy finish with crisp engraving. Ask whether the leather is genuine or PU; both exist and the price tells you which. Stitching should be even with no loose ends at the corners.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Belts: the buckle engraving, the belt-hole spacing and the edge paint. Wallets and cardholders: the interior stamp, the card-slot alignment and the edge paint. Caps: the front embroidery and the sweatband label. Jewellery: the clasp and any engraving. Edge paint that is uneven or already cracking is the most common rejection reason.",
      },
      {
        heading: "Budget and platform",
        body:
          "Caps and beanies are $8–$18, belts and cardholders $12–$35, bags $30–$90 after conversion. Accessories are light and are the best way to top up a haul. Weidian has the strongest belt and wallet sellers; Taobao has more variety in bags and eyewear.",
      },
    ],
    faq: [
      {
        q: "Do belts come with a box and dust bag?",
        a: "Many do, but packaging adds weight and can attract attention at customs. Ask LitBuy to remove branded packaging at the warehouse unless you specifically want it.",
      },
      {
        q: "How do I pick a belt size?",
        a: "Measure a belt you own from the buckle fold to the hole you use, in centimetres. Sellers list belt length rather than waist size, and most will cut the belt to length on request.",
      },
      {
        q: "Are rep sunglasses UV-protective?",
        a: "Most listings claim UV400 lenses. There is no way to verify this from QC photos, so treat rep sunglasses as a fashion item rather than eye protection.",
      },
    ],
    relatedOutfits: ["old-money", "minimalist", "streetwear"],
    relatedTutorials: ["qc-photos", "customs-declaration"],
    image: "/categories/accessories.png",
    keywords: ["litbuy accessories", "rep belt litbuy", "rep bag litbuy", "litbuy spreadsheet accessories"],
  },
  {
    slug: "electronics",
    canonical: "Electronics",
    title: "Electronics on the LitBuy Spreadsheet — Earbuds, Watches & Gadgets",
    metaDescription:
      "Earbuds, smartwatches, speakers and gadgets from the LitBuy Spreadsheet. What works with iOS and Android, battery and warranty caveats and realistic prices via LitBuy.",
    h1: "Electronics on the LitBuy Spreadsheet",
    tagline: "Earbuds, smartwatches, speakers and lifestyle gadgets.",
    intro: [
      "Electronics is the smallest category on the LitBuy Spreadsheet and the one where expectations need the most managing. Wireless earbuds, smartwatches, portable speakers, chargers and mechanical keyboards make up most listings. Some are unbranded products that are simply good value; others imitate well-known designs and have limits you should know about before ordering.",
      "The listings below are live from the database. Read the compatibility note first — it is the most common source of disappointment in this category.",
    ],
    highlights: [
      "Wireless earbuds and over-ear headphones",
      "Smartwatches and fitness bands with iOS and Android companion apps",
      "Portable Bluetooth speakers and chargers",
      "Mechanical keyboards, mice and desk accessories",
    ],
    buyingTips: [
      {
        heading: "Compatibility",
        body:
          "Earbuds that imitate AirPods pair over standard Bluetooth on both iOS and Android, but features like the pop-up pairing animation, spatial audio and automatic device switching either work partially or not at all. Smartwatches use their own companion apps, not Apple Watch or Wear OS. Decide whether you want the look or the ecosystem features before you order.",
      },
      {
        heading: "What to check in QC photos",
        body:
          "Ask LitBuy for a power-on test — most agents will photograph the device switched on for a small fee. Check that the charging cable and case are included and that the serial sticker is present. Cosmetic checks matter less than confirming the device turns on.",
      },
      {
        heading: "Budget and platform",
        body:
          "Earbuds run $10–$30, smartwatches $20–$50 and speakers $15–$40 after conversion. Items with lithium batteries can only travel on certain shipping lines and are not accepted by every carrier — check the line restrictions before consolidating electronics with clothing.",
      },
    ],
    faq: [
      {
        q: "Do electronics from the spreadsheet come with a warranty?",
        a: "No. Once the item leaves the LitBuy warehouse there is no manufacturer warranty. The power-on test at the warehouse is your only protection, so always request it.",
      },
      {
        q: "Can I ship electronics with my clothing haul?",
        a: "Only on shipping lines that accept batteries. LitBuy shows which lines allow 'sensitive goods' at checkout. Expect a slower line and a slightly higher price.",
      },
      {
        q: "Will the earbuds show the battery pop-up on my iPhone?",
        a: "Some batches replicate the pop-up, many do not, and Apple software updates can break it. Treat it as a bonus rather than a guarantee.",
      },
    ],
    relatedOutfits: ["techwear", "minimalist"],
    relatedTutorials: ["shipping-lines-explained", "customs-declaration"],
    image: "/categories/electronics.png",
    keywords: ["litbuy electronics", "rep airpods litbuy", "litbuy spreadsheet electronics", "rep smartwatch"],
  },
];

export function getCategoryGuide(slug: string): CategoryGuide | undefined {
  return CATEGORY_GUIDES.find((g) => g.slug === slug);
}

export function getCategoryGuideByCanonical(
  canonical: string
): CategoryGuide | undefined {
  return CATEGORY_GUIDES.find((g) => g.canonical === canonical);
}

/** Category guides that reference a given outfit slug. */
export function getCategoriesForOutfit(outfitSlug: string): CategoryGuide[] {
  return CATEGORY_GUIDES.filter((g) => g.relatedOutfits.includes(outfitSlug));
}

/** Category guides that reference a given tutorial slug. */
export function getCategoriesForTutorial(tutorialSlug: string): CategoryGuide[] {
  return CATEGORY_GUIDES.filter((g) =>
    g.relatedTutorials.includes(tutorialSlug)
  );
}
