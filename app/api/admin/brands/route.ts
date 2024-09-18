import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewBrandSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, isActive } = await req.json();

    // Validations
    NewBrandSchema.parse({ name, isActive });

    // Create new brand to db
    const newBrand = await prisma.brand.create({
      data: {
        name,
        isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully created a new brand!",
      data: newBrand,
      status: 201,
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:29 ~ POST ~ error:", error);
    return Response({
      success: false,
      message: "Failed to created a new brand!",
      data: error,
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      orderBy: { createdAt: "asc" },
    });

    return Response({
      success: true,
      message: "Successfully get all brands!",
      data: brands,
      status: 200,
    });
  } catch (error) {
    console.log("🚀 ~ file: route.ts:51 ~ GET ~ error:", error);
    return Response({
      success: false,
      message: "Failed to get all brands!",
      data: error,
      status: 500,
    });
  }
}
