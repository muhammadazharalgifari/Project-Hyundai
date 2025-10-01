import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const getSpecCategoriesWithSpecifications = async () => {
  try {
    const session = await auth();

    if (!session || !session?.user) {
      throw new Error("Unauthorized Access");
    }
    const specCategories = await prisma.specCategory.findMany({
      include: {
        Specification: true,
      },
    });
    return specCategories;
  } catch (error) {
    console.log("Error fetching spec categories:", error);
    throw new Error("Failed to fetch spec categories");
  }
};

export const getCategories = async () => {
  return await prisma.category.findMany({
    orderBy: { createdAt: "desc" },
  });
};

export const getSpecifications = async () => {
  return await prisma.specification.findMany({
    include: {
      SpecCategory: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getSpecCategories = async () => {
  return await prisma.specCategory.findMany({
    orderBy: {
      name: "asc",
    },
  });
};

export const getCars = async () => {
  const cars = await prisma.car.findMany({
    include: {
      Category: true,
      CarSpec: {
        include: {
          Specification: {
            include: {
              SpecCategory: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return cars;
};

export const getCarById = async (id: string) => {
  try {
    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        Category: true,
        CarSpec: {
          include: {
            Specification: {
              include: {
                SpecCategory: true,
              },
            },
          },
        },
      },
    });
    return car;
  } catch (error) {
    console.log("Error fetching car by ID:", error);
    throw new Error("Failed to fetch car by ID");
  }
};

export const getLatestMessages = async () => {
  try {
    const messages = await prisma.contact.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        message: true,
        user: {
          select: {
            email: true,
            image: true,
          },
        },
      },
    });
    return messages;
  } catch (error) {
    console.log("Error fetching latest messages:", error);
    return [];
  }
};
