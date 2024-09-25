import { NextRequest, NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";
import { prisma } from "@/lib/prisma";
import { NewSeriesSchema, UpdateSeriesSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

const utapi = new UTApi();

async function handleImage(series: any, image: File) {
  let imageUrl = series.image;

  if (image) {
    // Remove existing image
    if (series.image) {
      const imageKey = series.image.substring(
        series.image.lastIndexOf("/") + 1
      );
      await utapi.deleteFiles(imageKey);
    }

    // Upload image
    const imageResponse = await utapi.uploadFiles(image);
    imageUrl = imageResponse.data!.url;
  }

  return imageUrl;
}

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

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const formData = await req.formData();
    const id = formData.get("id")?.toString() ?? "";
    const title = formData.get("title")?.toString() ?? "";
    const description = formData.get("description")?.toString();
    const author = formData.get("author")?.toString();
    const isActive = formData.get("isActive") === "true";
    const image = formData.get("image") as File;

    // Validations
    if (image) {
      UpdateSeriesSchema.parse({ title, description, author, isActive, image });
    } else {
      UpdateSeriesSchema.parse({ title, description, author, isActive });
    }

    // Check for valid series ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid series ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing series
    const series = await prisma.series.findUnique({
      where: { id },
    });

    if (!series) {
      return Response({
        success: false,
        message: "Series not found!",
        data: null,
        status: 404,
      });
    }

    // Handle image upload and removal
    const imageUrl = await handleImage(series, image);

    // Update the series in the database
    const updatedSeries = await prisma.series.update({
      where: { id },
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
      message: "Successfully updated series!",
      data: updatedSeries,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated series!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let series;
    const isActive = req.nextUrl.searchParams.get("isActive");

    if (isActive === "active") {
      series = await prisma.series.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      });
    } else {
      series = await prisma.series.findMany({
        orderBy: { createdAt: "asc" },
      });
    }

    return Response({
      success: true,
      message: "Successfully get all series!",
      data: series,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all series!",
      data: error,
      status: 500,
    });
  }
}
