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

export const useEventByEmployee = (employeeId) => {
  const { token } = useAuth();
  const { data, error } = useSWR(
    baseUrl + `/events/employee/${employeeId}`,
    (url) => fetcher(url, token)
  );

  return {
    events: data || [],
    isLoading: !error && !data,
    isError: error,
    mutate: () => globalMutate(baseUrl + `/events/employee/${employeeId}`),
  };
};

// CREATE
export const useAddEvent = () => {
  const { token } = useAuth();
  const createEvent = async (eventData) => {
    try {
      const response = await fetch(baseUrl + "/events/addEvent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to create event");
      }

      const newEvent = await response.json();

      // Actualiza manualmente el cache de SWR
      globalMutate(
        baseUrl + `/events/employee/${eventData.employeeId}`,
        (events) => [...events, newEvent],
        false
      );

      return newEvent;
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  return { createEvent };
};

// DELETE
export const useDeleteEvent = () => {
  const { token } = useAuth();
  const deleteEvent = async (eventId, employeeId) => {
    try {
      const response = await fetch(baseUrl + `/events/delete/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete event");
      }

      const result = await response.json();

      // Actualiza manualmente el cache de SWR
      globalMutate(
        baseUrl + `/events/employee/${employeeId}`,
        (events) => events.filter((event) => event.id !== eventId),
        false
      );

      return result;
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  return { deleteEvent };
};
