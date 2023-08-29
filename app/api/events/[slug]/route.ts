import { getDataFromToken, connect } from "../../../lib/helpers";

import { NextRequest, NextResponse } from "next/server";
import Event from "../../../models/eventModel";

connect();
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log(params);
    const eventid = params.slug;
    console.log("get event ", eventid);
    const event = await Event.find({ _id: eventid });
    return NextResponse.json({
      message: "Event Details",
      data: event,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const reqBody = await request.json();
    const { title, description, start, end, invitees } = reqBody;

    console.log(params);
    const eventid = params.slug;
    console.log("get event ", eventid);
    const event = await Event.find({ _id: eventid });

    try {
      const event = await Event.findByIdAndUpdate(
        eventid,
        {
          title,
          start,
          end,
          invitees,
        },
        { new: true }
      );

      return NextResponse.json({
        message: "Event updated successfully",
        success: true,
        event,
      });
    } catch (error: any) {
      console.log(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
