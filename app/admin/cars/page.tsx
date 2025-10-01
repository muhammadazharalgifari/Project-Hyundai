import CarTable from "@/components/admin/cars/Car-Table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";

const CarPage = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-28 px-4 mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Manage{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
          Cars
        </span>
      </h1>

      <Link
        href="/admin/cars/create"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 text-sm font-semibold text-white rounded-lg shadow-xl shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Car
      </Link>
      <Suspense fallback={<LoadingSpinner />}>
        <CarTable />
      </Suspense>
    </div>
  );
};

export default CarPage;
