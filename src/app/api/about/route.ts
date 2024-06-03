import connectMongoDB from "@/lib/mongodb";
import About from "@/store/schemas/aboutSchema";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await About.findByIdAndDelete(id);
  return NextResponse.json({ message: 'About deleted' }, { status: 200 })
}