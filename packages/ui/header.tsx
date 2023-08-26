"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export function Header({ text }: { text: string }): JSX.Element {
  const router = useRouter();
  const [data, setData] = useState(null);
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Calendar</h1>
      <h4 className="p-1 rounded bg-green-500">
        {!data ? (
          "Nothing"
        ) : (
          <Link href={`/user/${data._id}`}>{data["username"]}</Link>
        )}{" "}
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </h4>
    </div>
  );
}
