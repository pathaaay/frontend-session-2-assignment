import { useEffect, useState } from "react";
import type { ProductType } from "../lib/types";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import Select from "react-select";
import { productCategories } from "../lib/constants";

interface FilterProductsProps {
  setFilteredProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  products: ProductType[];
}
export const FilterProducts = ({
  setFilteredProducts,
  products,
}: FilterProductsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [customFilter, setCustomFilter] = useState({
    premium: false,
    outOfStock: false,
    lowStock: false,
  });
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>("");

  useEffect(() => {
    let tempProducts = products;

    if (searchTerm !== "") {
      tempProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryFilter !== "") {
      tempProducts = tempProducts.filter(
        (product) => product.category === categoryFilter,
      );
    }

    if (customFilter.premium)
      tempProducts = tempProducts.filter(({ price }) => price > 500);

    if (customFilter.lowStock)
      tempProducts = tempProducts.filter(
        ({ stock_quantity }) => stock_quantity < 5,
      );

    if (customFilter.outOfStock)
      tempProducts = tempProducts.filter(
        ({ stock_quantity }) => stock_quantity === 0,
      );

    setFilteredProducts(tempProducts);
  }, [searchTerm, products, categoryFilter, customFilter]);

  return (
    <>
      <input
        id="name"
        className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 `}
        placeholder="Filter Products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        onClick={() => setShowAdditionalFilters((prev) => !prev)}
        className="flex items-center gap-1 text-purple-500 ml-auto cursor-pointer"
      >
        {showAdditionalFilters ? (
          <>
            <MinusIcon size={20} />
            Hide Filters
          </>
        ) : (
          <>
            <PlusIcon size={20} />
            Additional Filters
          </>
        )}
      </button>

      {/* Show Additional Filters */}
      {showAdditionalFilters && (
        <>
          <div className="flex items-center w-full">
            <Select
              id="category"
              options={productCategories}
              onChange={(item) => setCategoryFilter(item?.value)}
              value={productCategories.find(
                (item) => item.value === categoryFilter,
              )}
              className="w-full"
              placeholder="Filter by category"
            />
            <XIcon onClick={() => setCategoryFilter("")} />
          </div>
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() =>
                setCustomFilter((prev) => ({ ...prev, premium: !prev.premium }))
              }
              className={`text-center border border-cyan-500 p-1 px-2 w-full rounded-sm cursor-pointer ${customFilter.premium ? "bg-cyan-500 text-white" : ""}`}
            >
              Premium
            </button>
            <button
              onClick={() =>
                setCustomFilter((prev) => ({
                  ...prev,
                  lowStock: !prev.lowStock,
                }))
              }
              className={`text-center border border-cyan-500 p-1 px-2 w-full rounded-sm cursor-pointer ${customFilter.lowStock ? "bg-cyan-500 text-white" : ""}`}
            >
              Low Stock
            </button>
            <button
              onClick={() =>
                setCustomFilter((prev) => ({
                  ...prev,
                  outOfStock: !prev.outOfStock,
                }))
              }
              className={`text-center border border-cyan-500 p-1 px-2 w-full rounded-sm cursor-pointer ${customFilter.outOfStock ? "bg-cyan-500 text-white" : ""}`}
            >
              Out of Stock
            </button>
          </div>
        </>
      )}
    </>
  );
};
