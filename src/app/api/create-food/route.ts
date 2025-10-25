import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, ingredients, type, imageUrl } = body || {};
    if (!name || !description || !ingredients || !type) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const data = await prisma.food.create({
      data: {
        name,
        description,
        ingredients,
        type,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json({ data }, { status: 201 });
  } catch (err: any) {
    return new NextResponse(err.message || "Internal Server Error", { status: 500 });
  }
}
