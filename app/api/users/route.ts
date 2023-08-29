// export async function GET(req: Request){
//   return new Response('Hello From Api');
// }
// import { NextResponse } from "next/server";
// import clientPromise from "../../lib/mongodbhelper";

// export async function GET(request, { params }) {
//   // we will use params to access the data passed to the dynamic route
//   try {
//     const client = await clientPromise;
//     const db = client.db("calendarapp");

//     const users = await db.collection("users").find({}).limit(1).toArray();

//     return NextResponse.json({ users });
//   } catch (e) {
//     console.error(e);
//   }
// }
import { getDataFromToken, connect } from "../../lib/helpers";
import { NextRequest, NextResponse } from "next/server";
import User from "../../models/userModel";

connect();
export async function GET(request: NextRequest) {
  try {
    const users = await User.find({}).limit(10);
    console.log("userfound");
    return NextResponse.json({
      message: "User found",
      data: users,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
