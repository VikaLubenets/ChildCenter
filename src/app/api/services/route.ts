import connectMongoDB from "@/lib/mongodb";
import Service from "@/store/schemas/serviceSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description, srcImage, link } = await request.json();
  await connectMongoDB();
  await Service.create({ title, description, srcImage, link });
  return NextResponse.json({ message: 'Service created' }, { status: 201 })
}

export async function GET() {
  await connectMongoDB();
  const services = await Service.find();
  return NextResponse.json({ services })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Service.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Service deleted' }, { status: 200 })
}