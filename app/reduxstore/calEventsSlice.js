import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

const nowInitial = moment().minutes(0).seconds(0).add(1, "hour");
const nowEnd = nowInitial.clone().add(1, "hour");

const initialState = {
  activeEvent: {
    _id: "",
    title: "",
    description: "",
    start: nowInitial.toDate(),
    end: nowEnd.toDate(),
    invitees: [],
  },
  modalOpen: false,
  events: [],
};

// export const updateevent = createAsyncThunk(
//   "events/postnewevent",
//   // The payload creator receives the partial `{title, content, user}` object
//   async (activeevent: EventDetail) => {
//     // We send the initial data to the fake API server
//     const response = await axios.post(
//       `/api/events/${activeevent._id}`,
//       activeevent
//     );
//     debugger;
//     // The response includes the complete post object, including unique ID
//     return response.data;
//   }
// );

export const caleventSlice = createSlice({
  name: "calevent",
  initialState,
  reducers: {
    openmodal: (state) => {
      return {
        ...state,
        modalOpen: true,
      };
    },
    closemodal: (state) => {
      return {
        ...state,
        modalOpen: false,
      };
    },
    setActiveEvent: (state, action) => {
      return {
        ...state,
        activeEvent: action.payload,
      };
    },
    eventLoaded: (state, action) => {
      return {
        ...state,
        activeEvent: action.payload,
      };
    },
    eventAddNew: (state, action) => {
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    },
    eventUpdate: (state, action) => {
      return {
        ...state,
        events: state.events.map((event) =>
          event._id === action.payload._id ? action.payload : event
        ),
      };
    },
    eventDelete: (state, action) => {
      return {
        ...state,
        events: state.events.filter(
          (event) => event._id !== state.activeEvent._id
        ),
        activeEvent: {
          _id: "",
          title: "",
          description: "",
          start: nowInitial.toDate(),
          end: nowEnd.toDate(),
          invitees: [],
        },
      };
    },
  },
  //   extraReducers: (builder: any) => {
  //     // omit posts loading reducers
  //     builder.addCase(
  //       updateevent.fulfilled,
  //       (state: EventState, action: PayloadAction) => {
  //         // We can directly add the new post object to our posts array
  //       }
  //     );
  //   },
});

// Action creators are generated for each case reducer function
export const {
  openmodal,
  closemodal,
  setActiveEvent,
  eventLoaded,
  eventAddNew,
  eventUpdate,
  eventDelete,
} = caleventSlice.actions;

export default caleventSlice.reducer;
