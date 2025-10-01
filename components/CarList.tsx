"use client";

import { useState } from "react";
import Card from "@/components/Card";
import {
  Car,
  Category,
  CarSpec,
  Specification,
  SpecCategory,
} from "@prisma/client";
import { Filter } from "lucide-react";

type CarWithRelations = Car & {
  Category: Category;
  CarSpec: (CarSpec & {
    Specification: Specification & { SpecCategory: SpecCategory };
  })[];
};

const CarList = ({
  cars,
  categories,
}: {
  cars: CarWithRelations[];
  categories: Category[];
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const filteredCars =
    activeCategory === "all"
      ? cars
      : cars.filter((car) => car.categoryId === activeCategory);

  return (
    <div>
      {/* Filter - Desktop */}
      <div className="hidden md:flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-5 py-2 rounded-lg font-medium transition ${
            activeCategory === "all"
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              activeCategory === cat.id
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Filter - Mobile */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
        >
          <Filter className="w-5 h-5" />
          <span>Filter</span>
        </button>

        {showMobileFilter && (
          <div className="mt-3 bg-white rounded-lg shadow p-4 space-y-2">
            <button
              onClick={() => {
                setActiveCategory("all");
                setShowMobileFilter(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-md ${
                activeCategory === "all"
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowMobileFilter(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-md ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Cars Grid */}
      <div className="grid gap-7 md:grid-cols-3">
        {filteredCars.length > 0 ? (
          filteredCars.map((car) => <Card key={car.id} car={car} />)
        ) : (
          <p className="text-gray-500 col-span-3 text-center">
            No cars available for this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CarList;
