import { getBaseUrl } from "@/lib/base-url";
import FoodForm from "@/components/FoodForm";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

type Food = {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  type: string; // "UPH" | "FRESH" disimpan sebagai string (SQLite tidak dukung enum)
  imageUrl?: string | null;
};

export const dynamic = "force-dynamic";

async function getFood(id: string): Promise<Food | null> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/foods/${id}`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      return json.data as Food;
    }
    if (res.status === 404) return null;

    const body = await res.text().catch(() => "");
    console.error("GET /api/foods/[id] failed:", res.status, body);

    // Dev fallback: query Prisma langsung bila API gagal
    if (process.env.NODE_ENV !== "production") {
      console.warn("[DEV] Fallback to Prisma for single food");
      const food = await prisma.food.findUnique({ where: { id } });
      return (food as unknown as Food) ?? null;
    }
    return null;
  } catch (err) {
    // Dev fallback: mock item supaya halaman tetap render
    if (process.env.NODE_ENV !== "production") {
      console.warn("[DEV] Fallback to mock food");
      return {
        id,
        name: "Sample Food",
        description: "Mock detail because API/DB failed.",
        ingredients: "-",
        type: "FRESH",
        imageUrl: "https://via.placeholder.com/800x450?text=Mock+Food",
      } as Food;
    }
    throw err;
  }
}

export default async function FoodDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const food = await getFood(params.id);
  if (!food) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card overflow-hidden">
          <div className="aspect-[16/9] bg-slate-800/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={food.name}
              src={
                food.imageUrl ??
                "https://via.placeholder.com/800x450?text=Food+Image"
              }
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h1 className="text-3xl font-semibold">{food.name}</h1>
            <p className="text-slate-300 mt-2">{food.description}</p>
            <p className="text-slate-400 text-sm mt-2">
              <span className="uppercase px-2 py-0.5 rounded bg-white/10 border border-white/10">
                {food.type}
              </span>
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Makanan</h2>
          <FoodForm
            mode="edit"
            foodId={food.id}
            initial={{
              name: food.name,
              description: food.description,
              ingredients: food.ingredients,
              type: (food.type as "UPH" | "FRESH") ?? "FRESH",
              imageUrl: food.imageUrl ?? undefined,
            }}
          />
        </div>
      </div>
    </div>
  );
}
