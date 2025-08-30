import { ProductFormData } from "@/components/data/categories";

export interface UserT {
  id: string;
  username: string;
  email: string;
  phone : string
  password: string;
  role: string;
  address: AddressT[];
  addressId?: number;
  orders: OrderT[];
  resetPasswordToken?: string;
  resetPasswordExpire?: string;
  createdAt: string;
  updatedAt: string;
  Payment: PaymentT[];
}

export interface AddressT {
  id: string;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  userId?: string;
  Order: OrderT[];
}

export interface OrderT {
  id: string;
  quantity?: number;
  clientId?: string;
  client?: UserT;
  addressId: string;
  address: AddressT;
  totalPrice: number;
  totalQuantity: number;
  deliveryCharges: number;
  status?: string;
  paymentMethod?: string;
  expectedDeliveryDate?: string;
  isPaid: boolean;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
  orderItems: OrderItemT[];
  Payment: PaymentT[];
}

export interface OrderItemT {
  id: string;
  orderId: string;
  productId: string;
  price: number;
  quantity: number;
  order: OrderT;
  product: ProductT;
}

export interface ProductT {
  id: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  price: number;
  originalPrice: number;
  discount: number;
  tax: number;
  tag: string;
  categoryName?: string;
  category?: CategoryT;
  subcategoryName?: string;
  subcategory?: SubCategoryT;
  sizeName?: string;
  size?: SizeT | undefined;
  qualityName?: string;
  quality?: QualityT;
  colors: ColorT[];
  images: ProductImageT[];
  createdAt: string;
  updatedAt: string;
  OrderItem: OrderItemT[];
}

export interface ProductImageT {
  id: string;
  productId: string;
  product: ProductT;
  publicId: string;
  url: string;
  rank: number;
}

export interface PaymentT {
  id: number;
  orderId: string;
  order: OrderT;
  userId: string;
  user: UserT;
  amount: number;
  paymentMethod: string;
  paymentStatus: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryT {
  id: string;
  name: string;
  subcategories: SubCategoryT[];
  createdAt: string;
  updatedAt: string;
  Product: ProductT[];
  Size: SizeT[];
}

export interface SubCategoryT {
  id: string;
  name: string;
  parentCategory: string;
  category: CategoryT;
  Product: ProductT[];
}

export interface SizeT {
  id: string;
  name: string;
  category: { id: string }; // Changed to match your data
  createdAt: Date;
  updatedAt: Date;
  Product: ProductFormData[];
}

export interface QualityT {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  Product: ProductFormData[];
}

export interface ColorT {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  products: ProductFormData[];
}
// types.ts (or inline)
export type ProductQueryParamsT = {
  maxPrice?: number;
  minPrice?: number;
  limit?: number;
  page?: number;
  categoryId?: string;
  search?: string;
};

export type ProductsResponse = {
  products: ProductT[] | undefined;
  count: number;
};
