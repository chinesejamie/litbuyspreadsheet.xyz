import { Product, Category, Outfit, PartnerBrand, SocialLinks } from "@/types";

export const SITE_CONFIG = {
  name: "LitBuy Spreadsheet",
  creator: "Miki",
  brandName: "LitBuy Spreadsheet",
  litbuyInvite: "https://litbuy.com/register?inviteCode=0X0WQA4NL",
  telegram: "https://t.me/addlist/KNvJ0oc3O3UwMjIy",
  discord: "https://discord.gg/XPH5eMxEP",
  instagram: "#",
  socials: {
    litbuy: {
      tiktok: "https://www.tiktok.com/@timseydiii?_r=1&_t=ZG-955wC1qyG6j",
      instagram: "https://www.instagram.com/timseydii?igsh=MTl1Nm1ua2Q0czgzMg%3D%3D&utm_source=qr",
      youtube: "https://youtube.com/@timseydi?si=xwjA4zvobKa6Z7Ne",
      twitch: "https://m.twitch.tv/26broz/home?tt_content=channel&tt_medium=mobile_web_share",
      discord: "https://discord.gg/XPH5eMxEP",
      telegram: "https://t.me/addlist/KNvJ0oc3O3UwMjIy",
    } as SocialLinks,
  } as Record<string, SocialLinks>,
};

export const CATEGORIES: Category[] = [
  {
    name: "All",
    subcategories: ["All"],
  },
  {
    name: "Shoes",
    subcategories: ["All", "Default", "Running", "Slides", "Boots", "Loafers", "Others"],
  },
  {
    name: "Tshirts",
    subcategories: ["All", "Graphic Tees", "Basic Tees", "Longsleeves", "Sports", "Button Ups", "Others"],
  },
  {
    name: "Hoodies",
    subcategories: ["All", "Zip Hoodies", "Quarter Zips", "Hoodies", "Sweaters", "Others"],
  },
  {
    name: "Jackets",
    subcategories: ["All", "Puffer Jackets", "Windbreaker", "Cardigans", "Track Jackets", "Vests", "Others"],
  },
  {
    name: "Pants",
    subcategories: ["All", "Flared Pants", "Joggers", "Shorts", "Slim Fit", "Others"],
  },
  {
    name: "Tracksuits",
    subcategories: ["All", "Tracksuits", "Short Sets", "Others"],
  },
  {
    name: "Accessories",
    subcategories: ["All", "Cardholder/Wallets", "Bags", "Headwear", "Belts", "Jewelry", "Watches", "Scarfs/Gloves", "Others"],
  },
  {
    name: "Electronics",
    subcategories: ["All", "Headphones", "Phones", "Cameras", "Speakers", "Gaming", "Others"],
  },
  {
    name: "Sports",
    subcategories: ["All", "Football", "Basketball", "American Football", "Gym/Running", "MMA/Boxing", "Others"],
  },
  {
    name: "Others",
    subcategories: ["All", "Decoration", "Socks", "Underwear", "Fragrances", "Carpets/Rugs", "Women's", "Others"],
  },
];

export const SORT_OPTIONS = [
  { value: "default", label: "Default" },
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-high", label: "Most Expensive" },
  { value: "price-low", label: "Cheapest" },
];

export const BRANDS = [
  "Nike", "Adidas", "Jordan", "New Balance", "Yeezy", "Balenciaga",
  "Gucci", "Louis Vuitton", "Prada", "Dior", "Off-White", "Supreme",
  "Stussy", "Fear of God", "Essentials", "Gallery Dept", "Chrome Hearts",
  "Represent", "Amiri", "Palm Angels",
];

