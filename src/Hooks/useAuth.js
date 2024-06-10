import { useContext } from "react";
import { AppContext, AuthContext } from "../ContextProvider/AppContext";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
