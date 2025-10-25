
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UpdateFoodForm({ food }: { food: any }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    const res = await fetch(`/api/update-food/${food.id}`, {
      method: "PUT",
      body: formData,
    });
    setPending(false);
    if (res.ok) {
      router.push("/foods");
      router.refresh();
    } else {
      alert("Gagal update");
    }
  }
  async function onDelete() {
    if (!confirm("Hapus makanan ini?")) return;
    const res = await fetch(`/api/delete-food/${food.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/foods");
      router.refresh();
    } else {
      alert("Gagal delete");
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Nama</label>
      <input id="name" name="name" defaultValue={food.name} required />
      <label htmlFor="description">Deskripsi</label>
      <textarea id="description" name="description" defaultValue={food.description} required />
      <label htmlFor="type">Tipe</label>
      <select id="type" name="type" defaultValue={food.type} required>
        <option value="uph">uph</option>
        <option value="fresh">fresh</option>
      </select>
      <label htmlFor="ingredients">Bahan-bahan</label>
      <textarea id="ingredients" name="ingredients" defaultValue={food.ingredients} required />
      <label htmlFor="imageUrl">URL Gambar</label>
      <input id="imageUrl" name="imageUrl" defaultValue={food.imageUrl || ""} placeholder="https://..." />
      <div style={{height:8}} />
      <div style={{display:"flex", gap:8}}>
        <button type="submit" className="primary" disabled={pending}>{pending ? "Menyimpan..." : "Simpan Perubahan"}</button>
        <button type="button" onClick={onDelete}>Delete</button>
      </div>
    </form>
  );
}
