import connectMongoDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Certificate from "@/store/schemas/certificateSchema";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { newTitle: title, newPrice: price } = await request.json();
  await connectMongoDB();
  await Certificate.findByIdAndUpdate(id, { title, price });
  return NextResponse.json({ message: 'Certificate updated' }, { status: 200 })
}


export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const certificate = await Certificate.findOne({ _id: id });
  return NextResponse.json({ certificate }, { status: 200 })
}