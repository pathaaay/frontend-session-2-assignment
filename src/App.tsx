import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./context/theme-context";
import { Outlet } from "react-router";
import { ProductProvider } from "./context/product-context";
import LoginDialog from "./components/login-dialog";

function App() {
  return (
    <ThemeProvider>
      <ProductProvider>
        <Navbar />
        <Outlet />
      </ProductProvider>
      <Toaster />
      <LoginDialog />
    </ThemeProvider>
  );
}

export default App;
