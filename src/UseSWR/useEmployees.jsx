import useSWR from "swr";
import { useAuth } from "../Auth/AuthProvider";

const baseUrl = process.env.REACT_APP_API_URL;

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

export const useEmployees = () => {
  const { token } = useAuth();
  const { data, error } = useSWR("/employees", (url) => fetcher(url, token));

  return {
    employees: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useEmployeeById = (id) => {
  const { token } = useAuth();
  const { data, error } = useSWR(baseUrl + `/employees/${id}`, (url) =>
    fetcher(url, token)
  );
  return {
    employee: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useEmployeesByDepartment = (departmentId) => {
  const { token } = useAuth();
  const { data, error } = useSWR(
    baseUrl + `/employees/department/${departmentId}`,
    (url) => fetcher(url, token)
  );

  return {
    employees: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useCreateEmployee = () => {
  const { token } = useAuth();
  const createEmployee = async (employeeData) => {
    try {
      const response = await fetch(baseUrl + "/employees/addEmployee", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      return response.json();
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  };

  return { createEmployee };
};

export const useUpdateEmployee = () => {
  const { token } = useAuth();
  const updateEmployee = async (employeeId, employeeData) => {
    try {
      const response = await fetch(baseUrl + `/employees/update/${employeeId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      return response.json();
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  };

  return { updateEmployee };
};