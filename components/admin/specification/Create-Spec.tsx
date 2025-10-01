"use client";

import { useState } from "react";
import InputSpec from "@/components/admin/specification/Input-Spec";
import { Plus, X, SquarePen, Trash2, ChevronRight, ChevronLeft } from "lucide-react";
import EditSpec from "@/components/admin/specification/InputEdit-Spec";
import { deleteSpecification } from "@/lib/actions";
import { formatDate } from "@/lib/utils";

interface Specification {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  SpecCategory: {
    id: string;
    name: string;
  };
}

interface SpecCategory {
  id: string;
  name: string;
}

const CreateSpec = ({
  specifications,
  categories,
}: {
  specifications: Specification[];
  categories: SpecCategory[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(specifications.length / itemsPerPage);
  const paginatedSpecs = specifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-800 hover:from-indigo-600 hover:to-indigo-900 text-sm font-semibold text-white rounded-lg shadow-xl shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Specification
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90vw] md:w-[30vw] relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Create New{" "}
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent">
                Specification
              </span>
            </h2>
            <InputSpec
              categories={categories}
              onSuccess={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Modal edit */}
      {editId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90vw] md:w-[30vw] relative">
            <button
              onClick={() => setEditId(null)}
              className="absolute top-3 right-3 text-gray-500"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Specification</h2>
            <EditSpec
              id={editId}
              currentName={
                specifications.find((s) => s.id === editId)?.name ?? ""
              }
              currentCategoryId={
                specifications.find((s) => s.id === editId)?.SpecCategory.id ??
                ""
              }
              categories={categories}
              onSuccess={() => setEditId(null)}
            />
          </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden mt-6 shadow-lg hover:shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/30 transition-all duration-300">
        <div className="w-full md:w-full overflow-x-auto scrollbar-thin scroll-bar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                  Specification
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                  Created At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                  Updated At
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hover:bg-gray-100/60 transition-all duration-200 min-w-[100px] sm:min-w-0">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedSpecs.map((spec) => (
                <tr
                  key={spec.id}
                  className="hover:bg-blue-50/30 transition-all duration-200 border-b border-gray-100/60"
                >
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {spec.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {spec.SpecCategory.name}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {formatDate(spec.createdAt?.toISOString())}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0">
                    <span className="text-sm font-medium text-gray-500">
                      {formatDate(spec.updatedAt?.toISOString())}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap min-w-[120px] sm:min-w-0 flex gap-3">
                    <button
                      onClick={() => setEditId(spec.id)}
                      className="text-green-500 hover:bg-green-100 p-1 rounded-lg cursor-pointer"
                    >
                      <SquarePen className="w-5 h-5" />
                    </button>
                    <button
                      onClick={async () => {
                        if (confirm("Are you sure?")) {
                          await deleteSpecification(spec.id);
                        }
                      }}
                      className="text-red-500 hover:bg-red-100 p-1 rounded-lg cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {specifications.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No specifications yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-100/60">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-2 text-sm font-medium rounded-lg border border-blue-400 text-blue-500 disabled:opacity-50 flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-2 text-sm font-medium rounded-lg border border-blue-400 text-blue-500 disabled:opacity-50 flex items-center justify-center"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateSpec;
