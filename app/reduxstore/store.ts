import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import caleventsReducer from "./caleventsSlice";
import { useDispatch } from "react-redux";

const middleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    calevents: caleventsReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: false,
    }),
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
