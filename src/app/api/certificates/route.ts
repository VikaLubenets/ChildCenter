import connectMongoDB from "@/lib/mongodb";
import Certificate from "@/store/schemas/certificateSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, price } = await request.json();
  await connectMongoDB();
  await Certificate.create({ title, price });
  return NextResponse.json({ message: 'Certificate created' }, { status: 201 })
}

export async function GET() {
  await connectMongoDB();
  const certificates = await Certificate.find();
  return NextResponse.json({ certificates })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Certificate.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Certificate deleted' }, { status: 200 })
}