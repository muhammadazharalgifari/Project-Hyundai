"use client";

import { deleteCar } from "@/lib/actions";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/admin/cars/edit/${id}`}
      className="rounded-lg p-1 hover:bg-green-100"
    >
      <SquarePen className="w-5 h-5 text-green-500" />
    </Link>
  );
};

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
  const DeleteCarWithId = deleteCar.bind(null, id, image);
  return (
    <form action={DeleteCarWithId}>
      <button
        type="submit"
        className="rounded-lg p-1 hover:bg-red-100 cursor-pointer"
      >
        <Trash2 className="w-5 h-5 text-red-500" />
      </button>
    </form>
  );
};
