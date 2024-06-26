import React, { useState } from "react";
import ScheduleToolBar from "./ScheduleToolBar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/es";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./HourGrid.css";
import {
  useEventByEmployee,
  useAddEvent,
  useDeleteEvent,
} from "../../UseSWR/useEvent";

moment.locale("es");

const HourGrid = (props) => {
  const { createEvent } = useAddEvent();
  const { deleteEvent } = useDeleteEvent();
  const [title, setTitle] = useState("");
  const [isDelete, setIsDelete] = useState(false);

  const { events, isLoading, isError, mutate } = useEventByEmployee(props.employee.id);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const localizer = momentLocalizer(moment);

  const convertedEvents = events.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

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

  const components = {
    event: (props) => (
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
    ),
  };

  const handleSelectSlot = ({ start, end }) => {
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
      employeeId: props.employee.id,
    };
    createEvent(newEvent).then(() => {
      mutate();
    });
  };

  const handleEventSelection = (event) => {
    if (isDelete) {
      deleteEvent(event.id, props.employee.id).then(() => {
        mutate();
      });
    }
  };

  const switchDelete = () => {
    setIsDelete(!isDelete);
  };
  const switchOffDelete = () => {
    setIsDelete(false);
  };

  return (
    <div>
      <div>
        <h2>Horario de {props.employee.name}</h2>
        <ScheduleToolBar
          setTitle={setTitle}
          switchDelete={switchDelete}
          switchOffDelete={switchOffDelete}
        />
        <Calendar
          localizer={localizer}
          style={{ height: 500 }}
          events={convertedEvents}
          defaultView="week"
          components={components}
          resizable
          draggableAccessor={(event) => true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventSelection}
          selectable
          popup={true}
          popupOffset={{ x: 30, y: 20 }}
          eventPropGetter={eventPropGetter}
          min={new Date(2017, 10, 0, 10, 0, 0)}
          max={new Date(2017, 10, 0, 22, 0, 0)}
        />
      </div>
    </div>
  );
};

export default HourGrid;
