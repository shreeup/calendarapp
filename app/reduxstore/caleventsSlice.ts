import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";
export interface EventState {
  activeEvent: EventDetail;
  modalOpen: boolean;
}

export interface EventDetail {
  _id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  invitees: string[];
}

const initialState: EventState = {
  activeEvent: {
    _id: "",
    title: "asdsd",
    description: "xvvc",
    start: moment(),
    end: moment().add(1, "hours"),
    invitees: [],
  } as EventDetail,
  modalOpen: false,
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
    openmodal: (state: EventState) => {
      return {
        ...state,
        modalOpen: true,
      };
    },
    closemodal: (state: EventState) => {
      return {
        ...state,
        modalOpen: false,
      };
    },
    setActiveEvent: (state: EventState, action: PayloadAction) => {
      return {
        ...state,
        activeEvent: action.payload,
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
export const { openmodal, closemodal, setActiveEvent } = caleventSlice.actions;

export default caleventSlice.reducer;
