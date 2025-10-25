import { PrismaClient, FoodType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.food.createMany({
    data: [
      {
        name: "Nasi Uduk",
        description: "…",
        ingredients: "…",
        type: FoodType.FRESH,
        imageUrl: "https://images.unsplash.com/…",
      },
      {
        name: "Ayam Geprek",
        description: "…",
        ingredients: "…",
        type: FoodType.UPH,
        imageUrl: "https://images.unsplash.com/…",
      },
    ],
  });
  console.log("Seeded sample foods.");
}
main().finally(() => prisma.$disconnect());
