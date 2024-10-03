import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import Response from "@/lib/api.response";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const payload = await req.json();
    const id = payload.id;
    const status = payload.status;

    // Check for valid admin ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid admin ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing admin
    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      return Response({
        success: false,
        message: "Admin not found!",
        data: null,
        status: 404,
      });
    }

    // Update the admin in the database
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data: {
        isActive: status,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated admin status!",
      data: updatedAdmin,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated admin status!",
      data: error,
      status: 500,
    });
  }
}
