import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewGradeSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, isActive } = await req.json();

    // Validations
    NewGradeSchema.parse({ name, isActive });

    // Create new grade to db
    const newGrade = await prisma.grade.create({
      data: {
        name,
        isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully created a new grade!",
      data: newGrade,
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to created a new grade!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    let grades;
    const isActive = req.nextUrl.searchParams.get("isActive");

    if (isActive === "active") {
      grades = await prisma.grade.findMany({
        where: { isActive: true },
        orderBy: { createdAt: "asc" },
      });
    } else {
      grades = await prisma.grade.findMany({
        orderBy: { createdAt: "asc" },
      });
    }

    return Response({
      success: true,
      message: "Successfully get all grades!",
      data: grades,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all grades!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, name, isActive } = await req.json();

    // Validations
    NewGradeSchema.parse({ name, isActive });

    // Check for valid grade ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid grade ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing grade
    const grade = await prisma.grade.findUnique({
      where: { id },
    });

    if (!grade) {
      return Response({
        success: false,
        message: "Grade not exists!",
        data: null,
        status: 404,
      });
    }

    // Update grade
    const updatedGrade = await prisma.grade.update({
      where: { id },
      data: {
        name,
        isActive,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated grade data!",
      data: updatedGrade,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated grade data!",
      data: error,
      status: 500,
    });
  }
}
