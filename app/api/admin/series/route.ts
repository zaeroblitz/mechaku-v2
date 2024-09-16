import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

import { prisma } from "@/lib/prisma";
import { NewSeriesSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

const utapi = new UTApi();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const title = formData.get("title")?.toString() ?? "";
    const description = formData.get("description")?.toString();
    const author = formData.get("author")?.toString();
    const isActive = formData.get("isActive") === "true";
    const image = formData.get("image") as File;

    // Validations
    NewSeriesSchema.parse({ title, description, author, isActive, image });

    // Upload image
    const imageResponse = await utapi.uploadFiles(image);
    const imageUrl = imageResponse.data?.url;

    if (imageUrl) {
      const newSeries = await prisma.series.create({
        data: {
          title,
          description,
          author,
          isActive,
          image: imageUrl,
        },
      });

      return Response({
        success: true,
        message: "Successfully create new series!",
        data: newSeries,
        status: 201,
      });
    } else {
      return Response({
        success: false,
        message: "Failed to create new series! Image failed to uploaded.",
        data: null,
        status: 500,
      });
    }
  } catch (error) {
    console.error("🚀 ~ file: route.ts:56 ~ POST ~ error:", error);
    return Response({
      success: false,
      message: "Failed to create new series!",
      data: error,
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const series = await prisma.series.findMany({
      orderBy: { createdAt: "asc" },
    });

    return Response({
      success: true,
      message: "Successfully get all series!",
      data: series,
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:66 ~ GET ~ error:", error);
    return Response({
      success: false,
      message: "Failed to get all series!",
      data: error,
      status: 500,
    });
  }
}
