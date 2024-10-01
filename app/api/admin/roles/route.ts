import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewRoleSchema } from "@/lib/validations";
import Response from "@/lib/api.response";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { name, description, permissions } = await req.json();

    // Validations
    NewRoleSchema.parse({ name, description, permissions });

    // Create new role to db
    const newRole = await prisma.role.create({
      data: {
        name,
        description,
      },
    });

    // Associate permissions to new role
    await Promise.all(
      permissions.map(async (permission: string) => {
        await prisma.rolePermission.create({
          data: {
            role: { connect: { id: newRole.id } },
            permission: { connect: { id: permission } },
          },
        });
      })
    );

    return Response({
      success: true,
      message: "Successfully created a new role!",
      data: newRole,
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to created a new role!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const roles = await prisma.role.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        rolesPermissions: { select: { permissionId: true } },
      },
    });

    return Response({
      success: true,
      message: "Successfully get all roles!",
      data: roles,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all roles!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, name, description, permissions } = await req.json();

    // Validations
    NewRoleSchema.parse({ name, description, permissions });

    // Check for valid role ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid role ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing role
    const role = await prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      return Response({
        success: false,
        message: "Role not exists!",
        data: null,
        status: 404,
      });
    }

    // Update role
    const updatedRole = await prisma.role.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    // Delete all existing permissions
    await prisma.rolePermission.deleteMany({
      where: { roleId: id },
    });

    // Associate new permissions to the role
    await Promise.all(
      permissions.map(async (permission: string) => {
        await prisma.rolePermission.create({
          data: {
            role: { connect: { id: id } },
            permission: { connect: { id: permission } },
          },
        });
      })
    );

    return Response({
      success: true,
      message: "Successfully updated role data!",
      data: updatedRole,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated role data!",
      data: error,
      status: 500,
    });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { id } = await req.json();

    // Check for valid role ID
    if (!id) {
      return Response({
        success: false,
        message: "Invalid role ID!",
        data: null,
        status: 400,
      });
    }

    // Find existing role
    const role = await prisma.role.findUnique({
      where: { id },
    });

    if (!role) {
      return Response({
        success: false,
        message: "Role not exists!",
        data: null,
        status: 404,
      });
    }

    // Delete role
    await prisma.role.delete({
      where: { id },
    });

    return Response({
      success: true,
      message: "Successfully updated role data!",
      data: role,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated role data!",
      data: error,
      status: 500,
    });
  }
}
