export const staticCategories = [
  { name: "Bridal Lehanga", subcategories: ["Upto 150K", "150K and above"] },
  {
    name: "Party Wear",
    subcategories: ["Party Wear Suits", "Party Wear Dress"]
  },
  { name: "Gowns" },
  {
    name: "Artificial Jewellery",
    subcategories: [
      "Bridal Jewellery",
      "Party Wear Set",
      "Chudas",
      "Kalira",
      "American Diamond Jewellery",
      "Maijan Stuff"
    ]
  },
  { name: "Bridal Clutches" },
  { name: "Phulkaries" },
  { name: "Wedding Sherwanis" },
  { name: "Party Wear Indo Western" },
  { name: "Designer Coat Pents" },
  {
    name: "Suits",
    subcategories: [
      {
        name: "Unstitched Suit",
        subcategories: ["Unstitched Partywear"]
      },
      "Readymade Suit",
     
      "Unstitched Partywear Anarkali Suit",
      
    ]
  }
];

export const staticSizes = [


  { name: "Small", category: { id: "Bridal Lehanga" } },
  { name: "Medium", category: { id: "Bridal Lehanga" } },
  { name: "Large", category: { id: "Bridal Lehanga" } },

  { name: "no size", category: { id: "Bridal Clutches" } },

  { name: "small", category: { id: "Suits" } },
  { name: "Medium", category: { id: "Suits" } },
  { name: "Large", category: { id: "Suits" } },

  { name: "Small", category: { id: "Party Wear" } },
  { name: "Medium", category: { id: "Party Wear" } },
  { name: "Large", category: { id: "Party Wear" } },

  { name: "small", category: { id: "Gowns" } },
  { name: "Medium", category: { id: "Gowns" } },
  { name: "Large", category: { id: "Gowns" } },

  { name: "Small", category: { id: "Artificial Jewellery" } },
  { name: "Medium", category: { id: "Artificial Jewellery" } },
  { name: "Large", category: { id: "Artificial Jewellery" } },

  { name: "full size", category: { id: "Phulkaries" } },

  { name: "Small", category: { id: "Wedding Sherwanis" } },
  { name: "Medium", category: { id: "Wedding Sherwanis" } },
  { name: "Large", category: { id: "Wedding Sherwanis" } },

  { name: "small", category: { id: "Party Wear Indo Western" } },
  { name: "Medium", category: { id: "Party Wear Indo Western" } },

  { name: "Large", category: { id: "Party Wear Indo Western" } },

  { name: "small", category: { id: "Designer Coat Pents" } },
  { name: "Medium", category: { id: "Designer Coat Pents" } },
  { name: "Large", category: { id: "Designer Coat Pents" } }
];


export const staticQualities = [
  { id: "quality-premium", name: "Premium" },
  { id: "quality-standard", name: "Standard" }
];
export const staticColors = [
 
  { id: "color-pink", name: "Pink" },
  { id: "color-gold", name: "Gold" },
  { id: "color-green", name: "Green" },
  { id: "color-white", name: "White" },
  { id: "color-black", name: "Black" },
  { id: "color-purple", name: "Purple" },
  { id: "color-yellow", name: "Yellow" },
  { id: "color-seagreen", name: "Sea-Green" },
  { id: "color-brown", name: "Brown" },
  { id: "color-orange", name: "Orange" },
  { id: "color-red", name: "Red" },

  

];

export interface ProductFormData {
  name: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  categoryName: string;
  subcategoryName: string;
  qualityName: string;
  sizeName: string;
  colors: string[]; // Array of color names
  inStock: boolean;
  images: File[];
  tag: string;
}
export interface SizeT {
  id: string;
  name: string;
  category: { name: string };
}

export interface QualityT {
  id: string;
  name: string;
}

export interface ColorT {
  id: string;
  name: string;
}
