import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { NewAdminSchema } from "@/lib/validations";
import Response from "@/lib/api.response";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { username, email, password, roleId } = await req.json();

    // Validations
    NewAdminSchema.parse({ username, email, password, roleId });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin to db
    const newAdmin = await prisma.admin.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: { connect: { id: roleId } },
      },
    });

    return Response({
      success: true,
      message: "Successfully created a new admin!",
      data: newAdmin,
      status: 201,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to created a new admin!",
      data: error,
      status: 500,
    });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const admins = await prisma.admin.findMany({
      orderBy: { createdAt: "asc" },
      include: {
        role: { select: { name: true } },
      },
    });

    return Response({
      success: true,
      message: "Successfully get all admins!",
      data: admins,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to get all admins!",
      data: error,
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { id, username, email, password, roleId } = await req.json();

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
        message: "Admin not exists!",
        data: null,
        status: 404,
      });
    }

    // Data to update
    let data;
    if (password) {
      data = {
        username,
        email,
        password: await bcrypt.hash(password, 10),
        role: { connect: { id: roleId } },
      };
    } else {
      data = {
        username,
        email,
        role: { connect: { id: roleId } },
      };
    }

    // Update admin
    const updatedAdmin = await prisma.admin.update({
      where: { id },
      data,
    });

    return Response({
      success: true,
      message: "Successfully updated admin data!",
      data: updatedAdmin,
      status: 200,
    });
  } catch (error) {
    return Response({
      success: false,
      message: "Failed to updated admin data!",
      data: error,
      status: 500,
    });
  }
}
