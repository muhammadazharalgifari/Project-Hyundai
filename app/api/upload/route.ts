import { put, del } from "@vercel/blob";
import { NextResponse } from "next/server";

export const PUT = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  const form = await request.formData();
  const file = form.get("file") as File;

  if (file.size === 0 || file.size === undefined) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (file.size > 4000000) {
    return NextResponse.json(
      { error: "File is too large, File must be less than 4MB" },
      { status: 400 }
    );
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "File must be an image" },
      { status: 400 }
    );
  }

  const path = folder ? `${folder}/${file.name}` : file.name;

  const blob = await put(path, file, {
    access: "public",
    multipart: true,
  });
  return NextResponse.json(blob);
};

export const DELETE = async (request: Request) => {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("imageUrl") as string;
  await del(imageUrl);
  return NextResponse.json(
    { message: "Image deleted successfully" },
    { status: 200 }
  );
};
