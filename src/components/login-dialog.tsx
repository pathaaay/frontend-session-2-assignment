import { Controller, useForm } from "react-hook-form";
import { Button } from "./button";
import type { LoginType } from "../lib/types";
import toast from "react-hot-toast";
import useAuth from "../hooks/use-auth";

const LoginDialog = () => {
  const { login, loginDialogOpened, setLoginDialogOpened } = useAuth();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isDirty },
    reset,
  } = useForm<LoginType>({
    defaultValues: {
      email_or_username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginType) => {
    try {
      if (
        (data.email_or_username === "ayush" ||
          data.email_or_username === "ayush@roimaint.com") &&
        data.password === "1234"
      ) {
        login();
        toast.success("Logged in successfully!");
        reset();
      } else {
        setError("email_or_username", { message: "" });
        setError("password", { message: "Invalid email or password" });
      }
    } catch (error) {
      toast.error(`Error adding product: ${JSON.stringify(error)}`);
    }
  };
  if (!loginDialogOpened) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-100 flex items-center justify-center">
      <div
        className="absolute inset-0"
        onClick={() => setLoginDialogOpened(false)}
      ></div>
      <div className="bg-gray-200 z-10 shadow-xl p-5 rounded-lg w-lg flex items-center justify-center">
        <div className="flex flex-col gap-3 items-center justify-center w-full">
          <div className="text-xl font-bold">Login</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2 mb-3">
              <div>
                <Controller
                  control={control}
                  name="email_or_username"
                  rules={{
                    required: "Email or Username is Required",
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor="email_or_username"
                        className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                      >
                        Email or Username
                      </label>
                      <input
                        id="email_or_username"
                        {...field}
                        autoFocus
                        className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                        placeholder="Enter Email of Username"
                      />
                    </>
                  )}
                />
                {errors.email_or_username && (
                  <div className="text-xs text-red-500">
                    {errors.email_or_username.message}
                  </div>
                )}
              </div>
              <div>
                <Controller
                  control={control}
                  name="password"
                  rules={{
                    required: "Password is Required",
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <label
                        htmlFor="password"
                        className={`text-sm font-medium  ${fieldState.error ? "text-red-500" : "text-slate-700"}`}
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        {...field}
                        className={`font-medium bg-white w-full text-md border  rounded-md px-2 p-1 ${fieldState.error ? "border-red-700 focus:outline-red-800" : "border-slate-700 focus:outline-slate-800"}`}
                        placeholder="Enter Password"
                      />
                    </>
                  )}
                />
                {errors.password && (
                  <div className="text-xs text-red-500">
                    {errors.password.message}
                  </div>
                )}
              </div>
            </div>
            <Button
              className={`w-full ${!isDirty ? "opacity-50 cursor-not-allowed!" : ""}`}
              disabled={!isDirty}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
