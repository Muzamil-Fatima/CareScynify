import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import {getMe} from "../../api/authApi"
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();

        setUser(data);

        // optional: UI ke liye localStorage update
        localStorage.setItem("user", JSON.stringify(data));
      } catch (error) {
        console.log(error);
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
