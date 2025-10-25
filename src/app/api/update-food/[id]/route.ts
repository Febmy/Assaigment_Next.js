import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { name, description, ingredients, type, imageUrl } = body || {};
    if (!name || !description || !ingredients || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updated = await prisma.food.update({
      where: { id: params.id },
      data: { name, description, ingredients, type, imageUrl: imageUrl || null },
    });

    return NextResponse.json({ data: updated });
  } catch (err: any) {
    return new NextResponse(err.message || "Internal Server Error", { status: 500 });
  }
}
