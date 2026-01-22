import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/navbar";
import { ThemeProvider } from "./context/theme-context";
import { Outlet } from "react-router";
import { ProductProvider } from "./context/product-context";
import LoginDialog from "./components/login-dialog";
import { AuthProvider } from "./context/auth-context";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProductProvider>
          <Navbar />
          <Outlet />
        </ProductProvider>
        <Toaster />
        <LoginDialog />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
