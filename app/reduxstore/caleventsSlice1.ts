// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import moment from "moment";
// import axios from "axios";
// export type EventState = {
//   activeEvent: EventDetail;
//   modalOpen: boolean;
//   events: EventDetail[];
// };

// export interface EventDetail {
//   _id: string;
//   title: string;
//   description: string;
//   start: Date;
//   end: Date;
//   invitees: string[];
// }
// const nowInitial = moment().minutes(0).seconds(0).add(1, "hour");
// const nowEnd = nowInitial.clone().add(1, "hour");

// const initialState: EventState = {
//   activeEvent: {
//     _id: "",
//     title: "",
//     description: "",
//     start: nowInitial.toDate(),
//     end: nowEnd.toDate(),
//     invitees: [],
//   } as EventDetail,
//   modalOpen: false,
//   events: [],
// };

// // export const updateevent = createAsyncThunk(
// //   "events/postnewevent",
// //   // The payload creator receives the partial `{title, content, user}` object
// //   async (activeevent: EventDetail) => {
// //     // We send the initial data to the fake API server
// //     const response = await axios.post(
// //       `/api/events/${activeevent._id}`,
// //       activeevent
// //     );
// //     debugger;
// //     // The response includes the complete post object, including unique ID
// //     return response.data;
// //   }
// // );

// export const caleventSlice = createSlice({
//   name: "calevent",
//   initialState,
//   reducers: {
//     openmodal: (state: EventState) => {
//       return {
//         ...state,
//         modalOpen: true,
//       };
//     },
//     closemodal: (state: EventState) => {
//       return {
//         ...state,
//         modalOpen: false,
//       };
//     },
//     setActiveEvent: (state: EventState, action: PayloadAction<EventDetail>) => {
//       return {
//         ...state,
//         activeEvent: action.payload,
//       };
//     },
//     eventLoaded: (state: EventState, action: PayloadAction<EventDetail>) => {
//       return {
//         ...state,
//         activeEvent: action.payload,
//       };
//     },
//     eventAddNew: (state: EventState, action: PayloadAction<EventDetail>) => {
//       return {
//         ...state,
//         events: [...state.events, action.payload],
//       };
//     },
//     eventUpdate: (state: EventState, action: PayloadAction<EventDetail>) => {
//       return {
//         ...state,
//         events: state.events.map((event) =>
//           event._id === action.payload._id ? action.payload : event
//         ),
//       };
//     },
//     eventDelete: (state: EventState, action: PayloadAction<EventDetail>) => {
//       return {
//         ...state,
//         events: state.events.filter(
//           (event) => event._id !== state.activeEvent._id
//         ),
//         activeEvent: {
//           _id: "",
//           title: "",
//           description: "",
//           start: nowInitial.toDate(),
//           end: nowEnd.toDate(),
//           invitees: [],
//         } as EventDetail,
//       };
//     },
//   },
//   //   extraReducers: (builder: any) => {
//   //     // omit posts loading reducers
//   //     builder.addCase(
//   //       updateevent.fulfilled,
//   //       (state: EventState, action: PayloadAction) => {
//   //         // We can directly add the new post object to our posts array
//   //       }
//   //     );
//   //   },
// });

// // Action creators are generated for each case reducer function
// export const {
//   openmodal,
//   closemodal,
//   setActiveEvent,
//   eventLoaded,
//   eventAddNew,
//   eventUpdate,
//   eventDelete,
// } = caleventSlice.actions;

// export default caleventSlice.reducer;
