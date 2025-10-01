"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Props {
  onChange: (categoryId: string) => void;
  initialValue?: string;
}

export default function CategorySelector({ onChange, initialValue }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = useState<string>(initialValue || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // kalau initialValue berubah, sync ke state
  useEffect(() => {
    if (initialValue) setSelected(initialValue);
  }, [initialValue]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center py-3">
          <div className="w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <select
          name="category"
          value={selected}
          onChange={handleChange}
          className="w-full border border-gray-400 rounded-lg p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
