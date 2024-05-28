import connectMongoDB from "@/lib/mongodb";
import Contact from "@/store/schemas/contactSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Contact.create({ title, description });
  return NextResponse.json({ message: 'Contact created' }, { status: 201 })
}

export async function GET() {
  await connectMongoDB();
  const contacts = await Contact.find();
  return NextResponse.json({ contacts })
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Contact.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Contact deleted' }, { status: 200 })
}