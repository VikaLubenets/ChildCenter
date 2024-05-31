import connectMongoDB from "@/lib/mongodb";
import Event from "@/store/schemas/eventSchema";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { 
    newTitle: title, 
    newDescription: description, 
    newStartTime: startTime, 
    newEndTime: endTime, 
    newEveryWeek: everyWeek, 
    newAddress: address, 
    newPrice: price, 
    newImagesSrc: imagesSrc, 
    newType: type, 
    newDate: date 
  } = await request.json();
  await connectMongoDB();
  await Event.findByIdAndUpdate(id, {
    title, 
    description, 
    startTime,
    endTime,
    everyWeek, 
    address, 
    price, 
    imagesSrc,
    date,
    type,
  });

  return NextResponse.json({ message: 'Event updated' }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const event = await Event.findOne({ _id: id });
  return NextResponse.json({ event }, { status: 200 });
}