import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const food = await prisma.food.findUnique({ where: { id: params.id } });
    if (!food) return new NextResponse("Not Found", { status: 404 });
    return NextResponse.json({ data: food });
  } catch (err: any) {
    return new NextResponse(err.message || "Internal Server Error", { status: 500 });
  }
}
