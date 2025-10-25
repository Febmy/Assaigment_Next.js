# Next.js Foods Assignment — SQLite Edition (No external DB needed)

CRUD lengkap (list/detail/create/edit/delete) dengan Next.js App Router + Prisma (SQLite). Cocok untuk menjalankan tugas **tanpa** setup Supabase/Postgres.

## Jalankan Lokal
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
# opsional: seed contoh data
npm run seed

npm run dev
# buka http://localhost:3000
```
Endpoints:
- GET `/api/foods` (SSR list)
- GET `/api/foods/[id]` (SSR detail)
- POST `/api/create-food`
- PUT `/api/update-food/[id]`
- DELETE `/api/delete-food/[id]`
