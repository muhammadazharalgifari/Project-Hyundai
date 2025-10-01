"use client";

import { useState, useTransition } from "react";
import { createSpesification } from "@/lib/actions";
import { Loader, Save } from "lucide-react";

interface SpecCategory {
  id: string;
  name: string;
}

const InputSpec = ({
  categories,
  onSuccess,
}: {
  categories: SpecCategory[];
  onSuccess: () => void;
}) => {
  const [name, setName] = useState("");
  const [specCategoryId, setSpecCategoryId] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await createSpesification(name, specCategoryId);
        setName("");
        setSpecCategoryId("");
        onSuccess();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Failed to create specification");
        }
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={name}
        rows={5}
        onChange={(e) => setName(e.target.value)}
        placeholder="Spesification..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      ></textarea>

      <select
        value={specCategoryId}
        onChange={(e) => setSpecCategoryId(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin mr-2" />
            Creating...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Save className="w-5 h-5 mr-2" />
            Save
          </div>
        )}
      </button>
    </form>
  );
};

export default InputSpec;
