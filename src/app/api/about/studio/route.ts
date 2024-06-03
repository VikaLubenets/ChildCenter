import connectMongoDB from "@/lib/mongodb";
import About from "@/store/schemas/aboutSchema";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { description } = await request.json();
  await connectMongoDB();
  const about = await About.findOneAndUpdate(
    { type: 'studio' },
    { description },
    { new: true, upsert: true }
  );
  return NextResponse.json({ message: 'About studio created or updated', about }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const about = await About.findOne({ type: 'studio' });
  if (!about) {
    return NextResponse.json({ message: 'About studio not found' }, { status: 404 });
  }
  return NextResponse.json({ about }, { status: 200 });
}

export async function DELETE(request: NextRequest) {
  await connectMongoDB();
  const result = await About.findOneAndDelete({ type: 'studio' });
  if (!result) {
    return NextResponse.json({ message: 'About studio not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'About studio deleted' }, { status: 200 });
}