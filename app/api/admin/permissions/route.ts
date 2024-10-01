import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewPermissionSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, description } = await req.json();

    // Validations
    NewPermissionSchema.parse({ name, description });

    // Create new permission to db
    const newPermission = await prisma.permission.create({
      data: {
        name,
        description,
      },
    });

    return Response({
      success: true,
      message: "Successfully created a new permission!",
      data: newPermission,
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to created a new permission!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const permissions = await prisma.permission.findMany({
      orderBy: { createdAt: "asc" },
    });

    return Response({
      success: true,
      message: "Successfully get all permissions!",
      data: permissions,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all permissions!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, name, description } = await req.json();

    // Validations
    NewPermissionSchema.parse({ name, description });

    // Check for valid permission ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid permission ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing permission
    const permission = await prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      return Response({
        success: false,
        message: "Permission not exists!",
        data: null,
        status: 404,
      });
    }

    // Update permission
    const updatedPermission = await prisma.permission.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return Response({
      success: true,
      message: "Successfully updated permission data!",
      data: updatedPermission,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated permission data!",
      data: error,
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    // Check for valid permission ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid permission ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing permission
    const permission = await prisma.permission.findUnique({
      where: { id },
    });

    if (!permission) {
      return Response({
        success: false,
        message: "Permission not exists!",
        data: null,
        status: 404,
      });
    }

    // Delete permission
    await prisma.permission.delete({
      where: { id },
    });

    return Response({
      success: true,
      message: "Successfully updated permission data!",
      data: permission,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated permission data!",
      data: error,
      status: 500,
    });
  }
}
