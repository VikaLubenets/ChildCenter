import connectMongoDB from "@/lib/mongodb";
import Event from "@/store/schemas/eventSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, date, startTime, endTime, everyWeek, address, price, imagesSrc, type } = await request.json();
  await connectMongoDB();
  await Event.create({ title, description, date, startTime, endTime, everyWeek, address, price, imagesSrc, type });
  return NextResponse.json({ message: 'Event created' }, { status: 201 });
}

export async function GET(request: NextRequest) {
  const queryParams = request.nextUrl.searchParams;
  const type = queryParams.get("type");
  await connectMongoDB();
  if (type) {
    const events = await Event.find({ type });
    return NextResponse.json({ events }, { status: 200 });
  }
  const events = await Event.find();
  return NextResponse.json({ events }, { status: 200 })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Event deleted' }, { status: 200 });
}