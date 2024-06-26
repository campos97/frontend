import React from "react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEventByEmployee } from "../../UseSWR/useEvent";

const HourGrid = (props) => {
  const localizer = momentLocalizer(moment);

  const { events, isLoading, isError } = useEventByEmployee(props.employeeId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const eventColor = (event) => {
    switch (event.title) {
      case "Work":
        return "#ab9cf0";
      case "Complementary":
        return "#f09ce4";
      case "Extra":
        return "#f09c9c";
      case "Holidays":
        return "#9cf0a0";
      default:
        return "#ab9cf0";
    }
  };
  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: eventColor(event),
      },
    };
  };

  // Componente personalizado para mostrar los eventos
  // Asignar un color a cada tipo de evento

  const components = {
    event: (props) => {
      return (
        <div
          {...props}
          style={{
            borderRadius: "0px",
            border: "none",
            color: "black",
            cursor: "pointer",
          }}
        >
          {props.title}
        </div>
      );
    },
  };

  const convertedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  return (
    <div>
      <div>
        <Calendar
          localizer={localizer}
          style={{
            height: "60vh",
            width: "50vw",
            margin: "auto",
          }}
          min={new Date(2017, 10, 0, 10, 0, 0)}
          max={new Date(2017, 10, 0, 22, 0, 0)}
          events={convertedEvents}
          defaultView="week"
          components={components}
          resizable
          toolbar={false}
          popup={true}
          popupOffset={{ x: 30, y: 20 }}
          eventPropGetter={eventPropGetter}
        />
      </div>
    </div>
  );
};

export default HourGrid;
