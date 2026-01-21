import { createContext, useEffect, useState } from "react";
import type { ProductType } from "../lib/types";

interface ProductContextType {
  products: ProductType[];
  filteredProducts: ProductType[];
  editProductId: number | null;
  deleteProductId: number | null;
}

const initialValue: ProductContextType = {
  products: [],
  filteredProducts: [],
  editProductId: null,
  deleteProductId: null,
};

export const ProductContext = createContext(initialValue);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  useEffect(() => {
    handleFetchProducts();
  }, []);

  useEffect(() => {
    if (deleteProductId) {
      if (window.confirm("Are you sure you want to delete"))
        deleteProduct(deleteProductId);
    }
    return () => {};
  }, [deleteProductId]);

  const handleFetchProducts = () => {
    const localData = localStorage.getItem("product-details") || "";

    if (localData) {
      const parsedData = JSON.parse(localData);
      if (parsedData?.length > 0) {
        setProducts(parsedData);
      }
    }
  };

  const deleteProduct = (productId: number) => {
    const tempProducts = products.filter(({ id }) => productId !== id);
    setProducts(tempProducts);
    localStorage.setItem("product-details", JSON.stringify(tempProducts));
    setDeleteProductId(null);
  };

  return (
    <ProductContext.Provider
      value={{ products, deleteProductId, editProductId, filteredProducts }}
    >
      {children}
    </ProductContext.Provider>
  );
};
