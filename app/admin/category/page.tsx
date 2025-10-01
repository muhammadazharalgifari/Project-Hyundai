import { getCategories } from "@/lib/data";
import CreateCategory from "@/components/admin/category/Create-Category";

const CreateCategoryPage = async () => {
  const categories = await getCategories();
  return (
    <div className="max-w-screen-xl mx-auto py-28 px-4 mt-10">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">
        Manage{" "}
        <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
          Categories
        </span>
      </h1>

      <CreateCategory categories={categories} />
    </div>
  );
};

export default CreateCategoryPage;
