import { createContext, useEffect, useState } from "react";
import type { ProductType } from "../lib/types";
import useFetch from "../hooks/use-fetch";

interface ProductContextType {
  products: ProductType[];
  filteredProducts: ProductType[];
  editProductId: number | null;
  deleteProductId: number | null;
  productsLoading: boolean;
  productError: boolean;
  fetchProductsByCategory: (name: string) => void;
  searchProducts: (query: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setEditProductId: React.Dispatch<React.SetStateAction<number | null>>;
  setDeleteProductId: React.Dispatch<React.SetStateAction<number | null>>;
}

const initialValue: ProductContextType = {
  products: [],
  filteredProducts: [],
  editProductId: null,
  deleteProductId: null,
  productsLoading: false,
  productError: false,
  setProducts: () => {},
  setFilteredProducts: () => {},
  setEditProductId: () => {},
  setDeleteProductId: () => {},
  fetchProductsByCategory: () => {},
  searchProducts: () => {},
};

export const ProductContext = createContext(initialValue);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [productError, setProductError] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [editProductId, setEditProductId] = useState<number | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);
  const {
    getData: getProducts,
    loading: productsLoading,
    data: productsData,
  } = useFetch<{
    products: ProductType[];
    limit: number;
    skip: number;
    total: number;
  }>();

  useEffect(() => {
    try {
      if (!mounted) {
        setMounted(true);
        getProducts("https://dummyjson.com/products");
      }
    } catch (error) {
      setProductError(true);
    }
  }, []);

  useEffect(() => {
    if (!productsLoading && productsData?.products) {
      setProducts(productsData.products);
    }
  }, [productsData, productsLoading]);

  useEffect(() => {
    if (deleteProductId) {
      if (window.confirm("Are you sure you want to delete"))
        deleteProduct(deleteProductId);
    }
    return () => {};
  }, [deleteProductId]);

  const deleteProduct = (productId: number) => {
    const tempProducts = products.filter(({ id }) => productId !== id);
    setProducts(tempProducts);
    localStorage.setItem("product-details", JSON.stringify(tempProducts));
    setDeleteProductId(null);
  };

  const fetchProductsByCategory = (name: string) => {
    console.log("fetchProductsByCategory called");
    try {
      if (name === "" || name === "all")
        getProducts("https://dummyjson.com/products");
      else getProducts(`https://dummyjson.com/products/category/${name}`);
    } catch (error) {
      setProductError(true);
    }
  };

  const searchProducts = (query: string) => {
    console.log("searchProducts called");
    try {
      if (query === "") getProducts("https://dummyjson.com/products");
      else getProducts(`https://dummyjson.com/products/search?q=${query}`);
    } catch (error) {
      setProductError(true);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        deleteProductId,
        editProductId,
        filteredProducts,
        productsLoading,
        productError,
        setProducts,
        setFilteredProducts,
        setEditProductId,
        setDeleteProductId,
        fetchProductsByCategory,
        searchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
