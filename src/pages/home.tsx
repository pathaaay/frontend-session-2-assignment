import { useEffect, useState } from "react";
import { StatsCard } from "../components/stats-card";
import useProduct from "../hooks/use-products";

const HomePage = () => {
    const {products} = useProduct();

  const [stats, setStats] = useState({
    totalProducts: 0,
    lowStocks: 0,
    totalInventoryValue: 0,
    totalPremiumProducts: 0,
    totalOutOfStockProducts: 0,
  });

  useEffect(() => {
    let lowStocks = 0;
    let totalOutOfStockProducts = 0;
    let totalPremiumProducts = 0;

    products.forEach((product) => {
      if (product.stock_quantity < 5) lowStocks++;
      if (product.stock_quantity === 0) totalOutOfStockProducts++;
      if (product.price > 500) totalPremiumProducts++;
    });

    setStats({
      totalProducts: products.length,
      lowStocks: lowStocks,
      totalInventoryValue:
        products.reduce(
          (acc, { price, stock_quantity }) =>
            acc + Number(price * stock_quantity),
          0,
        ) || 0,
      totalOutOfStockProducts: totalOutOfStockProducts,
      totalPremiumProducts: totalPremiumProducts,
    });
    return () => {};
  }, [products]);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        <div className="flex items-center flex-wrap gap-2 h-max">
          <StatsCard label="Total Products" value={stats.totalProducts} />
          <StatsCard label="Low Stocks" value={stats.lowStocks} />
          <StatsCard
            label="Total Inventory Value"
            value={"$" + stats.totalInventoryValue}
          />
          <StatsCard
            label="Total Premium Products"
            value={stats.totalPremiumProducts}
          />
          <StatsCard
            label="Total Out of Stock"
            value={stats.totalOutOfStockProducts}
          />
        </div>
        {/* <div className="flex flex-col justify-start gap-2 p-2">
          {products?.length > 0 && (
            <FilterProducts
              setFilteredProducts={setFilteredProducts}
              products={products}
            />
          )}
          {products?.length > 0 ? (
            <>
              {filteredProducts?.length > 0 ? (
                filteredProducts.map((product) => (
                  <Fragment key={product.id}>
                    <ProductCard
                      product={product}
                      setEditProductId={setEditProductId}
                      setDeleteProductId={setDeleteProductId}
                    />
                  </Fragment>
                ))
              ) : (
                <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
                  <div className="font-bold text-lg">No Products Found</div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-3 bg-gray-200 p-4 items-center justify-center">
              <div className="font-bold text-lg">No Products in Inventory</div>
              <span className="text-xs font-medium text-gray-600 text-center">
                Add Products to manage and track record of your inventory
              </span>
            </div>
          )}
        </div>
        {editProductId ? (
          <EditProductForm
            editProductId={editProductId}
            setEditProductId={setEditProductId}
            setProducts={setProducts}
          />
        ) : (
          <AddProductForm setProducts={setProducts} />
        )} */}
      </div>
    </>
  );
};

export default HomePage;
