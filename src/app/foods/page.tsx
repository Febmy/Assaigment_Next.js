import Link from "next/link";
import { getBaseUrl } from "@/lib/base-url";
import { prisma } from "@/lib/prisma";

type Food = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
};

export const dynamic = "force-dynamic"; // ensure SSR, no static cache

async function getFoods() {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/foods`, { cache: "no-store" });
    if (res.ok) {
      const json = await res.json();
      return json.data as Food[];
    }
    let body = "";
    try { body = await res.text(); } catch {}
    console.error("GET /api/foods failed:", res.status, body);

    // Dev fallback 1: query Prisma directly (bypass API)
    if (process.env.NODE_ENV !== "production") {
      console.warn("[DEV] Fallback to Prisma directly for foods list");
      const foods = await prisma.food.findMany({ orderBy: { createdAt: "desc" } });
      return foods as unknown as Food[];
    }

    throw new Error("Failed to fetch foods");
  } catch (err) {
    // Dev fallback 2: mock data so page still renders in dev
    if (process.env.NODE_ENV !== "production") {
      console.warn("[DEV] Fallback to mock foods list");
      return [
        {
          id: "mock-1",
          name: "Sample Food",
          description: "This is mock data shown because API/DB failed.",
          imageUrl: "https://via.placeholder.com/800x450?text=Mock+Food"
        }
      ] as Food[];
    }
    throw err;
  }
}


export default async function FoodsPage() {
  const foods = await getFoods();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Daftar Makanan</h1>
      <ul className="grid md:grid-cols-2 gap-4">
        {foods.map((f) => (
  <li key={f.id} className="card overflow-hidden">
    {(f.id?.startsWith?.("mock-")) ? (
      <div className="block opacity-80 cursor-not-allowed">
        <div className="aspect-[16/9] bg-slate-800/60">
          <img
            alt={f.name}
            src={f.imageUrl ?? "https://via.placeholder.com/800x450?text=Food+Image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-1">{f.name}</h2>
          <p className="text-slate-300 line-clamp-2">{f.description}</p>
          <p className="text-slate-400 text-xs mt-1">[Mock data - buat item nyata untuk membuka detail]</p>
        </div>
      </div>
    ) : (
      <a href={`/foods/${f.id}`} className="block hover:bg-white/5 transition">
        <div className="aspect-[16/9] bg-slate-800/60">
          <img
            alt={f.name}
            src={f.imageUrl ?? "https://via.placeholder.com/800x450?text=Food+Image"}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h2 className="text-xl font-medium mb-1">{f.name}</h2>
          <p className="text-slate-300 line-clamp-2">{f.description}</p>
        </div>
      </a>
    )}
  </li>
))}

      </ul>
    </div>
  );
}
