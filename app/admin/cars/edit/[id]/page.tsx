import EditFormCar from "@/components/admin/cars/Edit-Form-Car";
import { getCarById } from "@/lib/data";
import { notFound } from "next/navigation";

const UpdateCarPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const car = await getCarById(id);

  if (!car) return notFound();
  return (
    <div className="max-w-screen-xl px-4 py-28 mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">
        Update{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
          a Car
        </span>
      </h1>
      <EditFormCar car={car} />
    </div>
  );
};

export default UpdateCarPage;
