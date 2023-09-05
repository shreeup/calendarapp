"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.css";
import EventState from "../reduxstore/caleventsSlice";
import CalEventModal from "./CalEventModal";

import type { RootState } from "../reduxstore/store";
import { useSelector, useDispatch } from "react-redux";
import {
  openmodal,
  closemodal,
  setActiveEvent,
} from "../reduxstore/caleventsSlice";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

export default function MyCalendar() {
  const dispatch = useDispatch();
  //const [events, setEvents] = React.useState([]);
  //const { events, eventfetchstatus } = useQuery("events", fetchEvents);
  let currstate = useSelector((state: RootState) => state);
  const [selectedEvent, setSelectedEvent] = useState({});

  //   useEffect(() => {
  //     const fetchdata = async () => {
  //       const res = await axios.get("/api/events");
  //       return res.data.data;
  //     };
  //     fetchdata().then((result) => {
  //       setEvents(result);
  //     });
  //   }, []);

  const handleSelectedEvent = (event: typeof EventState) => {
    debugger;
    setSelectedEvent(event);
    //setModalState(true);
    dispatch(setActiveEvent(event));
    dispatch(openmodal(currstate));
  };

  //   const onSelectSlot = (e: Event & { target: Element }) => {
  //     selectedEvent && dispatch(eventClearActive());
  //     if (e.target.action === "select" || e.action === "doubleClick") {
  //       dispatch(
  //         setActiveEvent({
  //           title: "",
  //           notes: "",
  //           start: e.start,
  //           end: e.end,
  //         })
  //       );
  //       dispatch(openmodal());
  //     }
  //   };

  const handleDoubleClick = (e: any) => {
    dispatch(openmodal(currstate));
  };
  const handleSelectSlot = useCallback(({ start, end }: any) => {
    dispatch(
      setActiveEvent({
        title: "",
        description: "",
        start: new Date(),
        end: new Date(),
      })
    );
    dispatch(openmodal(currstate));
  }, []);

  const {
    isLoading,
    error,
    data: events,
  } = useQuery({
    queryKey: ["data"],
    queryFn: () => fetch("/api/events").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + JSON.stringify(error);

  return (
    <div className="myCustomHeight w-full h-full p-5" id="calendardiv">
      <Toaster position="top-center" reverseOrder={false} />
      {selectedEvent && <CalEventModal />}

      <Calendar
        localizer={localizer}
        events={events}
        // startAccessor={(event: { start: string }) => {
        //   return new Date(event.start);
        // }}
        //startAccessor="start"
        //endAccessor="end"
        onSelectEvent={(event: typeof EventState) => handleSelectedEvent(event)}
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onDoubleClickEvent={handleDoubleClick}
        popup
      />
    </div>
  );
}
