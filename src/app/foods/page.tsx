import Link from "next/link";
import { getBaseUrl } from "@/lib/base-url";

type Food = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string | null;
};
export const dynamic = "force-dynamic";
const FALLBACK_IMG = "https://placehold.co/800x450?text=Food+Image";

async function getFoodsSafe(): Promise<{ foods: Food[]; error?: string }> {
  const base = getBaseUrl();
  try {
    const res = await fetch(`${base}/api/foods`, { cache: "no-store" });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error("GET /api/foods failed:", res.status, body);
      return { foods: [], error: body || `HTTP ${res.status}` };
    }
    const json = await res.json();
    return { foods: json.data as Food[] };
  } catch (e: any) {
    return { foods: [], error: e?.message ?? "Unknown error" };
  }
}

export default async function FoodsPage() {
  const { foods, error } = await getFoodsSafe();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Daftar Makanan</h1>

      {error && (
        <div className="card p-4 text-sm text-red-300">
          Gagal memuat data: {error}. Cek <code>/api/foods</code> di browser
          atau terminal Next.js untuk detail.
        </div>
      )}

      <ul className="grid md:grid-cols-2 gap-4">
        {foods.map((f) => (
          <li key={f.id} className="card overflow-hidden">
            <Link
              href={`/foods/${f.id}`}
              className="block hover:bg-white/5 transition"
            >
              <div className="aspect-[16/9] bg-slate-800/60">
                <img
                  alt={f.name}
                  src={f.imageUrl ?? FALLBACK_IMG}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-medium mb-1">{f.name}</h2>
                <p className="text-slate-300 line-clamp-2">{f.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
