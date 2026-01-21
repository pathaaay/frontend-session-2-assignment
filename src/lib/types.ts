export interface ProductCategoryType {
  label: string;
  value: string;
}

export interface CartType {
  id: number;
  qty: number;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  thumbnail: string;
  qty: number;
}

export type CartActions = "add" | "remove" | "remove-all" | "reset-cart";
