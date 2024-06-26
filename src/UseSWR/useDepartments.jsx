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

export const useDepartments = () => {
  const { token } = useAuth(); // Obtén el token desde el contexto

  const { data, error } = useSWR(baseUrl + "/departments", (url) =>
    fetcher(url, token)
  );

  return {
    departments: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const useDepartmentById = (id) => {
  const { token } = useAuth(); // Obtén el token desde el contexto

  const { data, error } = useSWR(baseUrl + `/departments/${id}`, (url) =>
    fetcher(url, token)
  );

  return {
    department: data,
    isLoading: !error && !data,
    isError: error,
  };
};
