import { useForm, Controller } from "react-hook-form";
import type { ProductType } from "../lib/types";
import { Button } from "./button";
import Select from "react-select";
import { productCategories } from "../lib/constants";
import toast from "react-hot-toast";

interface AddProductFormProps {
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
}
export const AddProductForm = ({ setProducts }: AddProductFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProductType>({
    defaultValues: {
      name: "",
      category: "",
      price: 0,
      stock_quantity: 0,
    },
  });

  const onSubmit = (data: ProductType) => {
    try {
      const localData = localStorage.getItem("product-details") || "";
      let newDataToStore;

      if (localData) {
        const parsedData = JSON.parse(localData);
        if (parsedData?.length > 0) {
          const body = {
            ...data,
            id: parsedData[0]?.id + 1,
          };
          newDataToStore = [body, ...parsedData];
        } else
          newDataToStore = [
            {
              ...data,
              id: 1,
            },
          ];
      } else
        newDataToStore = [
          {
            ...data,
            id: 1,
          },
        ];

      localStorage.setItem("product-details", JSON.stringify(newDataToStore));
      setProducts(newDataToStore);
      toast.success("Product Added successfully!");
      //  Reset will reset the form values as well as form state
      reset();
    } catch (error) {
      toast.error(`Error adding product: ${JSON.stringify(error)}`);
    }
  };

  return (
    <div className="bg-slate-100 rounded-md m-2 p-2 md:p-5">
      <div className="text-lg font-bold text-center">Add Product Form</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 mb-3">
          <div>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is Required",
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor="name"
                    className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    {...field}
                    className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                    placeholder="Enter Name"
                  />
                </>
              )}
            />
            {errors.name && (
              <div className="text-xs text-red-500">{errors.name.message}</div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="price"
              rules={{
                required: "Price is Required",
                min: 1,
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor="price"
                    className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                  >
                    Price
                  </label>
                  <input
                    {...field}
                    id="price"
                    type="number"
                    className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                    placeholder="Enter price"
                  />
                </>
              )}
            />
            {errors.price?.type == "required" && (
              <div className="text-xs text-red-500">{errors.price.message}</div>
            )}
            {errors.price?.type == "min" && (
              <div className="text-xs text-red-500">
                Price must be greater than 0
              </div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="category"
              rules={{
                required: "Category is Required",
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor="category"
                    className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                  >
                    Category
                  </label>
                  <Select
                    id="category"
                    options={productCategories}
                    {...field}
                    onChange={(item) => field.onChange(item?.value)}
                    value={productCategories.find(
                      (item) => item.value === field.value,
                    )}
                  />
                </>
              )}
            />
            {errors.category && (
              <div className="text-xs text-red-500">
                {errors.category.message}
              </div>
            )}
          </div>
          <div>
            <Controller
              control={control}
              name="stock_quantity"
              rules={{
                required: "Stock Quantity is Required",
                min: 1,
              }}
              render={({ field, fieldState }) => (
                <>
                  <label
                    htmlFor="stock_quantity"
                    className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                  >
                    Stock Quantity
                  </label>
                  <input
                    {...field}
                    id="stock_quantity"
                    type="number"
                    className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                    placeholder="Enter price"
                  />
                </>
              )}
            />

            {errors.stock_quantity?.type == "required" && (
              <div className="text-xs text-red-500">
                {errors.stock_quantity.message}
              </div>
            )}
            {errors.stock_quantity?.type == "min" && (
              <div className="text-xs text-red-500">
                Stock Quantity must be greater than 0
              </div>
            )}
          </div>
        </div>
        <Button
          className={`w-full ${!isDirty ? "opacity-50 cursor-not-allowed!" : ""}`}
          disabled={!isDirty}
        >
          Add Product
        </Button>
      </form>
    </div>
  );
};
