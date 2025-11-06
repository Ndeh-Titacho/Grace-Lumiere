export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  color: string;
  sizes: string[];
  fabricType: string;
  fabricComposition: string;
  images: string[];
  category: "bridal" | "boutique";
  collection?: string;
}
