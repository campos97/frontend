import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PrivateRoute = () => {
  // extraer el token del contexto
  const { token } = useAuth();

  // Si no hay token devuelve a la página de login
  return token ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default PrivateRoute;
