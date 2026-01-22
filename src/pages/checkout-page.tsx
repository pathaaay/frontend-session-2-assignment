import { useEffect, useRef, useState } from "react";
import useCart from "../hooks/use-cart";
import { Button } from "../components/button";
import useTimer from "../hooks/use-timer";

const CheckoutPage = () => {
  const { total } = useCart();
  const { formatTime, secondsLeft } = useTimer(5*60);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const couponContainerRef = useRef<HTMLDivElement | null>(null);
  const [totalAmount, setTotalAmount] = useState(total);
  const [appliedCouponAmount, setAppliedCouponAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(total);
  }, [total]);

  useEffect(() => {
    if (appliedCouponAmount > 0) {
      if (totalAmount < appliedCouponAmount) setTotalAmount(0);
      else setTotalAmount(totalAmount - appliedCouponAmount);
    }
    return () => {};
  }, [appliedCouponAmount]);

  const handleToggleCoupon = () => {
    const copounContainerElement = couponContainerRef.current;
    const element = inputRef.current;
    if (!element || !copounContainerElement) return;
    copounContainerElement.hidden = false;
    element.focus();
  };

  const handleApplyCoupon = () => {
    const couponVal = inputRef.current?.value;
    if (couponVal) {
      switch (parseInt(couponVal)) {
        case 9033:
          setAppliedCouponAmount(1000);
          break;

        case 9876:
          setAppliedCouponAmount(500);
          break;

        case 4567:
          setAppliedCouponAmount(100);
          break;

        default:
          break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 m-5 rounded-md p-5">
      <div className="text-xl font-medium text-center w-full">Checkout</div>
      <div
        className={`${secondsLeft <= 60 && secondsLeft > 0 ? "animate-pulse" : ""}`}
      >
        Stock reserved for:{formatTime()}
      </div>
      {appliedCouponAmount > 0 ? (
        <>
          <div className="text-green-500 cursor-pointer mt-4 mb-2">
            Coupon Applied Successfully?
          </div>
          <div>
            You saved ${appliedCouponAmount} (was ${total.toFixed(2)})!
          </div>
        </>
      ) : (
        <>
          <div
            className="text-blue-500 underline cursor-pointer mt-4 mb-2"
            onClick={handleToggleCoupon}
          >
            Have a Coupon?
          </div>
          <div
            ref={couponContainerRef}
            hidden
            className="gap-2 flex items-center"
          >
            <input
              ref={inputRef}
              type="number"
              className={`font-medium bg-white w-52 text-md border  rounded-md px-2 p-1 border-slate-700 focus:outline-orange-800`}
              placeholder="Enter Coupon code"
            />
            <Button onClick={handleApplyCoupon}>Apply</Button>
          </div>
        </>
      )}
      <div className="flex items-center justify-between rounded px-4 mt-4 bg-gray-300 py-3">
        <span>To pay:</span> <b>{totalAmount.toFixed(2)}</b>
      </div>
      <div className="flex items-center justify-between border-y border-gray-400 py-3">
        <Button
          disabled={secondsLeft === 0}
          className={`${secondsLeft === 0 ? "opacity-70 cursor-not-allowed!" : ""}`}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
