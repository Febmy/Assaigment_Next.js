import { getBaseUrl } from "@/lib/base-url";
import FoodForm from "@/components/FoodForm";
import { notFound } from "next/navigation";

type Food = {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  type: string;
  imageUrl?: string | null;
};

export const dynamic = "force-dynamic";

const FALLBACK_IMG = "https://placehold.co/800x450?text=Food+Image";

async function getFood(id: string) {
  const base = getBaseUrl();
  const res = await fetch(`${base}/api/foods/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("GET /api/foods/[id] failed:", res.status, body);
    throw new Error("Failed to fetch food");
  }
  const json = await res.json();
  return json.data as Food;
}

export default async function FoodDetailPage({ params }: { params: { id: string } }) {
  const food = await getFood(params.id);
  if (!food) notFound();

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card overflow-hidden">
          <div className="aspect-[16/9] bg-slate-800/60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={food.name}
              src={food.imageUrl ?? FALLBACK_IMG}
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
