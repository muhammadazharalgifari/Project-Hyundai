"use client";

import { useEffect, useState } from "react";

interface SpecCategory {
  id: string;
  name: string;
  Specification: Specification[];
}

interface Specification {
  id: string;
  name: string;
}

interface Props {
  onChange: (specs: { [categoryId: string]: Specification | null }) => void;
  initialValue?: { [categoryId: string]: string };
}

export default function SpecificationSelector({
  onChange,
  initialValue,
}: Props) {
  const [categories, setCategories] = useState<SpecCategory[]>([]);
  const [selectedSpecs, setSelectedSpecs] = useState<{
    [categoryId: string]: Specification | null;
  }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/specifications");
        const data = await response.json();
        setCategories(data);

        // init state
        const initial: { [categoryId: string]: Specification | null } = {};
        data.forEach((cat: SpecCategory) => {
          const initSpecId = initialValue?.[cat.id];
          const spec =
            cat.Specification.find((s) => s.id === initSpecId) || null;
          initial[cat.id] = spec;
        });
        setSelectedSpecs(initial);
        // onChange(initial);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [initialValue]);

  const handleSelect = (categoryId: string, specId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    const spec = category?.Specification.find((s) => s.id === specId) || null;

    const updated = {
      ...selectedSpecs,
      [categoryId]: spec,
    };

    setSelectedSpecs(updated);
    onChange(updated);
  };

  return (
    <div className="grid md:grid-cols-7 gap-5">
      {/* kiri */}
      <div className="col-span-4 bg-white p-4 border border-gray-400 rounded-lg">
        <h2 className="font-semibold text-xl mb-4 text-gray-900">
          Specifications
        </h2>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-4 text-gray-600">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.id} className="flex flex-col">
                <select
                  className="border border-gray-400 text-gray-700 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={selectedSpecs[cat.id]?.id || ""}
                  onChange={(e) => handleSelect(cat.id, e.target.value)}
                >
                  <option value="">{cat.name}</option>
                  {cat.Specification.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* kanan */}
      <div className="col-span-5 md:col-span-3 bg-white p-4 rounded-lg shadow-lg">
        <h2 className="font-semibold text-xl mb-4">Selected Specs</h2>
        {Object.values(selectedSpecs).every((s) => !s) ? (
          <p className="text-gray-500 text-sm">No specifications selected.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {Object.entries(selectedSpecs).map(([catId, spec]) =>
              spec ? (
                <li key={catId} className="text-sm text-gray-800">
                  {spec.name}
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
