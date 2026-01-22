import { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context)
    throw new Error("You are using useAuth outside of the AuthProvider");

  return context;
};

export default useAuth;
