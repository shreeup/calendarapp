"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useEffect } from "react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default function MyCalendar() {
  const [events, setEvents] = React.useState([]);
  useEffect(() => {
    const fetchdata = async () => {
      const res = await axios.get("/api/events");
      return res.data.data;
    };
    fetchdata().then((result) => {
      setEvents(result);
    });
  }, []);
  return (
    <div className="myCustomHeight w-full h-full p-5">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={(event: { start: string }) => {
          return new Date(event.start);
        }}
        endAccessor="end"
      />
    </div>
  );
}
