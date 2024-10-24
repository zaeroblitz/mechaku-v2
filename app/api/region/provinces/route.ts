import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const response = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    const data = await response.json();

    if (data) {
      await prisma.province.createMany({
        data: data.map((province: any) => ({
          provinceId: province.id,
          name: province.name,
        })),
      });
    }

    return Response({
      success: true,
      message: "Successfully insert province data!",
      data,
      status: 201,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [INSERT PROVINCES] ~ file: route.ts:27 ~ POST ~ error:",
      error
    );

    return Response({
      success: false,
      message: "Failed to insert province data!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const provinceId = req.nextUrl.searchParams.get("provinceId");

    let data;
    if (provinceId) {
      data = await prisma.province.findUnique({
        where: { provinceId },
      });
    } else {
      data = await prisma.province.findMany({
        orderBy: { provinceId: "asc" },
      });
    }

    return Response({
      success: true,
      message: "Successfully get provinces data!",
      data,
      status: 200,
    });
  } catch (error) {
    console.error(
      "🚀 ~ [GET PROVINCES] ~ file: route.ts:43 ~ GET ~ error:",
      error
    );
    return Response({
      success: false,
      message: "Failed to get provinces data!",
      data: error,
      status: 500,
    });
  }
}
