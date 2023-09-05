import { getDataFromToken, connect } from "../../lib/helpers";

import { NextRequest, NextResponse } from "next/server";
import Event from "../../models/eventModel";
import moment from "@/node_modules/moment/ts3.1-typings/moment";

import User from "../../models/userModel";

connect();
// export async function GET(request: NextRequest) {
//   try {
//     const users = await User.find({}).limit(10);
//     console.log("userfound");
//     return NextResponse.json({
//       message: "User found",
//       data: users,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message }, { status: 400 });
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    // const defaultdate = new Date();

    // let defaultview: CalView = CalView.day;
    // if (
    //   request.body.view &&
    //   Object.values(CalView).includes(request.body.view)
    // ) {
    //   defaultview = request.body.view as CalView;
    // }
    // let start = moment(defaultdate);
    //  if (request.body.start && getDateFromStr(request.body.start)) {
    //    start = moment(getDateFromStr(request.body.start));
    //  }
    //  let end = start.add(1, "days");
    //  if (defaultview == CalView.week) end = start.add(7, "days");
    //  if (defaultview == CalView.month) {
    //    end = start.add(30, "days");
    //  }
    // if (request.params.start && getDateFromStr(request.body.start).isValid()){

    // }
    console.log(userId);
    const events = await Event.find({
      $or: [
        { organizer: userId },
        { invitees: { $elemMatch: { _id: userId } } },
      ],
    });
    console.log(events);
    return NextResponse.json({
      message: "Events found",
      data: events,
      userId,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log("POST");
    const userId = await getDataFromToken(request); //"64e94bc362ff0d1bba506006"; //await getDataFromToken(request);
    console.log(userId);
    const reqBody = await request.json();
    console.log(reqBody);
    const { title, description, start, end, invitees } = reqBody;
    console.log({ title, description, start, end, invitees });
    const event = new Event({
      title,
      start,
      end,
      description,
      organizer: userId,
      invitees,
    });

    console.log("create event" + reqBody);

    try {
      await event.save();

      return NextResponse.json({
        message: "Event created successfully",
        success: true,
        event,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Processing error" }, { status: 500 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
