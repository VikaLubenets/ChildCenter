import connectMongoDB from "@/lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import Contact from "@/store/schemas/contactSchema";

interface Params {
  params: {
    id: string;
  };
}

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongoDB();
  await Contact.findByIdAndUpdate(id, { title, description });
  return NextResponse.json({ message: 'Contact updated' }, { status: 200 })
}


export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongoDB();
  const contact = await Contact.findOne({ _id: id });
  return NextResponse.json({ contact }, { status: 200 })
}