import { getCars, getCategories } from "@/lib/data";
import { notFound } from "next/navigation";
import CarList from "@/components/CarList";

const Main = async () => {
  const cars = await getCars();
  const categories = await getCategories();
  if (!cars) return notFound();
  return (
    <div className="max-w-screen-xl mx-auto py-6 pb-20 px-4">
      
      <CarList cars={cars} categories={categories} />
    </div>
  );
};

export default Main;
