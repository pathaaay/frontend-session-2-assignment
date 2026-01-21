import type { ProductType } from "../lib/types";
import useProduct from "../hooks/use-products";
import { Button } from "./button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

interface CartCardProps {
  product: ProductType;
}
const CartCard = ({ product }: CartCardProps) => {
  const { toggleCart } = useProduct();
  return (
    <div
      className={`bg-gray-100 rounded-md h-max p-4 flex flex-col gap-3 relative w-full`}
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
          <div className={`text-lg font-medium `}>{product.title} </div>
        </div>
        <div className="text-xs capitalize">{product.category}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.stock}</div>
      </div>

      <div className="flex items-center gap-2 w-max">
        <div className="flex items-center justify-between w-full gap-3">
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 w-max"
            onClick={() => toggleCart(product.id, "remove")}
          >
            <MinusIcon size={20} />
          </Button>
          <div className="bg-gray-200 px-2 p-1 text-center w-full rounded-md">
            {product.qty}
          </div>
          <Button
            variant="outline"
            className={`flex items-center justify-center gap-2 w-max `}
            onClick={() => toggleCart(product.id)}
          >
            <PlusIcon  size={20}/>
          </Button>
          <Button
            variant="destructive"
            className="flex items-center justify-center gap-2 w-max p-1"
            onClick={() => toggleCart(product.id, "remove-all")}
          >
            <TrashIcon  size={20}/> 
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
