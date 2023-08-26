import clientPromise from "../../../lib/mongodb";
import { connect } from "../../../lib/helpers";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // const client = await clientPromise;
    // const db = client.db("calendarapp");
    //check if user exists

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log("user exists");

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    console.log(validPassword);
    if (!validPassword && password != user.password) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }
    console.log("vaid password " + user);

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });
    response.headers.set("authorization", token);
    response.cookies.set("authtoken", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
