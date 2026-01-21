export interface ProductCategoryType {
  label: string;
  value: string;
}

export interface ProductType {
  id: number | null;
  title: string;
  price: number;
  stock: number;
  category: string;
  tags: string[];
  thumbnail:string;
}
