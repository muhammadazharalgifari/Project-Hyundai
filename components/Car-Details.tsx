import {
  Car,
  Category,
  CarSpec,
  Specification,
  SpecCategory,
} from "@prisma/client";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { CircleCheck, Users, Tag, Calendar, Layers } from "lucide-react";

type CarWithRelations = Car & {
  Category: Category;
  CarSpec: (CarSpec & {
    Specification: Specification & {
      SpecCategory: SpecCategory;
    };
  })[];
};

const CarDetails = ({ car }: { car: CarWithRelations }) => {
  return (
    <div className="max-w-screen-xl mx-auto py-16 px-4 grid lg:grid-cols-12 gap-5 md:gap-16">
      {/* Kiri: Gambar & Detail */}
      <div className="lg:col-span-7">
        <Image
          src={car.image}
          alt={car.name}
          width={770}
          height={430}
          priority
          className="w-full rounded-lg mb-8"
        />

        <h1 className="text-5xl font-bold text-gray-900 mb-6">{car.name}</h1>
        <p className="text-gray-600 leading-relaxed text-justify">
          {car.description}
        </p>
        {/* Specifications */}
        <h5 className="text-3xl font-semibold mt-10 mb-4">Specifications</h5>
        <div className="mb-8 py-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
        <div className="grid md:grid-cols-2 gap-4">
          {car.CarSpec.map((spec) => (
            <div
              key={spec.id}
              className="flex items-start bg-white rounded-lg p-3 shadow-lg hover:shadow-xl transition"
            >
              <CircleCheck className="w-5 h-5 mr-3 text-green-500 shrink-0 mt-1" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {spec.Specification.SpecCategory.name}
                </p>
                <p className="text-sm text-gray-500">
                  {spec.Specification.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kanan: Info Mobil */}
      <div className="lg:col-span-5 pt-10">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6 sticky top-24">
          <h1 className="text-3xl font-semibold text-gray-900">
            More{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-800">
              Information.
            </span>
          </h1>
          {/* Kapasitas */}
          <div className="relative overflow-hidden bg-green-50 border border-green-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-3 relative z-10">
              <div className="p-3 bg-green-500/90 rounded-xl">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Capacity
                </h3>
                <p className="text-base font-semibold text-gray-800">
                  {car.capacity} Seats
                </p>
              </div>
            </div>
          </div>

          {/* Kategori */}
          <div className="relative overflow-hidden bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-3 relative z-10">
              <div className="p-3 bg-indigo-500/90 rounded-xl">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Category
                </h3>
                <p className="text-base font-semibold text-gray-800">
                  {car.Category.name}
                </p>
              </div>
            </div>
          </div>

          {/* Tahun */}
          <div className="relative overflow-hidden bg-amber-50 border border-amber-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-3 relative z-10">
              <div className="p-3 bg-amber-500/90 rounded-xl">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                  Year Model
                </h3>
                <p className="text-base font-semibold text-gray-800">
                  {car.year}
                </p>
              </div>
            </div>
          </div>

          {/* Harga */}
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 rounded-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-400/10 to-teal-400/10 rounded-full -translate-y-16 translate-x-16"></div>

            <div className="relative z-10">
              <div className="flex items-center space-x-3">
                {/* Icon */}
                <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                  <Tag className="h-5 w-5 text-white" />
                </div>

                {/* Text */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-1">
                    Price
                  </h3>
                  <div className="text-lg md:text-xl font-semibold text-gray-900">
                    {formatCurrency(car.price)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
