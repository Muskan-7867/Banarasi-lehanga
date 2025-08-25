export const staticCategories = [
  { name: "Bridal Lehenga", subcategories: ["Upto 150K", "150K and above"] },
  { name: "Party Wear", subcategories: ["Upto 15K", "15K and above"] },
  { name: "Gowns" },
  {
    name: "Artificial Jewellery",
    subcategories: [
      "Bridal Jewellery",
      "Party Wear Set",
      "Chudas",
      "Kalira",
      "American Diamond Jewellery",
      "Maijan Stuff",
    ],
  },
  { name: "Bridal Clutches" },
  { name: "Footwears" },
  { name: "Wedding Sherwani" },
  { name: "Party Wear Indo Western" },
  { name: "Designer Coat Pants" },
  {
    name: "Suits",
    subcategories: [
      {
        name: "Unstitched Suit",
        subcategories: ["Unstitched Partywear", "Unstitched Wedding"],
      },
      "Readymade Suit",
      "3 Pieces Articles",
      "Unstitched Partywear Anarkali Suit",
      "Unstitched Wedding Anarkali Suit",
    ],
  },
];

export const staticSizes = [
  { id: "S", name: "Small", category: { id: "Bridal Lehenga" } },
  { id: "M", name: "Medium", category: { id: "Bridal Lehenga" } },
  { id: "L", name: "Large", category: { id: "Party Wear" } },
];

export const staticQualities = [
  { id: "Q1", name: "Premium" },
  { id: "Q2", name: "Standard" },
];

export const staticColors = [
  { id: "C1", name: "Red" },
  { id: "C2", name: "Blue" },
  { id: "C3", name: "Gold" },
];

// ---- Types ----
export interface ProductFormData {
  name: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  qualityId: string;
  categoryId: string;
  subcategoryId: string;
  sizeId: string;
  colors: string[];
  inStock: boolean;
  images: File[];
  tag: string;
}

export interface SizeT {
  id: string;
  name: string;
  category: { id: string };
}
export interface QualityT {
  id: string;
  name: string;
}
export interface ColorT {
  id: string;
  name: string;
}