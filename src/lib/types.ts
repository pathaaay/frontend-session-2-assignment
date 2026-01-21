export interface ProductCategoryType {
  id: number;
  name: string;
}

export interface ProductType {
  id: number | null;
  name: string;
  price: number;
  stock_quantity: number;
  category: string;
}
