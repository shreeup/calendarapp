import Image from "next/image";
import { Header } from "./components/Header";
import MyCalendar from "./components/Calendar";

export default function Home() {
  return (
    <main className=" min-h-screen items-center justify-between bg-white text-black">
      <Header />
      <hr />
      <MyCalendar />
    </main>
  );
}
