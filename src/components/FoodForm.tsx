"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Props = {
  foodId?: string;
  initial?: {
    name?: string;
    description?: string;
    type?: "UPH" | "FRESH";
    ingredients?: string;
    imageUrl?: string | null;
  };
  mode: "create" | "edit";
};

// Base URL absolut dari env (hilangkan trailing slash)
const BASE = (process.env.NEXT_PUBLIC_APP_URL ?? "").replace(/\/$/, "");
const api = (p: string) => `${BASE}${p}`;

export default function FoodForm({ foodId, initial, mode }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    type: initial?.type ?? "FRESH",
    ingredients: initial?.ingredients ?? "",
    imageUrl: initial?.imageUrl ?? "",
  });
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const url =
        mode === "create" ? api("/api/create-food") : api(`/api/update-food/${foodId}`);

      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Request failed");
      }

      if (mode === "create") {
        router.push("/foods");
      } else {
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    }
  }

  async function onDelete() {
    if (!foodId) return;
    if (!confirm("Hapus makanan ini?")) return;
    const res = await fetch(api(`/api/delete-food/${foodId}`), { method: "DELETE" });
    if (res.ok) {
      router.push("/foods");
    } else {
      alert("Gagal menghapus.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Nama</label>
          <input className="input" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div>
          <label className="label">Tipe</label>
          <select
            className="select"
            value={form.type}
            onChange={(e) => update("type", e.target.value as "UPH" | "FRESH")}
          >
            <option value="UPH">uph</option>
            <option value="FRESH">fresh</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">URL Gambar</label>
        <input
          className="input"
          value={form.imageUrl}
          onChange={(e) => update("imageUrl", e.target.value)}
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="label">Deskripsi</label>
        <textarea
          className="textarea"
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          required
        />
      </div>

      <div>
        <label className="label">Bahan-bahan</label>
        <textarea
          className="textarea"
          rows={3}
          value={form.ingredients}
          onChange={(e) => update("ingredients", e.target.value)}
          required
        />
      </div>

      {error && <p className="text-sm text-red-300">{error}</p>}

      <div className="flex items-center gap-2">
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {mode === "create" ? "Buat" : isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </button>
        {mode === "edit" && (
          <button type="button" onClick={onDelete} className="btn border-red-500/30 hover:border-red-400/50">
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
