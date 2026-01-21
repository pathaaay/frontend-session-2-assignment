import { Fragment } from "react/jsx-runtime";
import useProduct from "../hooks/use-products";
import { FilterProducts } from "../components/filter-products";
import { ProductCard } from "../components/product-card";

const ProductPage = () => {
  const { products, filteredProducts, productsLoading, productError } =
    useProduct();
  return (
    <div className="flex flex-col justify-start gap-2 p-2">
      {
        <>
          <FilterProducts products={products} />
          {productsLoading ? (
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((ele) => (
                <div
                  key={ele}
                  className="h-44 bg-gray-200 rounded-md animate-pulse"
                ></div>
              ))}
            </div>
          ) : productError ? (
            <div className="flex items-center w-full justify-center">
              <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
                <div className="font-bold text-red-500">
                  Error loading Product
                </div>
              </div>
            </div>
          ) : filteredProducts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-2">
              {filteredProducts.map((product) => (
                <Fragment key={product.id}>
                  <ProductCard product={product} />
                </Fragment>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
              <div className="font-bold text-lg">No Products Found</div>
            </div>
          )}
        </>
      }
    </div>
  );
};

export default ProductPage;
