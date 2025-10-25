export default function NotFound() {
  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold mb-2">Data tidak ditemukan</h1>
      <p className="text-slate-300">Item makanan tidak ada atau sudah dihapus.</p>
      <div className="mt-4 flex gap-2">
        <a className="btn" href="/foods">Kembali ke daftar</a>
        <a className="btn btn-primary" href="/foods/new">Buat makanan baru</a>
      </div>
    </div>
  );
}
