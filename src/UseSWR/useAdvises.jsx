import useSWR, { mutate as globalMutate } from "swr";

import { useAuth } from "../Auth/AuthProvider";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const baseUrl = process.env.REACT_APP_API_URL;

export const useAdvises = () => {
  const { token } = useAuth();
  const { data, error } = useSWR(baseUrl + `/advises`, (url) =>
    fetcher(url, token)
  );

  return {
    advises: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate: () => globalMutate(baseUrl + `/advises`),
  };
};

// CREATE

export const useAddAdvise = () => {
  const { token } = useAuth();
  const createAdvise = async (title, content, employeeId) => {
    try {
      const response = await fetch(baseUrl + `/advises/addAdvise`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          employeeId: employeeId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create advise");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(baseUrl + `/advises`);

      return response.json();
    } catch (error) {
      console.error("Error creating advise:", error);
      throw error;
    }
  };

  return { createAdvise };
};

export const useDeleteAdvise = () => {
  const { token } = useAuth();
  const deleteAdvise = async (adviseId) => {
    try {
      const response = await fetch(baseUrl + `/advises/delete/` + adviseId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete advise");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(baseUrl + `/advises`);

      return response.json();
    } catch (error) {
      console.error("Error deleting advise:", error);
      throw error;
    }
  };

  return { deleteAdvise };
};
