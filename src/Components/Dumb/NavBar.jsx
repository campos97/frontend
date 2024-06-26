import React, { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthProvider";
import { useRoles } from "../../UseSWR/useRoles";

const NavBar = () => {
  const { user, token } = useAuth() || {};
  const roles = useRoles() || {};
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if ( user && roles.roles) {
      const role = roles.roles.find((role) => role.id === user.roleId);
      setUserRole(role);
    }
  }, [
    user,
    roles.roles
  ]);

  if (!token) {
    return <div></div>;
  }

  return (
    <div className="nav-bar">
      <nav>
        <ul>
          {
            /*si está logueado no muestra Login */
            !token && (
              <li>
                <a href="/login">Login</a>
              </li>
            )
          }

          <li>
            <a href="/dashboard">Inicio</a>
          </li>
          <li>
            <a href="/registry">Fichaje</a>
          </li>
          {userRole && userRole.name === "ADMIN" && (
            <li>
              <a href="/employeeList">Empleados</a>
            </li>
          )}
          {userRole && userRole.name === "ADMIN" && (
            <li>
              <a href="/advise">Avisos</a>
            </li>
          )}
          <li>
            <a href="/requests">Solicitudes</a>
          </li>
          <li>
            <a href="/employee">Perfil</a>
          </li>

          <li>
            <a href="/config">Config</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