export const PARTNER_BRANDS: PartnerBrand[] = [
  { name: "Brand A", logo: null, instagram: "#" },
  { name: "Brand B", logo: null, instagram: "#" },
  { name: "Brand C", logo: null, instagram: "#" },
  { name: "Brand D", logo: null, instagram: "#" },
  { name: "Brand E", logo: null, instagram: "#" },
  { name: "Brand F", logo: null, instagram: "#" },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: "Nike Dunk Low Panda", brand: "Nike", category: "Sneakers", subcategory: "Low Tops", price: 89, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Nike+Dunk"], link: "#", dateAdded: "2026-03-15" },
  { id: 2, name: "Adidas Samba OG", brand: "Adidas", category: "Sneakers", subcategory: "Low Tops", price: 75, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Adidas+Samba"], link: "#", dateAdded: "2026-03-14" },
  { id: 3, name: "Jordan 4 Retro", brand: "Jordan", category: "Sneakers", subcategory: "High Tops", price: 120, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Jordan+4"], link: "#", dateAdded: "2026-03-12" },
  { id: 4, name: "Essentials Hoodie", brand: "Essentials", category: "Tops", subcategory: "Hoodies", price: 45, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Essentials+Hoodie"], link: "#", dateAdded: "2026-03-10" },
  { id: 5, name: "Gallery Dept Tee", brand: "Gallery Dept", category: "Tops", subcategory: "T-Shirts", price: 35, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Gallery+Dept"], link: "#", dateAdded: "2026-03-09" },
  { id: 6, name: "Represent Cargo Pants", brand: "Represent", category: "Bottoms", subcategory: "Cargo", price: 55, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Represent+Cargo"], link: "#", dateAdded: "2026-03-08" },
  { id: 7, name: "Chrome Hearts Bracelet", brand: "Chrome Hearts", category: "Accessories", subcategory: "Jewelry", price: 25, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=CH+Bracelet"], link: "#", dateAdded: "2026-03-07" },
  { id: 8, name: "New Balance 550", brand: "New Balance", category: "Sneakers", subcategory: "Low Tops", price: 69, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=NB+550"], link: "#", dateAdded: "2026-03-06" },
  { id: 9, name: "Balenciaga Track", brand: "Balenciaga", category: "Sneakers", subcategory: "Runner", price: 95, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Balenciaga+Track"], link: "#", dateAdded: "2026-03-05" },
  { id: 10, name: "Off-White Hoodie", brand: "Off-White", category: "Tops", subcategory: "Hoodies", price: 60, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=OW+Hoodie"], link: "#", dateAdded: "2026-03-04" },
  { id: 11, name: "Amiri Jeans", brand: "Amiri", category: "Bottoms", subcategory: "Jeans", price: 65, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Amiri+Jeans"], link: "#", dateAdded: "2026-03-03" },
  { id: 12, name: "Yeezy Slides", brand: "Yeezy", category: "Sneakers", subcategory: "Slides", price: 30, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Yeezy+Slides"], link: "#", dateAdded: "2026-03-02" },
  { id: 13, name: "Supreme Cap", brand: "Supreme", category: "Accessories", subcategory: "Hats", price: 20, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Supreme+Cap"], link: "#", dateAdded: "2026-03-01" },
  { id: 14, name: "Dior B22", brand: "Dior", category: "Sneakers", subcategory: "Runner", price: 110, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Dior+B22"], link: "#", dateAdded: "2026-02-28" },
  { id: 15, name: "Palm Angels Track Jacket", brand: "Palm Angels", category: "Outerwear", subcategory: "Jackets", price: 70, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=PA+Jacket"], link: "#", dateAdded: "2026-02-27" },
  { id: 16, name: "Prada Bag", brand: "Prada", category: "Accessories", subcategory: "Bags", price: 85, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Prada+Bag"], link: "#", dateAdded: "2026-02-26" },
  { id: 17, name: "Ken Carson x Chain (Full)", brand: "Chrome Hearts", category: "Accessories", subcategory: "Jewelry", price: 198, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Ken+Carson+Chain"], link: "#", dateAdded: "2026-03-16" },
  { id: 18, name: "Tamagotchi Chain", brand: "Chrome Hearts", category: "Accessories", subcategory: "Jewelry", price: 8, images: ["https://placehold.co/500x500/1a1a1a/ffffff?text=Tamagotchi+Chain"], link: "#", dateAdded: "2026-03-16" },
];

// "All" shows all products
export function getProductsByCategory(categoryName: string): Product[] {
  if (categoryName === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === categoryName);
}

export const OUTFITS: Record<string, Outfit[]> = {
  timmy: [
    { id: 1, name: "Street Classic", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+1", items: [1, 4, 6] },
    { id: 2, name: "All Black", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+2", items: [3, 10, 11] },
    { id: 3, name: "Summer Vibes", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+3", items: [12, 5, 7] },
    { id: 4, name: "Clean Fit", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+4", items: [8, 4, 11] },
  ],
  miki: [
    { id: 5, name: "Vintage Fit", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+5", items: [2, 5, 6] },
    { id: 6, name: "Designer Mix", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+6", items: [14, 10, 16] },
    { id: 7, name: "Casual Day", image: "https://placehold.co/400x600/1a1a1a/ffffff?text=Outfit+7", items: [8, 5, 11, 13] },
  ],
};
