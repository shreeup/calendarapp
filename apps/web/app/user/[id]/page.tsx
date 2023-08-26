"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
export default function UserProfile({ params }: any) {
  const [data, setData] = useState({
    email: "",
    _id: "",
    username: "",
  });
  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    setData(res.data.data);
  };

  useEffect(() => {
    getUserDetails();
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page <hr />
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          ID : {data._id} <br />
          UserName : {data.username} <br />
          Email : {data.email} <br />
        </span>
      </p>
      <a href="/">Home</a>
    </div>
  );
}
