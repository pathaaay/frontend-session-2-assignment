import type { ProductType } from "../lib/types";
import { Button } from "./button";
import useTheme from "../hooks/use-theme";
import React, { useEffect, useState } from "react";
import useProduct from "../hooks/use-products";
import { MinusIcon, PlusIcon } from "lucide-react";
import useAuth from "../hooks/use-auth";

interface ProductCardProps {
  product: ProductType;
}

export const ProductCard = React.memo(function ProductCard({
  product,
}: ProductCardProps) {
  if (!product) return;

  const { theme } = useTheme();
  const { loggedIn, setLoginDialogOpened } = useAuth();
  const { toggleCart, cart } = useProduct();
  const [addToCartWhenLoggedIn, setAddToCartWhenLoggedIn] = useState(0);

  useEffect(() => {
    if (addToCartWhenLoggedIn > 0) toggleCart(addToCartWhenLoggedIn);
    return () => {};
  }, [loggedIn]);

  const isPremium = product.price > 500 ? true : false;

  const isAddedtoCart = cart.find(({ id }) => id === product.id);
  const handleAddToCart = (productId: number) => {
    if (!loggedIn) {
      setAddToCartWhenLoggedIn(productId);
      setLoginDialogOpened(true);
    } else toggleCart(productId);
  };
  return (
    <div
      className={`bg-gray-100 rounded-md h-max p-4 flex flex-col gap-3 relative ${isPremium ? "border border-sky-500" : ""}`}
    >
      <div>
        <div className="flex items-center gap-1">
          <img
            src={product.thumbnail}
            className="h-10 w-10 object-cover rounded bg-gray-200"
            loading="lazy"
            height={40}
            width={40}
          />
          <div
            className={`text-lg font-medium ${theme === "dark" ? "text-orange-500" : "text-black"}`}
          >
            {product.title}{" "}
          </div>
        </div>
        <div className="text-xs capitalize">{product.category}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.stock}</div>
      </div>
      <div className="flex items-center justify-start gap-2">
        {product.tags.map((tag) => (
          <div
            key={tag}
            className="bg-gray-200 rounded-md p-0.5 px-1 capitalize text-xs"
          >
            {tag}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {isAddedtoCart ? (
          <div className="flex items-center justify-between w-full gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 w-max"
              onClick={() => toggleCart(product.id, "remove")}
            >
              <MinusIcon />
            </Button>
            <div className="bg-gray-200 px-2 p-1 text-center w-full rounded-md">
              {isAddedtoCart.qty}
            </div>
            <Button
              variant="outline"
              className={`flex items-center justify-center gap-2 w-max ${isAddedtoCart.qty >= product.stock ? "opacity-70! cursor-not-allowed!" : ""}`}
              title={
                isAddedtoCart.qty >= product.stock
                  ? "Max Quanitity reached"
                  : ""
              }
              disabled={isAddedtoCart.qty >= product.stock}
              onClick={() => toggleCart(product.id)}
            >
              <PlusIcon />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 w-full"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </Button>
        )}
      </div>

      {/* Low Stock Badge */}
      {product.stock < 5 && (
        <div className="p-0.5 px-1 text-xs absolute right-0 top-0 bg-orange-100 text-orange-500 rounded-md">
          Limited Quantity
        </div>
      )}

      {/* Premium Product Badge */}
      {isPremium && (
        <div className="bg-linear-60 from-purple-500 to-blue-500 text-white font-medium text-center w-max absolute -top-1 left-0 right-0 rounded-md text-xs px-1 p-0.5">
          Premium
        </div>
      )}
      <div
        className={`bg-linear-60 from-orange-500 to-pink-500 text-white font-medium text-center w-max absolute -top-1 right-0 rounded-md text-xs px-1 p-0.5 transition ${isAddedtoCart ? "scale-100" : "scale-0"}`}
      >
        Added to cart
      </div>
    </div>
  );
});
