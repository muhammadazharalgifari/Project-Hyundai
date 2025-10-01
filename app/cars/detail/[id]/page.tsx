import { Metadata } from "next";
import { getCarById } from "@/lib/data";
import CarDetails from "@/components/Car-Details";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Car Details",
  description: "Check out our car details",
};

interface CarDetailPageProps {
  params: { id: string };
}

const CarDetailPage = async ({ params }: CarDetailPageProps) => {
  const car = await getCarById(params.id);

  if (!car) return notFound();
  return (
    <div className="max-w-screen-xl px-4 py-10 mx-auto">
      <CarDetails car={car} />
    </div>
  );
};

export default CarDetailPage;
