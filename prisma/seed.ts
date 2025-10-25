import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.food.createMany({
    data: [
      {
        name: "Nasi Uduk",
        description: "Nasi gurih dengan lauk-pauk khas Betawi.",
        ingredients: "Nasi, santan, daun salam, serai, lauk",
        type: "FRESH", // string, bukan enum
        imageUrl:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
      },
      {
        name: "Ayam Geprek",
        description: "Ayam goreng tepung dengan sambal pedas.",
        ingredients: "Ayam, tepung, cabai, bawang, garam",
        type: "UPH", // string, bukan enum
        imageUrl:
          "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  });
  console.log("SQLite seeded sample foods.");
}

main().finally(async () => {
  await prisma.$disconnect();
});
