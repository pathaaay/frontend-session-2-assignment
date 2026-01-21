import { useContext } from "react";
import { ProductContext } from "../context/product-context";

const useProduct = () => {
  const context = useContext(ProductContext);

  if (!context)
    throw new Error("You are using useProduct outside of the ThemeProvider");

  return context;
};

export default useProduct;
