
'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateFoodPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setPending(true);
    const res = await fetch("/api/create-food", { method: "POST", body: formData });
    setPending(false);
    if (res.ok) {
      router.push("/foods");
      router.refresh();
    } else {
      alert("Gagal membuat makanan");
    }
  }
  return (
    <div className="card">
      <h1>Buat Makanan</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Nama</label>
        <input id="name" name="name" required />
        <label htmlFor="description">Deskripsi</label>
        <textarea id="description" name="description" required />
        <label htmlFor="type">Tipe</label>
        <select id="type" name="type" required>
          <option value="uph">uph</option>
          <option value="fresh">fresh</option>
        </select>
        <label htmlFor="ingredients">Bahan-bahan</label>
        <textarea id="ingredients" name="ingredients" required />
        <label htmlFor="imageUrl">URL Gambar</label>
        <input id="imageUrl" name="imageUrl" placeholder="https://..." />
        <div style={{height:8}} />
        <button type="submit" className="primary" disabled={pending}>{pending ? "Membuat..." : "Buat"}</button>
      </form>
    </div>
  );
}
