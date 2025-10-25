import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const foods = await prisma.food.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ data: foods });
  } catch (err: any) {
    return new NextResponse(err.message || "Internal Server Error", { status: 500 });
  }
}
