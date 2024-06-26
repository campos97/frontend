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

export const usePositions = () => {
  const { token } = useAuth(); // Obtén el token desde el contexto

  const { data, error } = useSWR(baseUrl + "/positions", (url) =>
    fetcher(url, token)
  );

  return {
    positions: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export const usePositionById = (id) => {
  const { token } = useAuth(); // Obtén el token desde el contexto

  const { data, error } = useSWR(baseUrl + `/positions/${id}`, (url) =>
    fetcher(url, token)
  );

  return {
    position: data,
    isLoading: !error && !data,
    isError: error,
  };
};
