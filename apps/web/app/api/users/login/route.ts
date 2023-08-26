import clientPromise from "../../../lib/mongodb";
import User from "../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//connect()

export async function POST(request: NextRequest){
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody);
        const client = await clientPromise;
        const db = client.db("calendarapp");
        //check if user exists
        const user = await db.collection("users").findOne({email, password})
        if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }
        console.log("user exists");
        
        //check if password is correct
        // const validPassword = await bcryptjs.compare(user.password,password)
        // console.log(user.password,password,validPassword);
        // if(!validPassword){
        //     return NextResponse.json({error: "Invalid password"}, {status: 400})
        // }
        console.log(user);
        
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })
        // response.cookies.set("token", token, {
        //     httpOnly: true, 
            
        // })
        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}