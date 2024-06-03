import connectMongoDB from "@/lib/mongodb";
import About from "@/store/schemas/aboutSchema";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { 
    newDescription: description, 
  } = await request.json();
  await connectMongoDB();
  await About.findByIdAndUpdate(id, {
    description, 
  });

  return NextResponse.json({ message: 'About updated' }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const about = await About.findOne({ _id: id });
  return NextResponse.json({ about }, { status: 200 });
}