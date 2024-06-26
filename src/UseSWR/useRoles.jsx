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

export const useRoles = () => {
  const { token } = useAuth(); 

  const { data, error } = useSWR(baseUrl + "/roles", (url) =>
    fetcher(url, token)
  );

  return {
    roles: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};
