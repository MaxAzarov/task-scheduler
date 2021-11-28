import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState("");

  useEffect(() => {}, []);

  const auth = (token: string) => {
    setIsAuthenticated(true);
    setToken(token);
  };

  return {
    isAuthenticated,
    token,
    auth,
  };
};

export default useAuth;
