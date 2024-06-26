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
    
// CREATE

export const useAddRecord = () => {
  const { token } = useAuth();
  const createRecord = async ( employeeId) => {
    try {
      const response = await fetch(baseUrl + `/records/addRecord`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employeeId: employeeId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create advise");
      }

      // Actualiza manualmente el cache de SWR
      globalMutate(baseUrl + `/records/last/` + employeeId);

      return response.json();
    } catch (error) {
      console.error("Error creating advise:", error);
      throw error;
    }
  };

  return { createRecord };
};

// READ

// get all last day records by employeeId
export const useLastDayRecords = (employeeId) => {
  const { token } = useAuth();
  const { data, error } = useSWR(
    baseUrl + `/records/lastDay/${employeeId}`,
    (url) => fetcher(url, token)
  );

  return {
    lastDayRecords: processRecords(data) || [],
    isLoading: !error && !data,
    isError: error,
    mutate: () => globalMutate(baseUrl + `/records/lastDay/${employeeId}`),
  };
};

export const useLastRecord = (employeeId) => {
    const { token } = useAuth();
    const { data, error } = useSWR(
        baseUrl + `/records/last/${employeeId}`,
        (url) => fetcher(url, token)
    );
    
    return {
        lastRecord: processRecords(data) || null,
        isLoading: !error && !data,
        isError: error,
        mutate: () => globalMutate(baseUrl + `/records/last/${employeeId}`),
    };
};

const processRecords = (records) => {
    if (!records) return null;
    const datetime = new Date(records.createdAt);
    return {
        ...records,
        createdAt: datetime.toLocaleString(),
    };
};
