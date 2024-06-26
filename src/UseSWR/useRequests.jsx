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

// READ

export const useRequests = () => {
  const { token } = useAuth();
  const { data, error } = useSWR(baseUrl + `/requests`, (url) =>
    fetcher(url, token)
  );

  return {
    requests: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate: () => globalMutate(baseUrl + `/requests`),
  };
};

export const useRequestsByEmployeeId = (employeeId) => {
  const { token } = useAuth();
  const { data, error } = useSWR(
    baseUrl + `/requests/employee/${employeeId}`,
    (url) => fetcher(url, token)
  );

  return {
    requests: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate: () => globalMutate(baseUrl + `/requests/employee/${employeeId}`),
  };
};

// CREATE

export const useAddRequest = () => {
  const { token } = useAuth();
  const createRequest = async (formData) => {
    try {
      const response = await fetch(baseUrl + `/requests/addRequest`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create request");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(baseUrl + `/requests`);

      return response.json();
    } catch (error) {
      console.error("Error creating request:", error);
      throw error;
    }
  };

  return { createRequest };
};

// UPDATE

export const useUpdateRequest = () => {
  const { token } = useAuth();
  const updateRequest = async (formData) => {
    try {
      const response = await fetch(
        baseUrl + `/requests/update/` + formData.id,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(
        baseUrl +
          `/requests/
        ${formData.sender}`
      );

      return response.json();
    } catch (error) {
      console.error("Error updating request:", error);
      throw error;
    }
  };

  return { updateRequest };
};

// DELETE

export const useDeleteRequest = () => {
  const { token } = useAuth();
  const deleteRequest = async (requestId) => {
    try {
      const response = await fetch(baseUrl + `/requests/delete/` + requestId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete request");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(baseUrl + `/requests`);

      return response.json();
    } catch (error) {
      console.error("Error deleting request:", error);
      throw error;
    }
  };

  return { deleteRequest };
};
