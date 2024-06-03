import connectMongoDB from "@/lib/mongodb";
import About from "@/store/schemas/aboutSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { description } = await request.json();
  await connectMongoDB();
  const about = await About.findOneAndUpdate(
    { type: 'rent' },
    { description },
    { new: true, upsert: true }
  );
  return NextResponse.json({ message: 'About rent created or updated', about }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const about = await About.findOne({ type: 'rent' });
  if (!about) {
    return NextResponse.json({ message: 'About rent not found' }, { status: 404 });
  }
  return NextResponse.json({ about }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  await connectMongoDB();
  const result = await About.findOneAndDelete({ type: 'rent' });
  if (!result) {
    return NextResponse.json({ message: 'About rent not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'About rent deleted' }, { status: 200 });
}