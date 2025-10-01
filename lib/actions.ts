"use server";

import { CarSchema, ContactSchema } from "@/lib/zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";

export const createCategory = async (name: string) => {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!name || name.trim() === "") {
    throw new Error("Category name is required");
  }

  await prisma.category.create({
    data: {
      name: name.trim(),
    },
  });

  // biar data di tabel update otomatis
  revalidatePath("/admin/category");
};

export const createSpesification = async (
  name: string,
  specCategoryId: string
) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!name || !name.trim()) throw new Error("Spesification name is required");
  if (!specCategoryId) throw new Error("Category is required");

  await prisma.specification.create({
    data: {
      name: name.trim(),
      specCategoryId,
    },
  });

  revalidatePath("/admin/specification");
};

export const createCar = async (
  image: string,
  prevState: unknown,
  formData: FormData
) => {
  if (!image) return { error: { image: ["Image is required"] } };

  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    capacity: formData.get("capacity"),
    price: formData.get("price"),
    year: formData.get("year"),
    category: formData.get("category"),
    specification: formData.getAll("specification"),
  };

  const validateFields = CarSchema.safeParse(rawData);

  if (!validateFields.success) {
    return { error: validateFields.error.flatten().fieldErrors };
  }

  const { name, description, capacity, price, year, category, specification } =
    validateFields.data;

  try {
    await prisma.car.create({
      data: {
        name,
        description,
        image,
        price,
        year,
        categoryId: category,
        capacity,
        CarSpec: {
          createMany: {
            data: specification.map((spec) => ({
              specId: spec,
            })),
          },
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: { general: ["Failed to save car. Please try again."] } };
  }
};

export const ContactMessage = async (
  prevState: unknown,
  formData: FormData
) => {
  const session = await auth();
  if (!session?.user) {
    return { error: { general: "You must be logged in to send a message." } };
  }

  const validateFields = ContactSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validateFields.success) {
    const errors = validateFields.error.flatten().fieldErrors;
    return {
      error: {
        name: errors.name?.[0],
        email: errors.email?.[0],
        subject: errors.subject?.[0],
        message: errors.message?.[0],
      },
    };
  }

  const { name, email, subject, message } = validateFields.data;

  try {
    await prisma.contact.create({
      data: {
        name,
        email,
        subject,
        message,
        userId: session.user.id,
      },
    });

    return { message: "Thanks for criticism or suggestions." };
  } catch (error) {
    console.error(error);
    return { error: { general: "Something went wrong. Please try again." } };
  }
};

export const deleteCar = async (id: string, image: string) => {
  const session = await auth();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    await del(image);

    await prisma.car.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.error("Failed to delete car:", error);
    throw new Error("Failed to delete car");
  }
  revalidatePath("/admin/cars");
};

export const updateCar = async (
  id: string,
  image: string | null,
  formData: FormData
) => {
  try {
    const specifications = formData.getAll("specification") as string[];

    await prisma.car.update({
      where: {
        id,
      },
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        capacity: parseInt(formData.get("capacity") as string),
        price: parseInt(formData.get("price") as string),
        year: parseInt(formData.get("year") as string),
        image: image !== null ? image : null!,
        categoryId: formData.get("category") as string,
        CarSpec: {
          deleteMany: { carId: id },
          createMany: {
            data: specifications.map((specId) => ({
              specId,
            })),
          },
        },
      },
    });

    revalidatePath("/admin/cars");
    return { success: true };
  } catch (error) {
    console.log("Update car error:", error);
    return { error: "Failed to update car" };
  }
};

// UPDATE CATEGORY
export const updateCategory = async (id: string, name: string) => {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  if (!name || !name.trim()) throw new Error("Category name is required");

  await prisma.category.update({
    where: { id },
    data: { name: name.trim() },
  });

  revalidatePath("/admin/category");
};

// DELETE CATEGORY
export const deleteCategory = async (id: string) => {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/category");
};

// UPDATE SPECIFICATION
export const updateSpecification = async (
  id: string,
  name: string,
  specCategoryId: string
) => {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  if (!name || !name.trim()) throw new Error("Specification name is required");
  if (!specCategoryId) throw new Error("Category is required");

  await prisma.specification.update({
    where: { id },
    data: { name: name.trim(), specCategoryId },
  });

  revalidatePath("/admin/specification");
};

// DELETE SPECIFICATION
export const deleteSpecification = async (id: string) => {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.specification.delete({
    where: { id },
  });

  revalidatePath("/admin/specification");
};
