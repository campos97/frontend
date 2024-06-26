import { useAuth } from "../Auth/AuthProvider";

const baseUrl = process.env.REACT_APP_API_URL;

export const useUpdatePassword = () => {
  const { token } = useAuth();

  const updatePassword = async (passwordData) => {
    try {
      const response = await fetch(baseUrl + `/passwords/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(passwordData),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      return response.json();
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  return { updatePassword };
};