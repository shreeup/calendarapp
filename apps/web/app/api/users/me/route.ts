import { getDataFromToken, connect } from "../../../lib/helpers";

import { NextRequest, NextResponse } from "next/server";
import User from "../../../models/userModel";
import clientPromise from "../../../lib/mongodb";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
      userId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

// export async function GET(request, { params }) {
//   // we will use params to access the data passed to the dynamic route
//   try {
//     const client = await clientPromise;
//     const db = client.db("calendarapp");

//     const users = await db.collection("users").find({}).limit(10).toArray();

//     return NextResponse.json({ users });
//   } catch (e) {
//     console.error(e);
//   }
// }
