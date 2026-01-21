import { useEffect, useState } from "react";
import type { ProductCategoryType, ProductType } from "../lib/types";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";
import Select from "react-select";
import useProduct from "../hooks/use-products";
import useFetch from "../hooks/use-fetch";

interface FilterProductsProps {
  products: ProductType[];
}
export const FilterProducts = ({ products }: FilterProductsProps) => {
  const {
    setFilteredProducts,
    // categories,
    fetchProductsByCategory,
    searchProducts,
    // categoryError,
  } = useProduct();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showAdditionalFilters, setShowAdditionalFilters] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loadingByCategory, setLoadingByCategory] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  const [categories, setCategories] = useState<ProductCategoryType[] | null>(
    [],
  );
  const {
    getData: getCategories,
    loading: categoriesLoading,
    data: categoriesData,
  } = useFetch<string[]>();

  const [customFilter, setCustomFilter] = useState({
    premium: false,
    outOfStock: false,
    lowStock: false,
  });
  useEffect(() => {
    setMounted(true);
    try {
      if (categories?.length === 0)
        getCategories("https://dummyjson.com/products/category-list");
    } catch (error) {
      setCategoryError(true);
    }
    return () => {};
  }, []);

  useEffect(() => {
    if (!categoriesLoading && categoriesData && categoriesData?.length > 0) {
      const options = categoriesData?.map((category) => ({
        value: category.toLowerCase(),
        label: category,
      }));

      setCategories([{ label: "All", value: "all" }, ...options]);
    }
  }, [categoriesData, categoriesLoading]);

  useEffect(() => {
    let tempProducts = products;
    if (customFilter.premium)
      tempProducts = tempProducts.filter(({ price }) => price > 500);

    if (customFilter.lowStock)
      tempProducts = tempProducts.filter(({ stock }) => stock < 5);

    if (customFilter.outOfStock)
      tempProducts = tempProducts.filter(({ stock }) => stock === 0);

    setFilteredProducts(tempProducts);
  }, [products, customFilter]);

  useEffect(() => {
    if (!loadingByCategory) {
      if (searchTerm === "" && !mounted) return;
      const getData = setTimeout(() => {
        searchProducts(searchTerm);
      }, 1000);

      return () => {
        clearTimeout(getData);
      };
    }
  }, [searchTerm, loadingByCategory]);

  useEffect(() => {
    if (searchTerm !== "" && loadingByCategory) {
      setLoadingByCategory(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!mounted && selectedCategory == "") return;
    fetchProductsByCategory(selectedCategory);
    return () => {};
  }, [selectedCategory]);

  return (
    <>
      <input
        id="name"
        className={`font-medium bg-white w-full text-md border rounded-md px-2 p-1 `}
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
          {categoryError ? (
            <div className="flex items-center w-full">
              <div className="flex flex-col gap-3 bg-gray-200 p-2 items-center justify-center w-full">
                <div className="font-bold text-red-500">
                  Error loading category
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center w-full">
              <Select
                id="category"
                options={categories || []}
                onChange={(item) => {
                  setSearchTerm("");
                  setLoadingByCategory(true);
                  setSelectedCategory(item?.value || "");
                }}
                className="w-full"
                placeholder="Filter by category"
              />
              <XIcon
                onClick={() => {
                  if (selectedCategory !== "") setSelectedCategory("");
                }}
              />
            </div>
          )}
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
