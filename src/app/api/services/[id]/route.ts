import connectMongoDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Service from "@/store/schemas/serviceSchema";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { newTitle: title, newDescription: description, newSrcImage: srcImage } = await request.json();
  await connectMongoDB();
  await Service.findByIdAndUpdate(id, { title, description, srcImage });
  return NextResponse.json({ message: 'Service updated' }, { status: 200 })
}


export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const service = await Service.findOne({ _id: id });
  return NextResponse.json({ service }, { status: 200 })
}