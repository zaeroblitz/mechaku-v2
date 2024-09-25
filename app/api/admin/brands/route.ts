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
    return Response({
      success: false,
      message: "Failed to created a new brand!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let brands;
    const isActive = req.nextUrl.searchParams.get("isActive");

    if (isActive === "active") {
      brands = await prisma.brand.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      });
    } else {
      brands = await prisma.brand.findMany({
        orderBy: { createdAt: "asc" },
      });
    }

    return Response({
      success: true,
      message: "Successfully get all brands!",
      data: brands,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all brands!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, name, isActive } = await req.json();

    // Validations
    NewBrandSchema.parse({ name, isActive });

    // Check for valid brand ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid brand ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing brand
    const brand = await prisma.brand.findUnique({
      where: { id },
    });

    if (!brand) {
      return Response({
        success: false,
        message: "Brand not exists!",
        data: null,
        status: 404,
      });
    }

    // Update brand
    const updatedBrand = await prisma.brand.update({
      where: { id },
      data: {
        name,
        isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated brand data!",
      data: updatedBrand,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated brand data!",
      data: error,
      status: 500,
    });
  }
}
