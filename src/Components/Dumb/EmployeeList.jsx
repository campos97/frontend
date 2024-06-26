import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEmployeesByDepartment } from "../../UseSWR/useEmployees";


const EmployeeList = () => {
  // extract departmentId from path
  const { departmentId } = useParams();
  const { employees } = useEmployeesByDepartment(departmentId);
  const navigate = useNavigate();

  const handleEmployeeClick = async (employee) => {
    navigate("/employeeList/" + departmentId + "/" + employee.id);
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <ul>
        { employees && employees.map((employee) => (
            <button onClick={() => handleEmployeeClick(employee)}>
              <li key={employee.id}>{employee.name}</li>
            </button>
          ))}
      </ul>
    </div>
  );

};

export default EmployeeList;
