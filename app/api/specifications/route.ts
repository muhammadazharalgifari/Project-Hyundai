import { NextResponse } from "next/server";
import { getSpecCategoriesWithSpecifications } from "@/lib/data";

export async function GET() {
  try {
    const categories = await getSpecCategoriesWithSpecifications();
    return NextResponse.json(categories);
  } catch (error) {
    console.log("Error fetching spec categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch spec categories" },
      { status: 500 }
    );
  }
}
