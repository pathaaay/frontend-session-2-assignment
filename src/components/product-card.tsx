import { Edit2Icon, TrashIcon } from "lucide-react";
import type { ProductType } from "../lib/types";
import { Button } from "./button";
import { productCategories } from "../lib/constants";

interface ProductCardProps {
  product: ProductType;
  setEditProductId: React.Dispatch<React.SetStateAction<number | null>>;
  setDeleteProductId: React.Dispatch<React.SetStateAction<number | null>>;
}
export const ProductCard = ({
  product,
  setEditProductId,
  setDeleteProductId,
}: ProductCardProps) => {
  const productCategory = productCategories.find(
    (cat) => cat.value == product.category,
  )?.label;

  const isPremium = ()=>{
    return product.price >500 ? true:false
  }

  return (
    <div className={`bg-gray-100 rounded-md h-max p-4 flex flex-col gap-3 relative ${isPremium() ? "border border-sky-500":""}`}>
      <div>
        <div className="text-lg font-medium">{product.name} </div>
        <div className="text-xs">{productCategory}</div>
      </div>
      <div className="flex items-center justify-between">
        <div>Price: ${product.price}</div>
        <div>Quantity: {product.stock_quantity}</div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 w-full"
          onClick={() => setEditProductId(product.id!)}
        >
          Edit <Edit2Icon className="size-3" />
        </Button>
        <Button
          variant="destructive"
          className="flex items-center justify-center gap-2 w-full"
          onClick={() => setDeleteProductId(product.id)}
        >
          Delete <TrashIcon className="size-3" />
        </Button>
      </div>

      {/* Out of Stock Overlay */}
      {product.stock_quantity === 0 && (
        <div className="absolute inset-0 bg-black/50 flex flex-col gap-2 items-center justify-center">
          <div className="bg-gray-200 rounded-md p-5">
            <div className="text-red-500 font-semibold mb-2">Out Of Stock</div>
            <Button
              variant="outline"
              onClick={() => setEditProductId(product.id!)}
            >
              Udate Stock
            </Button>
          </div>
        </div>
      )}

      {/* Low Stock Badge */}
      {product.stock_quantity < 5 && (
        <div className="p-0.5 px-1 text-xs absolute right-0 top-0 bg-orange-100 text-orange-500 rounded-md">
          Limited Quantity
        </div>
      )}

      {/* Premium Product Badge */}
      {isPremium() && (
        <div className="bg-linear-60 from-purple-500 to-blue-500 text-white font-medium text-center w-max absolute -top-1 left-0 right-0 rounded-md text-xs px-1 p-0.5">
          Premium
        </div>
      )}
    </div>
  );
};
