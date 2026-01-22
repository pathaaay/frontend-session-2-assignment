import { createContext, useEffect, useState } from "react";

interface AuthContextType {
  loggedIn: boolean;
  loginDialogOpened: boolean;
  setLoginDialogOpened: React.Dispatch<React.SetStateAction<boolean>>;
  login: () => void;
  logout: () => void;
}

const initialValue: AuthContextType = {
  loggedIn: false,
  loginDialogOpened: false,
  setLoginDialogOpened: () => {},
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(initialValue.loggedIn);
  const [loginDialogOpened, setLoginDialogOpened] = useState(
    initialValue.loginDialogOpened,
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const localVal = localStorage.getItem("loggedIn");
    if (localVal && JSON.parse(localVal)) setLoggedIn(JSON.parse(localVal));

    return () => {};
  }, [mounted]);

  const login = () => {
    setLoggedIn(true);
    setLoginDialogOpened(false);
    localStorage.setItem("loggedIn", JSON.stringify(true));
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("cart-data");
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        loginDialogOpened,
        setLoginDialogOpened,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
