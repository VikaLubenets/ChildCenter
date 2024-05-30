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
  const { newTitle, newDescription, newStartTime, newEndTime, newEveryWeek, newAddress, newPrice, newImagesSrc, newType, newDate } = await request.json();
  await connectMongoDB();
  await Event.findByIdAndUpdate(id, { 
    title: newTitle, 
    description: newDescription, 
    startTime: newStartTime,
    endTime: newEndTime,
    everyWeek: newEveryWeek, 
    address: newAddress, 
    price: newPrice, 
    imagesSrc: newImagesSrc,
    date: newDate,
    type: newType,
  });
  return NextResponse.json({ message: 'Event updated' }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const event = await Event.findOne({ _id: id });
  return NextResponse.json({ event }, { status: 200 });
}