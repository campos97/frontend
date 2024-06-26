import React from "react";
import EmployeeHourGrid from "../Components/Smart/EmployeeHourGrid";
import { useAuth } from "../Auth/AuthProvider";
import { useAdvises } from "../UseSWR/useAdvises";

const DashboardView = () => {
  const {advises} = useAdvises();
  const { user } = useAuth();


  // Mostrar avisos generales, comunicados importantes, estadísticas, etc.
  return (
    <div className="wrap">
      <h1>Hola, {user.name}</h1>
      <div className="employee-adverts">
        <h2>Avisos importantes</h2>
        {advises.length === 0 && <h3>No hay avisos</h3>}
        {advises.map((aviso) => (
          <div key={aviso.id} className="wrap">
            <h3>{aviso.title}</h3>
            <p>{aviso.content}</p>
          </div>
        ))}
      </div>
      <div className="employee-hourgrid">
        {/* mostrar fecha actual */}
        <h2>
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h2>
        <EmployeeHourGrid employeeId={user.id} />
      </div>
    </div>
  );
};

export default DashboardView;
