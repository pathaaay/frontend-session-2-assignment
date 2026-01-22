import { useEffect, useState } from "react";
import type { ProductType } from "../lib/types";
import useProduct from "./use-products";
import useAuth from "./use-auth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const useCart = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();
  const { cart, products } = useProduct();
  const [cartData, setCartData] = useState<ProductType[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!loggedIn) {
      toast.error("User not authenticated");
      navigate("/");
    }

    return () => {};
  }, []);

  useEffect(() => {
    const tempData = products.filter(({ id: productId }) =>
      cart.some(({ id }) => id === productId),
    );

    setCartData(
      tempData.map((data) => ({
        ...data,
        qty: cart.find(({ id }) => id === data.id)!.qty,
      })),
    );
  }, [cart, products]);

  useEffect(() => {
    setTotal(cartData.reduce((acc, { qty, price }) => acc + qty * price, 0));
    return () => {};
  }, [cartData]);
  return { total, cartData };
};

export default useCart;
