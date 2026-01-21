import { createContext, useEffect, useMemo, useState } from "react";
import type { CartActions, CartType, ProductType } from "../lib/types";
import useFetch from "../hooks/use-fetch";

interface ProductContextType {
  products: ProductType[];
  filteredProducts: ProductType[];
  editProductId: number | null;
  deleteProductId: number | null;
  productsLoading: boolean;
  productError: boolean;
  cart: CartType[];
  toggleCart: (productId: number, type?: CartActions) => void;
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
  cart: [],
  setProducts: () => {},
  toggleCart: () => {},
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
  const [cart, setCart] = useState<CartType[]>([]);
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

    const cartLocalData = localStorage.getItem("cart-data");
    if (cartLocalData) {
      const parsedCartData = JSON.parse(cartLocalData);
      setCart(parsedCartData);
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

  useEffect(() => {
    if (cart !== null) localStorage.setItem("cart-data", JSON.stringify(cart));
    return () => {};
  }, [cart]);

  const deleteProduct = (productId: number) => {
    const tempProducts = products.filter(({ id }) => productId !== id);
    setProducts(tempProducts);
    localStorage.setItem("product-details", JSON.stringify(tempProducts));
    setDeleteProductId(null);
  };

  const fetchProductsByCategory = (name: string) => {
    try {
      if (name === "" || name === "all")
        getProducts("https://dummyjson.com/products");
      else getProducts(`https://dummyjson.com/products/category/${name}`);
    } catch (error) {
      setProductError(true);
    }
  };

  const searchProducts = (query: string) => {
    try {
      if (query === "") getProducts("https://dummyjson.com/products");
      else getProducts(`https://dummyjson.com/products/search?q=${query}`);
    } catch (error) {
      setProductError(true);
    }
  };

  const toggleCart = (productId: number, type: CartActions = "add") => {
    const existingProduct = cart.find(({ id }) => id === productId);
    if (type === "add") {
      if (!existingProduct) {
        setCart((prev) => [{ id: productId, qty: 1 }, ...prev]);
      } else {
        const newCart = cart.map((item) => {
          if (item.id !== productId) return item;
          else
            return {
              ...item,
              qty: item.qty + 1,
            };
        });
        setCart(newCart);
      }
    } else if (type === "remove") {
      let newCart = cart;
      if (existingProduct?.qty === 1) {
        newCart = cart.filter(({ id }) => id !== productId);
      } else {
        newCart = cart.map((item) => {
          if (item.id !== productId) return item;
          else
            return {
              ...item,
              qty: item.qty - 1,
            };
        });
      }
      setCart(newCart);
    } else if (type === "remove-all") {
      setCart((prev) => prev.filter(({ id }) => id !== productId));
    } else {
      setCart([]);
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
        cart,
        toggleCart,
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
