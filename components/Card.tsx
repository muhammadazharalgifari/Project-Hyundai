import { formatCurrency } from "@/lib/utils";
import { Car } from "@prisma/client";
import { Eye, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Card = ({ car }: { car: Car }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg transition duration-100 hover:shadow-sm">
      <div className="h-[260px] w-auto rounded-t-lg relative overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-6 md:p-8 space-y-2">
        <h4 className="text-lg font-semibold text-gray-600 uppercase">
          <div className="flex items-center justify-between">
            <Link
              href={`/cars/detail/${car.id}`}
              className="hover:text-gray-800 transition duration-150"
            >
              {car.name}
            </Link>
          </div>
        </h4>
        <h4 className="text-lg mb-5">
          <span className="text-gray-400 text-sm">From</span>{" "}
          <span className="font-semibold text-gray-800">
            {formatCurrency(car.price)}
          </span>
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 bg-green-100 text-green-700 p-2 md:p-2.5 rounded-full">
              <Users className="w-3 h-3 md:w-4 md:h-4" />
              <span className="font-medium text-[10px] md:text-xs">
                {car.capacity} seats
              </span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-full">
              <span className="font-normal text-xs">{car.year}</span>
            </div>
          </div>

          <Link
            href={`/cars/detail/${car.id}`}
            className="px-3 py-1.5 md:py-2.5 flex items-center space-x-1 md:space-x-2 text-xs md:text-sm font-semibold text-white group bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Eye className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-0.5 transition-transform" />
            <span>View Detail</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
