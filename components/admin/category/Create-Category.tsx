"use client";

import InputCategory from "@/components/admin/category/Input-Category";
import EditCategory from "@/components/admin/category/InputEdit-category";
import { deleteCategory } from "@/lib/actions";
import { Plus, SquarePen, Trash2, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const CreateCategory = ({ categories }: { categories: Category[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Tombol buka modal */}
      <button
        type="button"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 text-sm font-semibold text-white rounded-lg shadow-xl shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
        onClick={() => setIsOpen(true)}
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Category
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] md:w-[30vw] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              Create New{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <InputCategory onSuccess={() => setIsOpen(false)} />
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {editId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] md:w-[30vw] relative">
            <button
              onClick={() => setEditId(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Edit Category</h2>
            <EditCategory
              id={editId}
              currentName={categories.find((c) => c.id === editId)?.name ?? ""}
              onSuccess={() => setEditId(null)}
            />
          </div>
        </div>
      )}

      {/* Table categories */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mt-6 shadow-lg hover:shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/30 transition-all duration-300">
        <div className="w-full md:w-full overflow-x-auto scrollbar-thin scroll-bar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[200px] sm:min-w-0">
                  Category Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[200px] sm:min-w-0">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[200px] sm:min-w-0">
                  Updated At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[200px] sm:min-w-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedCategories.map((cat) => (
                <tr
                  key={cat.id}
                  className="hover:bg-blue-50/30 transition-all duration-200 border-b border-gray-100/60"
                >
                  <td className="px-6 py-5 whitespace-nowrap min-w-[100px] sm:min-w-0">
                    <span className="text-sm font-semibold text-gray-900">
                      #{cat.id}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {cat.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {formatDate(cat.createdAt?.toISOString())}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {formatDate(cat.updatedAt?.toISOString())}
                    </span>
                  </td>
                  <td className="px-6 py-5 flex gap-3 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <button
                      onClick={() => setEditId(cat.id)}
                      className="text-green-500 cursor-pointer hover:bg-green-100 p-1 rounded-lg"
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          await deleteCategory(cat.id);
                        }
                      }}
                      className="text-red-500 cursor-pointer hover:bg-red-100 p-1 rounded-lg"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No categories yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 text-sm rounded-md border disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 text-sm rounded-md border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCategory;
