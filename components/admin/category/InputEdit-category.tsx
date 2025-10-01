"use client";

import { useState, useTransition } from "react";
import { updateCategory } from "@/lib/actions";
import { Loader, Save } from "lucide-react";

interface EditCategoryProps {
  id: string;
  currentName: string;
  onSuccess: () => void;
}

const EditCategory = ({ id, currentName, onSuccess }: EditCategoryProps) => {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await updateCategory(id, name);
        onSuccess();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Failed to update category");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <Loader className="w-5 h-5 animate-spin mr-2" /> Updating...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Save className="w-5 h-5 mr-2" /> Update
          </div>
        )}
      </button>
    </form>
  );
};

export default EditCategory;
