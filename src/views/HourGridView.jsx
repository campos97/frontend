import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeList from "../Components/Dumb/EmployeeList";
import EmployeeCard from "../Components/Dumb/EmployeeCard";
import AddEmployee from "../Components/Smart/AddEmployee";
import { useDepartments } from "../UseSWR/useDepartments";
import { useEmployees } from "../UseSWR/useEmployees";

const HourGridView = () => {
  const { departments } = useDepartments();
  const { employees } = useEmployees();

  const { employeeId } = useParams();
  const { departmentId } = useParams();

  const navigate = useNavigate();
  
  const [showAddEmployee, setShowAddEmployee] = useState(false);

  // handle de seleccion de departamento
  const handleDepartmentClick = async (departmentId) => {
    navigate("/employeeList/" + departmentId);
  };

  const handleAddEmployee = () => {
    setShowAddEmployee(!showAddEmployee);
  };

  return (
    <div className="HourGridView">
      <div className="wrap">
        {/* <DepartmentsList /> */}
        {!departmentId && (
          <div>
            {showAddEmployee && (
              <div>
                <AddEmployee />{" "}
                <div className="wrap" onClick={handleAddEmployee}>
                  OCULTAR FORMULARIO
                </div>
              </div>
            )}
            {!showAddEmployee && (
              <div className="wrap" onClick={handleAddEmployee}>
                ADD EMPLOYEE
              </div>
            )}
            <ul className="department-ul">
              {(departments || []).map((department) => (
                <button
                  key={department.id}
                  className="department-btn"
                  onClick={() => handleDepartmentClick(department.id)}
                >
                  <li key={department.ID}>{department.name}</li>
                </button>
              ))}
            </ul>
          </div>
        )}
        {departmentId && !employeeId && <EmployeeList employees={employees} />}
        {departmentId && employeeId && (
          <div>
            <EmployeeCard
              employeeId={employeeId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HourGridView;
