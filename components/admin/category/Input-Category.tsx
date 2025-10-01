"use client";

import { useState, useTransition } from "react";
import { createCategory } from "@/lib/actions";
import { Loader, Save } from "lucide-react";

const InputCategory = ({ onSuccess }: { onSuccess: () => void }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await createCategory(name);
        setName("");
        onSuccess(); // Tutup modal
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to create category");
        }
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category Name..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {isPending ? (
          <>
            <div className="flex items-center justify-center">
              <Loader className="animate-spin mr-2 w-5 h-5" />
              <span className="font-medium">Saving...</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <Save className="w-5 h-5 mr-2" />
              <span className="font-medium">Save</span>
            </div>
          </>
        )}
      </button>
    </form>
  );
};

export default InputCategory;
