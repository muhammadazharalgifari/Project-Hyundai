"use client";

import { Suspense, useRef, useState, useTransition } from "react";
import { type PutBlobResult } from "@vercel/blob";
import {
  ImageUp,
  Trash2,
  Car,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Loader,
  Save,
} from "lucide-react";
import Image from "next/image";
import { BarLoader } from "react-spinners";
import CategorySelector from "@/components/admin/cars/CategorySelector";
import SpecificationSelector from "@/components/admin/cars/SpecificationSelector";
import { updateCar } from "@/lib/actions";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

type CarSpec = {
  specId: string;
  Specification: {
    specCategoryId: string;
    name: string;
  };
};

type Car = {
  id: string;
  name: string;
  description: string;
  year: number | null;
  image: string;
  capacity: number;
  price: number;
  categoryId: string;
  CarSpec: CarSpec[];
};

const EditFormCar = ({ car }: { car: Car }) => {
  const router = useRouter();
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState(car.image || "");
  const [message, setMessage] = useState("");
  const [pending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    car.categoryId
  );
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [selectedSpecs, setSelectedSpecs] = useState<{
    [categoryId: string]: { id: string; name: string } | null;
  }>(
    Object.fromEntries(
      car.CarSpec.map((cs) => [
        cs.Specification.specCategoryId,
        { id: cs.specId, name: cs.Specification.name },
      ])
    )
  );

  const handleUpload = () => {
    if (!inputFileRef.current?.files) return null;
    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      try {
        const response = await fetch("/api/upload", {
          method: "PUT",
          body: formData,
        });
        const data = await response.json();
        if (response.status !== 200) {
          setMessage(data.message);
        }
        const img = data as PutBlobResult;
        setImage(img.url);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const deleteImage = (image: string) => {
    startTransition(async () => {
      try {
        await fetch(`/api/upload/?imageUrl=${image}`, {
          method: "DELETE",
        });
        setImage("");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const initialSpecs: Record<string, string> = Object.fromEntries(
    car.CarSpec.map((cs) => [cs.Specification.specCategoryId, cs.specId])
  );

  const handleSubmit = async (formData: FormData) => {
    setErrors({});
    startTransition(async () => {
      const result = await updateCar(car.id, image, formData);

      if (result?.error) {
        setErrors({ global: [result.error] });
      }

      if (result?.success) {
        router.push("/admin/cars");
      }
    });
  };

  return (
    <form action={handleSubmit}>
      <div className="grid md:grid-cols-12 gap-5">
        {/* Kiri */}
        <div className="col-span-8 bg-white p-4">
          {/* Car Name */}
          <div className="mb-4 relative">
            <Car className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
            <input
              type="text"
              name="name"
              className="py-2 pl-10 pr-4 rounded-lg border border-gray-400 w-full"
              defaultValue={car.name}
              placeholder="Car Name"
            />
            <div aria-live="polite" aria-atomic="true">
              {errors.name && (
                <span className="text-sm text-red-500 mt-2">
                  {errors.name[0]}
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-4 relative">
            <FileText className="absolute left-3 top-3 text-gray-500 size-5" />
            <textarea
              name="description"
              rows={8}
              className="py-2 pl-10 pr-4 rounded-lg border border-gray-400 w-full"
              defaultValue={car.description}
              placeholder="Description..."
            ></textarea>
            <div aria-live="polite" aria-atomic="true">
              {errors.description && (
                <span className="text-sm text-red-500 mt-2">
                  {errors.description[0]}
                </span>
              )}
            </div>
          </div>

          {/* Specifications */}
          <Suspense fallback={<LoadingSpinner />}>
            <div className="mb-4">
              <SpecificationSelector
                onChange={setSelectedSpecs}
                initialValue={initialSpecs}
              />
              {Object.values(selectedSpecs).map(
                (spec) =>
                  spec && (
                    <input
                      key={spec.id}
                      name="specification"
                      type="hidden"
                      value={spec.id}
                    />
                  )
              )}
              {errors.specification && (
                <span className="text-sm text-red-500 mt-2">
                  {errors.specification[0]}
                </span>
              )}
            </div>
          </Suspense>
        </div>

        {/* Kanan */}
        <div className="col-span-8 md:col-span-4 bg-white p-4">
          {/* Upload Image */}
          <label
            htmlFor="input-file"
            className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 relative"
          >
            <div className="flex flex-col items-center justify-center text-gray-500 pt-5 pb-6 z-10">
              {pending ? (
                <BarLoader
                  aria-setsize={20}
                  color="#2563eb"
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : null}
              {image ? (
                <button
                  type="button"
                  onClick={() => deleteImage(image)}
                  className="flex items-center justify-center bg-red-500 size-8 rounded-lg absolute right-1 top-1 text-white hover:bg-red-600 cursor-pointer transition-all duration-300"
                >
                  <Trash2 className="size-6 text-white" />
                </button>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <ImageUp className="size-6" />
                  <p className="mb-1 text-sm font-bold">Select Image</p>
                  {message ? (
                    <p className="text-xs text-red-500">{message}</p>
                  ) : (
                    <p className="text-xs">
                      SVG, PNG, JPG, GIF or Others (MAX: 4MB)
                    </p>
                  )}
                </div>
              )}
            </div>

            {!image ? (
              <input
                type="file"
                ref={inputFileRef}
                onChange={handleUpload}
                id="input-file"
                className="hidden"
                name="image"
              />
            ) : (
              <Image
                src={image}
                alt="image"
                width={640}
                height={360}
                className="rounded-lg absolute aspect-video object-cover"
              />
            )}
          </label>

          {/* Category */}
          <div className="mb-4">
            <CategorySelector
              onChange={setSelectedCategory}
              initialValue={car.categoryId}
            />
            <input type="hidden" name="category" value={selectedCategory} />
            {errors.category && (
              <span className="text-sm text-red-500 mt-2">
                {errors.category[0]}
              </span>
            )}
          </div>

          {/* Year */}
          <div className="mb-4 relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
            <input
              type="text"
              name="year"
              defaultValue={car.year !== null ? car.year.toString() : ""}
              className="py-3 px-4 pl-10 pr-4 rounded-lg border border-gray-400 w-full"
              placeholder="Model Year..."
            />
            <div aria-live="polite" aria-atomic="true">
              {errors.year && (
                <span className="text-sm text-red-500 mt-2">
                  {errors.year[0]}
                </span>
              )}
            </div>
          </div>

          {/* Capacity */}
          <div className="mb-4 relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
            <input
              type="text"
              name="capacity"
              defaultValue={car.capacity?.toString()}
              className="py-3 px-4 pl-10 pr-4 rounded-lg border border-gray-400 w-full"
              placeholder="Capacity..."
            />
            <div aria-live="polite" aria-atomic="true">
              {errors.capacity && (
                <span className="text-sm text-red-500 mt-2">
                  {errors.capacity[0]}
                </span>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="mb-4 relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 size-5" />
            <input
              type="text"
              name="price"
              defaultValue={car.price?.toString()}
              className="py-3 px-4 pl-10 pr-4 rounded-lg border border-gray-400 w-full"
              placeholder="Rp. 0,00"
            />
            <div aria-live="polite" aria-atomic="true">
              {errors.price && (
                <span className="text-sm text-red-500 mt-2">
                  {errors.price[0]}
                </span>
              )}
            </div>
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={pending}
            className="bg-gradient-to-r from-indigo-500 to-indigo-800 text-white w-full py-2.5 px-6 md:px-10 rounded-lg cursor-pointer font-semibold text-lg hover:from-indigo-600 hover:to-indigo-900 transition-colors"
          >
            {pending ? (
              <div className="flex items-center justify-center">
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Updating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Save className="w-5 h-5 mr-2" />
                Update
              </div>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditFormCar;
