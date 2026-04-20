export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  images: string[];
  link: string;
  dateAdded: string;
}

export interface Category {
  name: string;
  subcategories: string[];
}

export interface Outfit {
  id: number;
  name: string;
  image: string;
  items: number[];
}

export interface PartnerBrand {
  name: string;
  logo: string | null;
  instagram: string;
}

export interface SocialLinks {
  tiktok: string;
  instagram: string;
  youtube: string;
  twitch: string;
  discord: string;
  telegram: string;
}
