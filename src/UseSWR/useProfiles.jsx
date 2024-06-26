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

export const useProfileByEmployeeId = (employeeId) => {
  const { token } = useAuth();
  const { data, error } = useSWR(
    baseUrl + `/profiles/employee/${employeeId}`,
    (url) => fetcher(url, token)
  );
  return {
    profile: data || {},
    isLoading: !error && !data,
    isError: error,
    mutate: () => globalMutate(baseUrl + `/profiles/${employeeId}`),
  };
};

// UPDATE
export const useUpdateProfile = () => {
  const { token } = useAuth();

  const updateProfile = async (formData) => {
    try {
      const response = await fetch(baseUrl + `/profiles/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Usar FormData directamente en el cuerpo
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(
        baseUrl + `/profiles/employee/${formData.get("employeeId")}`
      );

      return response.json();
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return { updateProfile };
};

// DELETE

export const useDeleteProfile = () => {
  const { token } = useAuth();
  const deleteProfile = async (employeeId) => {
    try {
      const response = await fetch(baseUrl + `/profiles/delete/` + employeeId, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete profile");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(baseUrl + `/profile/${employeeId}`);

      return response.json();
    } catch (error) {
      console.error("Error deleting profile:", error);
      throw error;
    }
  };

  return deleteProfile;
};
