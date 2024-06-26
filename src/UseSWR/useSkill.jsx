import useSWR, { mutate as globalMutate } from "swr";
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

export const useSkills = () => {
  const { token } = useAuth();
  const { data, error } = useSWR(baseUrl + "/skills", (url) =>
    fetcher(url, token)
  );
  return {
    skills: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSkillById = (id) => {
  const { token } = useAuth();
  const { data, error } = useSWR(baseUrl + `/skills/${id}`, (url) =>
    fetcher(url, token)
  );

  return {
    skill: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useSkillsByEmployee = (employeeId) => {
  const { token } = useAuth();
  const { data, error } = useSWR(
    employeeId ? baseUrl + `/skills/employee/${employeeId}` : null,
    (url) => fetcher(url, token)
  );

  return {
    skills: data,
    isLoading: !error && !data,
    isError: error,
  };
};

// addSkillToEmployee
export const useAddSkillToEmployee = () => {
  const { token } = useAuth();
  const addSkillToEmployee = async (data) => {
    try {
      const response = await fetch(baseUrl + `/skills/addSkillToEmployee`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add skill to employee");
      }

      globalMutate(baseUrl + `/skills/employee/${data.employeeId}`);

      return response.json();
    } catch (error) {
      console.error("Error adding skill to employee:", error);
      throw error;
    }
  };

  return { addSkillToEmployee };
}
  
