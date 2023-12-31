import { NextResponse, NextRequest } from "next/server";
import { ZodError } from "zod";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
//import moment from "@/node_modules/moment/ts3.1-typings/moment";
import * as moment from "moment";

type EnvVariableKey = "JWT_SECRET_KEY" | "JWT_EXPIRES_IN";

export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export function getErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null
) {
  return new NextResponse(
    JSON.stringify({
      status: status < 500 ? "fail" : "error",
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token =
      request.cookies.get("authtoken")?.value ||
      request.headers.get("authorization") ||
      "";
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    connection.on("error", (err: any) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running. " + err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}

export const getDateFromStr = (datestr: string): any => {
  return (moment as any)(datestr).format("YYYY-MM-DD");
};

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchNoToken = (
  endpoint: string,
  data: any,
  method = "GET",
  request: NextRequest
) => {
  const url = `${baseUrl}/${endpoint}`; // localhost:5000/api/events

  if (method === "GET") {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (
  endpoint: string,
  data: any,
  method = "GET",
  request: NextRequest
) => {
  const url = `${baseUrl}/${endpoint}`; // localhost:5000/api/events
  const token =
    request.cookies.get("authtoken")?.value ||
    request.headers.get("authorization") ||
    "";

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
