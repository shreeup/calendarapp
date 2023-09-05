import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import caleventsReducer from "./caleventsSlice";

const store = configureStore({
  reducer: caleventsReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore moment.js warnings when dispatching on store
    }),
});
export default store;
