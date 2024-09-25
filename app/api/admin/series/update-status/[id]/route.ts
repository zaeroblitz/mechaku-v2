import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UpdateSeriesStatusSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();
    const id = payload.id;
    const isActive = payload.isActive;

    // Validate input
    UpdateSeriesStatusSchema.parse({ isActive });

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

    // Update the series in the database
    const updatedSeries = await prisma.series.update({
      where: { id },
      data: {
        isActive: !isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated series status!",
      data: updatedSeries,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated series status!",
      data: error,
      status: 500,
    });
  }
}
