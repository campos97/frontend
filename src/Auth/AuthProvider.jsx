import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const baserUrl = process.env.REACT_APP_API_URL;

// Crear el contexto
export const AuthContext = createContext();

// Crear el proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      const response = await fetch(baserUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      const { token, employee } = await response.json();
      localStorage.setItem("token", token);
      setToken(token);
      localStorage.setItem("user", JSON.stringify(employee));
      setUser(employee);

      //return { token, employee };
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Manejar el error de inicio de sesión
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
