import useProduct from "../hooks/use-products";
import CartCard from "../components/cart-card";
import { Button } from "../components/button";
import { NavLink } from "react-router";
import useCart from "../hooks/use-cart";

const CartPage = () => {
  const { toggleCart } = useProduct();
  const { total, cartData } = useCart();

  return (
    <div className="p-5 gap-2 grid grid-cols-1 sm:grid-cols-2">
      {cartData.length > 0 ? (
        <div className="flex flex-col gap-2 items-start w-full">
          {cartData.map((item) => (
            <CartCard key={item.id} product={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
          <div className="font-bold text-lg">Cart is Empty</div>
        </div>
      )}
      <div className="flex flex-col bg-gray-200 w-full p-5 rounded-md h-max">
        <div className="text-3xl font-bold">Cart Summary</div>
        <div className="my-3 text-lg">
          {cartData.length > 0 ? (
            <>
              <div className="flex items-center justify-between border-y border-gray-400 py-3">
                <span>Total price:</span> <b>{total.toFixed(2)}</b>
              </div>
              <div className="flex items-center justify-between border-y border-gray-400 py-3">
                <span>Total Products in cart:</span> <b>{cartData.length}</b>
              </div>
            </>
          ) : (
            <>Nothing to show</>
          )}
        </div>
        {cartData.length > 0 ? (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              onClick={() => {
                toggleCart(0, "reset-cart");
              }}
              variant="outline"
              className={`w-full`}
            >
              Clear Cart
            </Button>
            <NavLink to={"/checkout"} className={`w-full`}>
              <Button className={`w-full`}>Checkout</Button>
            </NavLink>
          </div>
        ) : (
          <NavLink to={"/"}>
            <Button className={`w-full`}>Add products</Button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default CartPage;
