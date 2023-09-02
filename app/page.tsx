"use client";
import Image from "next/image";
import { Header } from "./components/Header";
import MyCalendar from "./components/Calendar";
import { store } from "../app/reduxstore/store";
import { Provider } from "react-redux";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <main className=" min-h-screen items-center justify-between bg-white text-black">
          <Header />
          <hr />
          <MyCalendar />
        </main>
      </Provider>
    </QueryClientProvider>
  );
}
