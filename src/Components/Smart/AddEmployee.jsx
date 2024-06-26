import React, { useState } from "react";
import "./AddEmployee.css";
import { useDepartments } from "../../UseSWR/useDepartments";
import { useRoles } from "../../UseSWR/useRoles.jsx";
import { useCreateEmployee } from "../../UseSWR/useEmployees";
import { usePositions } from "../../UseSWR/usePositions";
const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname1: "",
    surname2: "",
    departmentId: "",
    roleId: "",
    username: "",
    positionId: "",
  });
  const { departments } = useDepartments();
  const { roles } = useRoles();
  const {positions} = usePositions();
  const { createEmployee } = useCreateEmployee();

 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createEmployee(formData);
      // Limpiar el formulario después de enviar los datos
      setFormData({
        name: "",
        username: "",
        positionId: "",
        departmentId: "",
        roleId: "",
        surname1: "",
        surname2: "",
      });
    } catch (error) {
      console.error("There was a problem adding the employee:", error);
    }
  };

  return (
    <div className="add-employee">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="surname1">Surname 1:</label>
        <input
          type="text"
          name="surname1"
          value={formData.surname1}
          onChange={handleChange}
        />
        <label htmlFor="surname2">Surname 2:</label>
        <input
          type="text"
          name="surname2"
          value={formData.surname2}
          onChange={handleChange}
        />
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="position">Position:</label>
        <select
          name="positionId"
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">--Please choose an option--</option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.name}
            </option>
          ))}
        </select>

        <label htmlFor="departmentId">Department:</label>
        <select
          name="departmentId"
          value={formData.department}
          onChange={handleChange}
        >
          <option value="">--Please choose an option--</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>
        <label htmlFor="roleId">Role:</label>
        <select
          name="roleId"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">--Please choose an option--</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
