import { getCars } from "@/lib/data";
import Image from "next/image";
import CarSpecifications from "@/components/admin/cars/Car-Specifications";
import { formatCurrency } from "@/lib/utils";
import {
  DeleteButton,
  EditButton,
} from "@/components/admin/cars/Car-ActionButtons";
import { CircleAlert } from "lucide-react";

const CarTable = async () => {
  const cars = await getCars();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mt-6 shadow-lg hover:shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/30 transition-all duration-300">
      <div className="w-full md:w-full overflow-x-auto scrollbar-thin scroll-bar-thumb-gray-300 scrollbar-track-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[150px] sm:min-w-0">
                Image
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Car Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Category
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Capacity
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Price
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Year Model
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Specifications
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {cars.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-4">
                  <div className="flex items-center justify-center gap-2">
                    <CircleAlert className="w-8 h-8 text-yellow-500 bg-yellow-100 p-1 rounded-full" />
                    <p className="text-gray-500 text-sm font-medium">
                      No Cars Found.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr
                  key={car.id}
                  className="hover:bg-gray-50/30 transition-all duration-200 border-b border-gray-100/60"
                >
                  <td className="px-6 py-5 whitespace-nowrap min-w-[150px] sm:min-w-0">
                    {car.image ? (
                      <div className="h-20 w-32 relative">
                        <Image
                          src={car.image}
                          alt={car.name}
                          fill
                          sizes="20vw"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm font-medium">
                        No Image Available
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500 uppercase">
                      {car.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-xs font-medium text-gray-500">
                      {car.Category?.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-xs font-medium text-green-700 bg-green-100 p-2 rounded-full">
                      {car.capacity} Seats
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-xs font-medium text-gray-500">
                      {formatCurrency(car.price)}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-xs font-medium text-purple-700 bg-purple-100 p-2 rounded-full">
                      {car.year}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[90px] sm:min-w-0">
                    <CarSpecifications car={car} />
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[90px] sm:min-w-0">
                    <div className="flex items-center justify-center gap-2">
                      <EditButton id={car.id} />
                      <DeleteButton id={car.id} image={car.image} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarTable;
