import { CategoryT, ColorT, ProductT, QualityT, SizeT } from "@/types";

export const products: ProductT[] = [
  {
    id: "1",
    name: "Professional Cricket Bat - English Willow",
    shortDescription: "Premium English willow cricket bat",
    detailedDescription: "Premium English willow cricket bat with excellent balance and power. Handcrafted by skilled artisans for professional performance.",
    price: 299.99,
    originalPrice: 399.99,
    discount: 100.00,
    tax: 0,
    categoryId: "1",
    subcategoryId: "1",
    sizeId: "1",
    qualityId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    colors: [
      {
        id: "1",
        name: "Natural",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: []
      },
      {
        id: "2",
        name: "Stained",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: []
      }
    ],
    images: [
      {
        id: "1",
        productId: "1",
        publicId: "bat_1",
        url: "https://media.istockphoto.com/id/465444444/vector/sport-of-cricket-batsman-strikes-the-ball.jpg?s=612x612&w=0&k=20&c=-a04SXsdDL852TeBAoKxRHvh0YpxMcImu5eFdMImf4Y=",
        rank: 1,
        product: {} as ProductT
      },
      {
        id: "2",
        productId: "1",
        publicId: "bat_2",
        url: "https://media.istockphoto.com/id/465444444/vector/sport-of-cricket-batsman-strikes-the-ball.jpg?s=612x612&w=0&k=20&c=-a04SXsdDL852TeBAoKxRHvh0YpxMcImu5eFdMImf4Y=",
        rank: 2,
        product: {} as ProductT
      }
    ],
    category: {
      id: "1",
      name: "Bats",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subcategories: [],
      Product: [],
      Size: []
    },
    subcategory: {
      id: "1",
      name: "English Willow",
      parentCategory: "1",
      category: {} as CategoryT,
      Product: []
    },
    size: {
      id: "1",
      name: "Short Handle",
      categoryId: "1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: {} as CategoryT,
      Product: []
    },
    quality: {
      id: "1",
      name: "Professional",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      Product: []
    },
    OrderItem: []
  },
  {
    id: "2",
    name: "Cricket Helmet - Pro Guard",
    shortDescription: "Advanced protection cricket helmet",
    detailedDescription: "Advanced protection cricket helmet with titanium grille. Provides maximum safety and comfort for professional players.",
    price: 89.99,
    originalPrice: 119.99,
    discount: 30.00,
    tax: 0,
    categoryId: "2",
    subcategoryId: "2",
    sizeId: "2",
    qualityId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    colors: [
      {
        id: "1",
        name: "White",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: []
      },
      {
        id: "3",
        name: "Navy",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: []
      },
      {
        id: "2",
        name: "Black",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: []
      }
    ],
    images: [
      {
        id: "3",
        productId: "2",
        publicId: "helmet_1",
        url: "https://media.istockphoto.com/id/465444444/vector/sport-of-cricket-batsman-strikes-the-ball.jpg?s=612x612&w=0&k=20&c=-a04SXsdDL852TeBAoKxRHvh0YpxMcImu5eFdMImf4Y=",
        rank: 1,
        product: {} as ProductT
      }
    ],
    category: {
      id: "2",
      name: "Protective Gear",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      subcategories: [],
      Product: [],
      Size: []
    },
    subcategory: {
      id: "2",
      name: "Helmets",
      parentCategory: "2",
      category: {} as CategoryT,
      Product: []
    },
    size: {
      id: "2",
      name: "M",
      categoryId: "2",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: {} as CategoryT,
      Product: []
    },
    quality: {
      id: "1",
      name: "Professional",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      Product: []
    },
    OrderItem: []
  },
  // Add other products following the same structure
];

export const categories: CategoryT[] = [
  {
    id: "1",
    name: "Bats",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [],
    Product: [],
    Size: []
  },
  {
    id: "2",
    name: "Protective Gear",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    subcategories: [],
    Product: [],
    Size: []
  },
  // Add other categories
];

export const sizes: SizeT[] = [
  {
    id: "1",
    name: "Short Handle",
    categoryId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: {} as CategoryT,
    Product: []
  },
  {
    id: "2",
    name: "M",
    categoryId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    category: {} as CategoryT,
    Product: []
  },
  // Add other sizes
];

export const colors: ColorT[] = [
  {
    id: "1",
    name: "White",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: []
  },
  {
    id: "2",
    name: "Black",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    products: []
  },
  // Add other colors
];

export const qualities: QualityT[] = [
  {
    id: "1",
    name: "Professional",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    Product: []
  },
  {
    id: "2",
    name: "Match",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    Product: []
  },
  // Add other qualities
];