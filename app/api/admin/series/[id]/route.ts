import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

export async function GET(req: NextRequest, params: Params) {
  try {
    const id = params.params.id;

    if (!id) {
      return Response({
        success: false,
        message: "Invalid series ID!",
        data: null,
        status: 400,
      });
    }

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

    return Response({
      success: true,
      message: "Successfully get series by ID!",
      data: series,
      status: 200,
    });
  } catch (error) {
    console.error("🚀 ~ file: route.ts:99 ~ GET_BY_ID ~ error:", error);
    return Response({
      success: false,
      message: "Failed to get series by ID!",
      data: error,
      status: 500,
    });
  }
}
