import { getSpecCategories, getSpecifications } from "@/lib/data";
import CreateSpec from "@/components/admin/specification/Create-Spec";

const SpecificationPage = async () => {
  const specifications = await getSpecifications();
  const categories = await getSpecCategories();
  return (
    <div className="max-w-screen-xl mx-auto py-28 px-4 mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Manage{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
          Specification Car
        </span>
      </h1>

      <CreateSpec categories={categories} specifications={specifications} />
    </div>
  );
};

export default SpecificationPage;
