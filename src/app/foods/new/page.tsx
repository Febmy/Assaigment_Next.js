import FoodForm from "@/components/FoodForm";

export default function NewFoodPage() {
  return (
    <div className="card p-6">
      <h1 className="text-2xl font-semibold mb-4">Buat Makanan</h1>
      <FoodForm mode="create" />
    </div>
  );
}
