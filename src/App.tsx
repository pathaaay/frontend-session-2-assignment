import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./context/theme-context";
import { Outlet } from "react-router";
import { ProductProvider } from "./context/product-context";

function App() {
  
  return (
    <ThemeProvider>
      <Navbar />
      <ProductProvider>
        <Outlet />
      </ProductProvider>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
