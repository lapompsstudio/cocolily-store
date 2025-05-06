export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount?: string;
  image: string;
  isBestSeller?: boolean;
  isSoldOut?: boolean;
  category?: string;
}
